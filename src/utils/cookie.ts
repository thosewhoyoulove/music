/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 21:58:30
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-10 09:17:47
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'
const nameKey = 'name'
const avatarKey = 'avatar'
const passwordKey = 'password'
const emailKey = 'email'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
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