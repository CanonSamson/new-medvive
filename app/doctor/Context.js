"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDoctor } from "@/functions/doctor";

const DoctorContext = createContext();

export function useDoctor() {
  return useContext(DoctorContext);
}

export function DoctorProvider({ children }) {
  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [isSigning, setIsSigning] = useState(false);

  const auth = getAuth();

  function logout() {
    signOut(auth);
    setDoctorDetail(null);
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
    try {
      const { doctor } = await getDoctor();
      setDoctorDetail(doctor);
      setPending(false);
      console.log(doctor);
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching user user:", error);
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

  const value = {
    auth,
    doctorDetail,
    logout,
    pending,
    setIsSigning,
    getDoctorData,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
}
