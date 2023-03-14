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
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: ":category",
        name: "category",
        component: () => import("../views/products/ProductListView.vue"),
      },
      {
        path: ":category/:id",
        name: "content",
        component: () => import("../views/content/ProductContentView.vue"),
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
    path: "/user",
    name: "user",
    component: () => import("../views/login/LoginIndexView.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../views/login/LoginView.vue"
          ),
      },
      {
        path: "create",
        name: "create",
        component: () =>
          import(
            /* webpackChunkName: "create" */ "../views/login/CreateUserView.vue"
          ),
      },
    ],
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
      next({ name: "login" });
    }
  }
  next();
});

export default router;
