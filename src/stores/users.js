import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { signUp } from "../services/apiService";

export const useUserStore =
    defineStore('users', () => {
    const user = ref({});
    const errorMessage = ref("");

    const clearUserStore = () => {
        errorMessage.value = ""
        user.value = {}
    }

    const handleLogin = () => {}

    const handleSignup = async (credentials) => {
        clearUserStore()
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
            const response = await signUp(username, password)
            if (response.error) {
                console.log('response error')
                errorMessage.value = response.error
            }
            else {
                console.log('no error, user returned')
                user.value = response.response
            }
        }
    }

    const handleLogout = () => {}

    const getUser = () => {}

    return { user, errorMessage, clearUserStore, handleLogin, handleSignup, handleLogout, getUser }
})