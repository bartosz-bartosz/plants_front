<script setup>

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

      <!-- Add Plant Button (Placeholder) -->
      <button @click="addPlant" class="add-plant-button">Add Plant!</button>
    </form>
  </div>
</template>

<style scoped>

.card {
  margin-top: 36px;
}

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .input-group label {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: #3C6255;
    margin-bottom: 5px;
  }

  .optional-text {
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    color: #AABBB1;
    margin-left: 5px;
  }

.add-plant-button {
  /* Add your button styling here */
}

</style>