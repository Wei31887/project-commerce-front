import request from "@/utils/middleware";

export function listProductCategories(data) {
  return request({
    url: '/product/category',
    method: 'post',
    data: data
  })
}

