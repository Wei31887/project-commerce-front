<template>
  <div class="order-content-view">
    <div class="order-overview order"></div>
    <div class="order-order order">
      <div class="order-info"></div>
      <div class="order-operation">
        <el-button>Check</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "OrderView",
  setup() {
    onMounted(() => {
    });
    return {};
  },
};
</script>
