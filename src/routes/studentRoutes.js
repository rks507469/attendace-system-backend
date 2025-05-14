import {Router} from 'express';
import {createStudent, getAllStudents, getAllStudentsByLocation} from "../controllers/studentController.js";


const router = Router();

router.post('/', createStudent);
router.get('/all', getAllStudents);
router.get('/locations/:locationCode', getAllStudentsByLocation);

export default router;