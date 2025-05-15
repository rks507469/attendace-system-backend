import {Router} from 'express';
import {createStudent, getAllStudents, getAllStudentsByLocation, bulkAddStudents} from "../controllers/studentController.js";


const router = Router();

router.post('/', createStudent);
router.get('/all', getAllStudents);
router.get('/locations/:locationCode', getAllStudentsByLocation);
router.post('/bulk', bulkAddStudents);

export default router;