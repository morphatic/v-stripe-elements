import Vue, { ComponentOptions } from 'vue'

export function functionalContext (context: ComponentOptions<Vue> = {}, children = []) {
  if (!Array.isArray(children)) children = [children]
  return {
    context: {
      data: {},
      props: {},
      ...context
    },
    children
  }
}
