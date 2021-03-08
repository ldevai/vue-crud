<template>
  <v-container class="pt-1">
    <v-row>
      <v-col cols="12" sm="12">
        <v-app-bar color="secondary" dark dense>
          <v-toolbar-title v-if="!$route.params.url">New Article</v-toolbar-title>
          <v-toolbar-title v-if="$route.params.url">Editing Article: {{state.article.title}} </v-toolbar-title>
          <Alert :message="state.article.message" />
          <v-spacer></v-spacer>
          <v-btn text :disabled="state.article.loading" @click="goBack">
            <span v-show="state.article.loading" class="spinner-border spinner-border-sm"></span>
            <v-icon>mdi-keyboard-backspace</v-icon>
            <span>Back</span>
          </v-btn>

          <v-dialog v-model="dialog" persistent max-width="450">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="red" :disabled="state.article.loading" v-bind="attrs" v-on="on">
                <span v-show="state.article.loading" class="spinner-border spinner-border-sm"></span>
                <v-icon>mdi-delete-forever-outline</v-icon>
                <span>Delete</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Confirm deletion</v-card-title>
              <v-card-text>Are you sure you want to delete article: <br />{{state.article.title}}?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                <v-btn color="green darken-1" text @click="dialog = false; deleteArticle()">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col lg="5" md="5" sm="12" class="ml-0 mr-0">
        
          <v-container fluid class="ma-2 pa-0" style="max-width: 100%">

            <!-- Title -->
            <v-row>
              <v-col>
              <v-text-field v-model="state.article.title" name="title" label="Title" v-validate="'required'" type="text" />
              <div v-if="errors.has('title')" class="alert alert-danger" role="alert">Title is required!</div>
              </v-col>
            </v-row>

            <!-- URL & In Home -->
            <v-row>
              <v-col>
                <v-text-field v-model="state.article.url" name="url" label="URL" v-validate="'required'" type="text" />
                <div v-if="errors.has('url')" class="alert alert-danger" role="alert">URL is required!</div>
              </v-col>
              <v-col>
                <v-checkbox :input-value="state.article.in_home" v-model="state.article.in_home" value label="Show in Home"></v-checkbox>
              </v-col>
            </v-row>

            <!-- Tags -->
            <v-row>
              <v-col>
                <v-text-field v-model="tag" name="tags" label="Tags"></v-text-field>
              </v-col>
              <v-col>
                <v-btn text @click="addTag">
                  <v-icon class="mr-1" v-model="tag">mdi-plus-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            
            <v-row>
              <v-chip style="margin: 1px;" v-for="tag in state.article.tags" :key="state.article.url + '_' + tag" close @click:close="removeTag(tag)">{{tag}}</v-chip>
            </v-row>

            <!-- Content -->
            <v-row>
              <v-col>
                <v-textarea v-model="state.article.content" name="content" label="Content" @input="updateContent" rows="10"></v-textarea>
                <div v-if="errors.has('content')" class="alert alert-danger" role="alert">Content is required!</div>
              </v-col>
            </v-row>

            <!-- Submit -->
            <v-row >
              <v-col>
                <v-btn class="primary" :disabled="state.article.loading" @click="saveArticle">Submit</v-btn>
              </v-col>
            </v-row>
            
          </v-container>
      </v-col>

      <v-col lg="7" md="7" sm="12" class="ml-0 mr-0">
          <span class="v-toolbar__title">Preview</span>
          <div v-html="compiledMarkdown" class="border"></div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Alert from '../../components/Alert';
import { createMarkdown } from 'safe-marked';

export default {
  name: 'ArticleEdit',
  components: {
    Alert
  },

  data() {
    return {
      dialog: false,
      tag: ''
    };
  },
  computed: {
    compiledMarkdown() {
      if (!this.state.article.content) {
        return "";
      }
      return createMarkdown()(this.state.article.content, { });
    },
    state() { return this.$store.state.article; }
  },
  mounted() {
    if (this.$route.params.url) {
      this.$store.dispatch('article/get', this.$route.params.url);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/articles');
    },
    saveArticle() {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) { return; }
        let action = this.$route.params.url != null ? 'article/update' : 'article/create';
        this.$store.dispatch(action, this.state.article)
          .then(() => this.$router.push('/articles'));
       });
    },
    deleteArticle() {
      this.$store.dispatch('article/delete', this.state.article)
        .then(() => this.$router.push('/articles'));
    },
    addTag() {
      if (this.state.article.tags == null) this.state.article.tags = [];
      console.log(this.state.article.tags);
      this.state.article.tags.push(this.tag);
      this.tag = '';
    },
    removeTag(item) {
      if (item == null) { return; }
      this.state.article.tags.splice(this.state.article.tags.indexOf(item), 1)
      this.state.article.tags = [...this.state.article.tags]
    },
    updateContent: window._.debounce(function(e) {
      if (e == null || e.target == null) {
        return;
      }
      this.state.article.content = e.target.value;
    }, 300)
  }
};
</script>
