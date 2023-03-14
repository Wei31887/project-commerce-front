<template>
  <h2>新用戶</h2>
  <el-form
    class="create-form"
    ref="createFormRef"
    :label-position="'right'"
    :model="form"
    :rules="rules"
    label-width="100px"
    style="max-width: 420px"
  >
    <el-form-item prop="username" label="用戶">
      <el-input type="text" placeholder="用戶名" v-model="form.username">
      </el-input>
    </el-form-item>
    <el-form-item prop="full_name" label="用戶全名">
      <el-input type="username" placeholder="輸入全名" v-model="form.full_name">
      </el-input>
    </el-form-item>
    <el-form-item prop="email" label="信箱">
      <el-input type="email" placeholder="輸入信箱" v-model="form.email">
      </el-input>
    </el-form-item>
    <el-form-item prop="password" label="密碼">
      <el-input type="password" placeholder="輸入密碼" v-model="form.password">
      </el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" label="確認密碼">
      <el-input
        type="password"
        placeholder="輸入確認密碼"
        v-model="form.checkPassword"
      >
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="info" size="large" v-on:click="handleCreate()"
        >創建</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, toRefs, reactive } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import { CreateUser } from "@/api/user";
import { ElNotification } from "element-plus";

export default {
  name: "CreateUserView",
  setup() {
    const router = useRouter();
    const createFormRef = ref();
    const state = reactive({
      form: {
        username: "",
        full_name: "",
        password: "",
        checkPassword: "",
        email: "",
      },
    });
    const rules = {
      username: [
        { required: true, message: "用戶名不可為空", trigger: "blur" },
      ],
      full_name: [
        { required: true, message: "用戶全名不可為空", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密碼欄不可為空", trigger: "blur" },
      ],
      email: [{ required: true, message: "信箱欄不可為空", trigger: "blur" }],
    };

    // methods
    function handleCreate() {
      createFormRef.value.validate((valid) => {
        if (!valid) {
          return;
        }
        CreateUser({
          user_name: state.form.username,
          password: state.form.password,
          email: state.form.email,
          full_name: state.form.full_name,
        }).then((res) => {
          if (res.status == 200) {
            ElNotification({
              title: "Success",
              type: "success",
              message: "User created successfully",
            });
            router.push({ name: "login" });
          }
        });
      });
    }

    return {
      ...toRefs(state),
      createFormRef,
      rules,
      store,
      handleCreate,
    };
  },
};
</script>
