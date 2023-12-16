import { useUserAuth } from "@/Context";
import Header from "@/components/Header";
import { updateDB } from "@/functions/firebase";
import { useState } from "react";
import { useEffect } from "react";

const GenderPopUp = ({ settingsPup, setSettingsPup }) => {
    const { patientDetail, getPatientData } = useUserAuth();
    const [submit, setSubmit] = useState(false);
    const [gender, setGender] = useState(patientDetail.gender)


    const onSubmit = async () => {
        setSubmit(true);
        if (patientDetail.gender === gender) return;
        try {
            updateDB("patients", patientDetail.id, { gender: gender })
            setSubmit(false);
            setSettingsPup("");
            getPatientData();
        } catch (err) {
            console.log(err);
            setSubmit(false);
        }
    };


    useEffect(() => {
        console.log(patientDetail.gender, gender)

    }, [gender])

    return (
        <div>
            <div
                className={` ${settingsPup === "Gender" ? "bottom-0 top-0" : "top-[200%]"
                    } fixed  p-4 h-screen  bg-brandwhite z-[55] duration-200 w-full right-0 `}
            >
                <div>
                    <Header
                        text={patientDetail.gender ? "Edit your gender" : "Add your gender"}
                        onClick={() => setSettingsPup(" ")}
                    />

                    <div className=" flex flex-col gap-2 mt-10 pb-3">

                        <div className=" flex flex-col relative justify-end  w-full text-[14px]">
                            <label className=" text-base font-medium">Gender *</label>

                            <div className=" mt-4 flex-1 bg-gray-100  rounded-lg grid grid-cols-2 p-[2px] text-base ">
                                <button
                                    onClick={() => setGender("Male")}
                                    className={`${gender === "Male" ? " bg-white  text-[12p.5x]" : " "
                                        } duration-500   rounded-lg h-[40px] transition-all`}
                                >
                                    Male
                                </button>
                                <button
                                    onClick={() => setGender("Female")}
                                    className={`${gender === "Female" ? " bg-white  text-[12p.5x]" : " "
                                        }  duration-500  transition-all  rounded-lg h-[40px]`}
                                >
                                    Female
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div
                    className={` ${settingsPup === "Gender" ? "bottom-0" : "bottom-[-200%]"
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
                        disable={submit && patientDetail.gender === gender ? true : false}
                        type="submit"
                        onClick={onSubmit}
                        className={` ${patientDetail.gender === gender ? "bg-gray-500" : "bg-primary"
                            } justify-center items-center flex w-full text-base  text-white rounded-lg h-[34px]`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenderPopUp;