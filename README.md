# VStripeInput

A Vue component that styles [Stripe Elements](https://stripe.com/payments/elements) to match the [Vuetify UI library](https://vuetifyjs.com).

## Installation and Configuration

From the root of a Vue project already using Vuetify:

```bash
npm i -S v-stripe-input
```

Then in the `.env` file in the root of your project:

```sh
VUE_APP_STRIPE_API_KEY=sk_live_4eC39HqLyjWDarjtT1zdp7dc
```

Optionally, add your test key to `.env.local`. This will automatically use the test key when doing local development and testing.

```sh
VUE_APP_STRIPE_API_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc
```

## Basic Usage

Within a Vue template:

```vue
<template>
  <v-stripe-input
    v-model="source"
    :api-key="process.env.VUE_APP_STRIPE_API_KEY"
  ></v-stripe-input>
</template>

<script>
  import VStripeInput from 'v-stripe-input'
  export default {
    components: {
      VStripeInput
    },
    data: () => ({
      source: null
    })
  }
</script>
```

## Documentation

`VStripeInput` extends [Vuetify's basic `VInput` component](https://vuetifyjs.com/en/components/inputs). That means it inherits and shares the look and feel of all of Vuetify's other form inputs and controls. It supports all of the built-in themes, styles, and props you expect if using the Vuetify UI library.
