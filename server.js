import logger from './src/utils/logger.js';
import expressApplication from './src/app.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


// swagger configs
const swaggerDefinition = {
    openapi: '3.0.0', info: {
        title: 'Attendance system API', version: '1.0.0', description: 'Attendance system Backend', contact: {
            name: 'Devs - Aslam, Sanat',
            url: 'https://www.linkedin.com/in/mohdaslam-profile/',
            email: 'rks507469@gmail.com'
        }
    }, servers: [{
        url: 'http://localhost:9000', description: 'Development server'
    }, {
        url: 'https://attendace-system-backend.vercel.app', description: 'Production server'
    }]
};

const options = {
    swaggerDefinition, apis: ['*.js', 'src/app.js', 'src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);


const port = process.env.PORT || 9000;

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Endpoints for healthcheck
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check for backend
 *     description: Returns a simple message to confirm the backend is running.
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Backend is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance Backend System is UP!
 */
expressApplication.get("/", (req, res) => {
    res.json({message: "Attendance Backend System is UP!"});
});

// Swagger for express
expressApplication.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui.css',
    ],
}));

expressApplication.listen(port, () => {
    logger.info(`Server running on the port ${port}`);
});