<script setup>
  import NavBar from "@/components/NavBar.vue";
  import {useUserStore} from "@/stores/users";
  import {reactive, ref} from "vue";
  import {storeToRefs} from "pinia";

  const userStore = useUserStore()

  const {errorMessage, handleSignup} = storeToRefs(userStore);

  // const userCredentials = ref(null)
  const userCredentials = reactive({
    username: "",
    password: ""
  })
</script>

<template>
  <NavBar/>
  <div class="main">
    <div class="tile-block">
      <h2>Welcome!</h2>
      {{userCredentials.username}}
      {{userCredentials.password}}
      <div class="line"></div>
      <div class="signup-wrapper">
        <h4 class="field-name">Username</h4>
        <input type="text" class="standard-input" v-model="userCredentials.username"/>
      </div>
      <div class="signup-wrapper">
        <h4 class="field-name">Password</h4>
        <input type="text" class="standard-input" v-model="userCredentials.password"/>
      </div>
      <button id="create-account" class="bigger-button" @click="handleSignup(userCredentials)">Create account</button>
    </div>
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

.tile-block {
    min-width: 320px;
    max-width: 40%;
    min-height: 400px;
    border-radius: 10px;
    background-color: #ffffff;
    //border: #3C6255 solid 1px;
    box-shadow: 4px 8px 20px rgba(22, 31, 19, 0.39);
    padding: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.signup-wrapper {
  margin-top: 12px;
  width: 90%;
  display: flex;
  flex-direction: column;
}

input {

}

.field-name {
  align-self: flex-start;
  margin-bottom: 12px;
}

h2 {
  margin-top: 12px;
  margin-bottom: 0;
}

h4 {
  margin-top: 8px;
}

.line {
    margin-top: 10px;
  margin-bottom: 16px;
    height: 1px;
    width: 60%;
    background-color: #161f13;
}

#create-account {
  margin-top: 48px;
}
</style>