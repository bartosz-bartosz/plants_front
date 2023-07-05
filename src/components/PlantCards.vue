<script setup>
  import "@fontsource/open-sans";
  import "@fontsource/montserrat"

  import axios from "axios";
  import {ref, watch} from "vue";
  import Card from "@/components/Card.vue";

  const apiURL = import.meta.env.VITE_BASEURL;
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;

  console.log(apiURL);

  const customRequest = axios.create({
      baseURL: apiURL,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });

  const handleLogin = () => {
      const data = new URLSearchParams();
      data.append('grant_type', '');
      data.append('username', username);
      data.append('password', password);

      customRequest
          .post('/token', data)
          .then(response=>{
              const token = response.data.access_token;
              localStorage.setItem("accessToken", token);
          })
          .catch(e=>console.log(e))
  };

  customRequest.interceptors.request.use(config=> {
      const accessToken = localStorage.getItem("accessToken");
      if(accessToken){
          config.headers["Authorization"]=accessToken;
      }
      return config;
  });

  const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
  }

  handleLogin()

  const plants = ref(null)
  const pagination = ref(0)
  const plants_response = await axios.get("https://api.hesitant.dev/plant?limit=4", config)
  plants.value = plants_response.data

  watch(pagination, async () => {
      const plants_res = await axios.get(`https://api.hesitant.dev/plant?limit=4&skip=${pagination.value * 4}`, config)
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