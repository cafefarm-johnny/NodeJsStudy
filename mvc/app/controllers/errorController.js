exports.bugerErrorMessage = (err) => { // mongoose error 객체에서 통합된 오류 메시지를 반환하는 비공개 메소드
    let message = '';

    if (err.code) // mongoDB에서 에러코드를 반환하는 경우
    {
        switch (err.code) 
        {
            case 11000 : 
            case 11001 : 
                message = '이미 존재하는 상품입니다.';
                break;
            default : 
                message = '예기치 못한 문제가 발생했습니다.';
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