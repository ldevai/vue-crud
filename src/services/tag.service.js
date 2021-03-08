import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/tags';

class TagService {
  
  getList() {
    return axios.get(API_URL);
  }

  get(name) {
    return axios.get(API_URL + `/${name}`);
  }

  create(tag) {
    return axios.post(API_URL, tag, { headers: authHeader() });
  }

  update(tag) {
    return axios.put(API_URL, tag, { headers: authHeader() });
  }

  delete(tag) {
    return axios.delete(API_URL + `/${tag.id}`, { headers: authHeader() });
  }
}

export default new TagService();
