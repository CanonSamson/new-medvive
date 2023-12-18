import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDoctor } from "./Context";
import Image from "next/image";

const IsLoggedInPopUp = () => {
  const { doctorDetail, logout } = useDoctor();
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  return (
    doctorDetail && (
      <div className=" fixed flex items-start top-0  p-4 justify-end h-screen bg-black/20 z-[50] w-full">
        <div className=" bg-white max-w-[400px] text-base w-full p-4 mt-[80px]  rounded-lg">
          <div className=" gap-2  flex items-center  text-dark relative z-[20]">
            <div className=" w-[80px] h-[80px] relative">
              <Image
                className=" w-[80px] h-[80px]  rounded-full  object-cover "
                src={
                  doctorDetail.profilePicture
                    ? doctorDetail.profilePicture
                    : doctorDetail.gender === "Male"
                    ? "/images/Avatar.png"
                    : "/images/AvatarG.png"
                }
                alt=""
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col items-start ">
              <h4 className=" text-[14px] font-semibold">
                {doctorDetail?.name}
              </h4>
              <span className=" text-[10px]">{doctorDetail?.specialty}</span>
              <div className="flex text-[10px] items-center gap-1">
                {doctorDetail?.languages?.map(({ language }, index) => (
                  <span key={index}>{language}.</span>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`  mt-10 duration-200 flex items-center w-full gap-2 `}
          >
            <button
              disable={!submit ? true : false}
              onClick={async () => {
                setSubmit(true);
                await logout();
                setSubmit(false);
              }}
              className=" w-full text-base border  border-primary text-primary rounded-lg h-[34px]"
            >
              Log out
            </button>
            <button
              disable={submit ? true : false}
              onClick={() => router.push("/doctor")}
              type="submit"
              className={` bg-primary justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default IsLoggedInPopUp;
