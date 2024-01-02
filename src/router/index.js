import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlantsListView from "@/views/PlantsListView.vue";
import SignUpView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import AddPlantView from "../views/AddPlantView.vue";
import PlantOverview from "../views/PlantOverview.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/my-plants",
            name: "my-plants",
            component: PlantsListView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/plant/:id",
            name: "plant",
            component: PlantOverview,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: SignUpView
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/new-plant",
            name: "new-plant",
            component: AddPlantView
        }
    ]
})


export default router;