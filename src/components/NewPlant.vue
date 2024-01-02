<script setup>
import router from "../router/index.js";
import {ref, reactive, toRaw} from "vue";
import {createPlant} from "../services/apiService";
import {useUserStore} from "../stores/users";

const userStore = useUserStore()
const creationFormError = ref(null)

const todayDate = new Date().toISOString().slice(0, 10)

const newPlantData = reactive({
  user_id: userStore.user.id,
  name: "",
  acquire_time: todayDate,
  is_alive: 1,
  species: "",
  watering_frequency: 7
})

const addPlant = async (plantData) => {
  console.log('ADDING PLANT');
  console.log(toRaw(newPlantData));

  creationFormError.value = null

  if (plantData.name.length <= 2) {
    creationFormError.value = 'Name too short.'
  } else if (plantData.name.length > 100) {
    creationFormError.value = 'Name too long.'
  }

  if (!creationFormError.value) {

    const response = await createPlant(plantData);
    if (response.status === 201) {
      console.log('success creating plant');
      await router.push({name: 'my-plants'})
    }
  }
}

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
        <input type="text" id="plantName" class="standard-input" v-model="newPlantData.name"/>
      </div>

      <!-- Scientific Name -->
      <div class="input-group">
        <label for="scientificName">Scientific Name<span class="optional-text">OPTIONAL</span> </label>
        <input type="text" id="scientificName" class="standard-input" v-model="newPlantData.species"/>
      </div>

      <!-- Acquire Date -->
      <div class="input-group">
        <label for="acquireDate">Acquire Date<span class="optional-text">OPTIONAL</span></label>
        <input type="date" id="acquireDate" :max="todayDate" class="standard-input" v-model="newPlantData.acquire_time"/>
        <!--        <VueDatePicker v-model="newPlantData.acquire_time" :enable-time-picker="false" :preview-format="'dd - MM - yyyy'"></VueDatePicker>-->
      </div>

      <!-- Watering Frequency -->
      <div class="input-group">
        <label for="wateringFrequency">Watering Frequency (days)</label>
        <input type="number" id="wateringFrequency" class="standard-input" min="1" v-model="newPlantData.watering_frequency"/>
      </div>


      <!-- Error display group-->
      <div v-if="creationFormError">
        <p class="error-message">{{ creationFormError }}</p>
      </div>
      <div class="buttons-group">
        <!-- Add Plant Button (Placeholder) -->
        <button @click="router.push({name: 'my-plants'})" class="secondary-button">Go back</button>
        <button @click="addPlant(newPlantData)" type="button" class="bigger-button">Add Plant!</button>
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
  margin-bottom: 8px;
  align-self: flex-start;
}

.optional-text {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: #AABBB1;
  margin-left: 5px;
}

.buttons-group {
//border: 1px solid red; margin-top: 36px; display: flex; flex-direction: row;
  justify-content: space-evenly;
}

.add-plant-button {
  /* Add your button styling here */
}

</style>