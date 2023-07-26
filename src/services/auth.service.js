import axios from 'axios';


const API_URL = import.meta.env.VITE_BASEURL;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'token', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

    logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'users/create-api-user', {
      username: user.username,
      password: user.password
    });
  }
}

export default new AuthService();