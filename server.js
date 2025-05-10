import './src/config/env.js';
import logger from './src/utils/logger.js';
import expressApplication from './src/app.js';

const port = process.env.PORT || 9000;

expressApplication.listen(port, () => {
    logger.info(`Server running on the port ${port}`);
});