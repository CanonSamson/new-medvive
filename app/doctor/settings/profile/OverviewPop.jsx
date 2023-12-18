"use client";

import { useFormik } from "formik";
import { useDoctor } from "../../Context";
import { useState } from "react";

import { BIOSettingSchema } from "@/validation/doctor";
import Header from "@/components/Header";
import { updateDB } from "@/functions/firebase";
import { auth } from "@/firebase-config";

const OverviewPopUp = ({ settingsPup, setSettingsPup }) => {
  const { doctorDetail, getDoctorData } = useDoctor();
  const [submit, setSubmit] = useState(false);

  const onSubmit = async (values) => {
    setSubmit(true);
    if (doctorDetail.bio === values.bio) return;
    try {
      updateDB("doctors", auth.currentUser.uid, { bio: values.bio });
      getDoctorData();
      setSubmit(false);
      setSettingsPup("");
    } catch (err) {
      console.log(err);
      setSubmit(false);
    }
  };

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        bio: "",
      },
      validationSchema: BIOSettingSchema,
      onSubmit,
    });

  return (
    <div
      className={` ${
        settingsPup === "Overview" ? "bottom-0 top-0" : "top-[200%]"
      } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
    >
      <Header text="Overview" onClick={() => setSettingsPup(" ")} />

      <div className=" flex flex-col gap-2 mt-10 pb-3">
        <span className=" text-[11px] leading-0">
          Enter a single sentence description of your professional
          Skill/expreience (General Practitioner )
        </span>
      </div>

      <div>
        <textarea
          label="BIO *"
          name="bio"
          id="bio"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.bio}
          placeholder="Ex:  "
          className=" focus:outline-none text-base flex w-full h-[150px] items-center bg-white text-[#858585]  border rounded-lg  p-2"
        />
        <span className=" text-red-700  bottom-[-20px] text-[10px] ">
          {touched.bio && errors.bio && errors.bio}
        </span>
      </div>
      <div
        className={` ${
          settingsPup === "Overview" ? "bottom-0" : "bottom-[-200%]"
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
            errors.bio ? "bg-gray-500" : "bg-primary"
          } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OverviewPopUp;
