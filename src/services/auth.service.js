import axios from 'axios';

const API_URL = '/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
        name: ''
      })
      .then(response => {
        if (response.data.access_token) {
          response.data.accessToken = response.data.access_token;
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
