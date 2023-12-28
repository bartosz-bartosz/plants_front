import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlantsListView from "@/views/PlantsListView.vue";
import WateringView from "@/views/WateringView.vue";
import SignUpView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";

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
            name: "login",
            component: SignUpView
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView
        }
    ]
})

export default router;