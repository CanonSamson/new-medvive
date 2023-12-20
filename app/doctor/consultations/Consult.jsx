"use client";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { secondsToDate } from "@/functions/functions";

const Consult = ({ patients, consultations }) => {
  const router = useRouter("");

  return (
    <>
      {consultations &&
        consultations?.map((item, index) => {
          const patient = patients?.find(
            (patient) => patient.uid === item.patientId
          );
          return (
            <div key={index}>
              <div>
                <div className="flex  duration-200 items-center gap-2 px-4 pb-2">
                <span className=" w-[300px] flex text-[12px] text-gray-400 ">
                    {secondsToDate(item.consultatedAt.seconds)}
                  </span>
                  <span className=" w-full h-[0.2px] flex relative border border-dashed"></span>
                </div>
                <div
                  className={` ${
                    item.status === "Canceled" && " border border-red-500"
                  }  gap-2 bg-white relative z-[10]   rounded-xl p-3`}
                >
                  <div className=" flex items-center justify-between  gap-2">
                    <div className="flex flex-col ">
                      <h4 className=" text-[14px] font-semibold">
                        {patient?.name}
                      </h4>
                      <span className=" text-base">{patient?.address}</span>
                    </div>
                    <Image
                      className=" min-w-[80px] h-[80px]  rounded-full  object-cover "
                      src={
                        patient?.profilePicture ||
                        (patient?.gender === "Male"
                          ? "/images/Avatar.png"
                          : "/images/Avatar.png")
                      }
                      alt=""
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                  </div>
                  <div className=" flex flex-col my-2">
                    <div className=" flex items-center justify-between px-2  h-[40px]  bg-[#F5FAFF]">
                      <div className=" flex items-center gap-1 text-base ">
                        <MdOutlineDateRange
                          className=" text-primary"
                          size={20}
                        />
                        <span>
                          {item.weekday}, {item.date}
                        </span>
                      </div>
                      <div className=" flex items-center gap-1 text-base ">
                        <AiOutlineFieldTime
                          className=" text-primary"
                          size={20}
                        />
                        <p>{item.time}</p>
                      </div>
                    </div>
                    {item.status !== "Canceled" && (
                      <div className=" flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            item.active &&
                            router.push(`/chat/${item.consultationId}`)
                          }
                          className=" justify-center items-center flex w-full text-base bg-primary text-white rounded-lg h-[34px]"
                        >
                          {item.active === true ? "Message" : "Reschedule"}
                        </button>
                        <button
                          onClick={async () => {
                            router.push(
                              `/doctor/consultations/${item.consultationId}`
                            );
                          }}
                          className={` ${
                            item.status === "Upcoming" && " animate-pulse"
                          } flex items-center justify-center w-full text-base border  border-primary text-primary rounded-lg h-[34px]`}
                        >
                          {item.status !== "Upcoming"
                            ? " View Consultation"
                            : "Confirm Consultation"}
                        </button>
                      </div>
                    )}
                  </div>
                  {item.status === "Canceled" && (
                    <div className=" text-base bg-red-500 text-white text-center  rounded py-[2px]">
                      this booking was canceled
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Consult;
