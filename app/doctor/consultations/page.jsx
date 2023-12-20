"use client";
import React, { useLayoutEffect } from "react";
import { useDoctor } from "../Context";
import { MdDateRange } from "react-icons/md";
import Consult from "./Consult";
import LayoutPage from "../LayoutPage";
import LoadingPage from "@/components/LoadingPage";
import { redirect } from "next/navigation";

const Consultations = () => {
  const { consultations, patients, pending, auth } = useDoctor();

  useLayoutEffect(() => {
    // Check authentication status when dependencies change
    if (pending) return;
    if (!auth.currentUser && !pending) {
      redirect("/");
    }
  }, []);

  if (pending) return <LoadingPage />;
  return (
    auth.currentUser && (
      <LayoutPage>
        <div className=" bg-brandwhite min-h-screen text-dark flex flex-col  ">
          <div className="flex px-4 justify-between items-center pb-7 mt-5 ">
            <h4 className=" text-xl font-semibold">My Consultations</h4>
            <MdDateRange className="text-[#7B8D9E]" size={24} />
          </div>

          <section className=" px-4 mt-5  pb-[205px]">
            <div className=" grid gap-2">
              {consultations != null ? (
                <Consult patients={patients} consultations={consultations} />
              ) : (
                <div
                  className="  w-full flex-col  mt-[100px]
               text-gray-400  flex items-center justify-center "
                >
                  <MdDateRange size={100} />
                  <span>No Consultation Yet</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </LayoutPage>
    )
  );
};

export default Consultations;
