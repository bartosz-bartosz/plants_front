<script setup>
import {useUserStore} from "@/stores/users";
import {onMounted, reactive, ref, watch} from "vue";
import {NSpin} from "naive-ui";
import {storeToRefs} from "pinia";
import router from "@/router/index";
import {sleepFor} from "@/services/dataParsing";

const loading = ref(false)
const signUpSuccess = ref(false)
const signupResponse = ref(null)

const userStore = useUserStore()
const {errorMessage, user} = storeToRefs(userStore);

const userCredentials = reactive({
  username: "",
  password: ""
})

// onMounted(() => {
//   userStore.clearUserStore()
// })
const signupClicked = async (credentials) => {
  loading.value = true;
  signupResponse.value = await userStore.handleSignup(credentials);
  loading.value = false;
  console.log(errorMessage.value)
  if (signupResponse.value) {
    signUpSuccess.value = true;
    console.log("user value is:")
    console.log(signupResponse.value.data)
    await userStore.handleLogin(credentials)
    sleepFor(3000).then(() => {
      router.push({name: 'home'});
    });
  }
}

</script>

<template>
<div class="tile-block">

      <div class="tile-header">
        <h2>Create account</h2>
        <div class="line"></div>
      </div>

      <div class="tile-body">
        <div class="inputs" v-if="!signUpSuccess">
          <div class="signup-wrapper">
            <h4 class="field-name">Username</h4>
            <input type="text" class="standard-input" v-model="userCredentials.username"/>
          </div>
          <div class="signup-wrapper">
            <h4 class="field-name">Password</h4>
            <input type="password" class="standard-input" v-model="userCredentials.password" @keyup.enter="signupClicked(userCredentials)"/>
          </div>
          <div v-if="!signUpSuccess && errorMessage.value!==''">
            <p class="error-message"> {{ errorMessage }} </p>
          </div>
          <button v-if="!loading && !signUpSuccess" id="create-account" class="bigger-button" @click="signupClicked(userCredentials)">Create account</button>
          <div v-else class="spinner">
            <NSpin size="medium"/>
          </div>
        </div>
        <Transition>
          <div v-if="signUpSuccess && !loading" class="success-signup">
            <font-awesome-icon icon="fa-circle-check" class="success-icon"/>
            <p class="success-text">Success!</p>
          </div>
        </Transition>

      </div>
      <div class="tile-footer">
        <Transition>
          <p v-if="signUpSuccess && !loading">You will be redirected soon...</p>
        </Transition>

        <div v-if="user?.username">
          <p>Username: {{ user.username }}</p>
        </div>
        <!--        {{ signUpSuccess }}-->
        <!--        {{ loading }}-->
      </div>
    </div>
</template>

<style scoped>
.tile-block {
  min-width: 320px;
  min-height: 400px;
  border-radius: 10px;
  background-color: #ffffff;
  border: #3C6255 solid 1px;
  box-shadow: 4px 8px 20px rgba(22, 31, 19, 0.39);
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.tile-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 320px;
}

.tile-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;

}

.tile-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;

}

.signup-wrapper {
  margin-top: 12px;
  width: 320px;
  display: flex;
  flex-direction: column;
}

.field-name {
  width: 320px;
  display: flex;
  flex-direction: row;
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

.spinner {
  margin-top: 52px;
}

.success-signup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#create-account {
  margin-top: 48px;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
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