<template>
    <div>
        <h1>로 그 인</h1>
        <ul>
            <li>
                <label for='userid-input'>아이디 : </label>
                <input v-model="userid" type='text' id="userid-input">
            </li>
            <li>
                <label for="userpwd-input">비밀번호 : </label>
                <input v-model="userpwd" type="password" id="userpwd-input">
            </li>
        </ul>
        <div class="btn-div">
            <button class='login-btn' @click="login">로그인</button>
            <button class='login-cancel-btn' @click="loginCancel">취소</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userid: '',
            userpwd: ''
        }
    },
    methods: {
        loginCancel() {
            this.$router.push('/')
        }, 
        validation() {
            if (this.userid.length <= 0 || this.userpwd.length <= 0)
            {
                return false
            }
            return true
        }, 
        login() {
            if (this.validation())
            {
                const user = {
                    userid: this.userid,
                    userpwd: this.userpwd
                }
                console.log(user)

                this.$store.dispatch('signin', user)

                return;
            }
            window.alert('계정 정보를 입력하고 시도해주세요.')
        }
    },
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
</style>
