/* mongoose 설정 파일 */
const config = require('./config'), 
    mongoose = require('mongoose')

mongoose.set('useCreateIndex', true) // DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 경고 무시 설정

module.exports = () => {
    const db = mongoose.connect(config.db, { useNewUrlParser: true }) // config(development.js)에 정의한 db 커넥션 정보를 불러와 연결한다.

    require('../app/models/userModel') // 정의한 User 모델(스키마)를 등록한다.
    require('../app/models/burgerModel')
    require('../app/models/memberModel')
    return db // 연결한 db 객체를 리턴한다.
}