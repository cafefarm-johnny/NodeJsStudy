const burger = require('../controllers/burgerController')

module.exports = (app, upload) => {

    /**
     * 버거 메뉴 추가 요청
     * * multer를 이용해 파일을 처리하려면 컨트롤러 전에 먼저 multer로 파일을 처리해야한다.
     * * 이후 컨트롤러의 req객체에서 사용한다.
     * * multer가 파일 정보를 처리(single(''))한 후 파일이 아닌 데이터는 req.body에 자동으로 담아준다.
     * @author Johnny
     * @param burgerImage 버거 사진 파일 정보
     */
    app.route('/api/burger/add')
    .post(upload.single('burgerimage'), burger.addMenu)

    /** 
     * 모든 버거 메뉴 목록 요청
     * * 미판매 상태를 포함하는 모든 버거 메뉴 목록을 조회한다.
     * @author Johnny
     */
    app.route('/api/burger/list/all')
    .get(burger.listAll)

    /**
     * 버거 메뉴 목록 요청
     * * 판매 상태의 메뉴 목록을 조회한다.
     * @author Johnny
     */
    app.route('/api/burger/list')
    .get(burger.list)
    
    /**
     * 버거 메뉴 상태 변경 요청
     * @author Johnny
     */
    app.route('/api/burger/stateChange')
    .put(burger.stateChange)
    
    /**
     * 버거 메뉴 삭제 요청
     * @author Johnny
     */
    app.route('/api/burger/delete/:burgername')
    .delete(burger.deleteMenu)
}
