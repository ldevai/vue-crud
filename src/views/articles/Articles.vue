<template>
  <v-container class="pt-1">

    <v-app-bar color="secondary" dark dense>
      <v-toolbar-title>Articles</v-toolbar-title>
      <Alert :message="state.message" />
      <v-spacer></v-spacer>
      <div class="order-md-6" v-if="isAdmin">
        <div class="align-center">
          <v-btn text :disabled="state.loading" @click="createArticle">
            <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
            <v-icon>mdi-newspaper-plus</v-icon>
            <span>New</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    

    <div class="wrapper">
      <v-data-table
        :headers="headers"
        :items="state.articles"
        :items-per-page="-1"
        dense
        sortBy="updated_at"
        sortDesc=""
        class="elevation-1"
      >
      <template v-slot:[`item.title`]="{ item }">
        <v-btn text :disabled="state.loading" @click="viewArticle(item.url)">
          <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
          <span>{{item.title}}</span>
        </v-btn>
      </template>

      <template v-slot:[`item.tags`]="{ item }">
         <v-chip style="margin: 1px;" v-for="tag in item.tags" :key="item.url + '_' + tag">{{tag}}</v-chip>
      </template>

      <template v-slot:[`item.in_home`]="{ item }">
         <v-checkbox class="pr-10" :input-value="item.in_home" v-model="item.in_home" value @click="updateHomeView(item)"></v-checkbox>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text :disabled="state.loading" @click="editArticle(item.url)">
          <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    </div>
  </v-container>
</template>

<script>
import Alert from '../../components/Alert';

export default {
  name: 'Articles',
  components: {
    Alert
  },
  
  data() {
    return {
      headers: [],
      isAdmin: false
    };
  },

  computed: {
    state() { return this.$store.state.article; }
  },

  created() {
    const currentUser = this.$store.state.auth.user;
    if (currentUser && currentUser.roles) {
      this.isAdmin = currentUser.roles.includes('Admin');
    }

    this.headers = [
      { text: 'Title', value: 'title' },
      { text: 'URL', value: 'url' },
      { text: 'In Home', value: 'in_home' },
      { text: 'Tags', value: 'tags' },
      { text: 'Created', value: 'created_at' },
      { text: 'Updated', value: 'updated_at' }
    ];

    if (this.isAdmin) {
      this.headers.push({ text: 'Actions', value: 'actions' });
    }
  },

  mounted() {
    this.$store.dispatch('article/list');
  },
  methods: {
    createArticle() {
      this.$store.dispatch('article/new');
      this.$router.push('/articles/edit');
    },
    editArticle(url) {
      this.$router.push('/articles/edit/' + url);
    },
    viewArticle(url) {
      this.$router.push('/articles/' + url);
    },
    updateHomeView(item) {
      this.$store.dispatch('article/updateHomeView', item);
    }
  }
};
</script>
