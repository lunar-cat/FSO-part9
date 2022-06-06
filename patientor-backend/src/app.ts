import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses";

const app = express();
const options: cors.CorsOptions = { origin: ["http://localhost:3000"] };
app.use(cors(options));
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
app.use("/api/diagnoses", diagnosisRouter);
export default app;
