import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import winston from 'winston';

const { format, createLogger } = winston;
const { combine, timestamp, label, printf } = format;
const app = new Koa();

var router = new Router();
app.use(bodyParser());

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'Police' }),
    timestamp(),
    myFormat
  ),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/log/error', (ctx, next) => {
    console.log(ctx.request.body);
    const { message } = ctx.request.body;

    if (!message) {
      ctx.body = { message: '缺少message', status: -1 };
      return;
    }

    logger.log({
      level: 'error',
      message,
    });

    ctx.body = { message: 'ok', status: 0 };
  })
  .post('/log/info', (ctx, next) => {
    console.log(ctx.request.body);

    logger.log({
      level: 'info',
      message: `Hello distributed log files ${ctx.request.body.test}!`
    });

    // logger.info('Hello again distributed logs');

    // handle your post request here
    ctx.body = {
      test: 900,
    };
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(6001);