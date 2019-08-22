import Vue from 'vue'
import { VuetifyObject } from 'vuetify/types'

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: VuetifyObject
  }
}