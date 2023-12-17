"use client";

import { useState } from "react";
import Header from "@/components/Header";
import bloodGroups from "./bloodGroups";
import { useUserAuth } from "@/Context";
import { updateDB } from "@/functions/firebase";

const BloodGroupPopUp = ({ settingsPup, setSettingsPup }) => {
  const { patientDetail, getPatientData, auth } = useUserAuth();
  const [submit, setSubmit] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(patientDetail.bloodGroup);

  const onSubmit = async () => {
    setSubmit(true);
    if (patientDetail.bloodGroup === bloodGroup) return;
    try {
      updateDB("patients", auth.currentUser.uid, { bloodGroup: bloodGroup });
      setSubmit(false);
      getPatientData();
      setSettingsPup("");
    } catch (err) {
      console.log(err);
      setSubmit(false);
    }
  };

  return (
    <div>
      <div
        className={` ${
          settingsPup === "Blood Group" ? "bottom-0 top-0" : "top-[200%]"
        } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
      >
        <div>
          <Header
            text={
              patientDetail.bloodGroup
                ? "Edit your blood group"
                : "Add your blood group"
            }
            onClick={() => setSettingsPup(" ")}
          />

          <div className=" flex flex-col gap-2 mt-10 pb-3">
            <div className=" mt-4 flex-1 bg-gray-100  rounded-lg grid grid-cols-2 p-[2px] text-base ">
              {bloodGroups.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setBloodGroup(item)}
                  className={`${
                    bloodGroup === item ? " bg-white  text-[12p.5x]" : " "
                  } duration-500   rounded-lg h-[40px] transition-all`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className={` ${
            settingsPup === "Blood Group" ? "bottom-0" : "bottom-[-200%]"
          } fixed right-0 duration-200 p-4 flex items-center w-full gap-2 mt-2`}
        >
          <button
            disable={submit ? true : false}
            onClick={() => setSettingsPup(" ")}
            className=" w-full text-base border  border-primary text-primary rounded-lg h-[34px]"
          >
            close
          </button>
          <button
            disable={
              submit && patientDetail.bloodGroup === bloodGroup ? true : false
            }
            type="submit"
            onClick={onSubmit}
            className={` ${
              patientDetail.bloodGroup === bloodGroup
                ? "bg-gray-500"
                : "bg-primary"
            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodGroupPopUp;
