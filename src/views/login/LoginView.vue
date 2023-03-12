<template>
  <h2>Welcome</h2>
  <el-form
    class="login-form"
    ref="loginFormRef"
    :label-position="'right'"
    :model="form"
    :rules="rules"
    label-width="100px"
    style="max-width: 420px"
  >
    <el-form-item prop="email" label="信箱">
      <el-input
        type="email"
        placeholder="Please enter email address"
        v-model="form.email"
        v-on:keyup.enter="toLogin()"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="password" label="密碼">
      <el-input
        type="password"
        placeholder="Please enter password"
        v-model="form.password"
        v-on:keyup.enter="toLogin()"
      >
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="info" size="large" v-on:click="toLogin()"
        >登入</el-button
      >
    </el-form-item>
  </el-form>
  <div class="create-user">
    <el-divider> 是新用戶嗎? </el-divider>
    <el-button size="large" round bg text v-on:click="toCreate()"
      >創建新用戶！</el-button
    >
  </div>
</template>

<script>
import { ref, toRefs, reactive } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";

export default {
  name: "LoginViewVue",
  setup() {
    const router = useRouter();
    const loginFormRef = ref();
    const state = reactive({
      form: {
        username: "",
        password: "",
        email: "",
      },
    });
    const rules = {
      password: [
        { required: true, message: "密碼欄不可為空", trigger: "blur" },
      ],
      email: [
        {
          required: true,
          message: "信箱欄不可為空",
          trigger: "blur",
        },
      ],
    };

    // methods
    function toLogin() {
      loginFormRef.value.validate((valid) => {
        if (!valid) {
          return;
        }
        store
          .dispatch("user/login", {
            password: state.form.password,
            email: state.form.email,
          })
          .then(() => {
            router.push({ name: "home" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    function toCreate() {
      router.push({ path: "/user/create" });
    }

    return {
      ...toRefs(state),
      loginFormRef,
      rules,
      store,
      toLogin,
      toCreate,
    };
  },
};
</script>

<style scoped>

div.create-user {
  width: 100%;
}
</style>
