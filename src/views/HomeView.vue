<script setup>
import NavBar from "@/components/NavBar.vue";
import SignUp from "@/components/SignUp.vue";
import LogIn from "@/components/LogIn.vue";

import {useUserStore} from "@/stores/users";
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import router from "../router";

const route = useRoute()
const showSignup = ref(true)
const showLogin = ref(true)

const userStore = useUserStore();
const token = localStorage.getItem('accessToken');

onMounted(() => {
  if (!userStore.user) {
    router.push({name: 'signup'});
  }
})
// let user_data = ref(null)
// onMounted(async () =>{
//   const user_res = await fetchData(apiURL+`users/me`);
//   user_data.value = user_res.data.username
// });




</script>

<template>
  <div class="container">
    <NavBar/>
    <div class="main">
      <h1>HOME</h1>
      <h2 v-if="!showSignup && !showLogin" class="user-welcome">Welcome, {{ userStore.user.username }}!</h2>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 24px;
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.main h1 {
//border: #2c3e50 1px solid; color: #161f13;
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
}

.user-welcome {
  text-align: center;
  margin: 24px auto auto;
}
</style>