import request from "@/utils/middleware";

export function addOrder(data) {
  return request({
    url: "/order",
    method: "post",
    data: data,
  });
}