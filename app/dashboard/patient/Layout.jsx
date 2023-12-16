"use client";

import { useUserAuth } from "@/Context";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "@/firebase-config";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { pending, patientDetail } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (pending) {
      // Handle pending state (e.g., show loading spinner)
      return;
    }

    if (!auth.currentUser || !patientDetail) {
      // Redirect to the login page if the user is not authenticated
      router.push("/");
    }
  }, []);

  if (pending) {
    return (
      <div className=" w-full bg-white h-screen relative flex justify-center items-center">
        <Image
          className="w-[120px] animate-bounce"
          src="/logo.svg"
          width={120}
          height={100}
          alt=""
        />
      </div>
    );
  }

  return (
    <>
      {!pending && auth.currentUser && patientDetail && (
        <main>
          {children}
          <Navigation />
        </main>
      )}
    </>
  );
};

export default Layout;
