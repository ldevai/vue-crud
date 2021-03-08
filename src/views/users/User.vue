<template>
  <v-container class="pt-1">
    
    <v-app-bar color="secondary" dark dense>
      <v-toolbar-title>{{state.user.name}}</v-toolbar-title>
      <Alert :message="state.message" />
      <v-spacer></v-spacer>
      <v-btn text :disabled="state.loading" @click="goBack">
        <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
        <v-icon>mdi-keyboard-backspace</v-icon>
        <span>Back</span>
      </v-btn>
      <v-btn text :disabled="state.loading" @click="editObject(state.user.id)" v-if="isAdmin">
        <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
        <v-icon>mdi-newspaper-plus</v-icon>
        <span>Edit</span>
      </v-btn>
    </v-app-bar>

    <v-card class="pa-4">
    <p>
      <strong>Id:</strong>
      {{state.user.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{state.user.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      {{state.user.role}}
    </ul>
    </v-card>
  </v-container>
</template>

<script>
import Alert from '../../components/Alert';

export default {
  name: 'User',

  components: {
    Alert
  },

  computed: {
    isAdmin() {
      const currentUser = this.$store.state.auth.user;
      if (currentUser && currentUser.roles) {
        return currentUser.roles.includes('Admin');
      }
      return false;
    },
    state() { return this.$store.state.user; }
  },
  data() {
    return {
      user: {},
      loading: this.$route.params.id != null,
      message: ''
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$store.dispatch('user/get', this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    editObject(id) {
      this.$router.push('/users/edit/' + id);
    },
  }
};
</script>