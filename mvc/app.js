process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express_config');
const mongoose = require('./config/mongoose');
const passport = require('./config/passport');

const db = mongoose();
const app = express();
const auth = passport();

app.listen(3000, () => { // 3000번 포트로 서버 생성
    console.log('MVC app listening on 3000 port!');
});
