<template>
  <div class="container">
    <!-- header -->
    <header class="header">
      <Header-Component></Header-Component>
    </header>
    <main class="content-container">
      <router-view></router-view>
    </main>
    <!-- footer -->
    <footer class="footer">
      <Footer-Component></Footer-Component>
    </footer>
  </div>
</template>

<script>
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {},
};
</script>

<style>
div.container {
  position: relative;
  height: 100%;
  background-color: var(--background-color);
}

header.header {
  z-index: 5;
  position: sticky;
  top: 0px;
  height: var(--header-height);
}

main.content-container {
  position: relative;
  z-index: 1;
  min-height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 100%;
  position: relative;
  background-color: var(--background-color);
}

div.page-header {
  z-index: 4;
  width: 100%;
}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}
</style>
