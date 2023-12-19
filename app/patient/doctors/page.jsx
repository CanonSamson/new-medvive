"use client";
import { useEffect, useState } from "react";

//icons
import { IoIosArrowBack } from "react-icons/io";
import { usePatient } from "@/app/patient/Context";
import { useRouter } from "next/navigation";
import DoctorCard from "../DoctorCard";
import SearchInput from "@/components/SearchInput";
import SubHeader from "@/components/SubHeader";
import Link from "next/link";
import Image from "next/image";
import { patientPrivateRoute } from "@/functions/auth";

const ConsultationsPage = () => {
  const { aproved } = patientPrivateRoute();
  const { doctors, getDoctors } = usePatient();
  const [loading, setloading] = useState(true);
  const [verifyDoctors, setVerifyDoctors] = useState([]);

  const router = useRouter();

  const getVerifyDoctors = async () => {
    const { doctors } = await getDoctors();
    const verifyDoctors = doctors.filter(
      (doctor) =>
        doctor.bio &&
        doctor.education &&
        doctor.education.length >= 1 &&
        doctor.profilePicture &&
        doctor.specialty
    );
    setVerifyDoctors(verifyDoctors);
    console.log(doctors);

    if (doctors.length > 0) {
      setloading(false);
    }
  };
  useEffect(() => {
    getVerifyDoctors();
  }, []);

  return (
    aproved && (
      <>
        <Image
          className=" fixed right-0 top-36 z-0"
          src="/images/Vector.svg"
          alt=""
          width={200}
          height={200}
        />
        <div className=" relative z-[20] px-4 bg-brandwhite min-h-[100vh] pb-[100px] overflow-x-hidden">
          <section className="pt-5">
            <div className=" flex pb-10 items-center">
              <Link href="/patient">
                <IoIosArrowBack size={24} />
              </Link>
              <h4 className=" font-semibold text-xl">Consult</h4>
            </div>

            <div className=" pb-4">
              <SearchInput />
            </div>

            <SubHeader href="#" text="Doctors" />

            {!loading ? (
              <div className=" grid gap-2 ">
                {verifyDoctors.map((doctor, index) => (
                  <DoctorCard
                    key={index}
                    Name={doctor?.name}
                    Img={doctor?.profilePicture}
                    specialty={doctor?.specialty}
                    stars={doctor.stars ? doctor.stars : "0.0"}
                    languages={doctor?.languages}
                    onClick={() => {
                      router.push(`/patient/doctors/${doctor.uid}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="  grid gap-4 mt-4 ">
                <div className=" relative rounded-lg animate-pulse h-[120px] w-full bg-white flex "></div>
                <div className=" relative rounded-lg animate-pulse h-[120px] w-full bg-white flex "></div>
              </div>
            )}
          </section>
        </div>
      </>
    )
  );
};

export default ConsultationsPage;
