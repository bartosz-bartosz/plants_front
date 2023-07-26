<script setup>
  import NavBar from "@/components/NavBar.vue";
  import {useRoute} from "vue-router";
  import {defineComponent} from "vue";

  const route = useRoute()

  const isLoggedIn = function() {
    return this.$store.getters.isAuthenticated;
  };

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