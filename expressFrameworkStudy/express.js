const express = require('express'); // express 모듈을 불러와 객체를 app상수에 초기화한다.
const path = require('path');
const bodyParser = require('body-parser'); // request 객체의 body 속성을 정의하기 위해 body-parser 모듈을 초기화한다.
const { Pool, Client } = require('pg'); // PostgreSQL DB 인터페이스 모듈을 초기화한다.
const pool = new Pool({ 
    host: 'localhost', 
    port: '5432', 
    database: 'postgres', 
    user: 'npcdja', 
    password: '1234'
}); // 커넥션 풀 객체를 생성한다.

pool.query('SELECT now()', (err, res) => { // DB로 쿼리를 전송하여 결과를 얻는다.
    console.log(err, res);
    pool.end(); // 풀을 닫는다.
});

/* 
    웹 응용 프로그램이나 기타소프트웨어로 작업하는 경우 connection pool을 사용하는 것이 좋다.
    1. 그 이유는 새 클라이언트 객체를 PostgreSQL DB 서버에 연결하려면 20~30 밀리초가 걸릴 수 있는 핸드 쉐이크 과정이 필요해진다.
    SSL 설정이나 암호화 등의 정보를 클라이언트 객체와 공유하는데, 쿼리를 실행할 때 마다 이러한 작업이 실행되므로 비용이 발생하며 프로그램이 느려지게 된다.
    2. PostgreSQL 서버는 한 번에 제한된 수의 클라이언트만 연결을 허용하고 처리할 수 있다. 
    PostgreSQL 서버의 사용 가능한 메모리에 따라 무한대의 클라이언트를 연결하는 경우에 서버가 손상될 수 있다.
    3. PostgreSQL은 단일 클라이언트에서 한 번에 하나의 쿼리만 선입력, 선출력하는 방식으로 처리한다.
*/

// const pgClient = new Client({
//     host: 'localhost', 
//     port: '5432', 
//     database: 'postgres', 
//     user: 'npcdja', 
//     password: '1234'
// }); // pgClient 객체를 생성한다.

// pgClient.connect(); // DB와 연결한다.

// pgClient.query('SELECT now()', (err, res) => { // DB로 쿼리를 전송하여 결과를 얻는다.
//     console.log(err, res);
//     pgClient.end(); // pgClient 세션을 닫아준다. 
// });

const app = express();

app.use(express.static('sources')); // 정적 파일이 위치할 디렉토리를 지정하는 기능
app.use(require('connect-history-api-fallback')()); // VueJs와 연동하는 모듈 사용 설정
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded 파싱 정의 설정
app.use(bodyParser.json()); // application/json 파싱 정의 설정

// GET방식으로 localhost:3000/ URL로 들어오는 경우 익명함수를 연결한다.
// 요청이 들어오면 sources 폴더의 index.html를 반환한다.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './sources', 'index.html'));
});

// use()로 설정한 정적자원 디렉토리에서 그림 파일을 꺼내쓴다.
app.get('/staticStudy', (req, res) => {
    res.send(`Static load test, <br><img src="/img/yhj.jpg">`);
});

app.listen(3000, () => {
    console.log('This app listening on port 3000!');
});