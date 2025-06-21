import { Router } from "express";
import {getAttendanceByLocationAndDate, takeAttendance, updateAttendance, getAttendanceByLocationAndYear} from '../controllers/attendanceController.js'

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Endpoints for recording attendance
 */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Record attendance for a location and date
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - location
 *               - volunteer
 *               - present
 *               - absent
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-15"
 *               location:
 *                 type: string
 *                 description: ObjectId of the location
 *                 example: "6638c8312a99db464d279cb1"
 *               volunteer:
 *                 type: string
 *                 description: Name or ID of the volunteer who recorded attendance
 *                 example: "John Doe"
 *               present:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ObjectId of a present student
 *                 example: ["6638c8312a99db464d279cb1", "6638c8312a99db464d279cb2"]
 *               absent:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ObjectId of an absent student
 *                 example: ["6638c8312a99db464d279cb3"]
 *     responses:
 *       201:
 *         description: Attendance recorded successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Error saving Attendance
 */
router.post('/', takeAttendance);

/**
 * @swagger
 * /api/attendance:
 *   patch:
 *     summary: Update present and absent lists for an attendance record by location and date
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - date
 *             properties:
 *               location:
 *                 type: string
 *                 example: "6638b4c447d703421f44dbd4"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-17"
 *               present:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "6638c8312a99db464d279cb1"
 *               absent:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "6638c8312a99db464d279cb2"
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       400:
 *         description: location and date are required
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal server error
 */
router.patch('/', updateAttendance);


/**
 * @swagger
 * /api/attendance/fetch:
 *   post:
 *     summary: Get attendance by location and date
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - date
 *             properties:
 *               location:
 *                 type: string
 *                 description: ID of the location
 *                 example: "6638b4c447d703421f44dbd4"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-17"
 *     responses:
 *       200:
 *         description: Attendance record found
 *       400:
 *         description: location and date are required
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal server error
 */
router.post('/fetch', getAttendanceByLocationAndDate)
/**
 * @swagger
 * /api/attendance/yearly:
 *   post:
 *     summary: Get all attendance records for a location by year
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - year
 *             properties:
 *               location:
 *                 type: string
 *                 description: ID of the location/center
 *                 example: "6638b4c447d703421f44dbd4"
 *               year:
 *                 type: number
 *                 description: Year to fetch attendance data for
 *                 example: 2025
 *     responses:
 *       200:
 *         description: Yearly attendance records found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: string
 *                 year:
 *                   type: number
 *                 totalRecords:
 *                   type: number
 *                 attendanceRecords:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Location and year are required
 *       500:
 *         description: Internal server error
 */
router.post('/yearly', getAttendanceByLocationAndYear);

export default router;