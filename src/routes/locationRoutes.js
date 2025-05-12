import {Router} from "express";
import {createLocation} from "../controllers/locationController.js";

const router = Router();

router.post('/', createLocation);

export default router;