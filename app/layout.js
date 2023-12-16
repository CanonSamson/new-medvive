import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/Context";
import "react-toastify/dist/ReactToastify.css";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
