<template>
  <v-app>
    <v-app-bar
      app
      color="primary white--text"
    >
      <v-app-bar-nav-icon />
      <v-toolbar-title>VStripeInput Demo</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-stripe-input
              v-model="source"
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Some label"
              hint="Some hint"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import VStripeInput from '../src/'

  export default {
    components: {
      VStripeInput,
    },
    data: () => ({
      apiKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      source: null,
    }),
  }
</script>
