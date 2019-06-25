/* 개발 환경 구성 파일 */

module.exports = {
    sessionSecret : 'ThisisSessionSecretCode', // express-session이 세션 식별자를 서명할 때 사용하는 비밀 코드값
    db : 'mongodb://localhost/testdb' // mongoDB 커넥션 정보 정의
}