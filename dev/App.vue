<template>
  <v-app>
    <v-app-bar
      app
      color="primary white--text"
    >
      <v-app-bar-nav-icon />
      <v-toolbar-title>VStripeElements Demo</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-switch
          v-model="$vuetify.theme.dark"
          class="pt-5"
          label="Dark?"
        />
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-stripe-card
              v-model="source"
              :api-key="apiKey"
              :append-icon="source && icons.check"
              create="source"
              label="Some label"
              :hint="source ? 'Card is valid' : 'Please enter card info'"
              persistent-hint
              single-line
              :success="!!source"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Some label"
              hint="Some hint"
              persistent-hint
              single-line
              :success="!!source"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-stripe-card
              v-model="source"
              font-name="Shadows Into Light"
              solo
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              solo
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-stripe-card
              v-model="token"
              filled
              font-name="Hepta Slab"
              font-url="https://fonts.googleapis.com/css?family=Hepta+Slab:700&display=swap"
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              filled
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-stripe-card
              v-model="source"
              outlined
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Some reall long label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-stripe-card
              v-model="source"
              solo
              outlined
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              solo
              outlined
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  // import { VStripeCard } from '../src/'
  import { mdiCheck } from '@mdi/js'
  export default {
    // components: {
    //   VStripeCard,
    // },
    data: () => ({
      apiKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      filled: false,
      icons: {
        check: mdiCheck,
      },
      outlined: false,
      solo: false,
      source: null,
      token: null,
    }),
  }
</script>
