// This file is central file for resolving all the routes
import {Router} from 'express';
import studentRoutes from "./studentRoutes.js";
import locationRoutes from "./locationRoutes.js";
import attendanceRoutes from "./attendanceRoutes.js"


const router = Router();

router.use('/students', studentRoutes);
router.use('/locations', locationRoutes);
router.use('/attendance', attendanceRoutes);

export default router;