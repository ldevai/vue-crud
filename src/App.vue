<template>   
  <v-app>
    <Header />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>


<script>

import Header from './components/Header';
import Footer from './components/Footer';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'vue-crud'
    }
  }
};
</script>
<style scoped>
.v-main {
  width: 100%;
  max-width: 100%;
}

.container {
  width: 100%;
  max-width: 100%;
}
</style>
