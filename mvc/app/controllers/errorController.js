/**
 * mongoose error 객체에서 통합된 오류 메시지를 반환하는 비공개 메소드
 * @author Johnny
 * @param err mongoose로 반환된 error객체
 * @param modelType mongoDB model 타입 (String)
 */
exports.mongoErrorMessage = (err, modelType) => {
    let message = ''

    if (err.code) // mongoDB에서 에러코드를 반환하는 경우
    {
        switch (err.code) 
        {
            case 11000 : 
            case 11001 : 
                if (modelType === 'burger')
                {
                    message = '이미 존재하는 상품입니다.'
                }
                else if (modelType === 'member')
                {
                    message = '이미 가입된 사용자입니다.'
                }
                
                break
            default : 
                message = '예기치 못한 문제가 발생했습니다.'
                break
        }
    }
    else // 내가 직접 만든 mongoose 검증 오류
    {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
            {
                message = err.errors[errName].message
            }
        }
    }

    return message
}

/**
 * 데이터 검증 에러 메시지
 * @author Johnny
 */
exports.dataEmptyErrorMessage = () => {
    return '모든 내용을 작성하고 시도해주세요.'
}

/**
 * 대상 검증 에러 메시지
 * @author Johnny
 */
exports.targetEmptyErrorMessage = () => {
    return '대상을 선택하고 시도해주세요.'
}