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
 * @returns { errorCode : 처리 결과 코드, msg : 처리 결과 메시지 }
 */
exports.addMenu = (req, res, next) => {
    console.log('burgerController :: addMenu :: START ====================')
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
            resObject.msg = errorMessage.mongoErrorMessage(err, 'burger')
            
            return res.json(resObject)
        }

        resObject.errorCode = 0
        resObject.msg = '메뉴가 등록되었습니다.'
        
        res.json(resObject)
    })
    console.log('burgerController :: addMenu :: END ====================')
}

/**
 * 버거 메뉴 목록 요청
 * * 미판매 상태의 메뉴도 포함하여 목록을 조회한다.
 * @author Johnny
 * @returns { 
 * errorCode : 처리 결과 코드, 
 * msg : 처리 결과 메시지, 
 * burgerList : [ 
 *      { 
 *          burgerimage : 버거 이미지 파일 이름
 *          burgername : 버거 이름, 
 *          burgerprice : 버거 가격, 
 *          burgerquantity : 버거 수량, 
 *          sale : 판매 상태, 
 *          created : 생성일
 *      } 
 *  ] 
 * }
 */
exports.listAll = (req, res, next) => {
    console.log('burgerController :: listAll :: START ====================')
    Burger.find((err, burgers) => {
        if (err)
        {
            console.error('burgerController :: listAll :: errorCode : ' + err)
            resObject.errorCode = 1
            resObject.msg = errorMessage.mongoErrorMessage(err, 'burger')

            return res.json(resObject)
        }

        resObject.errorCode = 0
        resObject.burgerList = burgers

        res.json(resObject)
    })
    console.log('burgerController :: listAll :: END ====================')
}

/**
 * 버거 메뉴 목록 요청
 * * 판매 상태의 메뉴만 조회한다.
 * @author Johnny
 * @returns { 
 * errorCode : 처리 결과 코드, 
 * msg : 처리 결과 메시지, 
 * burgerList : [ 
 *      { 
 *          burgerimage : 버거 이미지 파일 이름
 *          burgername : 버거 이름, 
 *          burgerprice : 버거 가격, 
 *          burgerquantity : 버거 수량, 
 *          sale : 판매 상태, 
 *          created : 생성일
 *      } 
 *  ] 
 * }
 */
exports.list = (req, res, next) => {
    console.log('burgerController :: list :: START ====================')
    const query = { sale : true }
    Burger.find(query, (err, burgers) => {
        if (err)
        {
            console.log('burgerController :: list :: errorCode : ', err)
            resObject.errorCode = 1
            resObject.msg = errorMessage.mongoErrorMessage(err, 'burger')

            return res.json(resObject)
        }

        resObject.errorCode = 0
        resObject.burgerList = burgers

        res.json(resObject)
    })
    console.log('burgerController :: list :: END ====================')
}

/**
 * 버거 메뉴 상태 변경 요청
 * @author Johnny
 * @param burgername 버거 이름 string
 * @param sale 판매 상태 boolean false: 미 판매, true: 판매
 * @returns { errorCode : 처리 결과 코드, msg : 처리 결과 메시지 }
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
                resObject.msg = errorMessage.mongoErrorMessage(err, 'burger')
                return res.json(resObject)
            }

            console.log('burgerController :: stateChange :: burger : ', burger)
            resObject.errorCode = 0
            resObject.msg = '상태가 변경되었습니다.'
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

/**
 * 버거 메뉴 삭제 요청
 * @author Johnny 
 * @param burgername 버거 이름 String
 * @returns { errorCode : 처리 결과 코드, msg : 처리 결과 메시지 }
 */
exports.deleteMenu = (req, res, next) => {
    console.log('burgerController :: deleteMenu :: START ================')
    const query = { burgername : req.params.burgername }
    console.log('burgerController :: deleteMenu :: query : ', query)

    if (query.burgername === null || query.burgername === undefined || query.burgername.length <= 0)
    {
        resObject.errorCode = 1
        resObject.msg = errorMessage.targetEmptyErrorMessage()
        return res.json(resObject)
    }

    Burger.findOneAndDelete(query, (err, burger) => {
        if (err)
        {
            console.error('burgerController :: deleteMenu :: errorCode : ', err)
            resObject.errorCode = 2
            resObject.msg = errorMessage.mongoErrorMessage(err, 'burger')
            return res.json(resObject)
        }

        resObject.errorCode = 0
        resObject.msg = '선택한 메뉴가 삭제되었습니다.'
        res.json(resObject)
    })
    console.log('burgerController :: deleteMenu :: END ================')
}