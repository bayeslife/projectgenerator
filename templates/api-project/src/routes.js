let debug = require('debug')('app')

const appData = require('../package.json')

module.exports.setup = function (app, config) {
    debug('Setup')
    /**
     * @swagger
     *
     * /health:
     *   get:
     *     description: Get health for the application
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get Health
     */
    app.get('/health', (req, res) => {
        debug('GET health')
        res.send({
                name: appData.name,
                environment: config.env,
                version: appData.version
            })
    })
}
