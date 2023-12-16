import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className="   mt-[65px]">
        <div className=" relative h-[70px] tablet:h-[200px] w-full flex">
          <Image
            src="/loginandsignup-layout-svg.svg"
            alt=""
            width={500}
            height={500}
            className=" absolute top-[-1050px]  w-full  mx-auto"
          />
        </div>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
