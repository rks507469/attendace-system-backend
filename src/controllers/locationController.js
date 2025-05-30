import Location from "../models/location.js";
import logger from "../utils/logger.js";

export const createLocation = async (req, res) => {
    try {
        const {code, name, address} = req.body;
        const location = new Location({code: code, name: name, address: address});
        await location.save();
        logger.debug(`Location saved successfully: ${location}`);
        return res.status(201).json(location);
    } catch (error) {
        logger.error(`Error saving Location: ${error.message}`);
        logger.error(error);
        return res.status(500).json({error: 'Error saving Location'});
    }
};

export const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        return res.json(locations);
    } catch (error) {
        logger.error(`Error fetching Locations: ${error.message}`);
        logger.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}