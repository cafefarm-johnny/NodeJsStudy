const Burger = require('mongoose').model('Burger')
const errorMessage = require('./errorController')

const resObject = {
    errorCode : -1,
    msg : ''
}

/**
 * 버거 메뉴 추가 요청
 * @author Johnny 
 * @param filename 이미지 파일 명 string
 * @param burgername 버거 이름 string
 * @param burgerprice 버거가격 number 
 * @param burgerquantity 버거 수량 number
 * @param sale 판매 상태 boolean false: 미판매, true: 판매
 */
exports.addMenu = (req, res, next) => {
    console.log(req.burger)
    const getBurger = {
        burgerimage : req.file.filename, 
        burgername : req.body.burgername,
        burgerprice : req.body.burgerprice, 
        burgerquantity : req.body.burgerquantity, 
        sale : req.body.sale
    }
    const burger = new Burger(getBurger)
    console.log(req.file)
    console.log(burger)

    burger.save((err) => {
        if (err)
        {
            console.error('burgerController :: addMenu :: errorCode : ' + err)
            resObject.errorCode = 1
            resObject.msg = errorMessage.burgerErrorMessage(err)
            
            return res.json(resObject)
        }

        resObject.errorCode = 0
        resObject.msg = '메뉴가 등록되었습니다.'
        
        res.json(resObject)
    })
}

/**
 * 버거 메뉴 목록 요청
 * @author Johnny
 */
exports.list = (req, res, next) => {
    Burger.find((err, burgers) => {
        if (err)
        {
            console.error('burgerController :: list :: errorCode : ' + error)
            resObject.errorCode = 1
            resObject.msg = errorMessage.burgerErrorMessage(err)

            return res.json(resObject)
        }

        resObject.errorCode = 0
        resObject.burgerList = burgers

        res.json(resObject)
    })
}

/**
 * 버거 메뉴 상태 변경 요청
 * @author Johnny
 * @param burgername 버거 이름 string
 * @param sale 판매 상태 boolean false: 미 판매, true: 판매
 */
exports.stateChange = (req, res, next) => {
    console.log('burgerController :: stateChange :: START =============')
    const query = { burgername : req.body.burgername }
    const updateArg = { sale : req.body.sale }

    console.log('burgerController :: stateChange :: updateArg : ', updateArg)
    console.log('burgerController :: stateChange :: typeof updateArg', typeof updateArg)
    if (typeof updateArg.sale === 'boolean')
    {
        Burger.findOneAndUpdate(query, updateArg, (err, burger) => {
            if (err)
            {
                console.error('burgerController :: stateChange :: errorCode : ', err)
                resObject.errorCode = 1
                resObject.msg = errorMessage.burgerErrorMessage(err)
                return res.json(resObject)
            }

            console.log('burgerController :: stateChange :: burger : ', burger)
            resObject.errorCode = 0
            res.json(resObject)
        })
    }
    else
    {
        resObject.errorCode = 2
        resObject.msg = '잘못된 접근입니다.'
        res.json(resObject)
    }
    console.log('burgerController :: stateChange :: END =============')
}