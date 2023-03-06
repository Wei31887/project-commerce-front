<template>
    
    <div class="footer">
        <p>Copyright © {{year}} by WeiTim. All rights reserved</p>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
setup() {
    const year = ref()
    onMounted(() => {
        year.value = new Date().getFullYear()
    })
    return {
        year
    }
}
}
</script>

<style scoped>
div.footer {
    background-color: var(--footer-color);
    /* color: white; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}
</style>