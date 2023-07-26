<script setup>
  import NavBar from "@/components/NavBar.vue";
  import Login from "@/components/Login.vue";

</script>

<template>
  <NavBar/>
  <div class="container">
      <Login />
  </div>
</template>

<style scoped>
  .container p {
      display: flex;
      justify-content: center;
  }
</style>