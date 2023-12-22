<script setup>
  import NavBar from "@/components/NavBar.vue";
  import {useUserStore} from "@/stores/users";
  import {reactive, ref, watch} from "vue";
  import {NSpin} from "naive-ui";
  import {storeToRefs} from "pinia";

  const loading = ref(false)
  const signUpSuccess = ref(false)

  const userStore = useUserStore()
  const {errorMessage, user} = storeToRefs(userStore);

  const userCredentials = reactive({
    username: "",
    password: ""
  })

  const signupClicked = async (credentials) => {
    loading.value = true;
    await userStore.handleSignup(credentials);
    loading.value = false;
    console.log(errorMessage.value)
    if ('data' in user.value) {
      signUpSuccess.value = true;
      console.log("user value is:")
      console.log(user.value.data)
    }
  }

</script>

<template>
  <NavBar/>
  <div class="main">
    <div class="tile-block">
      <h2>Welcome!</h2>
      <div v-if="user.data">
        <p>Username: {{user.data}}</p>
      </div>
      {{signUpSuccess}}
      {{loading}}
      <div class="line"></div>
        <div class="inputs"  v-if="!signUpSuccess">
          <div class="signup-wrapper">
            <h4 class="field-name">Username</h4>
            <input type="text" class="standard-input" v-model="userCredentials.username"/>
          </div>
          <div class="signup-wrapper">
            <h4 class="field-name">Password</h4>
            <input type="password" class="standard-input" v-model="userCredentials.password"/>
          </div>
          <div v-if="!signUpSuccess && errorMessage.value!==''">
            <p class="error-message"> {{ errorMessage }} </p>
          </div>
          <button v-if="!loading && !signUpSuccess" id="create-account" class="bigger-button" @click="signupClicked(userCredentials)">Create account</button>
          <div class="spinner" v-else>
            <NSpin size="medium"/>
          </div>
        </div>
        <div v-else>
          <div class="success-signup">Success!</div>
        </div>
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

.spinner {
  margin-top: 52px;
}

#create-account {
  margin-top: 48px;
}
</style>