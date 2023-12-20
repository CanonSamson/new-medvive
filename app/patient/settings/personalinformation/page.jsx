"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import BloodGroupPopUp from "./BloodGroupPopUp";
import DateOfBirthPopUp from "./DateOfBirthPopUp";
import AddressPopUp from "./AddressPopUp";
import HeightPopUp from "./HeightPopUp";
import WeightPopUp from "./WeightPopUp";
import GenderPopUp from "./GenderPopUp";
import { useRouter } from "next/navigation";
import { usePatient } from "../../Context";

const PersonalInformation = () => {
  const { patientDetail, pending, auth } = usePatient();
  const [settingsPup, setSettingsPup] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (pending) return;
    if (!auth.currentUser || !patientDetail) {
      router.push("/patient/login");
    }
  }, [pending]);

  if (pending) {
    return (
      <div className=" w-full bg-white h-screen relative flex justify-center items-center">
        <Image
          className="w-[120px] animate-bounce"
          src="/logo.svg"
          width={120}
          height={100}
          alt=""
        />
      </div>
    );
  }

  return (
    auth.currentUser && (
      <div className=" flex flex-col min-h-screen pb-[200px] bg-brandwhite relative pt-[80px] ">
        <Image
          width={200}
          height={200}
          className="fixed right-0 bottom-20 z-0"
          src="/images/Vector.svg"
          alt=""
        />

        <BloodGroupPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <DateOfBirthPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <AddressPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />

        <GenderPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <WeightPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <HeightPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />

        <div className=" fixed top-0 z-50  w-full bg-brandwhite right-0 flex  items-center p-4">
          <Link href="/patient/settings">
            <IoIosArrowBack size={24} />
          </Link>
          <h4 className=" font-semibold text-xl">Personal Information</h4>
        </div>
        <section className=" grid  gap-2 z-20 text-start relative px-4">
          <div className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start">
            <h4 className="text-[#091F44] text-[13px] font-medium">
              Phone Number
            </h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.phoneNumber}
            </span>
          </div>

          <div className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start">
            <h4 className="text-[#091F44] text-[13px] font-medium">Email</h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.email}
            </span>
          </div>

          <button
            onClick={() => setSettingsPup("Gender")}
            className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start"
          >
            <h4 className="text-[#091F44] text-[13px] font-medium">Gender</h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.gender}
            </span>
          </button>

          <button
            onClick={() => setSettingsPup("Date of Birth")}
            className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start"
          >
            <h4 className="text-[#091F44] text-[13px] font-medium">
              Date of Birth
            </h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.dateOfBirth
                ? patientDetail.dateOfBirth
                : "Add   Date of Birth"}
            </span>
          </button>

          <button
            onClick={() => setSettingsPup("Address")}
            className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start"
          >
            <h4 className="text-[#091F44] text-[13px] font-medium">Address</h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.address}
            </span>
          </button>
          <button
            onClick={() => setSettingsPup("Blood Group")}
            className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start"
          >
            <h4 className="text-[#091F44] text-[13px] font-medium">
              Blood Group
            </h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.bloodGroup
                ? patientDetail.bloodGroup
                : "Add  Blood Group"}
            </span>
          </button>

          <button
            onClick={() => setSettingsPup("Height")}
            className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start"
          >
            <h4 className="text-[#091F44] text-[13px] font-medium">Height</h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.height ? patientDetail.height : " Add Height"}
            </span>
          </button>

          <button
            onClick={() => setSettingsPup("Weight")}
            className=" flex flex-col bg-white rounded-xl p-3  w-full justify-between gap-2 text-start"
          >
            <h4 className="text-[#091F44] text-[13px] font-medium">Weight</h4>
            <span className="text-base text-[#7B8D9E]">
              {patientDetail.weight ? patientDetail.weight : " Add Height"}
            </span>
          </button>
        </section>
      </div>
    )
  );
};

export default PersonalInformation;
