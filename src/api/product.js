import request from "@/utils/middleware";

export function listProducts(data) {
  return request({
    url: '/product',
    method: 'post',
    data: data
  })
}

