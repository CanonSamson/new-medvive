import Star from "@/components/Star";
import Image from "next/image";

const DoctorCard = ({ Name, Img, specialty, onClick, languages, stars }) => {
  return (
    <button onClick={onClick} className="bg-white  w-full   rounded-xl p-3">
      <div className=" gap-2  flex items-center  text-dark relative z-[20]">
        <div className=" w-[80px] h-[80px] relative">
          <Image
            className=" w-[80px] h-[80px]  rounded-full  object-cover "
            src={Img}
            alt=""
            width={80}
            height={80}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start ">
          <h4 className=" text-[14px] font-semibold">{Name}</h4>
          <span className=" text-base">{specialty}</span>
          <div className="flex items-center gap-1">
            {languages?.map(({ language }, index) => (
              <span className=" text-base" key={index}>
                {language}.
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className=" flex text-[12px] items-center gap-[4px] justify-end ml-auto">
        <Star stars={stars} />
      </span>
    </button>
  );
};

export default DoctorCard;
