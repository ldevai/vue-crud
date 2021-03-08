<template>
  <v-container class="pt-1">
    
    <v-app-bar color="secondary" dark dense>
      <v-toolbar-title>{{state.article.title}}</v-toolbar-title>
      <Alert :message="state.message" />
      <v-spacer></v-spacer>
      <v-btn text :disabled="state.loading" @click="goBack">
        <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
        <v-icon>mdi-keyboard-backspace</v-icon>
        <span>Back</span>
      </v-btn>
      <v-btn text :disabled="state.loading" @click="editArticle(state.article.url)" v-if="isAdmin">
        <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
        <v-icon>mdi-newspaper-plus</v-icon>
        <span>Edit</span>
      </v-btn>
    </v-app-bar>

    <v-container fluid class="ml-0 pl-0 mr-0 pr-0 pt-0" style="max-width: 100%">
      <v-row class="mt-2">
        <v-col sm="1" cols="12">&nbsp;</v-col>
      
        <v-col sm="10" cols="12">
          <v-card style="max-width: 100%; width: 100%; text-align: left;" class="pa-5" elevation="1">
            <Article :loading="state.loading" :data="state.article" />
          </v-card>

          <v-row class="pa-5">
            <v-col sm="3" cols="12"></v-col>
            <v-col sm="6" cols="12" class="text-center">
              <span class="caption">Article from {{ state.article.created_at }}</span>
            </v-col>
          </v-row>
          
          <v-card style="max-width: 100%; width: 100%; text-align: left;" elevation="1">
            <Comments v-if="state.article.id" :article="state.article" />
          </v-card>

        </v-col>

        <v-col sm="1" cols="12"></v-col>
      </v-row>

    </v-container>

  </v-container>
</template>

<script>
import Alert from '../../components/Alert';
import Article from '../../components/Article';
import Comments from '../../components/Comments';

export default {
  name: 'ArticleView',

  components: {
    Alert, Article, Comments
  },

  data() {
    return {
      article: {},
      loading: this.$route.params.url != null,
      message: '',
      dialog: false,
      loadingComments: false,
      comments: []
    };
  },
  computed: {
    isAdmin() {
      const currentUser = this.$store.state.auth.user;
      if (currentUser && currentUser.roles) {
        return currentUser.roles.includes('Admin');
      }
      return false;
    },
    state() { return this.$store.state.article; }
  },
  mounted() {
    if (this.$route.params.url) {
      this.$store.dispatch('article/get', this.$route.params.url);
    }
  },
  methods: {
    loadArticle(url) {
       this.$store.dispatch('article/get', url);
    },
    goBack() {
      this.$router.back();
    },
    editArticle(url) {
      this.$router.push('/articles/edit/' + url);
    },
  }
};
</script>
