<script setup>
import NavBar from "../components/NavBar.vue";
import {useUserStore} from "../stores/users";
import {onMounted} from "vue";
import router from "../router/index";

const userStore = useUserStore();

// onMounted(() => {
//   if (!userStore.user) {
//     router.push({name: 'signup'});
//   }
// })

</script>

<template>
  <NavBar/>
  <div v-if="userStore.user" class="main">
    {{ userStore.user.username}}
    <button class="bigger-button" @click="userStore.handleLogout()">Log out</button>
  </div>
</template>

<style scoped>

</style>