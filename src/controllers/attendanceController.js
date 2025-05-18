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