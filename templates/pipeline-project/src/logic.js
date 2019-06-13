import { makeAsyncArrayGenerator } from 'funprog'

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
 * They take no
 * Field Data represents asset, when, measurement and value
 * Events represent when and event type
 * * @param {*} configuration - provides configuration needed to generate content
 */
export const generator = (configuration) => {
  return makeAsyncArrayGenerator([
    generated
  ], {
    delay: 0,
    callback: () => debug('Generate')
  })
}

/**
 * Detectors enrich, convolve and detect higher order state
 * @param {*} event content
 */
export const detector = ({ when = Date.now(), asset = {}, measurement = {}, event = {}, description = '' }) => {
  debug('Detect')
  return {
    event,
    when,
    data: {},
    asset,
    measurement,
    description: description + ', Detect emergent information'
  }
}

/**
 * Consumers check if actions (e.g. notifications) are required
 * @param {*} event content
 */
export const consumer = ({ when = Date.now(), asset = {}, measurement = {}, event = {}, data = {}, description = '' }) => {
  debug('Consume')
  return {
    when,
    asset,
    measurement,
    data,
    event,
    description: description + ', Determine if further actions should be taken'
  }
}

/**
 * subscribers check who should receive content
 * @param {*} content
 */
export const subscriber = ({ when = Date.now(), asset = {}, measurement = {}, event = {}, data = {}, description = '' }) => {
  debug('Subscribe')
  return {
    when,
    asset,
    measurement,
    event,
    data,
    destination: 'email',
    recipient: 'recipient',
    description: description + ', Augment with channel and recipient'
  }
}

/**
 * content renders content
 */
export const content = ({ when = Date.now(), asset = {}, measurement = {}, event = {}, data = {}, description = '' }) => {
  debug('Content')
  return {
    when,
    asset,
    measurement,
    event,
    data,
    destination: 'email',
    recipient: 'recipient',
    message: 'The message',
    description: description + ',Render the notification into a message'
  }
}

/**
 * requestor provides detail to request transmission
 * @param {*} param0
 */
export const requestor = ({ when = Date.now(), asset = {}, measurement = {}, event = {}, data = {}, description = '' }) => {
  debug('Request')
  return {
    when,
    asset,
    measurement,
    event,
    destination: 'email',
    recipient: 'recipient',
    message: 'The message',
    integration: {
      endpoint: 'smtp://192.168.1.1'
    },
    description: description + ', Add implementation details'
  }
}
