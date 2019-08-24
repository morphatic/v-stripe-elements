export type ElementStyleVariants = 'base'|'complete'|'empty'|'invalid'

export type ElementStyles = {
  [variant in ElementStyleVariants]?: stripe.elements.Style
}
