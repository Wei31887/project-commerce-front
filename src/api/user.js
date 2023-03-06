import request from "@/utils/middleware";

export function loginByUser(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/password/update',
    method: 'post',
    data: data
  })
}

export function updateInfo(data) {
  return request({
    url: '/user/info/update',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
