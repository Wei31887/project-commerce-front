import request from "@/utils/middleware";

export function addCartItem(data) {
  return request({
    url: "/cart/add",
    method: "post",
    data: data,
  });
}

export function listCartItems() {
  return request({
    url: "/cart/list",
    method: "post",
  });
}

export function deleteCartItem(data) {
  return request({
    url: "/cart/delete",
    method: "post",
    data: data,
  });
}
