<template>
  <v-container style="width: 100%; max-width: 100%;">

    <Article :loading="state.loading" :data="state.article" />

    <v-container>
      <v-row>
        <v-col cols="12" md="6" v-for="article in state.articles" :key="article.id">
          <v-card class="pa-2 card-shadow" style="" elevation="2">
            <v-card-title @click="viewArticle(article.url)">
              <span>{{article.title}}</span>
            </v-card-title>

            <v-card-subtitle  @click="viewArticle(article.url)">
              <v-card  class="pa-0 ma-0" elevation="0">
              Coming soon...
                
              </v-card>
            </v-card-subtitle>

            <v-card-text @click="viewArticle(article.url)">
              {{ article.title }}
            </v-card-text>

            <v-card-actions>
              <v-chip style="margin: 1px;" v-for="tag in article.tags" :key="article.url + '_' + tag">{{tag}}</v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
    
  </v-container>
</template>

<script>
  import Article from '../components/Article'

  export default {
    name: 'Home',

    components: {
      Article,
    },

    data() {
      return {
        articles: [],
        article: {},
        loading: true,
        message: ''
      };
    },

    computed: {
      state() { return this.$store.state.article; }
    },

    mounted() {
      this.$store.dispatch('article/get', 'home');
      this.$store.dispatch('article/home');
    },

    methods: {
      viewArticle(url) {
        this.$router.push('/articles/' + url);
      }
    }
  }
</script>
