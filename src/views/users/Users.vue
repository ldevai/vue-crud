<template>
  <v-container class="pt-1">

    <v-app-bar color="secondary" dark dense>
      <v-toolbar-title>Users</v-toolbar-title>
      <Alert :message="state.message" />
      <v-spacer></v-spacer>
      <div class="order-md-6 col-md-2" v-if="isAdmin">
        <div class="align-center">
          <v-btn text :disabled="state.loading" @click="createUser">
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
        :items="state.users"
        :items-per-page="15"
        dense
        class="elevation-1"
      >
        <template v-slot:[`item.name`]="{ item }">
          <v-btn text :disabled="state.loading" @click="viewUser(item.id)">
            <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
            <span>{{item.name}}</span>
          </v-btn>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn text :disabled="state.loading" @click="editUser(item.id)">
            <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
            <v-icon>mdi-newspaper-plus</v-icon>
            <span>Edit</span>
          </v-btn>
        </template>
        
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import Alert from '../../components/Alert';

export default {
  name: 'Users',

  components: {
    Alert
  },

  data() {
    return {
      users: [],
      headers: [],
      loading: false
    };
  },

  computed: {
    state() { return this.$store.state.user; }
  },

  created() {
    const currentUser = this.$store.state.auth.user;
    if (currentUser && currentUser.roles) {
      this.isAdmin = currentUser.roles.includes('Admin');
    }

    this.headers = [
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Role', value: 'role' },
      { text: 'Created', value: 'created_at' },
      { text: 'Updated', value: 'updated_at' },
    ];

    if (this.isAdmin) {
      this.headers.push({ text: 'Actions', value: 'actions' });
    }
  },
  mounted() {
    this.$store.dispatch('user/list');
  },
  methods: {
    createUser() {
      this.$store.dispatch('user/new');
      this.$router.push('/users/edit');
    },
    editUser(url) {
      this.$router.push('/users/edit/' + url);
    },
    viewUser(url) {
      this.$router.push('/users/' + url);
    }
  }
};
</script>
