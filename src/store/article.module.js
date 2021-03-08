import ArticleService from '../services/article.service';
import DateUtils from '../utils/date';

const initialState = {
  articles: [],
  article: {},
  message: {},
  loading: false
};

export const article = {
  namespaced: true,
  state: initialState,
  actions: {
    new({ commit }) { commit('new'); return Promise.resolve(); },
    list({ commit }) {
      commit('loading', true);
      return ArticleService.list().then(
        articles => {
          commit('listSuccess', articles.data); return Promise.resolve(articles.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    home({ commit }) {
      commit('loading', true);
      return ArticleService.getHome().then(
        articles => {
          commit('listSuccess', articles.data); return Promise.resolve(articles.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    get({ commit }, url) {
      commit('loading', true);      
      return ArticleService.get(url).then(
        response => {
          commit('getSuccess', response.data); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    create({ commit }, article) {
      commit('loading', true);
      delete article.created_at;
      delete article.updated_at;
      article.comments = [];
      if (article.tags == null) article.tags = [];
      return ArticleService.create(article).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    update({ commit }, article) {
      delete article.created_at;
      delete article.updated_at;
      commit('loading', true);
      return ArticleService.update(article).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    delete({ commit }, article) {
      return ArticleService.delete(article).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    updateHomeView({ commit }, article) {
      return ArticleService.updateHomeView(article).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    postComment({ commit }, comment) {
      return ArticleService.postComment(comment).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    }
  },
  mutations: {
    loading(state, loading) {
      state.loading = loading;
      state.message = {};
    },
    new(state) {
      state.article = { tags: [], comments: [], content: '' };
      state.message = {};
    },
    success(state) {
      state.loading = false;
      state.message = {};
    },
    error(state, error) {
      state.loading = false;
      let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      state.message = { color: 'error', content: message };
    },
    listSuccess(state, articles) {
      state.loading = false;
      state.message = {};
      DateUtils.parseRawCreatedUpdatedTimestampArray(articles);
      state.articles = [ ...articles ];
    },
    getSuccess(state, article, $store) {
      state.loading = false;
      state.message = {};
      if (article.tags == null) article.tags = [];
      if (article.comments == null) article.comments = [];
      DateUtils.parseRawCreatedUpdatedTimestamp(article);
      state.article = article;
    },
  }
};
