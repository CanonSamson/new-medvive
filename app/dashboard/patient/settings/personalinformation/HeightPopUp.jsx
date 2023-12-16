import { useState } from "react";
import Header from "@/components/Header";
import { useUserAuth } from "@/Context";
import { updateDB } from "@/functions/firebase";
import InputField from "@/components/InputField";

const HeightPopUp = ({ settingsPup, setSettingsPup }) => {
  const { patientDetail, getPatientData } = useUserAuth();
  const [submit, setSubmit] = useState(false);
  const [height, setHeight] = useState("");

  const onSubmit = async () => {
    setSubmit(true);
    if (patientDetail.height === height) return;
    try {
      updateDB("patients", patientDetail.id, { height: height });
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
          settingsPup === "Height" ? "bottom-0 top-0" : "top-[200%]"
        } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
      >
        <div>
          <Header
            text={patientDetail.height ? "Edit your height" : "Add your height"}
            onClick={() => setSettingsPup(" ")}
          />

          <div className=" flex flex-col gap-2 mt-10 pb-3">
            <InputField
              label="Weight *"
              name="height"
              id="height"
              type="text"
              onChange={(e) => setHeight(e.target.value)}
              value={height}
              placeholder="in feet or inches "
            />
          </div>
        </div>
        <div
          className={` ${
            settingsPup === "Height" ? "bottom-0" : "bottom-[-200%]"
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
            disable={submit && patientDetail.height === height ? true : false}
            type="submit"
            onClick={onSubmit}
            className={` ${
              patientDetail.height === height ? "bg-gray-500" : "bg-primary"
            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeightPopUp;
