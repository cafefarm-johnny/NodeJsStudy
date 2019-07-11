const memberController = require('../controllers/memberController')

module.exports = (app) => {

    /**
     * 회원가입 라우트
     * @author Johnny
     */
    app.route('/api/member/signup')
    .post(memberController.signup)

    /**
     * 로그인 라우트
     * @author Johnny
     */
    app.route('/api/member/signin')
    .post(memberController.signin)

    /**
     * 로그아웃 라우트
     * @author Johnny
     */
    app.route('/api/member/signout')
    .get(memberController.signout)
}