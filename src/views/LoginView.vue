<script setup>
import NavBar from "@/components/NavBar.vue";
import SignUp from "@/components/SignUp.vue";
import {onMounted, ref} from "vue";
import LogIn from "../components/LogIn.vue";
import {sleepFor} from "../services/dataParsing";
import {useUserStore} from "../stores/users";
import router from "../router/index.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const showSignup = ref(false)
const showLogin = ref(true)

onMounted(async () => {
  await userStore.getUser()
  if (userStore.user) {
    console.log("user logged in, redirecting to /profile")
    await router.push({name: 'profile'})
  }
})

const switchTiles = async () => {
  if (showSignup.value) {
    showSignup.value = !showSignup.value
    await sleepFor(500);
    showLogin.value = !showLogin.value
  }
  else {
    showLogin.value = !showLogin.value
    await sleepFor(500);
    showSignup.value = !showSignup.value
  }
}

</script>

<template>
  <NavBar/>
  <div class="main">
    <div class="tiles">
      <Transition>
        <SignUp v-if="showSignup"/>
      </Transition>
      <Transition>
        <LogIn v-if="showLogin"/>
      </Transition>
    </div>
    <p v-if="showSignup" class="small-clickable-text" id="login-signup-switch" @click="switchTiles">I have an account already</p>
    <p v-if="showLogin" class="small-clickable-text" id="login-signup-switch" @click="switchTiles">I don't have an account</p>
  </div>

</template>

<style scoped>

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.tiles {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#login-signup-switch {
  margin-top: 36px;
}


.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0);
}

.v-enter-to,
.v-leave-from {
  transform: scale(1)
}

</style>