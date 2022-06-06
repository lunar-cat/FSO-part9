import express from "express";
import diagnosisService from "../services/diagnosisService";
const route = express.Router();

route.get("/", (_req, res) => {
  res.json(diagnosisService.getDiagnoses());
});

export default route;
