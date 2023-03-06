<template>
    <div class="aside-view">
        <div class="aside-view">
          <div class="aside-header"></div>
      
          <div class="aside-main-content">
            <Aside-Category :categorylist="catagories"></Aside-Category>
          </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { listProductCategories } from "@/api/category";
import AsideCategory from "@/components/aside/AsideCategory.vue";

export default {
  name: "AsideComponent",
  components: {
    AsideCategory,
  },
  setup() {
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
      handleClickType,
      handleClickCatalog,
      catagories,
    };
  },
};
</script>

<style scoped>
div.aside-view {
    width: 100%;
  /* margin: 1.5rem 0 0 1.5rem; */
  padding: 2rem;
  height: 100%;
}

div.aside-header {
  margin-bottom: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(26, 31, 28, 0.08);
}
div.aside-main-content{
  margin-bottom: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(26, 31, 28, 0.08);
    width: 100%;
}
</style>
