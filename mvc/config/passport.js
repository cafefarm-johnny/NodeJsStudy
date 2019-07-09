/* passport 모듈에 대한 설정 파일 */
const passport = require('passport');
const mongoose = require('mongoose');

module.exports = () => {
    const User = mongoose.model('User');

    // 전략 객체를 생성하고 콜백 함수를 정의하며 사용한 done()이 호출될 때 최초 1회 serializeUser()가 실행된다.
    passport.serializeUser((user, done) => { // 전략을 생성하고 콜백 함수에서 정의했던 done()에서 전달한 user 객체를 인자로 받는다.
        done(null, user.id); // 세션에 user.id를 저장한다.
    });

    // 사용자가 다른 페이지를 접속할 때 마다 deserializeUser()를 호출한다.
    passport.deserializeUser((id, done) => { // 세션에 저장한 user.id 정보를 id인자로 받는다.
        // id를 이용해 mongoDB에 사용자를 조회한다.
        User.findOne({ _id : id }, '-password -salt', (err, user) => { // mongoose가 password와 salt 필드를 가져오지 않게 필드 옵션을 설정한다.
            done(err, user); // 조회한 사용자 정보를 req객체에 user라는 속성으로 채운다.
        });
    });

    require('./passport/strategies/local')();


    const Member = mongoose.model('Member')
    passport.serializeUser((member, done) => {
        done(null, member.username)
    })

    passport.deserializeUser((username, done) => {
        const query = { username : username }
        Member.findOne(query, '-password -salt', (err, member) => {
            done(err, member)
        })
    })

    require('./passport/strategies/local')()
}