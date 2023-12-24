import { findConsultation } from "@/functions/functions";
import { db } from "@/firebase-config";
import {     updateDB } from "@/functions/firebase";
import { doc, getDoc } from "firebase/firestore";


export const ConfirmConsultation = async ({ consultationId, patient, doctorDetail, consultations }) => {
    const timestamp = new Date();
    try {
        if (!patient) return;
        let data;
        const dataDoc = await getDoc(doc(db, "consultations", patient.uid));
        data = dataDoc.exists() ? dataDoc.data() : null;

        if (data) {
            let patientConsultations = [...data.data]; // Make a copy of the array
            let doctorConsultations = [...consultations]; // Make a copy of the array


            const { foundPatientIndex, foundDocIndex } = findConsultation(
                data.data,
                consultations,
                consultationId
            );
            console.log(foundPatientIndex)
            if (foundPatientIndex !== -1 && foundDocIndex !== -1) {
                patientConsultations[foundPatientIndex].status = "Started";
                patientConsultations[foundPatientIndex].tostarted = timestamp;

                doctorConsultations[foundDocIndex].status = "Started";
                doctorConsultations[foundDocIndex].tostarted = timestamp;
            }

            if (consultations?.length > 0) {
                updateDB("consultations", patient.uid, {
                    data: patientConsultations,
                });
                updateDB("consultations", doctorDetail.uid, {
                    data: doctorConsultations,
                });
            }

        }
    } catch (error) {
        console.error("Error updating item:", error);
    }
};










export const EndConsultation = async (consultationId, patient, doctorDetail, consultations) => {
    const timestamp = new Date();

    let data;
    const dataDoc = await getDoc(doc(db, "consultations", patient.uid));
    data = dataDoc.exists() ? dataDoc.data() : null;

    if (data) {
        let patientConsultations = [...data.data]; // Make a copy of the array
        let doctorConsultations = [...consultations]; // Make a copy of the array

        const { foundPatientIndex, foundDocIndex } = findConsultation(
            data.data,
            consultations,
            consultationId
        );

        // Check if both bookings were found
        if (foundPatientIndex !== -1 && foundDocIndex !== -1) {
            // Update the status to "Started" for both user and doctor bookings
            patientConsultations[foundPatientIndex].status = "Ended";
            patientConsultations[foundPatientIndex].endedAt = timestamp;

            doctorConsultations[foundDocIndex].status = "Ended";
            doctorConsultations[foundDocIndex].endedAt = timestamp;
        }

        try {
            if (consultations?.length > 0) {
                updateDB("consultations", patient.uid, {
                    data: patientConsultations,
                });
                updateDB("consultations", doctorDetail.uid, {
                    data: doctorConsultations,
                });
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    }
};