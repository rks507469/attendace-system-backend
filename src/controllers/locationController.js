import Location from "../models/Location.js";
import logger from "../utils/logger.js";

export const createLocation = async (req, res) => {
    try {
        const {code, name, address} = req.body;
        const location = new Location({code: code, name: name, address: address});
        await location.save();
        logger.debug(`Location saved successfully: ${location}`);
        res.status(201).json(location);
    } catch (error) {
        logger.error(`Error saving Location: ${error.message}`);
        logger.error(error);
        res.status(500).json({error: 'Error saving Location'});
    }
};