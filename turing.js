const http = require('axios');
const config = require('./config');

function getTuringResponse(info) {
    if (!info) {
        info = ''
    }
    if (typeof info !== 'string') {
        info = info.toString();
    }
    var options = {
        method: 'post',
        url: `http://openapi.tuling123.com/openapi/api/v2`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            reqType: 0,
            perception: {
                inputText: {
                    text: info
                }
            },
            userInfo: {
                apiKey: config.turingKey,
                userId: 'empty_'
            }
        }
    };
    return new Promise((resolve, reject) => {
        http(options).then(({ data: { intent: { code }, results } }) => {
            if (code === 4003) {
                resolve('主人封嘴了！！');
            } else if (code !== 10005) {
                reject();
            } else {
                if (results.length && results[0].groupType === 0) {
                    resolve(results[0].values.text);
                }
            }
        })
    })
}

module.exports = getTuringResponse;