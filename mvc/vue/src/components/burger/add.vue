<template>
    <div>
        <div class='burger-title-logo'>
            <img src='../../assets/logo.jpg'>
        </div>

        <div class='burger-add-header'>
            <h1>버거 메뉴 등록</h1>
        </div>

        <div class='burger-add-body'>
            <p>
                <div class='burger-image-box'></div>
                <label for='burger-image'>버거 사진 : </label>
                <input type='file' id='burger-image' accept=".jpg, .jpeg, .png, .bmp, .gif">
            </p>
            <p>
                <label for='burger-name'>버거 이름 : </label>
                <input v-model.trim='burgerName' type='text' id='burger-name'>
            </p>
            <p>
                <label for='burger-price'>버거 가격 : </label>
                <input v-model.number='burgerPrice' type='number' id='burger-price'>
            </p>
            <p>
                <label for='burger-quantity'>버거 수량 : </label>
                <input v-model.number='burgerQuantity' type='number' id='burger-quantity'>
            </p>
            <p>
                <label for='do-not-sale'>판매 상태</label>
                <input v-model='saleFlag' type='radio' name='burger-sale-state' id='do-not-sale' checked value='0'> 미판매
                <input v-model='saleFlag' type='radio' name='burger-sale-state' id='sale' value='1'> 판매
            </p>
        </div>

        <div class='burger-add-footer'>
            <p>
                <input @click="submit" type='button' value='등록'>
                <input type='button' value='목록으로'>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            burgerImage : '', 
            burgerName : '',
            burgerPrice :'',
            burgerQuantity : '', 
            saleFlag : '0'
        }
    },
    methods: {
         submit() {
             if (this.burgerName.length <= 0 || this.burgerPrice.length <= 0 || this.burgerQuantity.length <= 0)
             {
                 window.alert('모든 내용을 입력하고 시도해주세요.');
                 return false;
             }
             Vue.$http.get();
         }
    },
}
</script>

<style>

</style>
