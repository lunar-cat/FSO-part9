import express from "express";
import patientService from "../services/patientService";
import { Patient, ReqBodyPatient } from "../types";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient: Patient | undefined = patientService.getPatient(id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const body = req.body as ReqBodyPatient;
    const newPatient = toNewPatient(body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(404).send(errorMessage);
  }
});
export default router;
