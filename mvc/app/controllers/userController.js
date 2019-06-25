/* 사용자 기능 관련 컨트롤러 */
const User = require('mongoose').model('User'); // mongoose 모듈을 사용해 정의한 User 모델을 불러온다.

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