import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRoutes);
app.use("/api", aiRoutes);

export default app;