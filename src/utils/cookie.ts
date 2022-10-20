/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 21:58:30
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-20 19:53:16
 */
import Cookies from 'js-cookie'

const Cookie = 'cookie'
const nameKey = 'name'
const avatarKey = 'avatar'
const passwordKey = 'password'
const emailKey = 'email'
export function getCookie() {
  return Cookies.get(Cookie)
}

export function setCookie(cookie: string) {
  var inFifteenMinutes = new Date(new Date().getTime() + 3 * 60 * 1000);
  return Cookies.set(Cookie, cookie, {
    expires: inFifteenMinutes
  })
}

export function removeCookie() {
  return Cookies.remove(Cookie)
}

export function getName() {
  return Cookies.get(nameKey)
}

export function setName(name: string) {
  return Cookies.set(nameKey, name)
}

export function removeName() {
  return Cookies.remove(nameKey)
}
export function getPassword() {
  return Cookies.get(passwordKey)
}

export function swtPassword(password: string) {
  return Cookies.set(passwordKey, password)
}

export function removePassword() {
  return Cookies.remove(passwordKey)
}

export function getAvatar() {
  return Cookies.get(avatarKey)
}

export function setAvatar(avatar: string) {
  return Cookies.set(avatarKey, avatar)
}

export function removeAvatar() {
  return Cookies.remove(avatarKey)
}
export function getEmail() {
  return Cookies.get(emailKey)
}

export function setEmail(email: string) {
  return Cookies.set(emailKey, email)
}

export function removeEmail() {
  return Cookies.remove(emailKey)
}