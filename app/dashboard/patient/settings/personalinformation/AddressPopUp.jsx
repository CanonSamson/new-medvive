import { useState } from "react";
import { useUserAuth } from "@/Context";
import { updateDB } from "@/functions/firebase";
import InputField from "@/components/InputField";
import Header from "@/components/Header";

const AddressPopUp = ({ settingsPup, setSettingsPup }) => {
  const { patientDetail, getPatientData ,auth} = useUserAuth();
  const [submit, setSubmit] = useState(false);
  const [address, setAddress] = useState(patientDetail.address);

  const onSubmit = async () => {
    setSubmit(true);
    if (patientDetail.address === address) return;
    try {
      updateDB("patients", auth.currentUser.uid, { address: address });
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
          settingsPup === "Address" ? "bottom-0 top-0" : "top-[200%]"
        } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
      >
        <div>
          <Header
            text={
              patientDetail.address ? "Edit your address" : "Add your address"
            }
            onClick={() => setSettingsPup(" ")}
          />

          <div className=" flex flex-col gap-2 mt-10 pb-3">
            <InputField
              label="Address *"
              name="address"
              id="address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="city, state, country"
            />
          </div>
        </div>
        <div
          className={` ${
            settingsPup === "Address" ? "bottom-0" : "bottom-[-200%]"
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
            disable={submit && patientDetail.address === address ? true : false}
            type="submit"
            onClick={onSubmit}
            className={` ${
              patientDetail.address === address ? "bg-gray-500" : "bg-primary"
            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPopUp;
