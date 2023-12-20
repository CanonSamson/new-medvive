"use client";

import { useEffect, useState } from "react";
import { usePatient } from "@/app/patient/Context";
import { getDB } from "./firebase";

export function useConsultationDetails({ consultationId }) {
  const [doctorConsultation, setDoctorConsultation] = useState(null);
  const [patientConsultation, setPatientConsultation] = useState(null);
  const [isFetching, setIsFetching] = useState("fetching");
  const { consultations, pending, patientDetail, doctors } = usePatient();
  const [doctor, setDoctor] = useState(null);

  const getData = async () => {
    try {
      if (consultations && !pending) {
        setIsFetching("fetching")

        const patientConsult = consultations.find(
          (consult) => consult.consultationId == consultationId
        );
        const doctor = doctors.find(
          (consult) => patientConsult.doctorId == consult.uid
        );

        if (patientConsult) {
          const { data: doctorConsultations } = await getDB(
            "consultations",
            patientConsult.doctorId
          );

          const doctorConsult = doctorConsultations.data.find(
            (consult) => consult.consultationId == consultationId
          );

          setDoctorConsultation(doctorConsult);
          setPatientConsultation(patientConsult);
          setDoctor(doctor);


          setIsFetching("fetched");
        }
      };
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
    doctor,
    isFetching,
    patientDetail,
  };
}
