import logger from './src/utils/logger.js';
import expressApplication from './src/app.js';

const port = process.env.PORT || 9000;

expressApplication.get("/", (req, res) => {
    res.json({message: "Attendace Backend System is UP!"});
});

expressApplication.listen(port, () => {
    logger.info(`Server running on the port ${port}`);
});