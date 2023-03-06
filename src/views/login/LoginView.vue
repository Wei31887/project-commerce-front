<template>
  <div class="container">
    <div class="left-part"></div>
    <div class="right-part">
      <div
        class="login-box"
        :style="{
          boxShadow: `var(--el-box-shadow-light)`,
        }"
      >
        <h3>Welcome!</h3>
        <el-form
          class="login-form"
          ref="loginFormRef"
          :label-position="'right'"
          :model="form"
          :rules="rules"
          label-width="100px"
          style="max-width: 420px"
        >
          <el-form-item prop="username" label="Username">
            <el-input
              type="text"
              placeholder="Please enter user name"
              v-model="form.username"
              v-on:keyup.enter="toLogin()"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input
              type="password"
              placeholder="Please enter password"
              v-model="form.password"
              v-on:keyup.enter="toLogin()"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="email" label="Email">
            <el-input
              type="email"
              placeholder="Please enter email address"
              v-model="form.email"
              v-on:keyup.enter="toLogin()"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="toLogin()">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, reactive } from "vue";
// import { useStore } from "vuex";
import store from "@/store";
import { useRouter } from "vue-router";

export default {
  name: "LoginVue",
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
      username: [
        { required: true, message: "Username can't be empty", trigger: "blur" },
      ],
      password: [
        { required: true, message: "Password can't be empty", trigger: "blur" },
      ],
      email: [
        {
          required: true,
          message: "Email address can't be empty",
          trigger: "blur",
        },
      ],
    };

    // methods
    const toLogin = () => {
      loginFormRef.value.validate((valid) => {
        if (!valid) {
          return;
        }
        store
          .dispatch("user/login", 
          {
            user_name: state.form.username,
            password: state.form.password,
            email: state.form.email
          })
          .then(() => {
            router.push({ name: "home" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    return {
      ...toRefs(state),
      loginFormRef,
      rules,
      store,
      toLogin,
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.left-part {
  height: 100vh;
  min-width: 50%;
  position: relative;
  left: 0;
  background-color: var(--login-background-color);
}

div.right-part {
  display: flex;
  min-width: 50%;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 9px;
  padding: 20px;
  border-top: 1px solid var(--el-border-color);
}
</style>
