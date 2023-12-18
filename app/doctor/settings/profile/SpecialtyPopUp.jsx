"use client";

import { useFormik } from "formik";
import Input from "../../../../components/Input";
import { useEffect } from "react";
import { useDoctor } from "../../Context";

import { useState } from "react";
import { SpecialitiesSettingSchema } from "@/validation/doctor";
import Header from "@/components/Header";
import { updateDB } from "@/functions/firebase";
import { auth } from "@/firebase-config";

const SpecialtyPopUp = ({ settingsPup, setSettingsPup }) => {
  const { doctorDetail, getDoctorData } = useDoctor();
  const [submit, setSubmit] = useState(false);

  const onSubmit = async (values) => {
    setSubmit(true);
    if (doctorDetail.specialty === values.specialty) return;
    try {
      updateDB("doctors", auth.currentUser.uid, { specialty: values.specialty });
      setSubmit(false);
      getDoctorData();
      setSettingsPup("");
    } catch (err) {
      console.log(err);
      setSubmit(false);
    }
  };

  useEffect(() => {
    if (doctorDetail.specialty) {
      values.specialty = doctorDetail.specialty;
    }
  }, []);

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        specialty: "",
      },
      validationSchema: SpecialitiesSettingSchema,
      onSubmit,
    });

  return (
    <div>
      <div
        className={` ${
          settingsPup === "specialty" ? "bottom-0 top-0" : "top-[200%]"
        } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
      >
        <div>
          <Header
            text={
              doctorDetail.specialty
                ? "Edit your Specialty"
                : "Add your Specialty"
            }
            onClick={() => setSettingsPup(" ")}
          />

          <div className=" flex flex-col gap-2 mt-10 pb-3">
            <Input
              label="Your Specialty *"
              name="specialty"
              id="specialty"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.specialty}
              Error={
                touched.specialty && errors.specialty && errors.specialty
              }
              placeholder="Ex: General Practitioner "
            />
          </div>
        </div>
        <div
          className={` ${
            settingsPup === "specialty" ? "bottom-0" : "bottom-[-200%]"
          } fixed right-0 duration-200 p-4 flex items-center w-full gap-2 mt-2`}
        >
          <button
            onClick={() => setSettingsPup(" ")}
            className=" w-full text-base border  border-primary text-primary rounded-lg h-[34px]"
          >
            close
          </button>
          <button
            disable={submit ? true : false}
            type="submit"
            onClick={handleSubmit}
            className={` ${
              errors.specialty ? "bg-gray-500" : "bg-primary"
            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyPopUp;
