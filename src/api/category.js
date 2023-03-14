import request from "@/utils/middleware";

export function listProductCategories() {
  return request({
    url: '/category',
    method: 'post',
  })
}

