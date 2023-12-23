<script setup>
import NavBar from "@/components/NavBar.vue";
import SignUp from "@/components/SignUp.vue";
import {ref} from "vue";
import LogIn from "../components/LogIn.vue";

const signupOrLogin = ref(true)

</script>

<template>
  <NavBar/>
  <div class="main">
    <SignUp v-if="signupOrLogin"/>
    <LogIn v-if="!signupOrLogin"/>
    <p v-if="signupOrLogin" class="small-clickable-text" id="login-signup-switch" @click="signupOrLogin = !signupOrLogin">I have an account already</p>
    <p v-if="!signupOrLogin" class="small-clickable-text" id="login-signup-switch" @click="signupOrLogin = !signupOrLogin">I don't have an account</p>
  </div>
</template>

<style scoped>

.main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#login-signup-switch {
  margin-top: 36px;
}
</style>