const Member = require('mongoose').model('Member')
const errorMessage = require('./errorController')
const crypto = require('crypto')

const resObject = {
    errorCode : -1,
    msg : ''
}

/**
 * 회원가입 요청 처리
 * @author Johnny
 * @param req.body 
 * {
 *      username: 사용자 이름, 
 *      useremail: 사용자 이메일, 
 *      userid: 사용자 아이디, 
 *      userpwd: 사용자 비밀번호
 * }
 * @returns 
 * {
 *      errorCode: 처리 결과 코드, 
 *      msg: 처리 결과 메시지, 
 *      user: {
 *          _id: 사용자 고유 번호, 
 *          username: 사용자 이름, 
 *          useremail: 사용자 이메일, 
 *          userid: 사용자 아이디
 *      }
 * }
 */
exports.signup = (req, res, next) => {
    console.log('memberController :: signup :: START ====================')
    const member = new Member(req.body)

    // 데이터 검증
    if (member === null || member === {} || 
        member.username.length <= 0 || 
        member.useremail.length <= 0 || 
        member.userid.length <= 0 || 
        member.userpwd.length <= 0)
    {
        resObject.errorCode = 1
        resObject.msg = errorMessage.dataEmptyErrorMessage()
        return res.json(resObject)
    }

    console.log('memberController :: signup :: member : ', member)
    // 사용자 정보 insert 처리
    member.save((err) => {
        if (err)
        {
            console.error('memberController :: signup :: err : ', err)
            resObject.errorCode = 2
            resObject.msg = errorMessage.mongoErrorMessage(err, 'member')
            return res.json(resObject)
        }
    })
    
    // 로그인 처리
    req.login(member, (err) => {
        if (err)
        {
            return next(err)
        }

        console.log('memberController :: signup :: login member : ', member)
    })

    resObject.errorCode = 0
    resObject.msg = '축하합니다! \n회원가입이 완료 되었습니다.'
    resObject.user = {
        _id : member._id, 
        username : member.username, 
        useremail : member.useremail, 
        userid : member.userid
    }
    res.json(resObject)

    console.log('memberController :: signup :: END ====================')
}

/**
 * 로그인 요청 처리
 * @author Johnny
 * @param req.body.userid 사용자 아이디
 * @param req.body.userpwd 사용자 패스워드
 */
exports.signin = (req, res, next) => {
    console.log('memberController :: signin :: START ====================')
    
    // query 데이터 검증하기
    const query = { 
        userid: req.body.userid, 
        userpwd: req.body.userpwd
    }
    console.log('memberController :: signin :: query : ', query)

    Member.findOne(query, (err, member) => {
        if (err)
        {
            console.error('memberController :: signin :: errorCode : ', err)
            resObject.errorCode = 1
            resObject.msg = errorMessage.mongoErrorMessage(err)
        }

        console.log('memberController :: signin :: member : ', member)
        // salt값을 구해서 hashPassword(query.userpwd) 후 해싱된 패스워드와 비교 후 아래 로직 수행

        if (member)
        {
            req.login(member, (err) => {
                if (err)
                {
                    return next(err)
                }
    
                console.log('memberController :: signin :: login member : ', member)
            })
    
            resObject.errorCode = 0
            resObject.user = {
                _id : member._id, 
                username : member.username, 
                useremail : member.useremail, 
                userid : member.userid
            }
            
            return res.json(resObject)
        }

        resObject.errorCode = 2
        resObject.msg = '존재하지 않는 사용자입니다.'
        res.json(resObject)
    })

    // const member = new Member()
    // member.hashPassword(query.userpwd)
    
    console.log('memberController :: signin :: END ====================')
}

/**
 * 로그아웃 요청 처리
 * @author Johnny 
 * @returns 
 * {
 *  errorCode: 처리 결과 코드
 * }
 */
exports.signout = (req, res, next) => {
    console.log('memberController :: signout :: START ====================')
    req.logout()

    resObject.errorCode = 0
    res.json(resObject)
    console.log('memberController :: signout :: END ====================')
}


function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, null).toString('base64')
}