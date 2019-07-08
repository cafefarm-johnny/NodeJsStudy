<template>
    <div>
        <h1>{{msg}}</h1>
        <button @click='moveToAdd'>메뉴 추가</button>
        <button @click='moveToList'>메뉴 목록</button>
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
        }
    }
}
</script>

<style>

</style>
