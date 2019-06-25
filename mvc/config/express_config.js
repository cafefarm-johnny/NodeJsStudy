/* express 프레임워크에 대한 설정 및 구성 파일 */

const express = require('express'); // express 모듈 로드
const morgan = require('morgan'); // 로거 미들웨어 모듈 로드
const compress = require('compression'); // 응답(response) 압축 지원 모듈 로드
const bodyParser = require('body-parser'); // 요청(request) 데이터(body) 처리 모듈 로드
const methodOverride = require('method-override'); // DELETE, PUT HTTP 동사 지원 모듈 로드

module.exports = () => {
    const app = express();

    if (process.env.NODE_ENV === 'development') 
    {
        app.use(morgan('dev')); // 개발 환경이면 로거를 활성화
    } 
    else if (process.env.NODE_ENV === 'production') 
    {
        app.use(compress()); // 배포 환경이면 압축을 활성화
    }

    app.use(bodyParser.urlencoded({ extended: true })); // FormData 데이터 형식 처리 지원 설정
    app.use(bodyParser.json()); // JSON 데이터 형식 처리 지원 설정
    app.use(methodOverride()); // HTTP 동사 지원 설정

    app.set('views', './app/views'); // view 디렉토리 설정
    app.set('view engine', 'pug'); // view Template engine 설정

    require('../app/routes/indexRouter')(app); // indexRouter로 app을 리턴
    return app;
}