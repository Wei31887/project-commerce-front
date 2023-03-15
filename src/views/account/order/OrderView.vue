<template>
  <div class="order-content-view">
    <div class="order-list-container">
      <div class="order-info-title">
        <el-col :span="10" class="id"
          ><span class="order-list-id">Order ID</span></el-col
        >
        <el-col :span="3" class="count"
          ><span class="order-list-count">Total count</span></el-col
        >
        <el-col :span="4" class="amount"
          ><span class="order-list-amount">Total Amount</span></el-col
        >
        <el-col :span="3" class="status"
          ><span class="order-list-status">Status</span></el-col
        >
        <el-col :span="4" class="operation"
          ><span class="order-list-operation">Pay</span></el-col
        >
      </div>
      <div class="order-list" v-for="(item, key) in orderList" :key="key">
        <div class="order-info-detail">
          <el-col :span="10" class="id"
            ><span class="order-detail-id">{{ item.id }}</span></el-col
          >
          <el-col :span="3" class="count"
            ><span class="order-detail-count">{{
              item.total_count
            }}</span></el-col
          >
          <el-col :span="4" class="amount"
            ><span class="order-detail-amount"
              >NT${{ item.total_amount }}</span
            ></el-col
          >
          <el-col :span="3" class="status"
            ><span class="order-detail-status">
              <el-tag class="mx-1" size="large" v-if="item.is_paied == false">
                Not Paied
              </el-tag>
              <el-tag class="mx-1" size="large" v-else> Paied </el-tag>
            </span></el-col
          >
          <el-col :span="4" class="operation"
            ><span class="order-detail-operation">
              <el-button type="danger" v-if="item.is_paied == false"
                >Pay</el-button
              >
              <el-button type="danger" v-else disabled>Pay</el-button>
            </span></el-col
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { listOrder } from "@/api/order.js";

export default {
  name: "OrderView",
  setup() {
    const orderList = ref([]);
    function loadingOrder() {
      listOrder()
        .then((res) => {
          if (res.status == 200) {
            orderList.value = res.data.orders;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    onMounted(() => {
      loadingOrder();
    });
    return {
      orderList,
    };
  },
};
</script>

<style scoped>
div.order-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
div.order-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
}
div.order-info-title {
  width: 100%;
  display: flex;
  flex-direction: row;
}
div.order-info-detail {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
