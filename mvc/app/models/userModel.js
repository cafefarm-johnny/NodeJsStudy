/* user 모델 */
const mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    crypto = require('crypto');

const userSchema = new Schema({
    username : { 
        type : String, 
        trim : true // trim 작동 설정 (데이터 insert 전 trim처리를 한다.)
    },
    userid : {
        type : String,
        trim : true, 
        unique : true, // RDBMS의 primary key 옵션과 비슷한 기능을 한다. 이는 모델에 색인기능을 추가하는 옵션이다.
        required : 'Username is required.' //true // 데이터 유무 검증 옵션이다. (데이터 insert 전 검증을 수행한다.)
    }, 
    password : { 
        type : String, 
        required : true, 
        validate : [ // 콜백함수를 이용한 검증 방법이다.
            (password) => { // 입력받은 값을 인자로 받는다.
                return password && password.length >= 8;
            }, 
            'Please password should be 8 more then longer.' // 콜백함수의 return이 false인 경우 메시지가 전달된다.
        ]
    }, 
    salt : { // password를 해시하기 위한 필드
        type : String
    },
    provider : { // 사용자 등록을 위한 전략 필드
        type : String, 
        required : 'Provider is required.'
    },
    providerId : String, // 인증전략을 위한 식별자 전략 필드
    providerData : {}, // OAuth 공급자로부터 받은 사용자 객체를 저장하기 위한 필드
    email : { 
        type : String, 
        index : true, // 보조 색인 기능인 index를 설정한다.
        match : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/ // 정규식 표현을 이용하여 특정 문자와 형식에 관련된 검증을 수행한다. (email 패턴의 데이터가 아닐 경우 저장을 중단한다.)
    }, 
    created : {
        type : Date, 
        default : Date.now
    }, 
    // website : {
    //     type : String, 
    //     // setter를 이용해 기존 데이터들이 질의시점에 website 필드를 생성하는 것은 심각한 성능 저하를 일으킨다.
    //     // set : (url) => {
    //     //     if (!url)
    //     //     {
    //     //         return url;
    //     //     }
    //     //     else
    //     //     {
    //     //         if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) // url에 http://와 https://를 자동으로 붙어서 들어가도록 설정
    //     //         {
    //     //             url = 'http://' + url;
    //     //         }

    //     //         return url;
    //     //     }
    //     // }
    //     get : (url) => { // website 속성이 정의된 데이터들만 호출한다.
    //         if (!url) 
    //         {
    //             return url;
    //         }
    //         else
    //         {
    //             if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0)
    //             {
    //                 url = 'http://' + url;
    //             }

    //             return url;
    //         }
    //     }
    // }, 
    // role : {
    //     type : String, 
    //     enum : ['Admin', 'User'] // enum 타입으로 열거형 검증한다. 이 외에 데이터가 들어오는 경우 저장하지 않는다.
    // }
});

// 비밀번호 해시를 위한 미들웨어
userSchema.pre('save', function(next) { // 데이터 저장(insert = save)하기 전 수행되는 미들웨어 함수
    console.log('userModel :: save() :: this.password : ' + this.password);
    if (this.password) 
    {
        this.salt = new Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64'); // 자동으로 생성된 가상 난수 해시 salt를 만든다.
        console.log('userModel :: save() :: this.salt : ' + this.salt);
        this.password = this.hashPassword(this.password); // 사용자 비밀번호를 암호화 된 패스워드로 치환한다.
        console.log('userModel :: save() :: this.password after hashing : ' + this.password)
    }
    next();
});

// 사용자 비밀번호를 암호화하기 위한 함수
userSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, null).toString('base64'); // Node.js의 crypto 모듈을 사용하여 pbkdf2 방식으로 암호화한다.
}

// 사용자 비밀번호를 암호화하고 현재 사용자의 비밀번호와 비교하는 함수
userSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
}

// 중복 사용자 아이디 검증 함수 (OAuth에서 사용함)
userSchema.static.findUniqueUserid = function(userid, suffix, callback) {
    const _this = this;
    const possibleUserid = userid + (suffix || '');

    _this.findOne({ userid : possibleUserid }, (err, user) => {
        if (!err)
        {
            if (!user)
            {
                callback(possibleUserid);
            }
            else
            {
                return _this.findUniqueUserid(userid, (suffix || 0) + 1, callback);
            }
        }
        else
        {
            callback(null);
        }
    });
}

userSchema.virtual('idpass').get(function() { // id 필드와 password 필드를 하나로 합쳐 가상 필드를 표현한다. 실제 DB에는 저장되지 않으며 객체로써 필드만 추가된다.
    return this.userid + ' / ' + this.password;
    // 작업 완료 후 스키마 setter에서 JSON 컨버트 시 virtual 속성을 true로 설정해야한다.
});

userSchema.set('toJSON', { getters : true, virtual : true }); // res.json()을 사용하여 document 데이터를 출력할 때 get 옵션으로 정의한 값이 JSON에 포함되게 한다.

mongoose.model('User', userSchema);