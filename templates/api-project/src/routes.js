let debug = require('debug')('app')

module.exports.setup = function (app) {
    debug('Setup')
    /**
     * @swagger
     *
     * /assets:
     *   get:
     *     description: Get assets for the application
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get Assets
     */
    app.get('/assets', (req, res) => {
        debug('GET assets')
        res.send([
            {
                key: 'Asset1',
                description: 'Asset One',
                serialNumber: '1234'
            },
            {
                key: 'Asset2',
                description: 'Asset Two',
                serialNumber: '1234'
            }
        ])
    })
}
