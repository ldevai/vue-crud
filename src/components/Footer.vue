<template>
  <v-footer color="primary" padless>
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col class="primary text-center white--text" cols="12">
          
          <div class="pa-1 footer-link hidden-sm-and-down">
            {{ new Date().getFullYear() }} — <strong>vue-crud</strong>
          </div>
          <div class="pa-1 footer-link hidden-md-and-up">
            {{ new Date().getFullYear() }} <strong>vue-crud</strong>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
};
</script>
