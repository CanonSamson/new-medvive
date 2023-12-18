import { Inter } from "next/font/google";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DoctorProvider } from "./Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medvive",
  description:
    "Get 24/7 online consultations with the best doctorswithout breaking a sweat and your bank. Start a consult now",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DoctorProvider>{children}</DoctorProvider>
      </body>
    </html>
  );
}
