import __dirname from './utils.js';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Ecommerce API",
        description: "Documentacion de la API de Ecommerce",
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
  };
  
export default swaggerJSDoc(swaggerOptions);