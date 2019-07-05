const Burger = require('mongoose').model('Burger');
const errorMessage = require('./errorController');

const resObject = {
    errorCode : -1,
    msg : ''
};

/**
 * 버거 메뉴 추가 요청
 * @author Johnny 
 */
exports.addMenu = (req, res, next) => {
    console.log(req.burger);
    const getBurger = {
        burgerimage : req.file.filename, 
        burgername : req.body.burgername,
        burgerprice : req.body.burgerprice, 
        burgerquantity : req.body.burgerquantity, 
        sale : req.body.sale
    };
    const burger = new Burger(getBurger);
    console.log(req.file);
    console.log(burger);

    burger.save((err) => {
        if (err)
        {
            console.error('burgerController :: addMenu :: errorCode : ' + err);
            resObject.errorCode = 1;
            resObject.msg = errorMessage.bugerErrorMessage(err);
            
            return res.json(resObject);
        }

        resObject.errorCode = 0;
        resObject.msg = '메뉴가 등록되었습니다.';
        
        res.json(resObject);
    });
}

/**
 * 버거 메뉴 목록 요청
 * @author Johnny
 */
exports.list = (req, res, next) => {
    Burger.find((err, burgers) => {
        if (err)
        {
            console.error('burgerController :: list :: errorCode : ' + error);
            resObject.errorCode = 1;
            resObject.msg = errorMessage.bugerErrorMessage(err);

            return res.json(resObject);
        }

        resObject.errorCode = 0;
        resObject.burgerList = burgers;

        res.json(resObject);
    });
}