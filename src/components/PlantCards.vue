<script setup>
  import "@fontsource/open-sans";
  import "@fontsource/montserrat"

  import axios from "axios";
  import { ref, watch, onMounted} from "vue";
  import Card from "@/components/Card.vue";

  const apiURL = import.meta.env.VITE_BASEURL;
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;


  // Clear localStorage to debug acquiring token
  // localStorage.clear()

  const customRequest = axios.create({
      baseURL: apiURL,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });

  const getToken = async () => {
      const data = new URLSearchParams();
      data.append('grant_type', '');
      data.append('username', username);
      data.append('password', password);
      console.log('Performing token request...')

      try {
          const response = await customRequest.post('/token', data);
          const token = response.data.access_token;
          localStorage.setItem('accessToken', token);
          return token;
      } catch (error) {
          console.error(error);
          throw new Error('Token request failed.');
      }
  };

  const fetchData = async (endpoint) => {
      try {
          let token = localStorage.getItem('accessToken');
          if (!token) {
              token = await getToken();
          }
          const config = {
              headers: {Authorization: `Bearer ${token}`}
          };
          const response = await axios.get(endpoint, config);
          console.log(response.data);

          return response;
      } catch (error) {
          console.error(error);
      }
  };


  const plants = ref(null)
  let pagination = ref(0)

  onMounted(async () =>{
      console.log('mounted')
      const plants_res = await fetchData(apiURL+`plant?limit=4&skip=${pagination.value*4}`)
      plants.value = plants_res.data
  });


  watch(pagination, async () => {
      const plants_res = await fetchData(apiURL+`plant?limit=4&skip=${pagination.value*4}`);
      plants.value = plants_res.data
  });

</script>

<template>
  <div class="main">
    <div class="cards">
      <Card
        v-for="plant in plants" :key="plant.id"
        :name="plant.name"
        :species="plant.species"
        :last_watering="plant.last_watering"
        :watering_frequency="plant.watering_frequency"
      />
    </div>
    <div class="pagination">
      <button @click="pagination--">&lt</button>
        <p>{{ pagination }}</p>
      <button @click="pagination++">></button>
    </div>
  </div>

</template>


<style scoped>

.cards {
    width: 80%;
    margin: 60px auto auto;
    display: flex;
    justify-content: space-around;
}

.plants-container {
    margin: auto;
    min-height: 50%;
    width: 80%;
    border: #2c3e50 1px solid;
    border-radius: 10px;
}

.pagination {
    margin: 48px auto;
    display: flex;
    justify-content: center;
    column-gap: 12px;
}
</style>