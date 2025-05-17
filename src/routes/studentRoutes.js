import {Router} from 'express';
import {createStudent, getAllStudents, getAllStudentsByLocation, bulkAddStudents} from "../controllers/studentController.js";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management endpoints
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createStudent);

/**
 * @swagger
 * /api/students/all:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/all', getAllStudents);

/**
 * @swagger
 * /api/students/locations/{locationCode}:
 *   get:
 *     summary: Get students by location
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: locationCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Location code (e.g., DD_LOC1)
 *     responses:
 *       200:
 *         description: List of students at the specified location
 *       404:
 *         description: Location not found or no students
 */
router.get('/locations/:locationCode', getAllStudentsByLocation);

/**
 * @swagger
 * /api/students/bulk:
 *   post:
 *     summary: Bulk add students
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - location
 *               properties:
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *     responses:
 *       201:
 *         description: Students added successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/bulk', bulkAddStudents);

export default router;