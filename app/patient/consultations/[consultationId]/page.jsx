"use client";

import PageHeaderWithBackButton from "@/components/PageHeaderWithBackButton";
import { useParams, useRouter } from "next/navigation";
import { useConsultationDetails } from "@/functions/useConsultationDetails";
import { MdOutlineDateRange } from "react-icons/md";
import LayoutPage from "../../LayoutPage";
import Star from "@/components/Star";
import LoadingPage from "@/components/LoadingPage";
import { usePatient } from "../../Context";
import { useEffect } from "react";
import DoctorCard from "@/components/DoctorCard";

const Consultation = () => {

  const { consultationId } = useParams();
  const { pending, auth } = usePatient();
  const router = useRouter();

  useEffect(() => {
    if (pending) return;
    if (!auth.currentUser || !patientDetail) {
      router.push("/");
    }
  }, [pending]);

  const {
    doctorConsultation,
    isFetching,
    doctor,
    patientConsultation,
    patientDetail,
  } = useConsultationDetails({ consultationId });




  if (pending) return <LoadingPage />

  return (
    auth.currentUser && (
      <LayoutPage>
        <div className=" text-base min-h-screen pb-[100px]">
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
