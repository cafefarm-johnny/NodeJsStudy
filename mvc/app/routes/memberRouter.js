const memberController = require('../controllers/memberController')

module.exports = (app) => {

    app.route('/api/member/signup')
    .post(memberController.signup)
}