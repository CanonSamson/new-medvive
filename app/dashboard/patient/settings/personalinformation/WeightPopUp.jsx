import { useState } from "react";
import Header from "@/components/Header";
import { useUserAuth } from "@/Context";
import { updateDB } from "@/functions/firebase";
import InputField from "@/components/InputField";

const WeightPopUp = ({ settingsPup, setSettingsPup }) => {
  const { patientDetail, getPatientData, auth } = useUserAuth();
  const [submit, setSubmit] = useState(false);
  const [weight, setWeight] = useState(patientDetail.weight);

  const onSubmit = async () => {
    setSubmit(true);
    if (patientDetail.weight === weight) return;
    try {
      updateDB("patients", auth.currentUser.uid, { weight: weight });
      setSubmit(false);
      getPatientData();
      setSettingsPup("");
    } catch (err) {
      console.log(err);
      setSubmit(false);
    }
  };

  return (
    <div>
      <div
        className={` ${
          settingsPup === "Weight" ? "bottom-0 top-0" : "top-[200%]"
        } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
      >
        <div>
          <Header
            text={patientDetail.weight ? "Edit your weight" : "Add your weight"}
            onClick={() => setSettingsPup(" ")}
          />

          <div className=" flex flex-col gap-2 mt-10 pb-3">
            <InputField
              label="Weight *"
              id="Weight"
              type="text"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              placeholder="kgs  eg. 75 "
            />
          </div>
        </div>
        <div
          className={` ${
            settingsPup === "Weight" ? "bottom-0" : "bottom-[-200%]"
          } fixed right-0 duration-200 p-4 flex items-center w-full gap-2 mt-2`}
        >
          <button
            disable={submit ? true : false}
            onClick={() => setSettingsPup(" ")}
            className=" w-full text-base border  border-primary text-primary rounded-lg h-[34px]"
          >
            close
          </button>
          <button
            disable={submit && patientDetail.weight === weight ? true : false}
            type="submit"
            onClick={onSubmit}
            className={` ${
              patientDetail.weight === weight ? "bg-gray-500" : "bg-primary"
            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeightPopUp;
