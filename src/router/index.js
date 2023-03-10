import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAccessToken } from "@/utils/token";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/",
        name: "product",
        component: () => import("../views/home_page/ProductView.vue"),
      },
      {
        path: "content/:id",
        name: "content",
        component: () => import("../views/product/ProductContentView.vue"),
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../views/cart/CartView.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("../views/order/OrderView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "home") {
    next({ path: "/" });
  }
  if (to.name == "order" || to.name == "cart") {
    const token = getAccessToken();
    if (!token) {
      next({ name: "login"})
    }
  }
  next();
});

export default router;
