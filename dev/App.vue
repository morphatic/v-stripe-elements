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
              append-icon="mdi-check"
              clearable
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              clearable
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
              font="Shadows Into Light"
              solo
              clearable
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              solo
              clearable
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
              filled
              clearable
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              filled
              clearable
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
              clearable
              :api-key="apiKey"
              label="Some label"
              hint="Some hint"
              persistent-hint
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              clearable
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
              clearable
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
              clearable
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

  export default {
    // components: {
    //   VStripeCard,
    // },
    data: () => ({
      apiKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      filled: false,
      outlined: false,
      solo: false,
      source: null,
    }),
  }
</script>
