<template v-slot:activator="{ on, attrs }">
  <v-app-bar app color="primary" dark dense>

      <router-link to="/">
        <img src="/img/logo.png" height="42" />
      </router-link>
      <router-link to="/">
        <v-app-bar-title>Vue Crud App</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-menu open-on-hover :close-on-click="true" bottom offset-y v-if="isAdmin || isUser"  dense>
        <template v-slot:activator="{ on }" >
          <v-btn text v-on="on">
            <v-icon class="mr-1">mdi-cog-outline</v-icon>
              <span class="mr-2 caption">Settings</span>
          </v-btn>
        </template>

        <v-list class="pa-0">
            <v-list-item>
                <v-list-item-title>
                <v-btn text :to="'/articles'" class="body-2">Articles</v-btn>
                </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAdmin">
                  <v-list-item-title>
                  <v-btn text :to="'/users'" class="body-2">Users</v-btn>
                  </v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>


      <v-menu open-on-hover :close-on-click="true" bottom offset-y v-if="isAdmin || isUser" dense>
        <template v-slot:activator="{ on }" >
          <v-btn text v-on="on">
            <v-icon class="mr-1">mdi-account-outline</v-icon>
            <v-expand-transition>
              <span class="mr-2 caption">Account</span>
            </v-expand-transition>
          </v-btn>
        </template>

        <v-list class="pa-0">
          
            <v-list-item class="text-center">
                <v-list-item-title>
                <span class="caption">{{currentUser.name}}</span>
                </v-list-item-title>
            </v-list-item>

            <v-divider class="pa-0 ma-0 mb-3"></v-divider>


            <v-list-item>
                <v-list-item-title>
                <v-btn text :to="'/profile'" class="body-2">Profile</v-btn>
                </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-btn text to="/logout" v-if="currentUser" @click="logOut">
                <v-icon>mdi-logout-variant</v-icon>
                <span class="mr-2 body-2">Sign out</span>
              </v-btn> 
            </v-list-item>

        </v-list>
      </v-menu>

      <v-btn text to="/login" v-if="!currentUser">
        <v-icon class="mr-1">mdi-login</v-icon>
        <span class="mr-2 caption">Sign in</span>
      </v-btn>

  </v-app-bar>
</template>
<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('Admin');
      }
      return false;
    },
    isUser() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('User');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      document.location.href = '/';
    }
  },
};
</script>
