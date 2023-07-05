<script setup>

  import NavBar from "@/components/NavBar.vue";
  import PlantCard from "@/components/PlantCards.vue";

</script>

<template>
  <NavBar/>
  <div class="main">
  <h1>PLANTS</h1>
    <Suspense>
        <template #default>
          <PlantCard/>
        </template>
        <template #fallback>
          <p> Loading...</p>
        </template>
    </Suspense>
  </div>
</template>

<style scoped>

template {
    margin: auto;
}

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

p {
    margin: auto;
}

</style>