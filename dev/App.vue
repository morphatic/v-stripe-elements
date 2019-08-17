<template>
  <v-app>
    <v-app-bar
      app
      color="primary white--text"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>VStripeInput Demo</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-stripe-input
          v-model="source"
          :api-key="api_key"
        ></v-stripe-input>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import VStripeInput from '../src/'

  export default {
    components: {
      VStripeInput
    },
    data: () => ({
      api_key: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
      source: null
    })
  }
</script>
