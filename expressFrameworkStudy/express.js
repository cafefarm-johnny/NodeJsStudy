// express 모듈을 불러와 객체를 app상수에 초기화한다.
const express = require('express');
const app = express();

// GET방식으로 localhost:3000/ URL로 들어오는 경우 익명함수를 연결한다.
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('This app listening on port 3000!');
})