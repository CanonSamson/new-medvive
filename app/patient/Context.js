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
  const [loggingOut, setLoggingOut] = useState(false);

  const auth = getAuth();

  function logout() {
    setLoggingOut(true);
    signOut(auth);
    setPatientDetail(null);
    setLoggingOut(false);
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
      console.error("Error fetching doctors", error);
    }
  }



  const getPatientDetail = async () => {
    setPending(true);

    if (auth.currentUser) {
      try {
        // Fetch patient details
        const { patient } = await getPatient();

        // Fetch doctors collection
        const { Data: doctors } = await getCollectionDB("doctors");

        // Update state with fetched data
        setDoctors(doctors);
        setPatientDetail(patient);
        setPending(false);
      } catch (error) {
        // Handle errors during data fetching
        console.error("Error fetching patient:", error);
        setPending(false);
      }
    } else {
      // Handle the case where the user is not authenticated
      setPending(false);
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
          console.log(source, " setconsultations: ",  doc?.data()?.data);
          if (doc.data()) {
            setConsultations( doc?.data()?.data);
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
    loggingOut,
  };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
}
