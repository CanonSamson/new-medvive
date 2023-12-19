"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";

import DoctorCard from "../../DoctorCard";
import { usePatient } from "../../Context";
import PageHeaderWithBackButton from "@/components/PageHeaderWithBackButton";
import { BookAppointmentSchema } from "@/validation/patient";
import { useParams } from "next/navigation";
import { createOrUpdateDB, getDB } from "@/functions/firebase";
import { ID_GENERATOR, getUserFirstName } from "@/functions/functions";
import { useDateRange } from "@/functions/useDateRange";
import DoctorRatings from "./DoctorRatings";
import Button from "@/components/Button";
import { patientPrivateRoute } from "@/functions/auth";
import LayoutPage from "../../LayoutPage";

const ConsultDocterPage = () => {
  patientPrivateRoute();
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [submit, setSubmit] = useState(false);

  const { auth, patientDetail, getPatientData } = usePatient();

  const [selectedMethodIndex, setSelectedMethodIndex] = useState({});
  const { dateRange, selectedRange, timeData, selectedTime, timestamp } =
    useDateRange();

  const [consultationId, setConsultationId] = useState("");

  const onSubmit = async (values) => {
    setSubmit(true);
    const { date, time } = values;

    try {
      await createOrUpdateDB(
        "consultations",
        auth.currentUser.uid,
        {
          data: [
            {
              weekday: selectedRange.weekday,
              date: date,
              time: time,
              consultatedAt: timestamp,
              doctorId: id,
              consultationId: consultationId,
              status: "Upcoming",
              active: true,
              messageStatus: "sent",
            },
          ],
        },
        "data"
      );

      await createOrUpdateDB(
        "consultations",
        id,
        {
          data: [
            {
              weekday: selectedRange.weekday,
              date: date,
              time: time,
              consultatedAt: timestamp,
              userId: patientDetail.uid,
              active: true,
              consultationId: consultationId,
              status: "Upcoming",
              messageStatus: "sent",
            },
          ],
        },
        "data"
      );

      setTimeout(() => {
        getPatientData();
        setSubmit(false);
      }, 2000);
    } catch (err) {
      console.log(err);

      setSubmit(false);
    }
  };

  const { errors, touched, values, handleSubmit } = useFormik({
    initialValues: {
      date: "",
      time: "",
      doctorId: id,
    },
    validationSchema: BookAppointmentSchema,
    onSubmit,
  });

  useEffect(() => {
    values.time = selectedTime;
    values.date = selectedRange.date;
    values.method = selectedMethodIndex.title;
  }, [selectedRange, selectedMethodIndex, selectedTime]);

  const GetDoctor = async () => {
    const { data: doctor } = await getDB("doctors", id);

    setDoctor(doctor);

    setConsultationId(ID_GENERATOR());
  };

  useEffect(() => {
    GetDoctor();
  }, [id]);

  return (
    <LayoutPage>
      <div className=" w-full flex   relative h-screen text-base">
        <div
          className="left-0 
            fixed   flex flex-col top-0 overflow-y-auto  h-screen w-full z-50 duration-700"
        >
          <section className=" pb-[200px] bg-brandwhite rounded-t-2xl  w-full right-0 p-4 ">
            <PageHeaderWithBackButton
              href="/patient/doctors"
              text="Doctor profile"
            />

            <div className=" grid gap-2 ">
              <DoctorCard
                Name={doctor.name}
                Img={doctor?.profilePicture}
                specialty={doctor?.specialty}
                languages={doctor?.languages}
                stars={doctor?.stars ? doctor?.stars : "0.0"}
              />
            </div>
            <div className=" w-full pt-4 flex justify-end pb-4 border-b  leading-none ">
              <div className=" flex-col flex  items-end">
                <span className=" text-[14px] font-bold">
                  {doctor.bookings ? doctor.bookings.length : 0}
                </span>
                <span>Total Booking</span>
              </div>
            </div>
            <div className=" flex flex-col leading-none pt-4 ">
              <div className="flex items-center gap-3 ">
                <span className=" font-medium text-lg">
                  {doctor?.specialty}
                </span>
              </div>
              <span>Specializes in </span>
            </div>

            <div className=" pb-4 border-b flex  gap-2 mt-10">
              <p className=" text-[11px] ">
                {doctor.bio && doctor.bio.length > 300
                  ? doctor.bio.slice(0, 300)
                  : doctor.bio}
                {doctor.bio && doctor.bio.length > 300 ? (
                  <span className=" text-primary"> read more</span>
                ) : (
                  ""
                )}
              </p>
            </div>

            <DoctorRatings doctor={doctor} id={id} />

            <div className="pt-2 pb-5">
              <div className=" flex items-center gap-2">
                <h4 className=" text-[14px] ">Languages</h4>
              </div>
              {doctor?.languages?.map(
                ({ language, proficiencyLevel }, index) => (
                  <div key={index} className=" flex items-center gap-2 ">
                    <span className=" font-medium">{language}:</span>
                    <span className=" font-light">{proficiencyLevel}</span>
                  </div>
                )
              )}
            </div>

            <div className=" pt-2 pb-5">
              <div className=" flex items-center gap-2">
                <h4 className=" text-[14px]">Education</h4>
              </div>
              <div className=" grid gap-2">
                {doctor?.education?.map((item, index) => (
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
                  </div>
                ))}
              </div>
            </div>

            <div className=" mt-5">
              <div>
                <h5 className=" text-[14px] font-semibold ">Select Date</h5>
              </div>
              <ul id="date" className="flex gap-2  w-full overflow-x-auto">
                {dateRange.map(({ date, weekday, onClick }, index) => (
                  <li key={index}>
                    <button
                      onClick={onClick}
                      className={`flex flex-col ${
                        date === selectedRange.date && selectedRange.date
                          ? "bg-primary text-white"
                          : "bg-white"
                      }  rounded-2xl h-[80px] min-w-[80px] justify-center items-center `}
                    >
                      <span className="text-[20px] font-bold">
                        {date.split("-")[2]}
                      </span>
                      <span className="text-[12px]">
                        {weekday.length > 3
                          ? `${weekday.slice(0, 3)}`
                          : weekday}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className=" text-red-600 pt-2">
                {touched.date && errors?.date}
              </p>
            </div>

            <div id="date" className=" py-2 mb-10">
              <div>
                <h5 className=" text-[14px] font-semibold ">Select Time</h5>
              </div>
              <ul className="flex gap-2  w-full overflow-x-auto">
                {timeData.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={item.onClick}
                      name={item.time}
                      className={`${
                        item.time == selectedTime
                          ? "bg-primary text-white"
                          : "bg-white"
                      }  rounded-xl px-2 h-[40px] min-w-[100px] flex items-center justify-center`}
                    >
                      {item.time}
                    </button>
                  </li>
                ))}
              </ul>
              <p className=" text-red-600 pt-2">
                {touched.time && errors?.time}
              </p>
            </div>

            <Button
              type="submit"
              isSubmit={submit}
              onClick={handleSubmit}
              text={`Dr. ${getUserFirstName(doctor) || doctor.name}`}
            />
          </section>
        </div>
      </div>
    </LayoutPage>
  );
};

export default ConsultDocterPage;
