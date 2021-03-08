<template>
    <v-alert v-if="message && message.content && message.content.length > 0" class="mt-4 ml-10" :color="message.color + ' lighten-1'" dense>{{ message.content }}</v-alert>
</template>

<script>
  export default {
    name: 'Alert',

    props: {
        message: {}
    }
  }
</script>
