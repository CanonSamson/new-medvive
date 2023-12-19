"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getPatient } from "@/functions/patient";
import { getCollectionDB, getDB } from "@/functions/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";

const PatientContext = createContext();

export function usePatient() {
  return useContext(PatientContext);
}

export function PatientProvider({ children }) {
  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [patientDetail, setPatientDetail] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [consultations, setConsultations] = useState(null);
  const [isSigning, setIsSigning] = useState(false);

  const auth = getAuth();

  function logout() {
    signOut(auth);
    setPatientDetail(null);
    router.push("/");
  }

  async function getPatientData() {
    if (!auth.currentUser && isSigning) return null;
    try {
      const { data: patient } = await getDB("patients", auth.currentUser.uid);
      setPatientDetail(patient);
      return { patient };
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching user user:", error);
    }
  }

  async function getDoctors() {
    if (!auth.currentUser) return null;
    try {
      const { Data: doctors } = await getCollectionDB("doctors");
      setDoctors(doctors);
      return { doctors };
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching doctors", error);
    }
  }

  const getPatientDetail = async () => {
    if (!auth.currentUser) return null;
    try {
      const { patient } = await getPatient();
      setPatientDetail(patient);
      setPending(false);
      console.log(patient);
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching  patient:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      getPatientDetail();
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    getPatientDetail();
  }, []);

  useEffect(() => {
    if (patientDetail) {
      const unsub = onSnapshot(
        doc(db, "consultations", auth.currentUser.uid),
        (doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, " setconsultations: ", doc.data().data);
          if (doc.data()) {
            setConsultations(doc.data().data);
          }
        }
      );

      return () => unsub();
    }
  }, [patientDetail]);

  const value = {
    auth,
    patientDetail,
    logout,
    pending,
    setIsSigning,
    getPatientData,
    getDoctors,
    doctors,
    consultations,
  };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
}
