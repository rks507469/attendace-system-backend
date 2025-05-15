import {Router} from "express";
import {createLocation, getAllLocations} from "../controllers/locationController.js";

const router = Router();

router.post('/', createLocation);
router.get('/all', getAllLocations);

export default router;