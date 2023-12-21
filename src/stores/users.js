import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { signUp } from "../services/apiService";

export const useUserStore =
    defineStore('users', () => {
    const user = ref({});
    const errorMessage = ref("")

    const handleLogin = () => {}

    const handleSignup = (credentials) => {
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
            signUp(username, password).then(() =>
            {user.value})
        }

        return 1
    }

    watch(() => errorMessage.value, () => {
        console.log(errorMessage.value)
    })

    const handleLogout = () => {}

    const getUser = () => {}

    return { user, errorMessage, handleLogin, handleSignup, handleLogout, getUser }
})