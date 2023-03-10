<template>
  <div class="cart-content-view">
    <div class="cart-title cart">
      <el-col :span="1" class="select"></el-col>
      <el-col :span="8" class="name"><h3>Product Name</h3></el-col>
      <el-col :span="4" class="price"><h3>Amount</h3></el-col>
      <el-col :span="4" class="count"><h3>Count</h3></el-col>
      <el-col :span="4" class="total-count"><h3>Total Amount</h3></el-col>
      <el-col :span="3" class="operation"><h3>Operation</h3></el-col>
    </div>
    <div class="cart-overview cart">
      <div
        class="cart-item-info"
        v-for="(item, index) in cartItems"
        :key="index"
      >
        <el-col :span="1" class="cart-item-detail-select">
          <el-radio-group v-model="item.id">
            <el-radio label="1" size="large">Select</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8" class="cart-item-detail-name">
          <h1>{{ item.name }}</h1></el-col
        >
        <el-col :span="4" class="cart-item-detail-price"
          ><h3>{{ item.price * item.on_sell }}</h3></el-col
        >
        <el-col :span="4" class="cart-item-detail-count"
          ><el-input-number v-model="item.count" size="large"
        /></el-col>
        <el-col :span="4" class="total-count"></el-col>
        <el-col :span="3" class="operation">
          <div class="cart-item-operation">
            <el-button @click="handleDelete(item.id)">Delete Item</el-button>
          </div>
        </el-col>
      </div>
    </div>
    <div class="cart-order cart">
      <div class="order-info">
        <el-statistic title="Total Price" :value="amount" />
        <el-statistic title="Total count" :value="count" />
      </div>
      <div class="order-operation">
        <el-button @click="handleCart()">Order</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js";
import { ref, onMounted, reactive, toRefs } from "vue";
import { listCartItems, deleteCartItem } from "@/api/cart";
import { useRouter } from "vue-router";
import { getAccessToken } from "@/utils/token";
import { ElNotification } from "element-plus";

export default {
  name: "CartView",
  setup() {
    const router = useRouter();
    const cartItems = ref([]);
    const purchaseState = reactive({
      count: 0,
      amount: 0,
      orderItem: [],
    });

    function handleDelete(id) {
      console.log(id);
      deleteCartItem({ cart_item_id: id })
        .then((res) => {
          if (res.status == 200) {
            ElNotification({
              title: "Success",
              type: "success",
              message: "Sucess to delete the item",
            });
            loadingCart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function handleCart() {
      const token = getAccessToken();
      if (!token) {
        router.push({ name: "login" });
        return;
      }
    }

    function loadingCart() {
      listCartItems().then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          cartItems.value = res.data.products;
        }
      });
    }

    onMounted(() => {
      loadingCart();
    });

    return {
      ...toRefs(purchaseState),
      cartItems,
      BASE_API,
      handleCart,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.cart {
  border-radius: 6px;
  background-color: var(--blog-card-color);
  box-shadow: 0 3px 6px rgba(11, 12, 11, 0.2);
}
div.cart-content-view {
  padding: 2rem;
}

div.cart-title {
  display: flex;
  flex-direction: row;
}

div.cart-item-info {
  display: flex;
  flex-direction: row;
  width: 100%;
}
div.cart-item-detail {
  display: flex;
  flex-direction: row;
}

div.cart-order {
  display: flex;
  flex-direction: row;
}
div.order-info {
  display: flex;
  flex-direction: row;
}

div.cart-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
