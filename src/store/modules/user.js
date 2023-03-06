import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/token";
import { loginByUser } from "@/api/user";

export default {
  namespaced: true,
  state: {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUser(userInfo)
          .then((res) => {
            if (res.status == 200) {
              commit("SET_ACCESSTOKEN", res.data.access_token);
              commit("SET_REFRESHTOKEN", res.data.refresh_token);
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  mutations: {
    SET_ACCESSTOKEN(state, token) {
      state.accessToken = token;
      setAccessToken(token);
    },
    SET_REFRESHTOKEN(state, token) {
      state.refreshToken = token;
      setRefreshToken(token);
    },
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    refresToken(state) {
      return state.refresh;
    },
  },
};
