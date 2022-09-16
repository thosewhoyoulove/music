/*
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 21:53:26
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:49:39
 */
import request from '~/utils/request'

// 注册(修改密码)
// 说明 : 调用此接口 ,传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)

// 必选参数 :

// captcha: 验证码

// phone : 手机号码

// password: 密码

// nickname: 昵称

// 可选参数 :

// countrycode: 国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国

// 接口地址 : /register/cellphone

// 调用例子 : /register/cellphone?phone=13xxx&password=xxxxx&captcha=1234&nickname=binary1345
export function Register(phone, password, captcha, nickname) {
    return request({
        method: 'post',
        url: `/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`,
    })
}