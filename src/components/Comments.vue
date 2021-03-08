<template>
  <v-container style="max-width: 100%; width: 100%;" class="pt-0">
      <span v-if="loading">Loading</span>
      
      <v-card max-width="375" elevation="0" class="pt-3">
        <v-alert v-if="message.content.length > 0" border="top" :color="message.color + ' lighten-2'" dark dense>{{ message.content }}</v-alert>
      </v-card>

      <!-- Comments -->
      <v-card elevation="0" max-width="800" class="pt-3">
        <h6>Comments</h6>

        <v-card max-width="200" class="pa-2" elevation="0">
          <v-btn text class="primary" @click="posting = !posting;">
            <v-icon>mdi-lead-pencil</v-icon>
            <span class="mr-2 body-2">Write comment</span>
          </v-btn>
        </v-card>

        <!-- Post section -->
        <v-card max-width="375" outlined v-if="posting">
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col>
                  <v-textarea dense label="Write a new comment..." counter="500" :rules="rules" v-model="obj.content" ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6">
                  <v-text-field dense v-model="obj.author" label="Name"></v-text-field>
                </v-col>

                <v-col sm="6">
                  <v-text-field dense v-model="obj.email" hint="Your email address will not be published." label="Email"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn class="primary" @click="postComment">Submit</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>

        <v-card elevation="0" class="pa-2" max-width="800" v-if="article.comments.length == 0 && !posting">
          <span class="mr-2 body-2">No comments yet, you could be the first.</span>
        </v-card>
        
        <v-row no-gutters class="ma-0 pa-0" v-if="article.comments.length > 0">
          <v-divider class="ma-0 pa-0"></v-divider>
        </v-row>
        <v-list-item v-for="comment in article.comments" :key="comment.id">
          <v-container>
            <v-row>
              <v-col sm="3">
                <p class="caption">{{comment.author}}</p>
              </v-col>
              <v-col sm="9">
                <p class="body-2">{{comment.content}}</p>
                <p class="caption">Posted at {{comment.created_at}}</p>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-0 pa-0">
              <v-divider class="ma-0 pa-0"></v-divider>
            </v-row>
          </v-container>
        </v-list-item>
      </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Comments',

    props: {
      article: {},
    },

    data() {
      return {
        comments: [],
        loading: false,
        message: { color: '', content: '' },
        rules: [v => v.length <= 500 || 'Max 500 characters'],
        obj: { author: '', email: '', content: '' },
        posting: false,
      }
    },

    methods: {
      postComment() {
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }

          this.obj.article_id = this.article.id;
          this.$store.dispatch('article/postComment', this.obj).then(
            () => {
              console.log('[Comments] Comment posted');
              this.obj = { author: '', email: '', content: '' };
              this.message = {
                color: "green",
                content: "Comment posted, it will be visible soon"
              };
              this.posting = false;

              // Trigger article reload with new comment
              setTimeout(() => { this.$store.dispatch('article/get', this.article.url); }, 1000);
              setTimeout(() => { this.message.content = ''; }, 7000);
            },
            error => {
              this.loading = false;
              console.log('[Comments][error] ', error);
              this.message = { 
                color: "red",
                content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
              }
              setTimeout(() => { this.message.content = ''; }, 7000);
            }
          );
        });
      },
    }
  }
</script>
