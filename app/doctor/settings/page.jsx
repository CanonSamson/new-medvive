"use client";

import Link from "next/link";

import { IoMdPerson } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";

import {
  MdOutlineSecurity,
  MdOutlineArrowForwardIos,
  MdFeedback,
} from "react-icons/md";
import Image from "next/image";
import LayoutPage from "../LayoutPage";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDoctor } from "../Context";
import LoadingPage from "@/components/LoadingPage";

const Settings = () => {
  const { doctorDetail, logout, pending, auth, loggingOut } = useDoctor();

  useLayoutEffect(() => {
    // Check authentication status when dependencies change
    if (pending) return;
    if (!auth.currentUser && !pending) {
      redirect("/");
    }
  }, []);

  if (pending || loggingOut) return <LoadingPage />;

  return (
    auth.currentUser && (
      <LayoutPage>
        <div className=" relative  text-dark pb-[200px] text-base  overflow-hidden   bg-brandwhite px-2">
          <div className=" z-10">
            <div className="flex flex-col justify-between items-center  p-3 py-10 border-b-[1px] gap-2 ">
              <Image
                className="  w-[90px] h-[90px] rounded-full object-cover"
                src={
                  !doctorDetail.profilePicture
                    ? doctorDetail.gender === "Male"
                      ? "/images/Avatar.png"
                      : "/images/Avatar.png"
                    : doctorDetail.profilePicture
                }
                width={90}
                height={90}
                alt={doctorDetail.name}
              />
              <div className="flex flex-col justify-center items-center flex-1">
                <h1 className=" font-semibold text-xl text-[#091F44]">
                  {doctorDetail.name}
                </h1>
                <span>{doctorDetail.email}</span>
              </div>
            </div>

            <section className="mt-[20px] grid  gap-2 z-20 relative">
              <Link
                href="/patient/settings/personalinformation"
                className="flex items-center bg-white rounded-xl p-3  w-full  justify-between"
              >
                <div className=" flex items-center  gap-2">
                  <div className=" p-2    w-[40px] h-[40px] rounded-lg flex items-center justify-center">
                    <IoMdPerson size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#091F44] text-[13px] font-medium">
                      Personal Information
                    </h4>
                    <span className="text-base text-[#7B8D9E]">
                      Phone number, Email , Gender ...
                    </span>
                  </div>
                </div>
                <MdOutlineArrowForwardIos size={16} />
              </Link>

              <Link
                href="/doctor/settings/profile"
                className="flex items-center bg-white rounded-xl p-3  w-full  justify-between"
              >
                <div className=" flex items-center  gap-2">
                  <div className=" p-2    w-[40px] h-[40px] rounded-lg flex items-center justify-center">
                    <IoSettingsSharp size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#091F44] text-[13px] font-medium">
                      Profile Settings
                    </h4>
                    <span className="text-base text-[#7B8D9E]">
                      Personalize your Profile
                    </span>
                  </div>
                </div>
                <MdOutlineArrowForwardIos size={16} />
              </Link>

              <Link
                href="/settings/privacysecurity"
                className="flex items-center bg-white rounded-xl p-3  w-full  justify-between"
              >
                <div className=" flex items-center  justify-between gap-2">
                  <div className=" p-2    w-[40px] h-[40px] rounded-lg flex items-center justify-center">
                    <MdOutlineSecurity size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#091F44] text-[13px] font-medium">
                      Privacy & Security
                    </h4>
                    <span className="text-base text-[#7B8D9E]">
                      Forgot Your Password?
                    </span>
                  </div>
                </div>
                <MdOutlineArrowForwardIos size={16} />
              </Link>

              <button
                className=" mt-5"
                onClick={async () => {
                  await logout();
                }}
              >
                Log Out
              </button>
            </section>
          </div>
        </div>
      </LayoutPage>
    )
  );
};

export default Settings;
