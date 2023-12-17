"use client";

import Icon from "@/components/Icon";
import Layout from "./Layout";
import Link from "next/link";
import SearchInput from "./SearchInput";
import Image from "next/image";
import SubHeader from "./SubHeader";
import { useUserAuth } from "@/Context";
import { getUserFirstName } from "@/functions/functions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashoard = () => {
  const { greeting, patientDetail, pending, auth } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (pending) return;
    if (!auth.currentUser || !patientDetail) {
      router.push("/");
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
      <Layout>
        <div className="text-dark w-full px-4 pb-[80px] relative md:max-w-[400px] md:h-screen overflow-auto min-h-screen bg-brandwhite">
          <header className="flex pt-5 z-20 justify-between items-center py-2">
            <div className="flex flex-col gap-0">
              {patientDetail && (
                <h1 className="text-[20px] font-semibold mb-[-5px]">
                  Hello, {getUserFirstName(patientDetail) || patientDetail.name}{" "}
                  👋
                </h1>
              )}

              <span className="text-base opacity-75">{greeting}.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/notifications" className="relative">
                <Icon name="notification" size={20} />

                <>
                  <span className="absolute flex w-[10px] h-[10px] top-[-2px] right-[-2px] text-white font-semibold text-base bg-red-500 px-1 rounded-full"></span>
                  <span className="animate-ping absolute flex w-[10px] h-[10px] top-[-2px] right-[-2px] text-white font-semibold text-base bg-red-500 px-1 rounded-full"></span>
                </>
              </Link>

              <Link href="/dashboard/patient/settings">
                <Image
                  className="w-[40px] rounded-full h-[40px] object-cover skeleton"
                  src={
                    patientDetail.profilePicture ||
                    (patientDetail.gender === "Male"
                      ? "/images/Avatar.png"
                      : "/images/Avatar.png")
                  }
                  width={40}
                  height={40}
                  alt="profile Picture"
                />
              </Link>
            </div>
          </header>
          <SearchInput placeholder="search" />

          <section className="relative z-20">
            <div className="relative h-[154px] overflow-hidden p-4 flex items-center rounded-xl mt-[20px]">
              <div className="z-10 w-[55%]">
                <h2 className="text-xl font-semibold text-[#1C9679]">
                  Get the Best Medical Services
                </h2>
                <p className="text-base">
                  We provide the best quality medical services without
                  additional cost.
                </p>
              </div>
              <Image
                className="z-10 h-full absolute right-0 bottom-[-20px]"
                src="/images/img1.svg"
                alt=""
                width={200}
                height={200}
              />
              <Image
                className="object-cover absolute w-full top-0 right-0 h-full z-0"
                src="/images/gd.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="mt-[10px] mb-[20px] w-[100px] grid grid-cols-3 mx-auto gap-2">
              <span className="flex rounded-xl relative bg-[#BFC9DA] h-[4px] text-[#BFC9DA]"></span>
              <span className="flex rounded-xl relative bg-primary"></span>
              <span className="flex rounded-xl relative bg-[#BFC9DA]"></span>
            </div>
          </section>

          <SubHeader href="/services" text="Consultations" />
          <div className="relative z-20 mt-[10px]  grid gap-2">
            <Link
              href="/consultations"
              className="bg-gray-50 text-center flex-col py-10 px-5 items-center rounded-xl gap-4 flex"
            >
              <Icon name="consult" size={40} className="text-[#929CAD]" />
              <p className="text-base text-[#7B8D9E]">
                You haven&apos;t scheduled a consultation yet. Please schedule
                one.
              </p>
              <Link href="" className=" text-primary font-medium">
                Start a consult now
              </Link>
            </Link>
          </div>

          <div className=" mt-10">
            <SubHeader href="/prescriptions" text="Prescriptions" />
            <div className="relative z-20 mt-[10px]  grid gap-2">
              <Link
                href="/doctor"
                className="bg-gray-50 text-center flex-col py-10 px-5 items-center rounded-xl gap-4 flex"
              >
                <Icon name="doctor" size={40} className="text-[#929CAD]" />
                <p className="text-base text-[#7B8D9E]">
                  You haven&apos;t scheduled a consultation yet. Please schedule
                  one.
                </p>
                <Link href="" className=" text-primary font-medium">
                  Start a consult now
                </Link>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default Dashoard;
