import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/users';

class UserService {

  getList() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  create(user) {
    return axios.post(API_URL, user, { headers: authHeader() });
  }

  update(user) {
    return axios.put(API_URL, user, { headers: authHeader() });
  }

  delete(user) {
    return axios.delete(API_URL + `/${user.id}`, { headers: authHeader() });
  }
}

export default new UserService();
