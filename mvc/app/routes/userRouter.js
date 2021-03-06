/* 사용자 기능 관련 라우터 */
const users = require('../../app/controllers/userController');
const passport = require('passport');

module.exports = (app) => {

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', { successRedirect : '/', failureRedirect : '/signin', failureMessage : true }));
        // ('인증전략', '옵션' : { successRedirect : '성공 시 리다이렉트', failureRedirect : '실패 시 리다이렉트', failureFlash : 'flash 메시지 사용 여부' })

    app.route('/signout')
        .get(users.signout);
    
    /* mongoDB 테스트 라우트 */
    app.route('/users')
        .post(users.create) // /users로 POST 요청이 들어오면 users.create을 연결한다.
        .get(users.list); // /users로 GET 요청이 들어오면 users.list를 연결한다.

    app.route('/users/:userId') // queryString에서 매개변수로 userId를 받는다.
        .get(users.read) // param() 메소드로 users.userByID가 수행되고 난 후 users.read가 수행된다.
        .put(users.update)  // /users/:userId로 PUT 요청이 들어오면 users.update를 연결한다.
        .delete(users.delete); // /users:userId로 DELETE 요청이 들어오면 users.delete를 연결한다.

    app.param('userId', users.userByID); // 다른 미들웨어 라우팅(users.read)이 수행되기 전 해당 메소드로 queryString 파라미터 중 userId를 users.userByID에 넘긴다.
}