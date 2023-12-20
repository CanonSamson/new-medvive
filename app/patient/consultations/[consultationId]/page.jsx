"use client";

import PageHeaderWithBackButton from "@/components/PageHeaderWithBackButton";
import { redirect, useParams } from "next/navigation";
import { useConsultationDetails } from "@/functions/useConsultationDetails";
import { MdOutlineDateRange } from "react-icons/md";
import LayoutPage from "../../LayoutPage";
import Star from "@/components/Star";
import LoadingPage from "@/components/LoadingPage";
import { usePatient } from "../../Context";
import { useEffect, useLayoutEffect, useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import CancelBookingPopUp from "./CancelBookingPopUp";
import { seenConsultation } from "@/functions/consultations";

const Consultation = () => {
  const { consultationId } = useParams();
  const { pending, auth, consultations } = usePatient();
  const [cancelUpPop, setCancelUpPop] = useState(false);

  useLayoutEffect(() => {
    // Check authentication status when dependencies change
    if (pending) return;
    if (!auth.currentUser && !pending) {
      redirect("/");
    }
  }, []);

  const {
    doctorConsultation,
    isFetching,
    doctor,
    patientConsultation,
    patientDetail,
  } = useConsultationDetails({ consultationId });

  useEffect(() => {
    const seenConsult = async () => {
      seenConsultation(patientDetail.uid, consultationId, consultations);
    };
    if (patientConsultation?.messageStatus === "sent") {
      seenConsult();
    }
  }, [isFetching, patientConsultation, patientDetail]);

  if (pending) return <LoadingPage />;

  return (
    auth.currentUser && (
      <LayoutPage>
        <div className=" text-base bg-brandwhite min-h-screen pb-[100px]">
          <PageHeaderWithBackButton
            href="/patient/consultations"
            text="Consultation"
          />
          {isFetching === "fetched" ? (
            <>
              <div className=" px-4">
                <DoctorCard
                  Name={doctor?.name}
                  Img={doctor?.profilePicture}
                  specialty={doctor?.specialty}
                  languages={doctor?.languages}
                  stars={doctor?.stars ? doctor?.stars : "0.0"}
                />

                <div className=" flex items-center justify-between px-2  h-[40px]  mt-10 border-b">
                  <div className=" flex items-center gap-1 text-base ">
                    <MdOutlineDateRange className=" text-primary" size={20} />
                    <span>Start date</span>
                  </div>
                  <div className=" flex items-center gap-1 text-base ">
                    <span>
                      {patientConsultation?.weekday},{" "}
                      {patientConsultation?.date}
                    </span>
                    <span>{patientConsultation?.time}</span>
                  </div>
                </div>

                <div className=" mt-2">
                  <h4 className=" text-[14px]">Details</h4>
                  <div>
                    <div className=" grid grid-cols-2 mt-2 gap-r-5 gap-y-2">
                      <span>Booking ID</span>
                      <span>{consultationId}</span>

                      <span> Verified Name : </span>
                      <span>{patientDetail?.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {doctorConsultation?.ratings && (
                <div className=" flex flex-col px-4  gap-2 mt-20">
                  <span>Your Feedback to Doctor</span>
                  <div className=" flex items-center gap-1">
                    <Star
                      size={16}
                      stars={doctorConsultation?.ratings?.stars}
                    />
                  </div>
                  <span className=" text-base">
                    {doctorConsultation?.ratings?.review}
                  </span>
                </div>
              )}

              <CancelBookingPopUp
                cancelUpPop={cancelUpPop}
                setCancelUpPop={setCancelUpPop}
                doctor={doctor}
                consultationId={consultationId}
              />

              <div className="fixed right-0 duration-200 bottom-[60px] p-4 flex items-center w-full gap-2 mt-2">
                <button className="flex items-center justify-center w-full bg-primary text-white text-base border rounded-lg h-[34px]">
                  Message
                </button>

                <button
                  onClick={() => setCancelUpPop(true)}
                  className="justify-center items-center flex w-full text-base border-primary text-primary rounded-lg h-[34px]"
                >
                  Cancel Consultation
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">Loading....</div>
          )}
        </div>
      </LayoutPage>
    )
  );
};

export default Consultation;
