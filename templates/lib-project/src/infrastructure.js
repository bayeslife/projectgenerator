const debug = require('debug')('infrastructure')
const assert = require('assert')

function healthCheckRoute(app,infrastructureFactory){
  app.get('/health', async (req, response) => {
    debug('/health')
    let infrastructure= null
    try {
      infrastructure = await infrastructureFactory()
      let health = await infrastructure.checkHealth()
      let httpStatus = health.status ? 200 : 500
      response.status(httpStatus).send(health)
    }finally {
      if(infrastructure) infrastructure.close()
    }
  })
}

async function getInfrastucture (config,model) {
     let dbModel = new model.Model(null)

    
  async function checkHealth(){
    let response ={
      status: 1 //healthy
    }
    return response
  }

  let publisher = (key, data) => {
      exchange.publish(key, data)
      debug(`Published ${key} ${JSON.stringify(data)}`)
  }
    

    function createConsumer (handler) {
        debug(`Connecting to queue:${config.in.queue.name}`)
        //generator here which produces data and calls the handler
    }
    debug('Got all infrastructure')
    return {
      checkHealth,
      state: {
        dbModel
      },
      messaging: {
        publisher,
        createConsumer,
      },
      close: () => {
      }
    }
}

async function infrastructureGenerator (theconfig, themodel) {
    let config = theconfig
    let model = themodel
    debug('Get Infrastructure Generator')

  async function checkConnectivity () {
      let infrastructure = await getInfrastucture(config,model)
      debug('Connectivity configuration looks good, shutting it down')
      infrastructure.close()
  }
  await checkConnectivity()

  return async () => {
      let infrastructure = await getInfrastucture(config,model)
      return infrastructure
  }
}

module.exports = {
  healthCheckRoute,
  infrastructureGenerator
}
