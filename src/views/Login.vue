<template>
  <div class="col-md-12">
    <div class="card card-container pa-0">
      <v-progress-linear indeterminate color="cyan lighten-3" v-if="loading"></v-progress-linear>
      <v-card class="pa-5" elevation="0">
        <img class="profile-img-card pa-5" src="/img/logo.png" />
        <form name="form" @submit.prevent="handleLogin" class="mt-10">
          <div class="form-group">
            <v-text-field dense v-model="user.email" v-validate="'required'" name="email" label="Email" placeholder="Email"></v-text-field>
            <div v-if="errors.has('email')" class="alert alert-danger" role="alert">Email is required!</div>
          </div>
          <div class="form-group">
            <v-text-field dense v-model="user.password" v-validate="'required'" name="password" type="password" label="Password" placeholder="Email"></v-text-field>
            <div v-if="errors.has('password')" class="alert alert-danger" role="alert">Password is required!</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span>sign in</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
          </div>
        </form>
      </v-card>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      user: {},
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 84px;
  height: 84px;
  margin: 0 auto 10px;
  display: block;
}
</style>
