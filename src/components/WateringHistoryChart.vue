<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend,  CategoryScale, LinearScale, LineController, LineElement, PointElement, BarElement)

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12], backgroundColor: '#bbdaac'}],
})

const chartOptions = {
  responsive: true
}
</script>


<style scoped>
/* Add any custom styles here */
</style>
