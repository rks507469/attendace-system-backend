import './src/config/env.js';
import express from 'express';
import logger from './src/utils/logger.js';

logger.info(`${process.env.PORT}`);
const port = process.env.PORT || 9000;

const app = express();

app.listen(port, () => {
    logger.info(`Server running on the port ${port}`);
});