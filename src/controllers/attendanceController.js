import Attendance from "../models/attendance.js";
import logger from "../utils/logger.js";

export const takeAttendance = async (req, res) => {
    try {
        const {location, date, volunteer, present, absent} = req.body;
        const attendance = new Attendance({location: location, date: date, volunteer: volunteer, present: present, absent: absent});
        await attendance.save();
        logger.debug(`Attendance saved successfully: ${attendance}`);
        res.status(201).json(attendance);
    } catch (error) {
        logger.error(`Error saving Attendance: ${error.message}`);
        logger.error(error);
        return res.status(500).json({error: 'Error saving Attendance'});
    }
}

export const updateAttendance = async (req, res) => {
    try {
        const {location, date, present, absent} = req.body;

        if(!location || !date) {
            return res.status(400).json({error: 'Location and Date are required'});
        }

        const updateAttendance = await Attendance.findOneAndUpdate({location, date}, {present, absent}, {new : true, runValidators: true});

        logger.debug(`Attendance saved successfully: ${updateAttendance}`);
        return res.status(200).json(updateAttendance);
    } catch (error) {
        logger.error(`Error updating Attendance: ${error.message}`);
        res.status(500).json({ error: 'Error updating Attendance' });
    }
}

export const getAttendanceByLocationAndDate = async (req, res) => {
    try {
        const {location, date} = req.body;

        if(!location || !date) {
            return res.status(400).json({error: 'Location and Date are required'});
        }

        const attendance = await Attendance
            .findOne({location, date})
            .populate('location')
            .populate('absent')
            .populate('present');

        res.status(200).json(attendance);
    } catch (error) {
        logger.error(`Unable to get Attendance: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}