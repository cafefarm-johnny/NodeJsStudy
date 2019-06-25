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

    // 정적 파일 설정이 라우팅 파일 호출 전에 있을 경우, 
    // express는 HTTP 요청 경로를 찾기 위해 정적 폴더를 먼저 찾게 된다.
    // 이는 애플리케이션의 응답 속도를 느리게 만드는 문제로 이어지기 때문에
    // 반드시 라우팅 호출 밑에 작성하자.
    app.use(express.static('./public')); // 정적 파일 경로 설정
    return app;
}