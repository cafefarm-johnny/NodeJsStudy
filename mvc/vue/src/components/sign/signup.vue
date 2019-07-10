<template>
    <div>
        <h1>회 원 가 입</h1>
        <ul>
            <li>
                <label for='username-input'>이름</label>
                <input v-model.lazy='username' type='text' id='username-input' placeholder="홍길동">
            </li>
            <li>
                <label>이메일</label>
                <input v-model.lazy='useremail' type='email' id='useremail-input' placeholder="hong@gmail.com">
            </li>
            <li>
                <label id='emailcheck-message-label'>이메일 형식이 잘못되었습니다.</label>
            </li>
            <li>
                <label for=''>아이디</label>
                <input v-model.lazy='userid' type='text' id='userid-input' autocomplete="name">
            </li>
            <li>
                <label for='userpwd-input'>비밀번호</label>
                <input v-model.lazy='userpwd' type='password' id='userpwd-input' autocomplete="new-password">
            </li>
            <li>
                <label for='userpwdcheck-input'>비밀번호 확인</label>
                <input v-model.lazy='userpwdcheck' type='password' id='userpwdcheck-input' autocomplete="new-password">
            </li>
            <li>
                <label id='pwdcheck-message-label'>패스워드가 일치하지 않습니다.</label>
            </li>
        </ul>
        <div>
            <button @click='signup'>회원가입</button>
            <button @click='moveToHome'>취소</button>
        </div>
    </div>
</template>

<script>
// DOM Element
let usernameInput = null
let useremailInput = null
let useridInput = null
let userpwdInput = null
let userpwdcheckInput = null

let emailcheckMessage = null
let pwdcheckMessage = null

// Email Regex
const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

/**
 * * 엘리먼트에 자바스크립트로 동적인 스타일을 부여하기 위한 스타일 목록
 * @author Johnny
 */
const styleObj = {
    validationStyle : 'border: 2px solid red;', 
    showDisplayStyle : 'display: block;', 
    hideDisplayStyle : 'display: none;'
}


export default {
    data() {
        return {
            username : '',
            useremail : '',
            userid : '',
            userpwd : '', 
            userpwdcheck : ''
        }
    }, 
    methods: {
        /**
         * Input 태그 데이터 검증 함수
         * @author Johnny
         */
        validation() {
            const inputValueArray = [
                this.username, 
                this.useremail, 
                this.userid, 
                this.userpwd, 
                this.userpwdcheck
            ]

            const inputElementArray = [
                usernameInput, 
                useremailInput, 
                useridInput, 
                userpwdInput, 
                userpwdcheckInput
            ]

            // 입력란 작성 검증
            for (let i = 0, length = inputValueArray.length; i < length; i += 1) 
            {
                if (inputValueArray[i].length <= 0) 
                {
                    inputElementArray[i].focus()
                    inputElementArray[i].setAttribute('style', styleObj.validationStyle)
                    return false
                }

                inputElementArray[i].removeAttribute('style')
            }

            // email 형식 검증
            if (!this.useremail.match(emailRegex))
            {
                useremailInput.focus()
                useremailInput.setAttribute('style', styleObj.validationStyle)

                emailcheckMessage.setAttribute('style', styleObj.showDisplayStyle)

                return false
            }
            useremailInput.removeAttribute('style')
            emailcheckMessage.setAttribute('style', styleObj.hideDisplayStyle)

            // 비밀번호 확인 검증
            if (this.userpwd !== this.userpwdcheck)
            {
                userpwdcheckInput.focus()
                userpwdcheckInput.setAttribute('style', styleObj.validationStyle)

                pwdcheckMessage.innerText = '패스워드가 일치하지 않습니다.'
                pwdcheckMessage.setAttribute('style', styleObj.showDisplayStyle)

                return false
            }
            userpwdcheckInput.removeAttribute('style')
            pwdcheckMessage.setAttribute('style', styleObj.hideDisplayStyle)

            // 비밀번호 8자리 검증
            if (this.userpwd.length < 8)
            {
                userpwdInput.focus()
                userpwdInput.setAttribute('style', styleObj.validationStyle)

                pwdcheckMessage.innerText = '비밀번호는 8자리 이상으로 설정해주세요.'
                pwdcheckMessage.setAttribute('style', styleObj.showDisplayStyle)

                return false
            }
            else
            userpwdInput.removeAttribute('style')
            pwdcheckMessage.setAttribute('style', styleObj.hideDisplayStyle)

            return true
        },
        /**
         * 회원가입 함수
         * @author Johnny
         */
        signup() {
            if (this.validation())
            {
                const userObj = {
                    username : this.username, 
                    useremail : this.useremail, 
                    userid : this.userid, 
                    userpwd : this.userpwd, 
                    userpwdcheck : this.userpwdcheck
                }

                this.$store.dispatch('signup', userObj)
                this.$router.push('/')
            }
        }, 
        moveToHome() {
            this.$router.push('/')
        }
    },
    /**
     * * 엘리먼트 요소들이 화면에 모두 렌더링 된 후 querySelector로 변수에 할당
     * @author Johnny
     */
    mounted() {
        // input 엘리먼트
        usernameInput = document.querySelector('#username-input')
        useremailInput = document.querySelector('#useremail-input')
        useridInput = document.querySelector('#userid-input')
        userpwdInput = document.querySelector('#userpwd-input')
        userpwdcheckInput = document.querySelector('#userpwdcheck-input')

        emailcheckMessage = document.querySelector('#emailcheck-message-label')
        emailcheckMessage.setAttribute('style', styleObj.hideDisplayStyle)

        // 비밀번호 확인 검증 label 엘리먼트
        pwdcheckMessage = document.querySelector('#pwdcheck-message-label')
        pwdcheckMessage.setAttribute('style', styleObj.hideDisplayStyle)
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
</style>
