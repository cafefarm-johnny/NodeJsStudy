/* 인덱스 라우터 */
module.exports = (app) => {
    const indexController = require('../controllers/indexController');
    app.get('/', indexController.index);
}