// import Vue, { VueConstructor, Component, PropOptions } from 'vue'
// import { VTextFieldData, VTextFieldProps } from './vuetify'

// export interface VStripeInputNameAndAddress {
//   name: String;
//   address_line1: String;
//   address_line2: String;
//   address_city: String;
//   address_state: String;
//   address_zip: String;
//   address_country: String;
// }

// export interface VStripeInputProps {
//   apiKey?: PropOptions;
//   font?: PropOptions;
//   hideIcon?: PropOptions;
//   hidePostalCode?: PropOptions;
//   iconStyle?: PropOptions;
//   nameAndAddress?: PropOptions;
//   zip?: PropOptions;
// }

// export interface VStripeInputData extends VTextFieldData {
//   card: stripe.elements.Element | null;
//   isReady: Boolean;
//   okToSubmit: Boolean;
//   stripe: stripe.Stripe | null;
// }

// export interface VStripeInput extends
// VueConstructor<any>,
// VStripeInputData,
// VTextFieldProps,
// VStripeInputProps
// {
//   data: VStripeInputData;
//   props: VStripeInputProps;
// }