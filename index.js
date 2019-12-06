const Koa = require('koa');
const Router = require('koa-router');
const TuringRobot = require('./turing');


const app = new Koa();
const router = new Router();


router.get('/anytalkrobot/turing', async (ctx, next) => {
    const { words } = ctx.request.query;
    try {
        const answer = await TuringRobot(words);
        console.log('input words : ', words);
        ctx.type = 'text/json';
        ctx.body = { answer };
    } catch (e) {
        console.warn(e);
    }
});

app.use(router.routes())
    .use(router.allowedMethods());;

app.listen(3000);