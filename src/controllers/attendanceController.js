// src/controllers/attendanceController.js
//import Attendance from "../models/attendance.js";
import AttendanceForm from "../models/attendanceForm.js";
import logger from "../utils/logger.js";

// Original attendance taking function
export const takeAttendance = async (req, res) => {
    try {
        const {location, date, present, absent} = req.body;
        const attendance = new Attendance({location: location, date: date, present: present, absent: absent});
        await attendance.save();
        logger.debug(`Attendance saved successfully: ${attendance}`);
        res.status(201).json(attendance);
    } catch (error) {
        logger.error(`Error saving Attendance: ${error.message}`);
        logger.error(error);
        return res.status(500).json({error: 'Error saving Attendance'});
    }
};

// New function to handle the form submission from frontend
export const submitAttendanceForm = async (req, res) => {
    
    // console.log('----------------------');
    // console.log('REQUEST RECEIVED:');
    // console.log('Headers:', req.headers);
    // console.log('Body present?', req.body !== undefined);
    // console.log('Body type:', typeof req.body);
    // console.log('Body content:', JSON.stringify(req.body, null, 2));
    // console.log('----------------------');
    try {
        const { date, location, locationName, presentStudents, volunteers, additionalStudents } = req.body;
        
        logger.debug(`Received attendance form submission for ${location} on ${date}`);
        
        // Check if a record already exists for this date and location
        const existingRecord = await AttendanceForm.findOne({ 
            date: new Date(date),
            location 
        });
        
        let attendanceRecord;
        
        if (existingRecord) {
            // Update existing record
            logger.debug(`Updating existing attendance record for ${location} on ${date}`);
            
            existingRecord.presentStudents = presentStudents;
            existingRecord.volunteers = volunteers;
            existingRecord.additionalStudents = additionalStudents;
            existingRecord.locationName = locationName; // Update this in case it changed
            
            attendanceRecord = await existingRecord.save();
        } else {
            // Create new record
            logger.debug(`Creating new attendance record for ${location} on ${date}`);
            
            attendanceRecord = new AttendanceForm({
                date: new Date(date),
                location,
                locationName,
                presentStudents,
                volunteers,
                additionalStudents
            });
            
            await attendanceRecord.save();
        }
        
        logger.debug(`Attendance form saved successfully for ${location} on ${date}`);
        res.status(201).json({
            success: true,
            message: 'Attendance submitted successfully',
            data: attendanceRecord
        });
    } catch (error) {
        logger.error(`Error saving attendance form: ${error.message}`);
        logger.error(error);
        return res.status(500).json({
            success: false,
            error: 'Error saving attendance form',
            message: error.message
        });
    }
};
export const getAttendanceData=async(req,res)=>{
    console.log("inside getAttendanceData")
}
// Additional utility function to get attendance records by date range
export const getAttendanceByDateRange = async (req, res) => {
    try {
        const { startDate, endDate, location } = req.query;
        
        const query = {};
        
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        
        if (location) {
            query.location = location;
        }
        
        const records = await AttendanceForm.find(query).sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        logger.error(`Error fetching attendance records: ${error.message}`);
        return res.status(500).json({
            success: false,
            error: 'Error fetching attendance records'
        });
    }
};