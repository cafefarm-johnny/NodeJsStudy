import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        id : '',
        username : '', 
        useremail : '', 
        userid : '', 
        userpwd : ''
    }, 
    getters : {
        getUsername() {
            return this.username
        }, 
        getUseremail() {
            return this.useremail
        }, 
        getUserid() {
            return this.userid
        }, 
        getUser() {
            return {
                id : this.id, 
                username : this.username, 
                useremail : this.useremail, 
                userid : this.userid
            }
        }
    }, 
    mutations : {
        setUser(state, payload) {
            state.username = payload.username
            state.useremail = payload.useremail
            state.userid = payload.userid
            state.userpwd = payload.userpwd
        }
    }, 
    actions : {
        signup(context) {
            return this.$http.post('http://localhost:3000/api/member/signup').
                then((res) => {
                    const data = res.data 
                    window.alert(data.msg)
                    if (data.errorCode === 0)
                    {
                        this.$router.push('/')
                    }
                }).catch((err) => {
                    window.alert(err.message)
                    console.log(err)
                })
        }
    }
})