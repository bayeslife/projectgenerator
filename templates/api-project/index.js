let debug = require('debug')('app')

const express = require('express');
const app = express();

const routes = require('./src/routes.js')
const swaggerUi = require('swagger-ui-express');

const swaggerJSDoc = require('swagger-jsdoc')

let config = {
    port: 3000
}

const options = {
    definition: {
      openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      info: {
        title: 'Short Interval Control', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    apis: ['./index.js'],// Path to the API docs
  };

const swaggerSpec = swaggerJSDoc(options);
 
routes.setup(app)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.port, () => debug(`API listening on port ${config.port}!`))