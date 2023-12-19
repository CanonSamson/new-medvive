"use client";
import React, { useEffect, useState } from "react";
import { usePatient } from "../Context";
import { MdDateRange } from "react-icons/md";
import Consult from "./Consult";
import { patientPrivateRoute } from "@/functions/auth";
import LayoutPage from "../LayoutPage";

const Consultations = () => {
  const { aproved } = patientPrivateRoute();
  const { consultations, doctors } = usePatient();

  return (
    aproved && (
      <LayoutPage>
        <div className=" text-dark flex flex-col  ">
          <div className="flex px-4 justify-between items-center pb-7 mt-5 ">
            <h4 className=" text-xl font-semibold">My Consultations</h4>
            <MdDateRange className="text-[#7B8D9E]" size={24} />
          </div>

          <div className=" flex w-fill mx-4 gap-3"></div>

          <section className=" px-4 mt-5  pb-[205px]">
            <div className=" grid gap-2">
              {consultations != null ? (
                <Consult doctors={doctors} consultations={consultations} />
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
