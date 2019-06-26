/* passport local 전략 설정 파일 */
const passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy, 
    User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new LocalStrategy((username, password, done) => { // 로컬 전략 생성
        console.log('local :: new LocalStrategy() :: userid : ' + username);
        User.findOne({ userid : username }, (err, user) => { // userid를 기준으로 mongoDB에서 찾는다.
            if (err) 
            {
                return done(err);
            }
            
            if (!user) // user 객체가 존재하지 않는 경우
            {
                return done(null, false, { message : 'Unknown user' });
            }

            if (!user.authenticate(password)) // user 객체의 password가 불일치하는 경우
            {
                return done(null, false, { message : 'Invalid password' });
            }

            return done(null, user);
        });
    }));
}