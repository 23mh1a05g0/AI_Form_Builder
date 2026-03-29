import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});