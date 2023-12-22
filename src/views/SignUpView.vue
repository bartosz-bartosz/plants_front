<script setup>
import NavBar from "@/components/NavBar.vue";
import SignUp from "@/components/SignUp.vue";


</script>

<template>
  <NavBar/>
  <div class="main">
    <SignUp/>
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
</style>