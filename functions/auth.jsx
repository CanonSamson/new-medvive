import Image from "next/image";
import { redirect } from "next/navigation";

const { usePatient } = require("@/app/patient/Context");
const { useEffect } = require("react");

export const withAuth = (Components) => {
  const { auth } = usePatient();

  return function WithAuth(props) {
    const user = auth.currentUser;

    useEffect(() => {
      if (!user) {
        redirect("/");
      }
    }, []);
    if (!user) null;

    return <Components {...props} />;
  };
};
