"use client";

import { useEffect, useState } from "react";
import { getDB } from "./firebase";
import { useDoctor } from "@/app/doctor/Context";

export function useDoctorConsultationDetail({ consultationId }) {
  const [doctorConsultation, setDoctorConsultation] = useState(null);
  const [patientConsultation, setPatientConsultation] = useState(null);
  const [isFetching, setIsFetching] = useState("fetching");
  const { consultations, pending, patients, doctorDetail } = useDoctor();
  const [patient, setPatient] = useState(null);

  const getData = async () => {
    try {
      if (consultations && !pending) {
        setIsFetching("fetching");

        const doctorConsult = consultations.find(
          (consult) => consult.consultationId == consultationId
        );

        const patient = patients.find(
          (consult) => doctorConsult.patientId == consult.uid
        );

        if (doctorConsult) {
          const { data: patientConsultations } = await getDB(
            "consultations",
            doctorConsult.patientId
          );

          const patientConsult = patientConsultations.data.find(
            (consult) => consult.consultationId == consultationId
          );

          setDoctorConsultation(doctorConsult);
          setPatientConsultation(patientConsult);
          setPatient(patient);

          setIsFetching("fetched");
        }
      }
    } catch (err) {
      setIsFetching("error");
    }
  };

  useEffect(() => {
    getData();
  }, [consultations, consultationId]);

  return {
    doctorConsultation,
    patientConsultation,
    patient,
    isFetching,
    doctorDetail,
  };
}
