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
import LayoutPage from "../LayoutPage";

const ConsultationsPage = () => {
  const { aproved } = patientPrivateRoute();
  const {  doctors } = usePatient();
  const [fetching, setFetching] = useState("fetching");
  const [verifyDoctors, setVerifyDoctors] = useState([]);

  const router = useRouter();

  const getVerifyDoctors = async () => {
    try {
      const verifyDoctors = doctors.filter(
        (doctor) =>
          doctor.bio &&
          doctor.education &&
          doctor.education.length >= 1 &&
          doctor.profilePicture &&
          doctor.specialty
      );
      setVerifyDoctors(verifyDoctors);

      if (doctors.length > 0) {
        setFetching("fetched");
      }
    } catch (err) {
      console.log(err);
      setFetching("error");
    }
  };
  useEffect(() => {
    getVerifyDoctors();
  }, []);

  return (
    aproved && (
      <LayoutPage>
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

            {fetching === "fetched" && (
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
            )}
            {fetching === "fetching" && (
              <div className="flex justify-center  gap-4 mt-4 ">
                Loading....
              </div>
            )}

            {fetching === "error" && (
              <div className="flex justify-center  gap-4 mt-4 ">error</div>
            )}
          </section>
        </div>
      </LayoutPage>
    )
  );
};

export default ConsultationsPage;
