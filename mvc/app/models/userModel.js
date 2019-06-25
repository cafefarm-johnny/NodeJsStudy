const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username : { 
        type : String, 
        trim : true, // trim 작동 설정 (데이터 insert 전 trim처리를 한다.)
        unique : true, // RDBMS의 primary key 옵션과 비슷한 기능을 한다. 이는 모델에 색인기능을 추가하는 옵션이다.
        required : true // 데이터 유무 검증 옵션이다. (데이터 insert 전 검증을 수행한다.)
    },
    userid : {
        type : String,
        trim : true 
    }, 
    password : { 
        type : String, 
        required : true, 
        validate : [ // 콜백함수를 이용한 검증 방법이다.
            (password) => { // 입력받은 값을 인자로 받는다.
                return password.length >= 8;
            }, 
            'Please password should be 8 more then longer.' // 콜백함수의 return이 false인 경우 메시지가 전달된다.
        ]
    }, 
    email : { 
        type : String, 
        index : true, // 보조 색인 기능인 index를 설정한다.
        match : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/ // 정규식 표현을 이용하여 특정 문자와 형식에 관련된 검증을 수행한다. (email 패턴의 데이터가 아닐 경우 저장을 중단한다.)
    }, 
    created : {
        type : Date, 
        default : Date.now
    }, 
    website : {
        type : String, 
        // setter를 이용해 기존 데이터들이 질의시점에 website 필드를 생성하는 것은 심각한 성능 저하를 일으킨다.
        // set : (url) => {
        //     if (!url)
        //     {
        //         return url;
        //     }
        //     else
        //     {
        //         if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) // url에 http://와 https://를 자동으로 붙어서 들어가도록 설정
        //         {
        //             url = 'http://' + url;
        //         }

        //         return url;
        //     }
        // }
        get : (url) => { // website 속성이 정의된 데이터들만 호출한다.
            if (!url) 
            {
                return url;
            }
            else
            {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0)
                {
                    url = 'http://' + url;
                }

                return url;
            }
        }
    }, 
    role : {
        type : String, 
        enum : ['Admin', 'User'] // enum 타입으로 열거형 검증한다. 이 외에 데이터가 들어오는 경우 저장하지 않는다.
    }
});

userSchema.virtual('idpass').get(function() { // id 필드와 password 필드를 하나로 합쳐 가상 필드를 표현한다. 실제 DB에는 저장되지 않으며 객체로써 필드만 추가된다.
    return this.userid + ' / ' + this.password;
    // 작업 완료 후 스키마 setter에서 JSON 컨버트 시 virtual 속성을 true로 설정해야한다.
});

userSchema.set('toJSON', { getters : true, virtual : true }); // res.json()을 사용하여 document 데이터를 출력할 때 get 옵션으로 정의한 값이 JSON에 포함되게 한다.

mongoose.model('User', userSchema);