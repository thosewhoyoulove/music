import { defineStore } from 'pinia'
import { Names } from "../names";
import { generateState } from './state';

export const userStore = defineStore(Names.User,{
    state: generateState,
    actions:{
        //更新登录状态
        updateIsLogin(value:boolean){
            this.isLogin = value
        },
        //更新token
        updateToken(value:string){
            this.token = value
            localStorage.setItem('token',this.token)
        },
        //更新用户信息
        updateUserInfo(value:object){
            this.user = value
            localStorage.setItem('userInfo',JSON.stringify(this.user))
        },
        //退出登录清空信息
        removeUserInfo(){
            this.user = {}
            this.token = ''
        }
    }
})
