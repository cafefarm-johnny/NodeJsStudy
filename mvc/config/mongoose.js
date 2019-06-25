/* mongoose 설정 파일 */
const config = require('./config'), 
    mongoose = require('mongoose');

module.exports = () => {
    const db = mongoose.connect(config.db); // config(development.js)에 정의한 db 커넥션 정보를 불러와 연결한다.

    return db; // 연결한 db 객체를 리턴한다.
}