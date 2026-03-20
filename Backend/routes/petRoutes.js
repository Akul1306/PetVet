import express from "express";
import { getAllPets,addPet } from "../controllers/petController.js";

const router = express.Router();

router.get("/getAllPets", getAllPets);
router.post("/addPet",addPet);

export default router;
