import express from "express";
import { generateForm } from "../controllers/aiController.js";

const router = express.Router();

router.post("/form/generate", generateForm);

export default router;