import {ref, watch} from 'vue'
import {defineStore} from 'pinia'
import {apiURL, fetchData, signUp} from "../services/apiService";
import router from "../router/index.js"

export const useUserStore =
    defineStore('users', () => {
        const user = ref(null);
        const errorMessage = ref("");
        const loadingUser = ref(false)


        const clearUserStore = () => {
            errorMessage.value = ""
            user.value = {}
        }

        const handleLogin = async (credentials) => {
            clearUserStore()
            console.log("handling login...")
            const {username, password} = credentials;
            const response = await fetchData(apiURL + `users/me`, username, password);
            user.value = {
                id: response.data.id,
                username: response.data.username,
                auth_level: response.data.auth_level
            }
            console.log(user.value);
        }

        const handleSignup = async (credentials) => {
            clearUserStore()
            const {username, password} = credentials;

            console.log(username, password);

            if (username.length < 4) {
                errorMessage.value = "Username too short.";
            } else if (username.length > 20) {
                errorMessage.value = "Username too long."
            } else if (password.length < 6) {
                errorMessage.value = "Password too short.";
            } else {
                console.log('signup credentials ok')
                const response = await signUp(username, password);
                if (response.error) {
                    console.log('response error');
                    errorMessage.value = response.error;
                } else {
                    console.log('no error, user returned');
                    return response.response;
                }
            }
        }

        const handleLogout = () => {
            console.log("logging out");
            user.value = null;
            localStorage.clear();
            router.push({name: 'home'});
        }

        const getUser = async () => {
            loadingUser.value = true
            const response = await fetchData(apiURL + `users/me`);

            if (!response.data) {
                loadingUser.value = false;
                return user.value = null;
            }

            user.value = {
                id: response.data.id,
                username: response.data.username,
                auth_level: response.data.auth_level
            }
            console.log(user.value);
        }

        return {user, errorMessage, loadingUser, clearUserStore, handleLogin, handleSignup, handleLogout, getUser}
    })