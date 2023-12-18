"use client";

import { useFormik } from "formik";
import Input from "../../../../components/Input";
import { useState } from "react";

import { UpdateFunction } from "@/functions/firebase";
import { useDoctor } from "../../Context";
import { EducationSettingSchema } from "@/validation/doctor";
import Header from "@/components/Header";
import { auth } from "@/firebase-config";

const EducationPopUp = ({ settingsPup, setSettingsPup }) => {
  const { doctorDetail, getDoctorData } = useDoctor();
  const [submit, setSubmit] = useState(false);

  const onSubmit = async (values) => {
    const { school, areaOfStudy, from, to } = values;
    setSubmit(true);

    try {
      UpdateFunction(
        "doctors",
        auth.currentUser.uid,
        {
          school: school,
          areaOfStudy: areaOfStudy,
          from: from,
          to: to,
        },
        doctorDetail.education,
        "education"
      );

      setSubmit(false);
      getDoctorData();
      setSettingsPup("");
    } catch (err) {
      console.log(err);
      setSubmit(false);
    }
  };

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        school: "",
        areaOfStudy: "",
        from: "",
        to: "",
      },
      validationSchema: EducationSettingSchema,
      onSubmit,
    });

  console.log(errors);
  return (
    <div
      className={` ${
        settingsPup === "education" ? "bottom-0 top-0" : "top-[200%]"
      } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
    >
      <Header text="Add Education" onClick={() => setSettingsPup("")} />

      <div className="  flex flex-col gap-2 mt-10 pb-3">
        <div>
          <Input
            label="School *"
            name="school"
            id="school"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.school}
            Error={touched.school && errors.school && errors.school}
            placeholder="Ex: Salem university lokoja"
          />

          <Input
            label="Area of Study *"
            name="areaOfStudy"
            id="areaOfStudy"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.areaOfStudy}
            Error={
              touched.areaOfStudy && errors.areaOfStudy && errors.areaOfStudy
            }
            placeholder="Ex: course"
          />

          <div className=" mt-10 gap-2 grid">
            <span>Dates Attended</span>
            <Input
              label="from *"
              name="from"
              id="from"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.from}
              Error={touched.from && errors.from && errors.from}
              placeholder="from"
            />

            <Input
              label="To *"
              name="to"
              id="to"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.to}
              Error={touched.to && errors.to && errors.to}
              placeholder="to"
            />
          </div>
        </div>
      </div>
      <div
        className={` ${
          settingsPup === "education" ? "bottom-0" : "bottom-[-200%]"
        } fixed right-0 duration-200 p-4 flex items-center w-full gap-2 mt-2`}
      >
        <button className=" w-full text-base border  border-primary text-primary rounded-lg h-[34px]">
          close
        </button>
        <button
          disable={submit ? true : false}
          type="submit"
          onClick={handleSubmit}
          className={` ${
            errors.school && errors.areaOfStudy && errors.to && errors.from
              ? "bg-gray-500"
              : "bg-primary"
          } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EducationPopUp;
