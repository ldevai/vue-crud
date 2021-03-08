import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/articles';

class ArticleService {
  list() {
    return axios.get(API_URL);
  }

  getHome() {
    return axios.get(API_URL + '_home');
  }

  get(url) {
    return axios.get(API_URL + `/${url}`);
  }

  create(article) {
    return axios.post(API_URL, article, { headers: authHeader() });
  }

  update(article) {
    return axios.put(API_URL, article, { headers: authHeader() });
  }

  delete(article) {
    return axios.delete(API_URL + `/${article.id}`, { headers: authHeader() });
  }

  updateHomeView(article) {
    return axios.get(API_URL + `/updateHomeView/${article.id}`, { headers: authHeader() });
  }

  getComments(id) {
    return axios.get(API_URL + `/comments/${id}`);
  }

  postComment(comment) {
    return axios.post(API_URL + '/comments', comment, { headers: authHeader() });
  }
}

export default new ArticleService();
