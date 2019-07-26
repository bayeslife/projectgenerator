import { describe } from 'riteway'
import { infrastructureGenerator } from '../index.js'
const debug = require('debug')('test')

let model = { //no op model
    Model: (connector)=>{},
    Connector: (confi,connectionpool)=>{}
}

let config = {
}

describe('Valid Config', async (assert) => {

  let scenarios = [
    {
      expected: {
        given: 'db online',
        should: 'healthy',
        health: 1
      }
    }
  ]

  for(const index in scenarios){
    let scenario = scenarios[index]
    let c = Object.assign({},config)
  
    const infrastructureFactory = await infrastructureGenerator(c,model)
    const infrastructure = await infrastructureFactory()
    let health = await infrastructure.checkHealth()
    assert({
      given: scenario.expected.given,
      should: scenario.expected.should,
      actual: health.status,
      expected: scenario.expected.health
    })
    infrastructure.close()
  }
})
