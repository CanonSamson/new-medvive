import Image from "next/image";

const { usePatient } = require("@/app/patient/Context");
const { useRouter } = require("next/navigation");
const { useEffect } = require("react");

export const patientPrivateRoute = () => {
  const { patientDetail, pending, auth } = usePatient();
  const router = useRouter();

  useEffect(() => {
    if (pending) return;
    if (!auth.currentUser || !patientDetail) {
      router.push("/");
    }
  }, [pending]);

  if (pending) {
    return (
      <div className=" w-full bg-white h-screen relative flex justify-center items-center">
        <Image
          className="w-[120px] animate-bounce"
          src="/logo.svg"
          width={120}
          height={100}
          alt=""
        />
      </div>
    );
  }

  return { aproved: true };
};
