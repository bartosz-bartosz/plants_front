import axios from 'axios';
import jwt_decode from "jwt-decode";

const apiURL = import.meta.env.VITE_BASEURL;
// const username = import.meta.env.VITE_USERNAME;
// const password = import.meta.env.VITE_PASSWORD;


const customRequest = axios.create({
    baseURL: apiURL,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

const isTokenExpired = (token) => {
    try {
        const tokenData = jwt_decode(token);
        const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
        console.log('Checking if token expired')

        // Compare the expiration time with the current time
        const currentTime = Date.now();
        console.log(`current time: ${currentTime}`);
        console.log(`expiration time: ${expirationTime}`);
        return currentTime >= expirationTime;
    } catch (error) {
        // If there's an error decoding the token or the "exp" claim is missing, consider the token expired
        console.error('Error decoding token:', error);
        return true;
    }
};

const getToken = async (username, password) => {
    console.log('getToken function called.');
    const data = new URLSearchParams();
    data.append('grant_type', '');
    data.append('username', username);
    data.append('password', password);
    console.log('Performing token request...');

    try {
        const response = await customRequest.post('/token', data);
        const token = response.data.access_token;
        localStorage.setItem('accessToken', token);
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Token request failed.');
    }
};

const fetchData = async (endpoint, username, password) => {
    try {
        let token = localStorage.getItem('accessToken');

        if ((!token || isTokenExpired(token)) && (username && password)) {
            console.log('conditions fulfilled for getting token')
            token = await getToken(username, password);
        }

        if (!token) {
            console.log("No token or credentials to get one.");
            return {error: "No token and no credentials."};
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        return await axios.get(endpoint, config);

    } catch (error) {
        if (error.response.status === 401) {
            return {error: "401 - Unauthorized"}
        }
        console.error(error);
    }
};

const signUp = async (username, password) => {
    console.log('sending request to signup in API');
    const config = {
        headers: {'Content-Type': 'application/json'}
    };
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);

    try {
        const response = await axios.post(apiURL + `users/create-api-user`, data, config)
        console.log(response);
        return {
            error: null,
            response: response
        };
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            if ('detail' in error.response.data) {
                return {
                    error: error.response.data.detail,
                    response: null
                };
            }
            return {
                error: error.response.data,
                response: null
            };
        }
    }
};

const createPlant = async (plantData) => {
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    const formData = new FormData();
    for (const key in plantData) {
        formData.append(key, plantData[key]);
    }
    console.log("FORM DATA:");
    console.log(formData);

    return await customRequest.post('/plant', formData, config)
};

const fetchPlant = async (plantID) => {
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    const response = await customRequest(`/plant/${plantID}`, config);
    console.log(response);
    return response.data;

}

export {apiURL, fetchData, signUp, createPlant, fetchPlant};