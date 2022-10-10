import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import winston from 'winston';
import cors from '@koa/cors';
import 'winston-daily-rotate-file';

const { format, createLogger } = winston;
const { combine, timestamp, label, printf } = format;
const app = new Koa();

var router = new Router();
app.use(bodyParser());
app.use(cors());

const parseMsg = (str = '', message) => {
  if (typeof message === 'string') {
    str += message;
    return str;
  }

  if (Array.isArray(message)) {
    const len = message.length - 1;
    message.forEach(
      (item, index) =>
        (str = `${parseMsg(str, item)}${
          index !== len
            ? `
    =========`
            : ''
        }`)
    );
    return str;
  }

  for (let key in message) {
    str += `
    ${key}: ${message[key]}`;
  }

  return str;
};

const myFormat = printf(({ level, message, timestamp, meta }) => {
  let str = `${new Date(timestamp).toLocaleString()} [${meta.label || 'Police'}] ${level}:`;

  str = parseMsg(str, message);
  return str;
});

var transportInfo = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: './logs/info/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  json: true,
});

var transportError = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: './logs/error/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  json: true,
});

transportInfo.on('rotate', function (oldFilename, newFilename) {
  // do something fun
  console.log(oldFilename, newFilename, '<-- transportInfo newFilename');
});

transportError.on('rotate', function (oldFilename, newFilename) {
  // do something fun
  console.log(oldFilename, newFilename, '<-- transportError newFilename');
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [transportInfo, transportError],
});

router
  .post('/log', (ctx, next) => {
    console.log(ctx.request.body);
    const { message, level, label } = ctx.request.body;

    if (!message) {
      ctx.body = { message: '缺少message', status: -1 };
      return;
    }

    if (!level) {
      ctx.body = { message: '缺少level', status: -1 };
      return;
    }

    logger.log({
      level,
      message,
      meta: { label },
    });

    ctx.body = { message: 'ok', status: 0 };
  })
  .post('/log/query', (ctx, next) => {
    const { privateKey, ...rest } = ctx.request.body;

    if (privateKey !== 'roc') {
      ctx.body = { message: '校验失败', status: -1 };
      return;
    }

    const options = Object.assign(
      {
        from: new Date() - 24 * 60 * 60 * 1000,
        until: new Date(),
        limit: 10,
        start: 0,
        order: 'desc',
        // fields: ['message']
      },
      rest || {}
    );

    console.log(options, '<-- options');
    logger.query(options, function (err, results) {
      if (err) {
        ctx.body = { message: `查询失败: ${err}`, status: -1 };
        return;
      }

      console.log(results, '<-- results');
      ctx.body = { results, status: 0 };
    });
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.port || 6001);
