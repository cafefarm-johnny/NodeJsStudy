/* 인덱스 컨트롤러 */
exports.index = (req, res) => {
    res.render('index', { title : 'Hello, This is Index Page!' });
}