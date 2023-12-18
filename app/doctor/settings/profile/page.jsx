"use client";

import SpecialtyPopUp from "./SpecialtyPopUp";
import OverviewPopUp from "./OverviewPop";
import LanguagePopUp from "./LanguagePop";
import EducationPopUp from "./EducationPop";

import { useEffect, useState } from "react";
import DoctorsCard from "./DoctorsCard";
import PageHeaderWithBackButton from "@/components/PageHeaderWithBackButton";
import EditPhoto from "./EditPhoto";
import { useDoctor } from "../../Context";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const [settingsPup, setSettingsPup] = useState("");
  const { doctorDetail, pending, auth } = useDoctor();

  const router = useRouter();

  useEffect(() => {
    if (pending) return;
    if (!auth.currentUser || !doctorDetail) {
      router.push("/doctor/login");
    }
  },  [pending, auth.currentUser, doctorDetail, router]);

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
      <div className=" text-base">
        <PageHeaderWithBackButton
          href="/doctor/settings"
          text="Doctor profile"
        />
        <SpecialtyPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <OverviewPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <LanguagePopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <EducationPopUp
          settingsPup={settingsPup}
          setSettingsPup={setSettingsPup}
        />
        <EditPhoto settingsPup={settingsPup} setSettingsPup={setSettingsPup} />

        <div className=" px-4 pb-[200px]">
          <DoctorsCard
            Name={"Dr." + " " + doctorDetail.name}
            Image={doctorDetail?.profilePicture}
            specialty={doctorDetail?.specialty}
            languages={doctorDetail?.languages}
            stars={doctorDetail.stars ? doctorDetail.stars : "0.0"}
            onClickSettings={() => setSettingsPup("photo")}
          />

          <div className=" w-full pt-4 flex justify-end pb-4 border-b  leading-none ">
            <div className=" flex-col flex  items-end">
              <span className=" text-[14px] font-bold">0</span>
              <span>Total Booking</span>
            </div>
          </div>
          <div className=" flex flex-col leading-none pt-4 ">
            <div className="flex items-center gap-3 ">
              <span className=" font-medium text-lg">
                {doctorDetail.specialty
                  ? doctorDetail.specialty
                  : "Set Specialty"}
              </span>
              <button
                onClick={() => setSettingsPup("specialty")}
                className=" border w-[20px] min-w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full"
              >
                <FiEdit2 />
              </button>
            </div>
            <span>Specializes in </span>
          </div>

          <div className=" pb-4 border-b flex  gap-2 mt-10">
            <p className=" text-[11px] ">
              {doctorDetail.bio && doctorDetail.bio.length > 300
                ? doctorDetail.bio.slice(0, 300)
                : doctorDetail.bio}
              {doctorDetail.bio && doctorDetail.bio.length > 300 ? (
                <span className=" text-primary">read more</span>
              ) : (
                ""
              )}
            </p>
            <button
              onClick={() => setSettingsPup("Overview")}
              className=" border w-[20px] min-w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full"
            >
              <FiEdit2 />
            </button>
          </div>

          <div>
            <h4 className=" text-lg pt-2 pb-5 font-medium">Work History</h4>
            <div className=" flex border-b border-gray-200 ">
              <span className=" border-b pb-2 border-primary">
                completed bookings (0)
              </span>
            </div>

            <div className=" mt-4 grid gap-2  pb-4 border-b">
              {!doctorDetail.reviews ? (
                <div className=" flex flex-col h-[100px] w-full items-center justify-center">
                  <span>no data</span>
                </div>
              ) : (
                doctorDetail?.reviews?.map((item, index) => (
                  <div key={index} className=" flex flex-col">
                    <div className=" flex  justify-between items-center pb-1">
                      <span>{item.userName}</span>
                      <div className="flex items-center gap-1">
                        <img
                          className=" flex items-end justify-end ml-auto"
                          src={stars}
                          alt={item.userName}
                        />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <span>{item.text && item.text}</span>
                    <span className=" text-end text-[10px]">
                      {item.from}-{item.to}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 pb-5">
            <div className=" flex items-center gap-2">
              <h4 className=" text-[14px] ">Languages</h4>

              <div
                onClick={() => setSettingsPup("language")}
                className=" border w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full"
              >
                <AiOutlinePlus />
              </div>
              {doctorDetail.languages && (
                <div className=" border w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full">
                  <FiEdit2 />
                </div>
              )}
            </div>
            {doctorDetail.languages &&
              doctorDetail.languages.map((language, index) => (
                <div key={index} className=" flex items-center gap-2 ">
                  <span className=" font-medium">{language.language}:</span>
                  <span className=" font-light">
                    {language.proficiencyLevel}
                  </span>
                </div>
              ))}
          </div>

          <div className=" pt-2 pb-5">
            <div className=" flex items-center gap-2">
              <h4 className=" text-[14px]">Education</h4>

              <button
                onClick={() => setSettingsPup("education")}
                className=" border w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full"
              >
                <AiOutlinePlus />
              </button>
            </div>
            <div className=" grid gap-2">
              {doctorDetail.education &&
                doctorDetail.education.map((item, index) => (
                  <div
                    key={index}
                    className=" flex items-start justify-between"
                  >
                    <div className=" flex flex-col">
                      <span className=" text-[14px]">{item.school}</span>
                      <span>{item.areaOfStudy}</span>
                      <span>
                        {item.from.split("-")[0]} - {item.to.split("-")[0]}
                      </span>
                    </div>
                    <div className=" flex items-center gap-2">
                      <div className=" border w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full">
                        <FiEdit2 />
                      </div>
                      <div className=" border w-[20px] h-[20px] flex items-center  justify-center border-black rounded-full">
                        <AiOutlineDelete />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
