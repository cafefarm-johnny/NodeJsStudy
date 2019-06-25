const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String, 
    userid : {
        type : String,
        trim : true 
    }, 
    password : String, 
    email : String, 
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
    }
});

userSchema.virtual('idpass').get(function() { // id 필드와 password 필드를 하나로 합쳐 가상 필드를 표현한다. 실제 DB에는 저장되지 않으며 객체로써 필드만 추가된다.
    return this.userid + ' / ' + this.password;
    // 작업 완료 후 스키마 setter에서 JSON 컨버트 시 virtual 속성을 true로 설정해야한다.
});

userSchema.set('toJSON', { getters : true, virtual : true }); // res.json()을 사용하여 document 데이터를 출력할 때 get 옵션으로 정의한 값이 JSON에 포함되게 한다.

mongoose.model('User', userSchema);