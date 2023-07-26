<script setup>
  import NavBar from "@/components/NavBar.vue";
  import {useRoute} from "vue-router";
  import UserService from "@/services/user.service";

  const route = useRoute()

</script>

<template>
  <div class="container">
      <NavBar/>
      <div class="main">
        <h1>HOME</h1>
      </div>
  </div>
</template>

<style scoped>
.main {
    margin-top: 24px;
    width: 100%;
    min-height: 1200px;
    justify-content: center;
}

.main h1 {
    //border: #2c3e50 1px solid;
    color: #2c3e50;
    font-family: "Montserrat",sans-serif;
    font-size: 24px;
    text-align: center;

}
</style>