/* 사용자 기능 관련 컨트롤러 */
const User = require('mongoose').model('User'); // mongoose 모듈을 사용해 정의한 User 모델을 불러온다.
const passport = require('passport'); // passport 모듈을 불러온다.

const errorMessage = (err) => { // mongoose error 객체에서 통합된 오류 메시지를 반환하는 비공개 메소드
    let message = '';

    if (err.code) // mongoDB에서 에러코드를 반환하는 경우
    {
        switch (err.code) 
        {
            case 11000 : 
            case 11001 : 
                message = 'UserID already exists';
                break;
            default : 
                message = 'Something went Wrong';
                break;
        }
    }
    else // 내가 직접 만든 mongoose 검증 오류
    {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
            {
                message = err.errors[errName].message;
            }
        }
    }

    return message;
}

exports.renderSignin = (req, res, next) => { // 로그인 폼 렌더링 컨트롤러 메소드
    if (!req.user) 
    {
        res.render('signin', { title : 'Sign-in Form', messages : req.flash('error') || req.flash('info') });
    }
    else
    {
        return res.redirect('/');
    }
}

exports.renderSignup = (req, res, next) => { // 회원가입 폼 렌더링 컨트롤러 메소드
    if (!req.user)
    {
        res.render('signup', { title : 'Sign-up Form', messages : req.flash('error') });
    }
    else
    {
        return res.redirect('/');
    }
}

exports.signup = (req, res, next) => { // 회원가입 컨트롤러 메소드
    if (!req.user) 
    {
        console.log('userController :: signup() :: req.body : ' + req.body);
        const user = new User(req.body);
        let message = null;

        user.provider = 'local';

        user.save((err) => { // 사용자 정보 저장
            console.log('userController :: signup() :: start new user information save method.');
            if (err)
            {
                console.error('userController :: signup() :: errorCode : ' + err);
                message = errorMessage(err);
                console.error('userController :: signup() :: errorMessage : ' + message);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, (err) => { // passport가 정의한 req 객체의 login() 메소드
                if (err) 
                {
                    return next(err);
                }

                console.log('userController :: signup() :: login user : ' + user);
                return res.redirect('/');
            });
        });
    }
    else
    {
        return res.redirect('/');
    }
}

exports.signout = (req, res) => { // 로그아웃 컨트롤러 메소드
    req.logout(); // passport가 정의한 req객체의 logout() 메소드
    res.redirect('/');
}










/* mongoose를 이용한 mongoDB 테스트 */
exports.create = (req, res, next) => { // create이라는 컨트롤러 메소드를 만든다.
    const user = new User(req.body); // User에 정의된스키마에 맞춘 새로운 document 형식을 만들고 request.body를 담는다.

    user.save((err) => { // save명령어를 이용해 저장한다.
        if (err) 
        {
            return next(err); // error가 발생한다면 next(err)로 오류를 다음 미들웨어로 넘긴다.
        }
        else
        {
            res.json(user); // 에러가 없는 경우 저장된 데이터를 json 방식으로 응답해준다.
        }
    });
}


exports.list = (req, res, next) => { // list라는 컨트롤러 메소드를 만든다.
    User.find((err, users) => { // User 인스턴스의 find 메소드를 사용해 데이터를 조회한다.
        if (err) 
        {
            return next(err);
        }
        else 
        {
            res.json(users);
        }
    });
}

exports.read = (req, res) => {
    console.log(`req: ${req.user}`);
    res.json(req.user);
}

exports.userByID = (req, res, next, id) => { // _id로 찾는 컨트롤러 메소드를 만든다.
    User.findOne({ _id : id }, (err, user) => { // findOne은 부분 집합의 첫 document만 출력한다.
        if (err) 
        {
            return next(err);
        }
        else
        {
            req.user = user; // 데이터를 찾아와서 req.user에 반영하고 next()를 한다.
            next(); // next()가 호출하는 다음 메소드는 read()가 될 것이다.
        }
    });
}

exports.update = (req, res, next) => { // update 컨트롤러 메소드를 만든다.
    // find 할 인자, 갱신 할 인자, 콜백함수
    User.findByIdAndUpdate(req.user.id, req.body, (err, user) => { // _id를 기준으로 User 데이터를 찾고 수정하는 메소드를 정의한다.
        if (err)
        {
            return next(err);
        }
        else
        {
            res.json(user);
        }
    });
}

exports.delete = (req, res, next) => { // delete 컨트롤러 메소드를 만든다.
    User.remove((err) => {
        if (err) 
        {
            return next(err);
        }
        else
        {
            res.json(req.user);
        }
    });
}