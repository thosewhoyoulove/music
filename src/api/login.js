/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 15:28:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-11 18:23:49
 */
import request from '~/utils/request'
// 二维码登录
// 说明: 二维码登录涉及到 3 个接口,调用务必带上时间戳,防止缓存

// 1. 二维码 key 生成接口
// 说明: 调用此接口可生成一个 key

// 接口地址 : /login/qr/key

// 2. 二维码生成接口
// 说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码

// 必选参数: key,由第一个接口生成

// 可选参数: qrimg 传入后会额外返回二维码图片 base64 编码

// 接口地址 : /login/qr/create

// 调用例子 : /login/qr/create?key=xxx

// 3. 二维码检测扫码状态接口
// 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)

// 必选参数: key,由第一个接口生成

// 接口地址 : /login/qr/check

// 调用例子 : /login/qr/check?key=xxx
export function getCodeKey() {
    return request({
        method: 'post',
        url: `/login/qr/key?timestamp=${Date.now()}`,
    })
}

export function getCodeByKey(key) {
    return request({
        method: 'post',
        url: `/login/qr/create?key=${key}?timestamp=${Date.now()}`,
    })
}

export function testCodeByKey(key) {
    return request({
        method: 'post',
        url: `/login/qr/check?key=${key}?timestamp=${Date.now()}`,
    })
}
// 发送验证码
// 说明 : 调用此接口 ,传入手机号码, 可发送验证码

// 必选参数 : phone: 手机号码

// 可选参数 : ctcode: 国家区号,默认 86 即中国

// 接口地址 : /captcha/sent

// 调用例子 : /captcha/sent?phone=13xxx

export function sendVeryCode(phone) {
    return request({
        method: 'post',
        url: `/captcha/sent?phone=${phone}`, //不可以加时间戳
    })
}
// 验证验证码
// 说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确

// 必选参数 : phone: 手机号码

// captcha: 验证码

// 可选参数 :

// ctcode: 国家区号,默认 86 即中国

// 接口地址 : /captcha/verify

// 调用例子 : /captcha/verify?phone=13xxx&captcha=1597

export function verifyCode(phone, captcha) {
    return request({
        method: 'post',
        url: `/captcha/sent?phone=${phone}&captcha=${captcha}`,
    })
}
// 检测手机号码是否已注册
// 说明 : 调用此接口 ,可检测手机号码是否已注册
// 必选参数 :
// phone : 手机号码

// 可选参数 :
// countrycode: 国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国

// 接口地址 : /cellphone/existence/check

// 调用例子 : /cellphone/existence/check?phone=13xxx

export function isRegister(phone) {
    return request({
        method: 'post',
        url: `/captcha/sent?phone=${phone}?timestamp=${Date.now()}`,
    })
}

//  手机登录
// 必选参数 :
// phone: 手机号码

// password: 密码

// 可选参数 :
// countrycode: 国家码，用于国外手机号登录，例如美国传入：1

// md5_password: md5 加密后的密码,传入后 password 参数将失效

// captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效

// 接口地址 : /login/cellphone

// 调用例子 : /login/cellphone?phone=xxx&password=yyy /login/cellphone?phone=xxx&md5_password=yyy /login/cellphone?phone=xxx&captcha=1234
//手机号+验证码登录：
export function loginByPhone(phone, captcha) {
    return request({
        method: 'post',
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}?timestamp=${Date.now()}`,
    })
}
//手机号+密码登录
export function loginByPassword(phone, password) {
    return request({
        method: 'post',
        url: `/login/cellphone?phone=${phone}&password=${password}?timestamp=${Date.now()}`,
    })
}
//邮箱地址+密码登录
//  邮箱登录
// 必选参数 :

// email: 163 网易邮箱

// password: 密码

// 可选参数 :

// md5_password: md5 加密后的密码,传入后 password 将失效

// 接口地址 : /login

// 调用例子 : /login?email=xxx@163.com&password=yyy
export function loginByEmail(email, password) {
    return request({
        method: 'post',
        url: `/login?email=${email}&password=${password}`,
    })
}
// 刷新登录
// 说明 : 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)

// 调用例子 : /login/refresh
export function refreshLoginStu() {
    return request({
        method: 'post',
        url: '/login/refresh',
    })
}