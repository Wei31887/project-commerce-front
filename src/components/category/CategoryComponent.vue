<template>
  <div class="category-view">
    <div
      class="category-list"
      v-for="(item, index) in catagories"
      :key="index"
      @click="handleClick(item)"
    >
      <div class="category-card">
        <div class="pic"></div>
        <div class="category-info">
          <div class="category-title">
            <h2>{{ item.name }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { listProductCategories } from "@/api/category";
import { useRouter } from "vue-router";

export default {
  name: "CategoryComponent",
  setup() {
    const router = useRouter()
    const chooseType = ref(true);
    const catagories = ref([]);

    // methods

    function loadingCategory() {
      listProductCategories()
        .then((res) => {
          if (res.status == 200) {
            catagories.value = res.data["categories"];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function handleClick(item) {
      console.log(item);
      router.push({ name: "category", params: {"category": item.id}});
    }

    function handleClickType() {
      if (!chooseType.value) {
        chooseType.value = !chooseType.value;
      }
    }
    function handleClickCatalog() {
      if (chooseType.value) {
        chooseType.value = !chooseType.value;
      }
    }

    // mounted
    onMounted(() => {
      loadingCategory();
    });

    return {
      chooseType,
      handleClick,
      handleClickType,
      handleClickCatalog,
      catagories,
    };
  },
};
</script>

<style scoped>
div.category-view {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

div.category-card {
  border-radius: 6px;
  width: 12rem;
  height: 6rem;
  padding: 2rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--category-card-color);
  box-shadow: 0 3px 6px rgba(29, 30, 29, 0.08);
}
div.category-card:hover {
  cursor: pointer;
  transition: 150ms;
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.08);
}
</style>
