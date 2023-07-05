import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlantsListView from "@/views/PlantsListView.vue";
import WateringView from "@/views/WateringView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/my-plants",
            name: "my-plants",
            component: PlantsListView
        },
        {
            path: "/watering",
            name: "watering",
            component: WateringView
        }
    ]
})

export default router;