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
            <li>
                <button @click='moveToSignup'>회원가입</button>
            </li>
            <li>
                <button @click='moveToSignin'>로그인</button>
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
        }
    }
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
