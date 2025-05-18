// src/routes/attendanceRoutes.js
import { Router } from 'express';
import { takeAttendance, submitAttendanceForm,getAttendanceData } from "../controllers/attendanceController.js";

const router = Router();

/**
 * @swagger
 * /api/attendance/take:
 *   post:
 *     summary: Record attendance 
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               present:
 *                 type: array
 *                 items:
 *                   type: string
 *               absent:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Attendance recorded successfully
 *       500:
 *         description: Server error
 */
router.post('/take', takeAttendance);

/**
 * @swagger
 * /api/attendance/submit:
 *   post:
 *     summary: Submit attendance form data
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               locationName:
 *                 type: string
 *               presentStudents:
 *                 type: array
 *                 items:
 *                   type: string
 *               volunteers:
 *                 type: array
 *                 items:
 *                   type: string
 *               additionalStudents:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Attendance form submitted successfully
 *       500:
 *         description: Server error
 */
router.post('/submit', submitAttendanceForm);
router.get('/getAttendanceData',getAttendanceData)

export default router;