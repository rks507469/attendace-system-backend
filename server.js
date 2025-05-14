import logger from './src/utils/logger.js';
import expressApplication from './src/app.js';
import fs from 'fs';

const port = process.env.PORT || 9000;

expressApplication.get("/", (req, res) => {
    res.json({message: "Attendance Backend System is UP!"});
});


fs.readdirSync('./src/models').forEach(file => {
    console.log('Found model file:', file);
});


expressApplication.listen(port, () => {
    logger.info(`Server running on the port ${port}`);
});