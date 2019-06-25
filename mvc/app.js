process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express_config');
const app = express();

app.listen(3000, () => { // 3000번 포트로 서버 생성
    console.log('MVC app listening on 3000 port!');
});

module.exports = app; // app을 모듈화하여 내보낸다