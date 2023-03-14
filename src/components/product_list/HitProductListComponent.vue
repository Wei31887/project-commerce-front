<template>
  <div class="product-list-view">
    <div
      class="product-list"
      v-for="(item, index) in products"
      :key="index"
      @click="handleClick(item)"
    >
      <div class="product-card">
        <div class="pic">
          <img :src="BASE_API + '/' + item.image" :alt="item.name">
        </div>
        <div class="product-info">
          <div class="product-title">
            <h2>{{ item.name }}</h2>
          </div>
          <div class="product-price">
            <span>
              NT${{ item.price }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js"
import { onMounted, ref } from "vue";
import { listHitProducts } from "@/api/product";
import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

export default {
  name: "HitProductList",

  setup() {
    const router = useRouter();
    const productLimt = ref(8)
    const productList = reactive({
      products: [],
      categoryId: 0,
    });

    // methods
    function handleClick(item) {
      console.log(item)
      router.push({ name: "content", params: {"category": item.category_id, "id" : item.id}})
    }

    function loadingProduct() {
      listHitProducts({
        limit: productLimt.value,
      })
        .then((res) => {
          if (res.status == 200) {
            productList.products = res.data["product"];
            console.log(productList.products)
          } else {
            ElNotification({
              title: "Product",
              message: "Product",
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      loadingProduct();
    });

    return {
      ...toRefs(productList),
      handleClick,
      loadingProduct,
      BASE_API
    };
  },
};
</script>

<style scoped>
div.product-list-view {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

div.product-card {
  border-radius: 6px;
  width: 14rem;
  height: 22rem;
  margin: 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--product-card-color);
  box-shadow: 0 3px 6px rgba(29, 30, 29, 0.08);
}
div.product-card:hover {
  cursor: pointer;
  transition: 150ms;
  transform: translate3d(-1px, -3px, -2px);
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.08);
}

div.pic{
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-height: 100%; */
  overflow-y: hidden;
  flex: 5;
}
div.product-info{
  flex: 2;
  padding-bottom: 1rem;
}
</style>
