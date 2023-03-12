<template>
  <div class="cart-content-view">
    <div class="cart-title">
      <el-col :span="8" class="name"
        ><span class="cart-list-title">Product Name</span></el-col
      >
      <el-col :span="4" class="price"
        ><span class="cart-list-title">Amount</span></el-col
      >
      <el-col :span="4" class="count"
        ><span class="cart-list-title">Count</span></el-col
      >
      <el-col :span="4" class="total-count"
        ><span class="cart-list-title">Total Amount</span></el-col
      >
      <el-col :span="3" class="operation"
        ><span class="cart-list-title">Operation</span></el-col
      >
    </div>
    <div class="cart-overview cart">
      <div
        class="cart-item-info"
        v-for="(item, index) in cartItems"
        :key="index"
      >
        <el-col :span="8" class="cart-item-detail-name cart-item">
          <h2>{{ item.name }}</h2>
        </el-col>
        <el-col :span="4" class="cart-item-detail-price cart-item">
          <span>${{ item.price * item.on_sell }}</span>
        </el-col>
        <el-col :span="4" class="cart-item-detail-count cart-item">
          <el-input-number v-model="item.count" size="medium" />
        </el-col>
        <el-col :span="4" class="total-count cart-item">
          <span>${{ item.price * item.on_sell * item.count }}</span>
        </el-col>
        <el-col :span="3" class="operation cart-item">
          <div class="cart-item-operation">
            <el-button
              text
              bg
              size="large"
              type="danger"
              @click="handleDelete(item.id)"
            >
              Delete
            </el-button>
          </div>
        </el-col>
      </div>
    </div>
    <div class="cart-order">
      <div class="order-info">
        <h3>Cart</h3>
        <el-col :span="6"
          ><el-statistic title="Total count" :value="total_cart.count"
        /></el-col>
        <el-col :span="6"
          ><el-statistic title="Total Price" :value="'$'+total_cart.amount"
        /></el-col>
      </div>
      <div class="order-operation">
        <el-button @click="handleOrder()">Order Now</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { listCartItems, deleteCartItem } from "@/api/cart";
import { addOrder } from "@/api/order";
import { useRouter } from "vue-router";
import { getAccessToken } from "@/utils/token";
import { ElNotification } from "element-plus";

export default {
  name: "CartView",
  setup() {
    const router = useRouter();
    const cartItems = ref([]);
    const purchaseState = reactive({
      orderItems: [],
    });

    const total_cart = computed(() => {
      let resCart = {
        count: 0,
        amount: 0,
      };
      cartItems.value.forEach((item) => {
        resCart.count += item.count;
        resCart.amount += parseFloat(item.price) * item.count;
      });
      return resCart;
    });

    function handleDelete(id) {
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

    function handleOrder() {
      const token = getAccessToken();
      if (!token) {
        router.push({ name: "login" });
        return;
      }
      addOrder({
        request_order_item: purchaseState.orderItems,
      })
        .then((res) => {
          if (res.status == 200) {
            ElNotification({
              title: "Success",
              type: "success",
              message: "Sucess to order",
            });
            router.push({ name: "order" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function loadingCart() {
      listCartItems().then((res) => {
        console.log(res)
        if (res.status == 200) {
          cartItems.value = res.data.products;
          cartItems.value.forEach((item) => {
            purchaseState.orderItems.push({
              product_id: item.product_id,
              count: item.count,
            });
          });
        } else if (res.status == 401) {
          router.push({ name: "login" });
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
      handleOrder,
      handleDelete,
      total_cart,
    };
  },
};
</script>

<style scoped>
.cart {
  border-radius: 6px;
  background-color: var(--cart-card-color);
  /* box-shadow: 0 3px 3px rgba(11, 12, 11, 0.08); */
  margin: 1rem 0rem;
}

span.cart-list-title {
  font-size: medium;
  font-weight: bold;
  margin: 1rem;
  padding: 1rem;
}
div.cart-content-view {
  padding: 2rem;
  position: relative;
}

div.cart-title {
  display: flex;
  flex-direction: row;
}

div.cart-item-info {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1rem 0;
}
div.cart-item-detail {
  display: flex;
  flex-direction: row;
}

div.cart-order {
  background-color: var(--cart-card-color);
  border-radius: 4px;
  display: flex;
  padding: 2rem;
  width: 40%;
  position: relative;
  right: 0;
  margin: 2rem 0;
  flex-direction: column;
}

div.order-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid;
}

div.order-operation {
  position: relative;
  right: 0;
  padding: 2rem 0 0 0;
}

div.cart-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
