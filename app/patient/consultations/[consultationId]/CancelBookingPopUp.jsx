"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { usePatient } from "../../Context";
import {  findConsultation } from "@/functions/functions";
import { CancelBookingSchema } from "@/validation/patient";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { updateDB } from "@/functions/firebase";

const CancelBookingPopUp = ({
  cancelUpPop,
  setCancelUpPop,
  doctor,
  consultationId,
}) => {
  const { consultations, patientDetail } = usePatient();
  const [canceled, setCancel] = useState(false);

  const onSubmit = async (values) => {
    setCancel(true);
    const timestamp = new Date();

    let data;
    const dataDoc = await getDoc(doc(db, "consultations", doctor.uid));
    data = dataDoc.exists() ? dataDoc.data() : null;

    if (data) {
      let doctorConsultations = [...data.data]; // Make a copy of the array
      let patientConsultations = [...consultations]; // Make a copy of the array

      const { foundPatientIndex, foundDocIndex } = findConsultation(
        consultations,
        data.data,
        consultationId
      );

      // Check if both bookings were found
      if (foundPatientIndex !== -1 && foundDocIndex !== -1) {
        patientConsultations[foundPatientIndex].status = "Canceled";
        patientConsultations[foundPatientIndex].active = false;
        patientConsultations[foundPatientIndex].cancelAt = timestamp;
        patientConsultations[foundPatientIndex].cancelMassage =
          values.cancelMassage;

        doctorConsultations[foundDocIndex].status = "Canceled";
        doctorConsultations[foundDocIndex].cancelAt = timestamp;
        doctorConsultations[foundDocIndex].active = false;
        doctorConsultations[foundDocIndex].cancelMassage = values.cancelMassage;
      } else {
        setCancel(false);
      }

      try {
        if (consultations?.length > 0) {
          updateDB("consultations", patientDetail.uid, {
            data: patientConsultations,
          });
          updateDB("consultations", doctor.uid, {
            data: doctorConsultations,
          });
        }
        setCancel(false);
        setCancelUpPop(false);
      } catch (error) {
        console.error("Error updating item:", error);
        setCancel(false);
      }
    } else {
      setCancel(false);
    }
  };

  const { errors, touched, handleBlur, values, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        cancelMassage: "",
      },
      validationSchema: CancelBookingSchema,
      onSubmit,
    });

  return (
    <div className={` ${!cancelUpPop ? "hidden" : "flex"}`}>
      <div className=" fixed flex h-screen w-full right-0 z-[55] justify-center items-center bg-black/10 top-0">
        <div className="  bg-brandwhite rounded-md w-[360px] p-4 min-w-[350px] ">
          <h5 className=" text-[14px] font-semibold"> Cancel This Booking</h5>
          <textarea
            id="cancelMassage"
            name="cancelMassage"
            autoFocus={true}
            type="text"
            className=" p-2   py-4 mt-2 bg-white w-full h-[150px] text-base focus:outline-none"
            placeholder="Why Do you Want to Cancel The Booking?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cancelMassage}
          />
          <span className=" text-base text-red-500">
            {touched.cancelMassage && errors?.cancelMassage}
          </span>

          <div className=" flex items-center gap-2 mt-2">
            <button
              disabled={canceled ? true : false}
              onClick={() => setCancelUpPop(false)}
              to=""
              className={`  ${canceled ? "bg-gray-400 " : "bg-primary"
                }  justify-center items-center flex w-full  text-white text-base  rounded-lg h-[34px]`}
            >
              Keep
            </button>
            <button
              type="submit"
              disabled={canceled ? true : false}
              onClick={handleSubmit}
              className={` ${canceled
                  ? "border-gray-400 text-gray-400"
                  : "border-primary text-primary"
                } w-full text-base border   rounded-lg h-[34px]`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingPopUp;
