<template>
    <div>
        <div class='burger-add-header'>
            <h1>버거 메뉴 등록</h1>
        </div>

        <div class='burger-add-body'>
            <p>
                <label for='burger-image'>버거 사진 : </label>
                <input v-on:change='fileSelect' type='file' ref='burgerimage' id='burger-image' accept='.jpg, .jpeg, .png, .bmp, .gif'>
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
                <input v-model='saleFlag' type='radio' name='burger-sale-state' id='do-not-sale' checked value='false'> 미판매
                <input v-model='saleFlag' type='radio' name='burger-sale-state' id='sale' value='true'> 판매
            </p>
        </div>

        <div class='burger-add-footer'>
            <p>
                <input @click='submit' type='button' value='등록'>
                <router-link to="/burger/list">목록으로</router-link>
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
            burgerPrice : 0,
            burgerQuantity : 0, 
            saleFlag : false
        }
    },
    methods: {
         submit() {
             if (this.burgerName.length <= 0 || this.burgerPrice.length <= 0 || this.burgerQuantity.length <= 0)
             {
                 window.alert('모든 내용을 입력하고 시도해주세요.');
                 return false;
             }

             const formData = new FormData();
             formData.append('burgerimage', this.burgerImage);
             formData.append('burgername', this.burgerName);
             formData.append('burgerprice', this.burgerPrice);
             formData.append('burgerquantity', this.burgerQuantity);
             formData.append('sale', this.saleFlag);

            // * FormData객체는 그 자체를 로깅하면 빈 객체만을 리턴한다.
            // * FormData를 로깅하려면 FormData.entries()를 이용하여 key : value 쌍을 뽑아야 한다.
            //  console.log(formData);
            for (let key of formData.entries())
            {
                console.log(`${key}`);
            }

            // axios로 multipart/form-data POST 요청 보내기
            // * 3번째 인자 options에 headers 정보로 컨텐츠 타입을 작성해준다.
             this.$http.post('http://localhost:3000/api/burger/add', formData, {
                 headers: {
                     'Content-Type' : 'multipart/form-data'
                 }
             }).then((res) => {
                 const data = res.data;
                 window.alert(data.msg);
                 if (data.errorCode === 0)
                 {
                     this.$router.replace('/burger/add');
                 }
             }).catch((err) => {
                 window.alert(JSON.stringify(err.message));
                 console.log(err);
             });

            // axios로 application/json POST 요청 보내기
            //  this.$http.post('http://localhost:3000/api/burger/add', {
            //         burgername : this.burgerName, 
            //         burgerprice : this.burgerPrice, 
            //         burgerquantity : this.burgerQuantity, 
            //         sale : this.saleFlag
            //     }).then((res) => {
            //      console.log(res);
            //  }).catch((err) => {
            //      console.log(err);
            //  });
         },
         fileSelect() {
             this.burgerImage = this.$refs.burgerimage.files[0];
         }
    },
}
</script>

<style>

</style>
