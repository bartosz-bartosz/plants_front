import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore =
    defineStore('users', () => {
    const user = ref(null);
    const errorMessage = ref("")

    const handleLogin = () => {}

    const handleSignup = (credentials) => {
        const {username, password} = credentials

        if(username.length < 6){
            console.log('tooshort username')
            return errorMessage.value = "Username too short."
        }

        if(password.length < 6){
            console.log('tooshort password')
            return errorMessage.value = "Password too short."
        }

        else {
            console.log('signup credentials ok')
        }
    }

    const handleLogout = () => {}

    const getUser = () => {}


    return { user, errorMessage, handleLogin, handleSignup, handleLogout, getUser }
})