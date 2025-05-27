import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import winston from "winston";
import cors from "@koa/cors";
import "winston-daily-rotate-file";

import { myFormat, parseMsg } from "./helper.js";

const { format, createLogger } = winston;
const { combine, timestamp, json } = format;
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 6001;
const app = new Koa();

var router = new Router();
app.use(bodyParser());
app.use(cors());

var transportInfo = new winston.transports.DailyRotateFile({
  level: "info",
  filename: "./logs/info/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  json: true,
});

var transportError = new winston.transports.DailyRotateFile({
  level: "error",
  filename: "./logs/error/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  json: true,
});

transportInfo.on("rotate", function (oldFilename, newFilename) {
  console.log(oldFilename, newFilename, "<-- transportInfo newFilename");
});

transportError.on("rotate", function (oldFilename, newFilename) {
  console.log(oldFilename, newFilename, "<-- transportError newFilename");
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [transportInfo, transportError],
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(timestamp(), myFormat),
    }),
  );
}

router
  .post("/log", async (ctx, next) => {
    console.log(ctx.request,  "<-- ctx.request.body");
    console.log(ctx.req);
    const { message, level, ...meta } = ctx.request.body;

    if (!message) {
      ctx.body = { message: "缺少message", status: -1 };
      return;
    }

    if (!level) {
      ctx.body = { message: "缺少level", status: -1 };
      return;
    }

    const data = {
      level,
      message: message,
      meta: { ip: ctx.request.ip, ...meta },
    };

    logger.log(data);

    ctx.body = { message: "ok", status: 0 };
  })
  .post("/log/query", (ctx, next) => {
    const { privateKey, ...rest } = ctx.request.body;

    if (privateKey !== "roc") {
      ctx.body = { message: "校验失败", status: -1 };
      return;
    }

    const options = Object.assign(
      {
        from: new Date() - 24 * 60 * 60 * 1000,
        until: new Date(),
        limit: 10,
        start: 0,
        order: "desc",
        // fields: ['message']
      },
      rest || {},
    );

    console.log(options, "<-- options");
    logger.query(options, function (err, results) {
      if (err) {
        ctx.body = { message: `查询失败: ${err}`, status: -1 };
        return;
      }

      console.log(results, "<-- results");
      ctx.body = { results, status: 0 };
    });
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});
