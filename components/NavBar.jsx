"use client";

import { useState } from "react";
import Icon from "./Icon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [toggler, setToggler] = useState(false);

  const pathname = useRouter();
  return (
    <nav className=" relative overflow-hidden">
      <div className="fixed z-50  bg-white top-0 items-center right-0 w-full border-b   px-5 tablet:px-0 ">
        <div className=" flex max-w-[1100px] mx-auto h-[70px] justify-between items-center text-base  ">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={1200}
              height={100}
              className=" w-[120px] "
              alt="logo"
            />
          </Link>
          <ul
            className={` ${
              toggler ? "top-16 " : "top-[-100%] "
            } duration-200 mx-auto  grid tablet:flex items-center  tablet:w-auto justify-center  fixed flex-col tablet:flex-row bg-white tablet:bg-transparent h-[400px] tablet:h-auto  w-full shadow-lg tablet:shadow-none right-0  pb-[100px] tablet:pb-0  tablet:static `}
          >
            <li>
              <Link
                onClick={() => setToggler(false)}
                href="/"
                className={`  ${
                  pathname == "/" ? "border-b-2 border-primary bg-black " : ""
                } p-[16px]  text-center items-center justify-center w-full flex`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setToggler(false)}
                href="/features"
                className={`  ${
                  pathname == "/features" ? "border-b-4 border-primary " : ""
                } p-[16px]  text-center items-center justify-center w-full flex`}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setToggler(false)}
                href="/solution"
                className={`  ${
                  pathname == "/solution" ? "border-b-4 border-primary " : ""
                } p-[16px]  text-center items-center justify-center w-full flex`}
              >
                Solution
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setToggler(false)}
                href="/faq"
                className={`  ${
                  pathname == "/sell" ? "border-b-4 border-primary " : ""
                } p-[16px]  text-center items-center justify-center w-full flex`}
              >
                Faq
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setToggler(false)}
                href="/resources"
                className={`  ${
                  pathname == "/resources" ? "border-b-4 border-primary " : ""
                } p-[16px]  text-center items-center justify-center w-full flex`}
              >
                Resources
              </Link>
            </li>
          </ul>

          <ul
            className={`${
              toggler ? "top-[400px]" : "top-[-100%]"
            }   duration-200 grid tablet:flex px-4 tablet:px-0 items-center grid-cols-2 font-medium gap-[10px]  fixed right-0 w-full tablet:w-auto  justify-center tablet:static `}
          >
            <Link
              href="/patient/signup"
              className="w-full tablet:auto flex tablet:min-w-[100px] justify-center bg-primary text-white px-4 py-2 rounded-full"
            >
              <button>Sign up </button>
            </Link>
            <Link
              href="/patient/login"
              className="w-full  tablet:auto flex tablet:min-w-[100px] justify-center border border-primary  px-4 py-2 rounded-full"
            >
              <button>Log In</button>
            </Link>
          </ul>

          <div onClick={() => setToggler(!toggler)} className="tablet:hidden">
            {!toggler ? (
              <Icon name="bar" size={24} />
            ) : (
              <Icon name="close" size={24} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
