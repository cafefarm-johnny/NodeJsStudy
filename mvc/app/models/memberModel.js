const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const memberSchema = new Schema({
    username : {
        type : String, 
        trim : true, 
        required : true, 
    }, 
    useremail : {
        type : String, 
        trim : true, 
        match : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ // 정규식 표현을 이용하여 특정 문자와 형식에 관련된 검증을 수행한다. (email 패턴의 데이터가 아닐 경우 저장을 중단한다.)
    }, 
    userid : {
        type : String, 
        trim : true, 
        required : true
    }, 
    userpwd : {
        type : String, 
        required : true, 
        validate : [
            (pwd) => {
                return pwd && pwd.length >= 8
            }, 
            '비밀번호를 8자리 이상으로 설정해주세요.'
        ]
    }, 
    salt : {
        type : String
    }, 
    provider : {
        type : String, 
        required : true,
        default: 'local'
    },
    providerId : String, 
    providerData : {

    }, 
    created : {
        type : Date, 
        default : Date.now
    }
})

/**
 * 비밀번호 해시 처리
 * @author Johnny 
 */
memberSchema.pre('save', function(next) {
    console.log('memberModel :: save() :: userpwd : ', this.userpwd)
    if (this.userpwd)
    {
        this.salt = new Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64')
        console.log('memberModel :: save() :: salt : ', this.salt)
        this.userpwd = this.hashPassword(this.userpwd)
        console.log('memberModel :: save() :: userpwd after hashsing : ', this.userpwd) 
    }
    next()
})

/**
 * 비밀번호 해시 함수
 * @author Johnny 
 * @param userpwd 비밀번호 정보 
 */
memberSchema.methods.hashPassword = function(userpwd) {
    return crypto.pbkdf2Sync(userpwd, this.salt, 10000, 64, null).toString('base64')
}

/**
 * 비밀번호 암호화 후 현재 비밀번호와 비교
 * @author Johnny
 * @param userpwd 비밀번호 정보
 */
memberSchema.methods.authenticate = function(userpwd) {
    return this.userpwd === this.hashPassword(userpwd)
}

mongoose.model('Member', memberSchema)