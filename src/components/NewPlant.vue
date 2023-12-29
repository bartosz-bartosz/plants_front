<script setup>

import router from "../router/index.js";
</script>

<template>
  <div class="card">
    <div class="title-card-section">
      <h2>New Plant</h2>
      <div class="line"></div>
    </div>
    <form>
      <!-- Plant Name -->
      <div class="input-group">
        <label for="plantName">Name</label>
        <input type="text" id="plantName" class="standard-input"/>
      </div>

      <!-- Scientific Name -->
      <div class="input-group">
        <label for="scientificName">Scientific Name</label>
        <input type="text" id="scientificName" class="standard-input"/>
      </div>

      <!-- Acquire Date -->
      <div class="input-group">
        <label for="acquireDate">Acquire Date<span class="optional-text">(Optional)</span></label>
        <input type="date" id="acquireDate" class="standard-input"/>
      </div>

      <!-- Watering Frequency -->
      <div class="input-group">
        <label for="wateringFrequency">Watering Frequency (days)</label>
        <input type="number" id="wateringFrequency" class="standard-input"/>
      </div>

      <!-- Last Watering Date (Optional) -->
      <div class="input-group">
        <label for="lastWateringDate">Last Watering Date <span class="optional-text">(Optional)</span></label>
        <input type="date" id="lastWateringDate" class="standard-input"/>
      </div>
      <div class="buttons-group">
        <!-- Add Plant Button (Placeholder) -->
        <button @click="router.push({name: 'my-plants'})" class="secondary-button">Go back</button>
        <button @click="addPlant" class="bigger-button">Add Plant!</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.card {
  margin-top: 36px;
  padding: 2rem 4rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-group label {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #3C6255;
  margin-bottom: 5px;
  align-self: flex-start;
}

.optional-text {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: #AABBB1;
  margin-left: 5px;
}

.buttons-group {
  //border: 1px solid red;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.add-plant-button {
  /* Add your button styling here */
}

</style>