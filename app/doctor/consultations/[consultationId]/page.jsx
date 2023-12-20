"use client";

import PageHeaderWithBackButton from "@/components/PageHeaderWithBackButton";
import { redirect, useParams } from "next/navigation";
import { MdOutlineDateRange } from "react-icons/md";
import Star from "@/components/Star";
import LoadingPage from "@/components/LoadingPage";
import { useDoctor } from "../../Context";
import { useLayoutEffect } from "react";
import { useDoctorConsultationDetail } from "@/functions/useDoctorConsultationDetail";
import LayoutPage from "../../LayoutPage";
import DoctorCard from "@/components/DoctorCard";
import { updateDB } from "@/functions/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";

const Consultation = () => {
  const { consultationId } = useParams();
  const { pending, auth, consultations } = useDoctor();

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
    patient,
    patientConsultation,
    doctorDetail,
  } = useDoctorConsultationDetail({ consultationId });

  const ConfirmBooking = async (consultationId, consultation, patient) => {
    const timestamp = new Date();

    let data;
    const dataDoc = await getDoc(doc(db, "consultations", patient.uid));
    data = dataDoc.exists() ? dataDoc.data() : null;

    if (data) {
      let patientConsultations = [...data.data]; // Make a copy of the array
      let doctorConsultations = [...consultations]; // Make a copy of the array

      // Find the index of the booking with the given ID in both arrays
      const foundPatientIndex = patientConsultations.findIndex(
        (consultaion) => consultaion.consultationId == consultationId
      );
      const foundDocIndex = doctorConsultations.findIndex(
        (consultaion) => consultaion.consultationId == consultationId
      );
      // Check if both bookings were found
      if (foundPatientIndex !== -1 && foundDocIndex !== -1) {
        // Update the status to "Started" for both user and doctor bookings
        patientConsultations[foundPatientIndex].status = "Started";
        patientConsultations[foundPatientIndex].tostarted = timestamp;

        doctorConsultations[foundDocIndex].status = "Started";
        doctorConsultations[foundDocIndex].tostarted = timestamp;
      }

      try {
        if (consultations?.length > 0) {
          updateDB("consultations", patient.uid, {
            data: patientConsultations,
          });
          updateDB("consultations", doctorDetail.uid, {
            data: doctorConsultations,
          });
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  if (pending) return <LoadingPage />;

  return (
    auth.currentUser && (
      <LayoutPage>
        <div className=" text-base  bg-brandwhite min-h-screen pb-[100px]">
          <PageHeaderWithBackButton
            href="/doctor/consultations"
            text="Consultation"
          />
          {isFetching === "fetched" ? (
            <>
              <div className=" px-4">
                <DoctorCard
                  Name={patient?.name}
                  Img={
                    !patient?.profilePicture
                      ? patient?.gender === "Male"
                        ? "/images/Avatar.png"
                        : "/images/Avatar.png"
                      : patient?.profilePicture
                  }
                  specialty={patient?.address}
                  languages={patient?.languages}
                />

                <div className=" flex items-center justify-between px-2  h-[40px]  mt-10 border-b">
                  <div className=" flex items-center gap-1 text-base ">
                    <MdOutlineDateRange className=" text-primary" size={20} />
                    <span>Start date</span>
                  </div>
                  <div className=" flex items-center gap-1 text-base ">
                    <span>
                      {doctorConsultation?.weekday}, {doctorConsultation?.date}
                    </span>
                    <span>{doctorConsultation?.time}</span>
                  </div>
                </div>

                <div className=" mt-2">
                  <h4 className=" text-[14px]">Details</h4>
                  <div>
                    <div className=" grid grid-cols-2 mt-2 gap-r-5 gap-y-2">
                      <span>Booking ID</span>
                      <span>{consultationId}</span>

                      <span> Verified Name : </span>
                      <span>{patient?.name}</span>
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

        <div className="fixed right-0 duration-200 bottom-[60px] p-4 flex items-center w-full gap-2 mt-2">
          {doctorConsultation?.status === "Upcomming" && (
            <button
              onClick={async () => {
                await ConfirmBooking(
                  consultationId,
                  doctorConsultation,
                  patient
                );
              }}
              className="flex items-center justify-center w-full bg-primary text-white text-base border rounded-lg h-[34px]"
            >
              Confirm Consultation
            </button>
          )}

          <button className="justify-center items-center flex w-full text-base border-primary text-primary rounded-lg h-[34px]">
            Message
          </button>
        </div>
      </LayoutPage>
    )
  );
};

export default Consultation;
