<template>
    <div>
        <h1>{{msg}}</h1>
        <ul>
            <li>
                <button @click='moveToAdd'>메뉴 추가</button>
            </li>
            <li>
                <button @click='moveToList'>메뉴 목록</button>
            </li>
            <li v-if="!loginCheck">
                <button @click='moveToSignup'>회원가입</button>
            </li>
            <li v-if="!loginCheck">
                <button @click='moveToSignin'>로그인</button>
            </li>
            <li v-if="loginCheck">
                <button @click='signout'>로그아웃</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '맘 스 터 치'
        }
    }, 
    methods: {
        moveToAdd() {
            this.$router.push('/burger/add')
        }, 
        moveToList() {
            this.$router.push('/burger/list')
        }, 
        moveToSignup() {
            this.$router.push('/signup')
        }, 
        moveToSignin() {
            this.$router.push('/signin')
        }, 
        /**
         * 로그아웃 함수
         * @author Johnny
         */
        signout() {
            if (window.confirm('정말로... 로그아웃 하시겠습니까?'))
            {
                this.$store.dispatch('signout')
                this.$router.push('/')
            }
        }
    }, 
    computed: {
        /**
         * 로그인 체크 함수
         * * 로그인 체크 여부에 따라 회원가입, 로그인, 로그아웃을 적절하게 표현한다.
         * @author Johnny
         */
        loginCheck() {
            const user = this.$store.getters.getUser

            if (user === null || user === {} || 
                user.id === '' || 
                user.username === '' || 
                user.useremail === '' || 
                user.userid === '')
            {
                return false
            }

            return true
        }
    },
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
    ul > li {
        padding: 10px;
    }
</style>
