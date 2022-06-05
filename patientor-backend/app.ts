import express from "express";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
export default app;
