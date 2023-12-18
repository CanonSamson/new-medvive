"use client";

import { useFormik } from "formik";
import languages from "./Languages";
import { useState } from "react";
import { useDoctor } from "../../Context";
import { LanguagesSettingSchema } from "@/validation/doctor";
import Header from "@/components/Header";
import { UpdateFunction } from "@/functions/firebase";
import { auth } from "@/firebase-config";

const LanguagePopUp = ({ settingsPup, setSettingsPup }) => {
  const { doctorDetail, getDoctorData } = useDoctor();
  const [submit, setSubmit] = useState(false);

  const onSubmit = async (values) => {
    setSubmit(true);
    try {
      UpdateFunction(
        "doctors",
        auth.currentUser.uid,
        {
          language: values.language,
          proficiencyLevel: values.proficiencyLevel,
        },
        doctorDetail.languages,
        "languages"
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
        language: "",
        proficiencyLevel: "",
      },
      validationSchema: LanguagesSettingSchema,
      onSubmit,
    });
  return (
    <div
      className={` ${
        settingsPup === "language" ? "bottom-0 top-0" : "top-[200%]"
      } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
    >
      <Header text="Add language" onClick={() => setSettingsPup(" ")} />

      <div className="  flex flex-col gap-2 mt-10 pb-3">
        <div>
          <label>Language</label>
          <select
            onChange={handleChange}
            name="language"
            id="language"
            onBlur={handleBlur}
            value={values.language}
            className="flex items-center focus:outline-none bg-white text-[#858585] h-[45px] border rounded-lg  px-4 w-full"
          >
            <option value="">Select</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Proficiency level</label>
          <select
            onChange={handleChange}
            name="proficiencyLevel"
            id="proficiencyLevel"
            onBlur={handleBlur}
            value={values.proficiencyLevel}
            className="flex items-center bg-white focus:outline-none text-[#858585] h-[45px] border rounded-lg  px-4 w-full"
          >
            <option value="">Search for proficiency level</option>
            <option value="Basic">Basic</option>
            <option value="Conversational">Conversational</option>
            <option value="Fluent">Fluent</option>
            <option value="Native Or Bilingual">Native Or Bilingual</option>
          </select>
        </div>
      </div>
      <div
        className={` ${
          settingsPup === "language" ? "bottom-0" : "bottom-[-200%]"
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

export default LanguagePopUp;
