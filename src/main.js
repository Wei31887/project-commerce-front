import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "@/assets/main.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

const app = createApp(App).use(router);
app.use(ElementPlus);
app.use(store);
app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
