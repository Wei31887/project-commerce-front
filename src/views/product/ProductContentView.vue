<template>
  <div class="product-content-view">
    <div class="product-overview">
      <div class="product-image">
        <img
          class="product-image-view"
          :src="BASE_API + '/' + product.image"
          :alt="product.name"
        />
      </div>
      <div class="product-detail-order">
        <div class="product-info">
          <div class="product-detail">
            <div class="product-detail-name">
              <h1>{{ product.name }}</h1>
            </div>
            <div class="rate-stock">
              <el-rate v-model="value1" />
              <el-divider direction="vertical" />
              <span>{{ product.sell }} Sold</span>
              <el-divider direction="vertical" />
              <span>{{ product.sell }} Comments</span>
            </div>
            <el-divider />
            <div
              v-if="product.on_sell == 1"
              class="product-detail-price product-detail-item"
            >
              <span class="price">${{ product.price }}</span>
            </div>
            <div v-else class="product-detail-price product-detail-item">
              <span class="origin-price">${{ product.price }}</span>
              <span class="price">${{ product.price * product.on_sell }}</span>
              <span class="on-sell">{{ product.on_sell }}折</span>
            </div>
            <div class="product-detail-description product-detail-item">
              <div class="detail-title">Description</div>
              <div class="description">
                {{ product.description }}
              </div>
            </div>
            <div class="product-detail-count product-detail-item">
              <div class="detail-title">Count</div>
              <div class="count">
                <el-input-number v-model="count" size="large" />
                <span class="stock">we still have: {{ product.stock }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="product-order">
          <div class="add-cart button">
            <el-button size="large" @click="handleCart()"
              >Add to cart</el-button
            >
          </div>
          <div class="buy button">
            <el-button type="primary" size="large">Buy</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-comment"></div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js";
import { GetProducts } from "@/api/product";
import { addCartItem } from "@/api/cart";
import { ref, onMounted, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { getAccessToken } from "@/utils/token";

export default {
  name: "ProductContentView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref({});
    const purcahseState = reactive({
      count: 1,
      productId: 0,
    });

    function handleCart() {
      const token = getAccessToken();
      if (!token) {
        router.push({ name: "login" });
        return;
      }
      if (purcahseState.count <= 0) {
        return;
      }
      addCartItem({
        add_items: [
          {
            product_id: purcahseState.productId,
            count: purcahseState.count,
          },
        ],
      })
        .then((res) => {
          if (res.status == 200) {
            ElNotification({
              title: "Success",
              type: "success",
              message: "Sucess to add to cart",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function loadingProduct(data) {
      GetProducts({ product_id: data }).then((res) => {
        if (res.status == 200) {
          product.value = res.data.product;
          purcahseState.productId = res.data.product["id"];
        }
      });
    }

    onMounted(() => {
      loadingProduct(parseInt(route.params.id));
    });

    return {
      ...toRefs(purcahseState),
      product,
      BASE_API,
      handleCart,
    };
  },
};
</script>

<style scoped>
div.product-content-view {
  padding: 2rem;
  height: 100%;
}

div.product-overview {
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: var(--product-background-color);
  width: 100%;
  min-height: 80vh;
  border-radius: 6px;
}

div.product-image {
  position: relative;
  left: 0;
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.product-image-view {
  width: 100%;
  height: 100%;
}

div.product-detail-name {
  text-align: start;
}

div.product-detail-item {
  display: flex;
  flex-direction: row;
  padding: 0 2rem 2rem 0;
}

div.detail-title {
  text-align: start;
  width: 200px;
}

div.product-detail-order {
  display: flex;
  flex-direction: column;
  flex: 5;
  padding: 2rem;
}

div.rate-stock {
  display: flex;
  align-items: center;
}

div.product-detail-price {
  background-color: var(--background-color);
  padding: 2rem;
  margin: 0 1rem 1rem 0rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

div.product-order {
  display: flex;
  flex-direction: row;
}

.origin-price {
  text-decoration: line-through;
}

.price {
  font-size: larger;
  color: rgb(33, 52, 80);
  font-weight: bold;
  padding: 0 1rem;
}

.on-sell {
  font-size: larger;
  color: rgb(33, 52, 80);
  font-weight: bold;
}
.stock{
  padding: 1rem;
}

.button {
  padding: 1rem 1rem 1rem 0;
}

</style>
