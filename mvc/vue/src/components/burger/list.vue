<template>
    <div>
        <ul>
            <li v-for='(burger) in burgerList' :key='burger.burgername'>
                <p class='burger-image'><img v-bind:src='`http://localhost:3000/images/${burger.burgerimage}`'></p>
                <p>{{ burger.burgername }}</p>
                <p>가격 : {{ burger.burgerprice }}</p>
                <p>수량 : {{ burger.burgerquantity }}</p>
                <p><button>담기</button></p>
            </li>
        </ul>
        <div>
            <button @click='moveToMain'>메인화면</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            burgerList : [
                {
                    burgerImage : '',
                    burgerName : '', 
                    burgerPrice : 0, 
                    burgerQuantity : 0, 
                    saleFlag : false
                }
            ]
        }
    }, 
    mounted() {
        this.$http.get('http://localhost:3000/api/burger/list')
            .then((res) => {
                console.log(res)
                const data = res.data
                if (data.errorCode === 0)
                {
                    this.burgerList = data.burgerList
                    // data.burgerList.forEach(burger => {
                    //     this.burgerImage = burger.burgerImage
                    //     this.burgerName = burger.burgerName
                    //     this.burgerPrice = burger.burgerPrice
                    //     this.burgerQuantity = burger.burgerQuantity
                    //     this.saleFlag = burger.sale
                    // })
                }

                console.log(this.burgerList)
            }).catch((err) => {
                window.alert(JSON.stringify(err.message))
                console.log(err)
            })
    },
    methods: {
        moveToMain() {
            this.$router.push('/')
        }
    },
}
</script>

<style scoped>
ul {
    list-style-type: none;
    display: inline-flex;
}
.burger-image img {
    width: 200px;
}
</style>
