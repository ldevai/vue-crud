<template>
  <v-container class="pt-1">
    <v-app-bar color="secondary" dark dense>
      <v-toolbar-title v-if="!$route.params.url">New User</v-toolbar-title>
      <v-toolbar-title v-if="$route.params.url">Editing User: {{state.user.title}} </v-toolbar-title>
      <Alert :message="state.message" />
      <v-spacer></v-spacer>
      <v-btn text :disabled="state.loading" @click="goBack">
        <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
        <v-icon>mdi-keyboard-backspace</v-icon>
        <span>Back</span>
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="450">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="red" :disabled="state.loading" v-bind="attrs" v-on="on">
            <span v-show="state.loading" class="spinner-border spinner-border-sm"></span>
            <v-icon>mdi-delete-forever-outline</v-icon>
            <span>Delete</span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Confirm deletion</v-card-title>
          <v-card-text>Are you sure you want to delete user: <br />{{state.user.name}}?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" text @click="dialog = false; deleteObject()">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col sm="3" cols="12"></v-col>
        <v-col sm="6" cols="12">

          <v-card class="ml-3" outlined>
            <v-card-actions  class="text-center">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field v-model="state.user.name" name="name" label="Name" v-validate="'required'" type="text"></v-text-field>
                    <div v-if="errors.has('name')" class="alert alert-danger" role="alert">Name is required!</div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field v-model="state.user.email" name="email" label="Email" v-validate="'required'" type="text"></v-text-field>
                    <div v-if="errors.has('email')" class="alert alert-danger" role="alert">Email is required!</div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field v-model="state.user.password" name="password" label="Password" v-validate="'required'" type="password"></v-text-field>
                    <div v-if="errors.has('password')" class="alert alert-danger" role="alert">Password is required!</div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-combobox v-model="state.user.role" name="role" label="Role" :items="roles" v-validate="'required'"></v-combobox>
                    <div v-if="errors.has('role')" class="alert alert-danger" role="alert">Role is required!</div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn class="primary" :disabled="state.loading" @click="saveObject">Submit</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
import Alert from '../../components/Alert';

export default {
  name: 'UserEdit',

  components: {
    Alert
  },

  data() {
    return {
      dialog: false,
    };
  },
  
  computed: {
    roles() { return ['User', 'Admin']; },
    state() { return this.$store.state.user; }
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
    saveObject() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        let isNewUser = this.$route.params.id == null;

        let action = isNewUser ? 'user/create' : 'user/update';
        this.$store.dispatch(action, this.state.user)
          .then(() => this.$router.push('/users'));
      });
    },
    deleteObject() {
      this.$store.dispatch('user/delete', this.state.user)
        .then(() => this.$router.push('/users'));
    },
  }
};
</script>
