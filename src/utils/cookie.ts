/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 21:58:30
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 22:00:49
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'
const nameKey = 'name'
const avatarKey = 'avatar'

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

export function getAvatar() {
  return Cookies.get(avatarKey)
}

export function setAvatar(avatar: string) {
  return Cookies.set(avatarKey, avatar)
}

export function removeAvatar() {
  return Cookies.remove(avatarKey)
}