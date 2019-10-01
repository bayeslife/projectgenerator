import { makeAsyncArrayGenerator } from 'funprog'
import { Model } from 'real-value-lang'

import Debug from 'debug'
let debug = Debug('pipeline')

let generated = {
  when: {
  },
  asset: {
  },
  measurement: {
  },
  event: {
  },
  description: 'Some incoming information'
}

/**
 * Generators produce field data or events.
 * * @param {*} configuration - provides configuration needed to generate content
 */
const generator = (configuration) => {
  return makeAsyncArrayGenerator([
    generated
  ], {
    delay: 0,
    callback: () => debug('Generate')
  })
}

export async function process () {
  let model = new Model()

  let g = generator()
  model.from(g)
  model.run()
}
