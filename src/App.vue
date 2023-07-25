<script setup>
  import {RouterView} from "vue-router";
  import "@fontsource/open-sans";
  import "@fontsource/merriweather"
</script>

<template>
    <body>
      <RouterView/>
    </body>
</template>


<style scoped>
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
}

</style>
