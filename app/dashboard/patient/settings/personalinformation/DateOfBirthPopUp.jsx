import { useState } from "react";
import Header from "@/components/Header";
import { useUserAuth } from "@/Context";
import InputField from "@/components/InputField";

const DateOfBirthPopUp = ({ settingsPup, setSettingsPup }) => {
  const { patientDetail, getPatientData } = useUserAuth();
  const [submit, setSubmit] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(patientDetail.dateOfBirth);

  const onSubmit = async () => {
    setSubmit(true);
    if (patientDetail.dateOfBirth === dateOfBirth) return;
    try {
      updateDB("patients", patientDetail.id, { dateOfBirth: dateOfBirth });
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
          settingsPup === "Date of Birth" ? "bottom-0 top-0" : "top-[200%]"
        } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
      >
        <div>
          <Header
            text={
              patientDetail.dateOfBirth
                ? "Edit your date of birth"
                : "Add your date of birth"
            }
            onClick={() => setSettingsPup(" ")}
          />

          <div className=" flex flex-col gap-2 mt-10 pb-3">
            <InputField
              label="Date of Birth *"
              id="dateOfBirth"
              type="date"
              defaultValue={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={patientDetail.dateOfBirth}
            />
          </div>
        </div>
        <div
          className={` ${
            settingsPup === "Date of Birth" ? "bottom-0" : "bottom-[-200%]"
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
            disable={
              submit && patientDetail.dateOfBirth === dateOfBirth ? true : false
            }
            type="submit"
            onClick={onSubmit}
            className={` ${
              patientDetail.dateOfBirth === dateOfBirth
                ? "bg-gray-500"
                : "bg-primary"
            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirthPopUp;
