import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

const app = new Koa();

var router = new Router();
app.use(bodyParser());

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    console.log(ctx.request.body);

    // handle your post request here
    ctx.body = {
      test: 900,
    };
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(6001);