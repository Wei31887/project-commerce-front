import axios from "axios";
import store from "@/store";
import { getAccessToken } from "@/utils/token";
import { ElNotification } from "element-plus";
import { BASE_API } from "@/config/config";
// import { useRouter } from "vue-router";

// const router = useRouter()

const service = axios.create({
  baseURL: BASE_API,
  timeout: 30000,
});

// axios 攔截器： 攔截request前狀態（token設置）
service.interceptors.request.use(
  (config) => {
    if (store.getters["user/accessToken"]) {
      config.headers["token"] = getAccessToken();
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

// axios 攔截器： response前狀態
service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response;
    } 
  },
  (error) => {
    if (error.response.status == 401) {
      return error.response;
      // router.push({name: "login"})
    } 
    ElNotification({
      title: "Error",
      type: "error",
      message: error.response.status + ", " + error.response.statusText,
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export default service;
