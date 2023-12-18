import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DoctorProvider } from "./Context";


export const metadata = {
  title: "Medvive",
  description:
    "Get 24/7 online consultations with the best doctorswithout breaking a sweat and your bank. Start a consult now",

};

export default function DoctorLayout({ children }) {
  return (
    <>
      <DoctorProvider>{children}</DoctorProvider>
    </>
  );
}
