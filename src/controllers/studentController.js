import Student from '../models/student.js';
import Location from "../models/location.js";
import logger from "../utils/logger.js";

export const createStudent = async (req, res) => {
    try {
        const {name, locationCode} = req.body;
        const location = await Location.findOne({code: locationCode});
        if (!location) return res.status(400).json({error: 'Invalid Location'});
        const student = new Student({name, location: location._id});
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        logger.error(`Error saving student: ${error.message}`);
        logger.debug(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('location');
        res.json(students);
    } catch (error) {
        logger.error(`Error fetching students: ${error.message}`);
        logger.debug(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getAllStudentsByLocation = async (req, res) => {
    try {
        const {locationCode} = req.params;
        const location = await Location.findOne({code: locationCode});
        if (!location) return res.status(404).json({error: 'Location not found'});
        const students = await Student.find({location: location._id}).populate('location');
        return res.status(200).json(students);
    } catch (error) {
        logger.error(`Error fetching students: ${error.message}`);
        logger.debug(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const bulkAddStudents = async (req, res) => {
    try {
        const one = 1;
        const students = req.body;
        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({error: 'Cannot add empty students'});
        }

        const validStudents = await Promise.all(
            students.map(async student => {
                const location = await Location.findOne({code: student.location});
                if (!location) return res.status(400).json({error: 'Invalid Location'});

                return {
                    name: student.name,
                    location: location._id
                }
            })
        );
        const insertedStudents = await Student.insertMany(validStudents);
        return res.status(200).json({message: 'Students added successfully', students: insertedStudents});
    } catch (error) {
        logger.error(`Error Adding students: ${error.message}`);
        logger.debug(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}