import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className=" mt-[65px]">
      {children}
      </div>
      <Footer/>
    </main>
  );
};

export default Layout;
