<template>
    <div>
        <h1>회 원 가 입</h1>
        <ul>
            <li>
                <label for='username-input'>이름</label>
                <input v-model='username' type='text' id='username-input' placeholder="홍길동">
            </li>
            <li>
                <label>이메일</label>
                <input v-model='useremail' type='email' id='useremail-input' placeholder="hong@gmail.com">
            </li>
            <li>
                <label for=''>아이디</label>
                <input v-model='userid' type='text' id='userid-input'>
            </li>
            <li>
                <label for='userpwd-input'>비밀번호</label>
                <input v-model='userpwd' type='password' id='userpwd-input'>
            </li>
            <li>
                <label for='userpwdcheck-input'>비밀번호 확인</label>
                <input v-model='userpwdcheck' type='password' id='userpwdcheck-input'>
            </li>
            <li>
                <button @click='signup(validation())'>회원가입</button>
                <button>취소</button>
            </li>
        </ul>
    </div>
</template>

<script>
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
        validation() {
            if (this.username.length <= 0 || 
                this.useremail.length <= 0 || 
                this.userid.length <= 0 || 
                this.userpwd.length <= 0 || 
                this.userpwdcheck.length <= 0)
            {
                return false;
            }
            return true;
        }, 
        signup(validation) {
            if (validation)
            {
                console.log('검증되었습니다.')
                return true;
            }
            window.alert('모든 정보를 입력 후 시도해주세요.')
        }
    },
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
</style>
