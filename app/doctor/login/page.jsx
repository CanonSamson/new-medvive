"use client";
import Layout from "@/layout/loginAndSignup/Layout";

import { useState } from "react";

import { useFormik } from "formik";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { DoctorLoginSchema } from "@/validation/auth";
import Icon from "@/components/Icon";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDoctor } from "../Context";
import IsLoggedInPopUp from "../IsLoggedInPopUp";

const Login = () => {
  const [submit, setSubmit] = useState(false);
  const [errorM, setErrorM] = useState("");
  const router = useRouter();

  const { setIsSigning, getDoctorData, auth, logout } = useDoctor();

  const onSubmit = async () => {
    const { email, password, accessCode } = values;
    if (accessCode !== "1012") return alert("You Don't Have Access Please");

    setSubmit(true);
    setIsSigning(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const { doctor } = await getDoctorData();

        if (doctor == null) {
          toast("You aren't a doctor!", {
            theme: "light",
            autoClose: 1200,
          });
          setIsSigning(false);
          setSubmit(false);
          await signOut(auth);
        }
        if (doctor == null) return;

        if (userCredential.user) {
          toast("Welcome Back!", {
            theme: "light",
            autoClose: 1200,
          });
          setIsSigning(false);

          router.push("/doctor");
        }
      }
    } catch (error) {
      setSubmit(false);
      console.log(error.message);
      let err;
      if (error.message === `Firebase: Error (auth/user-not-found).`) {
        err = "Sorry This User Is Not Register";
      }

      if (error.message === `Firebase: Error (auth/wrong-password).`) {
        err = "Your Password Is Wrong";
      }

      if (
        error.message === `Firebase: Error (auth/invalid-login-credentials).`
      ) {
        err = " user has not been registered";
      }

      if (error.message === `Firebase: Error (auth/network-request-failed).`) {
        err = "turn on your network";
      }

      if (
        error.message ===
        `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`
      ) {
        err =
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
      }

      if (err) {
        toast(err, {
          theme: "light",
          autoClose: 1200,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        setErrorM(err);
      }
    }
  };

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        accessCode: "",
      },
      validationSchema: DoctorLoginSchema,
      onSubmit,
    });
  return (
    <Layout>
      <ToastContainer />
      <IsLoggedInPopUp />

      <div className=" pb-[100px] px-4 tablet:px-0  flex items-center relative z-30 justify-center">
        <div className=" w-full tablet:w-[400px]  flex  flex-col gap-4">
          <div className="w-full bg-white flex min-h-[450px]  shadow-xl flex-col items-center py-5   rounded-lg ">
            <h1 className=" text-xl  font-semibold">Doctor Login </h1>
            <div className=" relative tablet:max-w-[400px] tablet:mx-auto  w-full min-h-[350px]  z-20 flex justify-center items-center">
              <div className=" w-full">
                <form
                  onSubmit={handleSubmit}
                  className="  px-4 pt-4  grid gap-2  rounded-lg p-4 pb-10"
                >
                  <InputField
                    label="Email"
                    name="gmail"
                    id="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.email}
                    Error={touched.email && errors.email && errors.email}
                    placeholder="Enter your email"
                  />
                  <InputField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    Error={
                      touched.password && errors.password && errors.password
                    }
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter password"
                  />

                  <InputField
                    label="Doctors Code"
                    name="accessCode"
                    id="accessCode"
                    type="password"
                    required
                    Error={touched.accessCode && errors?.accessCode}
                    value={values.accessCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="medvive doctors code"
                  />

                  <p className=" text-[10px]  text-red-600">
                    {errorM && errorM}
                  </p>

                  <div className="">
                    <span className="text-base">
                      Don&apos;t have an account?,{" "}
                      <Link href="/doctor/signup" className="text-primary">
                        Sign Up
                      </Link>{" "}
                      now.
                    </span>
                  </div>
                  <Button isSubmit={submit} type="submit" text="Log In" />
                  <Link
                    href="/forgottenpassword"
                    className=" text-base underline  flex justify-end mt-2"
                  >
                    forgotten password?
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-tr from-[#132F7A] relative text-white to-primary -white flex  shadow-xl flex-col items-center py-5 w-full  rounded-lg ">
            <span>Are You a Patient?</span>
            <Link
              href="/patient/login"
              className=" items-center gap-1 bg-primary flex text-white px-5 text-base py-3 rounded-full"
            >
              LOGIN HERE <Icon name="arrowright" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
