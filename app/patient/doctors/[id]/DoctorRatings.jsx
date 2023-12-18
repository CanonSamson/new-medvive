"use client";

import NoDataMessage from "@/components/NoDataMessage";
import { useEffect, useState } from "react";
import { getCollectionDB, getDB } from "@/functions/firebase";
import Star from "@/components/Star";


const DoctorRatings = ({ doctor, id }) => {
  const [finishedConsult, setFinishedConsult] = useState(0);
  const [doctorConsultations, setDoctorConsultations] = useState(null);
  const [users, setUsers] = useState();

  const GetData = async () => {
    const { data: consult } = await getDB("consultations", id);
    const { Data: users } = await getCollectionDB("users");

    setUsers(users);

    if (consult) {
      setDoctorConsultations(consult);
      const b = consult.filter((b) => (b.status = "Ended"));
      setFinishedConsult(b.length);
    }
  };

  useEffect(() => {
    GetData();
  }, [id]);

  return (
    <div>
      <h4 className=" text-lg pt-2 pb-5 font-medium">Work History</h4>
      <div className=" flex border-b border-gray-200 ">
        <span className=" border-b pb-2 border-primary">
          completed bookings ({finishedConsult})
        </span>
      </div>
      <div className="mt-4 grid gap-2 pb-4 border-b">
        {doctor.ratings ? (
          doctor.ratings.map((rating, index) => {
            const consultation = doctorConsultations.find(
              (b) => b.consultationId === rating.consultation
            );
            const user =
              consultation &&
              users.find((user) => user.uid === consultation.userId);
            return (
              <ConsultRating
                consultation={consultation}
                key={index}
                user={user}
                ratings={rating}
              />
            );
          })
        ) : (
          <NoDataMessage />
        )}
      </div>
    </div>
  );
};

export default DoctorRatings;

const ConsultRating = ({ user, ratings, booking }) => {
  return booking && user ? (
    <div className="flex border-b pb-2 flex-col">
      <div className="flex justify-between items-center pb-1">
        <span>{user.name}</span>
        <div className="flex items-center gap-1">
          <Star size={16} stars={ratings.stars && ratings.stars} />
        </div>
      </div>
      <span>{ratings?.review}</span>
      <span className="text-end text-[10px]">
        {booking?.date}-{booking?.time}
      </span>
    </div>
  ) : (
    ""
  );
};
