"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getPatient } from "./functions/patient";

const AuthContext = createContext();

export function useUserAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [patientDetail, setPatientDetail] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [greeting, setGreeting] = useState("");

  const auth = getAuth();

  function logout() {
    signOut(auth);
    setPatientDetail(null);
    router.push("/");
  }

  async function getPatientData() {
    if (!auth.currentUser && isSigning) return null;
    try {
      const { patient } = await getPatient();
      setPatientDetail(patient);
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching user user:", error);
    }
  }

  const getPatientDetail = async () => {
    try {
      const { patient } = await getPatient();
      setPatientDetail(patient);
      setPending(false);
      console.log(patient);
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching user user:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      getPatientDetail();
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getPatientDetail();
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const value = {
    auth,
    patientDetail,
    logout,
    pending,
    setIsSigning,
    getPatientData,
    greeting,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
