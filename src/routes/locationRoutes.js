import {Router} from "express";
import {createLocation, getAllLocations} from "../controllers/locationController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Endpoints for managing study locations
 */

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 example: DD_LOC1
 *               name:
 *                 type: string
 *                 example: Darul Uloom, Location 1
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/', createLocation);

/**
 * @swagger
 * /api/locations/all:
 *   get:
 *     summary: Get all study locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/all', getAllLocations);

export default router;