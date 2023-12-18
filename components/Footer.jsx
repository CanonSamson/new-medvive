import Link from "next/link";
import Icon from "./Icon";

const Footer = () => {
  return (
    <div className="bg-[#EEF6FF] ">
      <div className=" flex items-center py-5 flex-col tablet:flex-row text-center tablet:text-start  tablet:justify-between max-w-[1100px] mx-auto">
        <div className=" grid">
          <h6 className=" font-extrabold text-2xl">
            Take Charge Of Your Health
          </h6>
          <p>register and tell us about your medical issue to get started.</p>
        </div>
        <Link href="/patient/signup">
          <button className=" items-center gap-1 bg-primary flex text-white   px-5 text-base py-3 rounded-full">
            Talk to a doctor <Icon name="arrowright" size={24} />
          </button>{" "}
        </Link>
      </div>
      <footer className="  z-20  bg-gradient-to-tr from-[#132F7A] relative text-white to-primary pt-20">
        <div className=" flex flex-col tablet:flex-row  max-w-[1100px] mx-auto items-start gap-4  px-5 tablet:px-0 py-5 ">
          <div className=" tablet:w-[40%]">
            <h5 className=" mb-5 tablet:mb-10">Subscribe To Newsletter</h5>
            <p className=" text-base">
              Stay informed about our latest features and updates by subscribing
              to our newsletter. When you subscribe, you`&apos;`ll receive
              emails from us with all the latest information.
            </p>
            <form className=" border-b flex justify-between mt-5">
              <input
                className=" bg-transparent placeholder:text-white   text-base text-white flex-1 focus:outline-none h-[40px]"
                placeholder="Email..."
                type="text"
                name=""
                id=""
              />
              <button className=" bg-slate-50/20 px-2 text-base ">
                Subscribe
              </button>
            </form>
          </div>
          <ul className="w-full tablet:w-auto tablet:flex-1 tablet:grid-cols-3 grid">
            <li>
              <h6 className="  mb-5 tablet:mb-10">Useful Links</h6>
              <ul className=" gap-2  text-base grid grid-cols-2 row-span-4">
                <li>Home</li>
                <li>About Us</li>
                <li>Services</li>
                <li>Project </li>
                <li>Blog </li>
                <li>
                  <Link href="/faq">FAQS</Link>
                </li>
                <li>
                  <Link href="/contactus">Contact us</Link>
                </li>
                <li>Thank You </li>
              </ul>
            </li>
            <li>
              <h6 className="  mb-5 tablet:mb-10">Popular Services</h6>
              <ul className=" gap-1 tablet:gap-2 grid text-base">
                <li>Consultations</li>
                <li>Health Tracking</li>
                <li>Learn more</li>
              </ul>
            </li>
            <li className=" flex flex-col justify-between  h-full">
              <div>
                <h6 className="  mb-5 tablet:mb-10">Contact</h6>
                <ul className=" gap-2  text-base grid  ">
                  <li>
                    <a href="mailto:hellomedvive@gmail.com">
                      hellomedvive@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className=" flex items-end  h-[100px] tablet:h-auto pb-3 tablet:pb-0 gap-4">
                  <li>
                    <a href="">
                      <Icon name="linkedin" size={20} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/medvive">
                      <Icon name="intagram" size={20} />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className=" flex justify-between text-base items-center px-5 tablet:px-10 py-5 border-t gap-5 tablet:mt-10">
          <span>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
          </span>
          <ul className="tablet:flex  gap-1 tablet:gap-2">
            <li>Privacy Policy</li>
            <li>Sitemap </li>
            <li>Terms of use</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
