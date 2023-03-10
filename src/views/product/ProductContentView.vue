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
      <div class="product-info">
        <div class="product-detail">
          <h1>{{ product.name }}</h1>
          <div class="rate-block">
            <el-rate v-model="value1" />
          </div>

          {{ product.price }}
          {{ product.stock }}
          {{ product.sell }}
        </div>
        <div class="product-description">
          {{ product.description }}
        </div>
      </div>
      <div class="product-order">
        <el-input-number v-model="count" size="large" />
        <div class="add-cart">
          <el-button @click="handleCart()">Add to cart</el-button>
        </div>
        <div class="add-cart">
          <el-button>Buy</el-button>
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
      count: 0,
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
}

div.product-overview {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

div.product-image-view {
  width: 100%;
  height: 100%;
}

div.product-image {
  width: 40%;
}
div.product-info {
  width: 30%;
}
div.product-order {
  width: 30%;
}
</style>
