// express 모듈을 불러와 객체를 app상수에 초기화한다.
const express = require('express');
const app = express();

// 정적 파일이 위치할 디렉토리를 지정하는 기능
app.use(express.static('sources'));

// GET방식으로 localhost:3000/ URL로 들어오는 경우 익명함수를 연결한다.
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// use()로 설정한 정적자원 디렉토리에서 그림 파일을 꺼내쓴다.
app.get('/staticStudy', (req, res) => {
    res.send(`Static load test, <br><img src="/img/yhj.jpg">`);
});

app.listen(3000, () => {
    console.log('This app listening on port 3000!');
});