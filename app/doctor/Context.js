"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDoctor } from "@/functions/doctor";
import { db } from "@/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { getCollectionDB } from "@/functions/firebase";

const DoctorContext = createContext();

export function useDoctor() {
  return useContext(DoctorContext);
}

export function DoctorProvider({ children }) {
  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [patients, setPatients] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [consultations, setConsultations] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const auth = getAuth();

  function logout() {
    setLoggingOut(true);
    signOut(auth);
    setDoctorDetail(null);
    setLoggingOut(false);
    router.push("/");
  }

  async function getDoctorData() {
    if (!auth.currentUser && isSigning) return null;
    try {
      const { doctor } = await getDoctor();
      setDoctorDetail(doctor);
      return { doctor };
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching user user:", error);
    }
  }

  const getDoctorDetail = async () => {
    setPending(true);
    if (auth.currentUser) {
      try {
        const { doctor } = await getDoctor();
        const { Data: patients } = await getCollectionDB("patients");
        setPatients(patients);
        setDoctorDetail(doctor);
        setPending(false);
      } catch (error) {
        setPending(false);
        console.error("Error fetching user user:", error);
      }
    } else {
      setPending(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      getDoctorDetail();
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    getDoctorDetail();
  }, []);

  useEffect(() => {
    if (doctorDetail) {
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
  }, [doctorDetail]);

  const value = {
    auth,
    doctorDetail,
    logout,
    pending,
    setIsSigning,
    getDoctorData,
    patients,
    consultations,
    loggingOut,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
}
