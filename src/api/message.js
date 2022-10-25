import request from '~/utils/request'
export function getPrivateMsg(limit) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/msg/private?limit=${limit}&cookie=${encodeURIComponent(cookie)}`,
    })
}