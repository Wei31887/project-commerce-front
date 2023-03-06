import Cookie from 'js-cookie'

const GetAccessKey = 'access_token'
const GetRefreshKey = 'refresh_token'

export function getAccessToken() {
    return Cookie.get(GetAccessKey)
}

export function getRefreshToken() {
    return Cookie.get(GetRefreshKey)
}

export function setAccessToken(token) {
    return Cookie.set(GetAccessKey, token)
}

export function setRefreshToken(token) {
    return Cookie.set(GetRefreshKey, token)
}

export function removeAccessToken() {
    return Cookie.remove(GetAccessKey)
}

export function removeRefreshToken() {
    return Cookie.remove(GetRefreshKey)
}
