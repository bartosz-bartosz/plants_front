import { ref } from 'vue'
import { defineStore } from 'pinia'
import { signUp } from "../services/apiService";

export const useUserStore =
    defineStore('users', () => {
    const user = ref({});
    const errorMessage = ref("")

    const handleLogin = () => {}

    const handleSignup = async (credentials) => {
        const {username, password} = credentials

        console.log(username, password)

        if(username.length < 4){
            console.log('username errror')
            errorMessage.value = "Username must be at least 4 characters."
        }

        else if(password.length < 6){
            errorMessage.value = "Password must be at least 6 characters."
        }

        else {
            console.log('signup credentials ok')
            user.value = await signUp(username, password)
        }
    }

    const handleLogout = () => {}

    const getUser = () => {}


    return { user, errorMessage, handleLogin, handleSignup, handleLogout, getUser }
})