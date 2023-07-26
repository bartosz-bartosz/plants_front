import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlantsListView from "@/views/PlantsListView.vue";
import WateringView from "@/views/WateringView.vue";
import LoginView from "@/views/LoginView.vue";

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
        },
        {
            path: "/login",
            name: "Login",
            component: LoginView
        }
    ]
})

export default router;