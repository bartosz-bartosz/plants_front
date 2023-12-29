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
    <div id="profile-info">
      <p>{{ userStore.user.username }}</p>
      <p>{{ userStore.user }}</p>
    </div>
    <button class="bigger-button" @click="userStore.handleLogout()">Log out</button>
  </div>
</template>

<style scoped>

#profile-info {
  display: flex;
  flex-direction: column;
  margin: auto;
}

</style>