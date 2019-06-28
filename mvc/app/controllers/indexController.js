/* 인덱스 컨트롤러 */
const path = require('path');

exports.index = (req, res) => {
    // if (req.session.lastVisit)
    // {
    //     console.log(`lastVisit : ${req.session.lastVisit}`);
    // }

    // const time = new Date();
    // req.session.lastVisit = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} .. ${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;

    // res.render('index', { title : 'Hello, This is Index Page!' });

    res.sendFile(path.join(__dirname, '../public', 'index.html'));
}