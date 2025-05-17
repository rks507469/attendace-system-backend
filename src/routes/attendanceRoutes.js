import { Router } from "express";
import {takeAttendance} from '../controllers/attendanceController.js'

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
 *     summary: Record attendance for students
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
 *               - records
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-15"
 *               location:
 *                 type: string
 *                 example: "DD_LOC2"
 *               records:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - studentId
 *                     - present
 *                   properties:
 *                     studentId:
 *                       type: string
 *                       example: "6638c8312a99db464d279cb1"
 *                     present:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Attendance recorded successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/', takeAttendance);

export default router;