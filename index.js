const Koa = require('koa');
const Router = require('koa-router');
const TuringRobot = require('./turing');


const app = new Koa();
const router = new Router();


router.get('/anytalkrobot/turing', async (ctx, next) => {
    const { words } = ctx.request.query;
    ctx.type = 'text/json';
    try {
        const answer = await TuringRobot(words);
        console.log('input words : ', words);
        ctx.body = { answer };
    } catch (e) {
        ctx.body = { answer: '没有听懂。。。', error: e };
    }
});

app.use(router.routes())
    .use(router.allowedMethods());;

app.listen(3001);