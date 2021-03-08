<template>
  <v-container style="max-width: 100%; width: 100%;">
      <div v-if="!loading" v-html="compiledMarkdown"></div>
      <span v-if="loading">Loading</span>
  </v-container>
</template>

<script>
  import { createMarkdown } from 'safe-marked';

  export default {
    name: 'Article',

    props: {
        data: {},
        loading: {}
    },

    computed: {
        compiledMarkdown() {
            if (!this.data.content) {
                return "";
            }
            return createMarkdown()(this.data.content, { sanitize: true });
        }
    }
  }
</script>
