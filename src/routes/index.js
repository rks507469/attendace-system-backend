// This file is central file for resolving all the routes
import {Router} from 'express';


const router = Router();

router.use('/student', studentRoutes);
router.use('/locations', locationRoutes);
router.use('/attendance', attendaceRoutes);

export default router;