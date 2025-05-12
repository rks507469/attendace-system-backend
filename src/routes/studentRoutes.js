import {Router} from 'express';
import {createStudent, getAllStudents} from "../controllers/studentController.js";


const router = Router();

router.post('/', createStudent);
router.get('/all', getAllStudents);

export default router;