<script setup>
import {RouterView} from "vue-router";
import {onMounted, ref} from "vue";
import "@fontsource/open-sans";
import "@fontsource/merriweather"
import {useUserStore} from "./stores/users";
import router from "./router";

const userStore = useUserStore()

onMounted(async () => {
  // await userStore.getUser();
  if (!userStore.user) {
    await router.push({name: 'login'});
  }
})

</script>

<template>
  <body>
  <RouterView/>
  </body>
</template>


<style scoped>
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
}

</style>
