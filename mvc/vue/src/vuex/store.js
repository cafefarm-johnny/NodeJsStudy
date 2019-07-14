import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        getUsername(state) {
            return state.username
        }, 
        getUseremail(state) {
            return state.useremail
        }, 
        getUserid(state) {
            return state.userid
        }, 
        getUser(state) {
            return {
                id : state.id, 
                username : state.username, 
                useremail : state.useremail, 
                userid : state.userid
            }
        }
    }, 
    mutations : {
        /**
         * 사용자 정보 저장소에 설정
         * @author Johnny
         * @param state 
         * @param payload 
         * { 
         *  _id: 사용자 고유 번호, 
         *  username: 사용자이름, 
         *  useremail: 사용자 이메일, 
         *  userid: 사용자 아이디 
         * }
         */
        setUser(state, payload) {
            console.log(state)
            state.id = payload._id
            state.username = payload.username
            state.useremail = payload.useremail
            state.userid = payload.userid
        }, 
        /**
         * 사용자 정보 초기화
         * @author Johnny
         * @param state 
         */
        clearUser(state) {
            state.id = ''
            state.username = ''
            state.useremail = ''
            state.userid = ''
        }
    }, 
    actions : {
        /**
         * 회원가입 비동기 API 통신
         * @author Johnny
         * @param context
         * @param user 
         * {
         *  username: 사용자이름, 
         *  useremail: 사용자 이메일, 
         *  userid: 사용자 아이디, 
         *  userpwd: 사용자 비밀번호
         * }
         */
        async signup(context, user) {
            try 
            {
                const res = await axios.post('http://localhost:3000/api/member/signup', user)
                console.log(res)
                const data = res.data
                console.log(data)
                window.alert(data.msg)
                if (data.errorCode === 0) 
                {
                    context.commit('setUser', data.user)
                }
            }
            catch (err) 
            {
                window.alert(err.message)
                console.log(err)
            }
        }, 
        /**
         * 로그인 비동기 API 통신
         * @author Johnny 
         * @param context
         * @param user 
         * {
         *  userid: 사용자 아이디, 
        *   userpwd: 사용자 비밀번호
         * }
         */
        async signin(context, user) {
            try 
            {
                const res = await axios.post('http://localhost:3000/api/member/signin', user)
                const data = res.data
                if (data.errorCode === 0)
                {
                    context.commit('setUser', data.user)
                }
                else
                {
                    window.alert(data.msg)
                }
            } 
            catch (err) 
            {
                window.alert(err.message)
                console.log(err)
            }
        },
        /**
         * 로그아웃 비동기 API 통신
         * @author Johnny
         * @param context
         */
        async signout(context) {
            try 
            {
                const res = await axios.get('http://localhost:3000/api/member/signout')
                const data = res.data
                if (data.errorCode === 0)
                {
                    context.commit('clearUser')
                }
            } 
            catch (err) 
            {
                window.alert(err.message)
                console.log(err)    
            }
        }
    }
})