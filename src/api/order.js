import request from "@/utils/middleware";

export function addOrder(data) {
  return request({
    url: "/order",
    method: "post",
    data: data,
  });
}

export function listOrder() {
  return request({
    url: "/order/list",
    method: "post",
  });
}