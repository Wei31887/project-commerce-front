import request from "@/utils/middleware";

export function listProducts(data) {
  return request({
    url: '/product',
    method: 'post',
    data: data
  })
}
export function listHitProducts(data) {
  return request({
    url: '/product/hit',
    method: 'post',
    data: data
  })
}
export function listProductByCategory(data) {
  return request({
    url: '/product/category',
    method: 'post',
    data: data
  })
}

export function GetProducts(data) {
  return request({
    url: '/product/content',
    method: 'post',
    data: data
  })
}

