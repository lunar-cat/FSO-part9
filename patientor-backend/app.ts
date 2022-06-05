import express from "express";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = { origin: allowedOrigins };
app.use(cors(options));
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
export default app;
