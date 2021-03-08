import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/menus';

class MenuService {
  get() {
    return axios.get(API_URL);
  }

  create(menu) {
    return axios.post(API_URL, menu, { headers: authHeader() });
  }

  update(menu) {
    return axios.put(API_URL, menu, { headers: authHeader() });
  }
}

export default new MenuService();
