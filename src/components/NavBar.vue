<script setup>
  import "@fontsource/montserrat"
  import {RouterLink} from "vue-router";
</script>

<template>
    <div class="navbar">
      <RouterLink to="/" tag="h1" class="logo">Plants</RouterLink>
      <div class="links">
      <RouterLink to="/" :class="{'link': true, 'active': $route.path === '/'}">HOME</RouterLink>
      <RouterLink to="/my-plants" :class="{'link': true, 'active': $route.path === '/my-plants'}">PLANTS</RouterLink>
      <RouterLink to="/watering" :class="{'link': true, 'active': $route.path === '/watering'}">WATERING</RouterLink>
      </div>
    </div>
</template>

<style scoped>
  .navbar {
      border-radius: 10px;
      padding: 10px 5%;
      height: 80px;
      justify-content: space-between;
      align-items: center;
      display: flex;
  }

  .links {
    display: flex;
  }

  .links .link {
      font-family: "Montserrat", sans-serif;
      font-weight: bold;
      padding-left: 10px;
      padding-right: 10px;
      text-decoration: none;
      color: #333;
      cursor: pointer;
      padding-bottom: 10px ;
      border-bottom: #EDF1D6 8px solid;
  }

  .links .link:hover {
      border-bottom-color: #40513B;
  }

  .links .link.active {
  border-bottom-color: #40513B;
  }

  .logo {
      font-family: SansSerif,serif;
      font-size: 36px;
      font-weight: bold;
      text-decoration: none;
      color: #40513B;
      padding-bottom: 10px;
      border-bottom: #EDF1D6 8px solid;
      cursor: pointer;
  }

  .logo:hover {
      border-bottom-color: #40513B;
  }

</style>