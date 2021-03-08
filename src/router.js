import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const TITLE = ' | vue-crud';

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'home',
      meta: { title: TITLE }, component: () => import('./views/Home.vue')
    },
    {
      path: '/login', name: 'login',
      meta: { title: 'Login' + TITLE }, component: () => import('./views/Login.vue')
    },
    {
      path: '/register', name: 'register',
      meta: { title: 'Register' + TITLE }, component: () => import('./views/Register.vue')
    },
    {
      path: '/profile', name: 'profile',
      meta: { title: 'Profile' + TITLE }, component: () => import('./views/Profile.vue')
    },

    { 
      path: '/articles', name: 'articles', 
      meta: { title: 'Articles' + TITLE }, component: () => import('./views/articles/Articles.vue')
    },
    { 
      path: '/articles/edit', name: 'articleCreate', 
      meta: { title: 'New Article' + TITLE }, component: () => import('./views/articles/ArticleEdit.vue')
    },
    { 
      path: '/articles/edit/:url', name: 'articleEdit', 
      meta: { title: 'Edit Article' + TITLE }, component: () => import('./views/articles/ArticleEdit.vue'), props: route => ({ query: route.query.q })
    },
    { 
      path: '/articles/:url', name: 'article', 
      meta: { title: 'Article' + TITLE }, component: () => import('./views/articles/Article.vue'), props: route => ({ query: route.query.q })
    },

    {
      path: '/users', name: 'users',
      meta: { title: 'Users' + TITLE }, component: () => import('./views/users/Users.vue')
    },
    { 
      path: '/users/edit', name: 'userCreate', 
      meta: { title: 'New User' + TITLE }, component: () => import('./views/users/UserEdit.vue')
    },
    {
      path: '/users/edit/:id', name: 'userEdit',
      meta: { title: 'User' + TITLE }, component: () => import('./views/users/UserEdit.vue'), props: route => ({ query: route.query.q })
    },
    {
      path: '/users/:id', name: 'user',
      meta: { title: 'User' + TITLE }, component: () => import('./views/users/User.vue'), props: route => ({ query: route.query.q })
    },
  ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/login', '/register', '/home', '/articles'];
    const authRequired = !publicPages.includes(to.path) && to.path.indexOf('/articles') == -1;
    const loggedIn = localStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
});
