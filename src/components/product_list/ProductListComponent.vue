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
            <h1>{{ item.name }}</h1>
          </div>
          <div class="product-price">
            {{ item.price }}
          </div>
          <div class="product-stock">
            {{ item.stock }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js"
import { onMounted, ref } from "vue";
import { listProducts } from "@/api/product";
import { toRefs, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

export default {
  name: "ProductList",

  setup() {
    const router = useRouter();
    const total = ref(50);
    const PageState = reactive({
      pageSize: 8,
      currentPage: 0,
    });

    const currentTotal = computed(() => {
      return total.value;
    });

    const productList = reactive({
      products: [],
      categoryId: 0,
    });

    // methods
    function handleClick(item) {
      console.log(item)
      router.push({ name: "content", params: {"id" : item.id}})
    }

    function loadingProduct() {
      listProducts({
        limit: PageState.pageSize,
        offset: PageState.currentPage,
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
      ...toRefs(PageState),
      ...toRefs(productList),
      currentTotal,
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
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  /* border: 1px solid var(--border-color); */
  background-color: var(--product-card-color);
  box-shadow: 0 3px 6px rgba(29, 30, 29, 0.08);
}
div.product-card:hover {
  cursor: pointer;
  transition: 150ms;
  transform: translate3d(-1px, -3px, -2px);
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.08);
}
</style>
