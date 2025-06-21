import Attendance from "../models/attendance.js";
import logger from "../utils/logger.js";
export const takeAttendance = async (req, res) => {
    try {
        const {location, date, volunteer, present, absent,additionalStudents} = req.body;
        console.log("--->",additionalStudents)
        //const attendance = new Attendance({location: location, date: date, volunteer: volunteer, present: present, absent: absent});
        const attendance = new Attendance({
            location,
            date,
            volunteer,
            present,
            absent,
            additionalStudents: additionalStudents || []
        });
        
        await attendance.save();
        logger.debug(`Attendance saved successfully: ${attendance}`);
        res.status(201).json(attendance);
    } catch (error) {
        console.error("🔥 Error saving attendance:", error); // Already present, keep this
        res.status(500).json({
            message: error.message,
            stack: error.stack,
            error: error
        });
    }
    
}

export const updateAttendance = async (req, res) => {
    try {
        const {location, date, present, absent,additionalStudents} = req.body;
        console.log("--->",additionalStudents)

        if(!location || !date) {
            return res.status(400).json({error: 'Location and Date are required'});
        }

        const updateAttendance = await Attendance.findOneAndUpdate({location, date}, {present, absent,additionalStudents: additionalStudents || []}, {new : true, runValidators: true});

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
export const getAttendanceByLocationAndYear = async (req, res) => {
    try {
        const { location, year } = req.body;

        if (!location || !year) {
            return res.status(400).json({ error: 'Location and year are required' });
        }

        // Create date range for the year
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);

        const attendanceRecords = await Attendance
            .find({
                location: location,
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            })
            .populate('location')
            .populate('absent')
            .populate('present')
            .sort({ date: 1 }); // Sort by date ascending

        const response = {
            location: location,
            year: year,
            totalRecords: attendanceRecords.length,
            attendanceRecords: attendanceRecords
        };

        logger.debug(`Retrieved ${attendanceRecords.length} attendance records for location ${location} in year ${year}`);
        res.status(200).json(response);

    } catch (error) {
        logger.error(`Error fetching yearly attendance: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}