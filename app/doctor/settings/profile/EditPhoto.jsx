"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Icon from "@/components/Icon";
import Image from "next/image";
import { useDoctor } from "../../Context";
import { auth, storage } from "@/firebase-config";
import { updateDB } from "@/functions/firebase";

const EditPhoto = ({ settingsPup, setSettingsPup }) => {
  const [photo, setPhoto] = useState(null);
  const [submit, setSubmit] = useState(false);

  const { doctorDetail, getDoctorData } = useDoctor();

  const upload = async () => {
    setSubmit(true);
    if (photo) {
      const UserProfileRef = ref(
        storage,
        `userProfile/${auth.currentUser.uid}/${photo.name + v4()}`
      );

      try {
        await uploadBytes(UserProfileRef, photo);

        const downloadURL = await getDownloadURL(UserProfileRef);

        updateDB("doctors", auth.currentUser.uid, {
          profilePicture: downloadURL,
        });

        setSubmit(false);

        getDoctorData();
        setSettingsPup(" ");
      } catch (error) {
        console.error("Error uploading image:", error);
        setSubmit(false);
      }
    }
  };
  return (
    <div
      className={` ${
        settingsPup === "photo" ? "bottom-0 top-0" : "top-[200%]"
      } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
    >
      <div className=" flex items-center justify-between">
        <h4 className=" text-[14px]">Edit Photo</h4>
        <button
          disabled={submit ? true : false}
          onClick={() => setSettingsPup(" ")}
        >
          <Icon name="close" size={24} />
        </button>
      </div>

      <div className=" flex flex-col items-center gap-10">
        <Image
          src={
            photo
              ? `${URL.createObjectURL(photo)}`
              : !doctorDetail.profilePicture
              ? doctorDetail.gender === "Male"
                ? "/images/Avatar.png"
                : "/images/AvatarG.png"
              : doctorDetail.profilePicture
          }
          width={160}
          height={160}
          alt="profile"
          className=" relative h-[160px]  mt-10 w-[160px] flex rounded-full object-cover"
        />
        <span className=" font-semibold ">Must be an actual photo of you.</span>
      </div>
      <div
        className={` ${
          settingsPup === "photo" ? "bottom-0" : "bottom-[-200%]"
        } fixed right-0 duration-200 p-4 flex items-center w-full gap-2 mt-2`}
      >
        <button
          disabled={submit ? true : false}
          className=" relative w-full text-base border  border-primary text-primary rounded-lg h-[34px]"
        >
          Change Image
          <input
            disabled={submit ? true : false}
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
            type="file"
            className=" absolute  right-1 opacity-0 w-full flex-1 top-1 flex"
          />
        </button>
        <button
          onClick={upload}
          className={` ${
            !photo ? "bg-gray-500" : "bg-primary"
          } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
        >
          Save photo
        </button>
      </div>
    </div>
  );
};

export default EditPhoto;
