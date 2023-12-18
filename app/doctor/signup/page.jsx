"use client";
import Layout from "@/layout/loginAndSignup/Layout";

import { useState } from "react";

import { useFormik } from "formik";
import Link from "next/link";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { doctorSignupSchema } from "@/validation/auth";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import { createDB } from "@/functions/firebase";
import { useDoctor } from "../Context";
import IsLoggedInPopUp from "../IsLoggedInPopUp";

const Signup = () => {
  const [submit, setSubmit] = useState(false);
  const { setIsSigning, getDoctorData } = useDoctor();

  const router = useRouter();
  const onSubmit = async (values) => {
    const { email, password, name, accessCode } = values;
    if (accessCode !== "1012") return alert("You Don't Have Access Please");

    setSubmit(!submit);
    setIsSigning(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      if (auth.currentUser) {
        // Create a user document in Firestore
        await createDB("doctors", auth.currentUser.uid, {
          accessCode,
          ...values,
          uid: auth.currentUser.uid,
        });

        await getDoctorData();
        setSubmit(false);
        if (auth.currentUser) {
          router.push("/doctor");
        }
        setSubmit(false);
      }
    } catch (error) {
      console.log(error);
      let err;
      if (error.message === `Firebase: Error (auth/email-already-in-use).`) {
        err = "Email address already in use";
      }

      if (error.message === `Firebase: Error (auth/invalid-email).`) {
        err = "Enter a valid Email address";
      }
      if (
        error.message ===
        `Firebase: Password should be at least 6 characters (auth/weak-password).`
      ) {
        err = "Password should be at least 6 characters ";
      }
      setSubmit(submit);

      if (err) {
        toast(err, {
          theme: "light",
          autoClose: 1200,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    }
  };

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        accessCode: "",
      },
      validationSchema: doctorSignupSchema,
      onSubmit,
    });
  return (
    <Layout>
      <ToastContainer />
      <IsLoggedInPopUp />
      <div className="  pb-[100px] flex items-center relative z-30 justify-center">
        <div className="px-4 tablet:w-[400px] flex  flex-col gap-4">
          <div className="bg-white flex h-600px]  shadow-xl flex-col items-center py-5 w-full  rounded-lg ">
            <h1 className=" text-xl  font-semibold">Doctor Sign Up</h1>
            <div className=" relative max-w-[400px] w-full min-h-[500px] md:h-screen z-20 flex justify-center items-center  px-2">
              <div className="  px-4 pt-4 rounded-lg w-full">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                  <InputField
                    label="Full Name"
                    name="name"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                    Error={touched.name && errors.name}
                    placeholder="Enter your name e.g John Doe"
                  />
                  <InputField
                    label="Email"
                    name="gmail"
                    id="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.email}
                    Error={touched.email && errors.email}
                    placeholder="Enter your email"
                  />
                  <InputField
                    label="Choose Password"
                    name="password"
                    id="password"
                    type="password"
                    required
                    Error={touched.password && errors?.password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Minimum 8 characters"
                  />

                  <InputField
                    label="Doctors Code"
                    name="accessCode"
                    id="accessCode"
                    type="accessCode"
                    required
                    Error={touched.accessCode && errors?.accessCode}
                    value={values.accessCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="medvive doctors code"
                  />

                  <Button
                    onClick={handleSubmit}
                    isSubmit={submit}
                    type="button"
                    text="Sign Up"
                  />
                  <span className="text-base">
                    Do have an account?,{" "}
                    <Link href="/doctor/login" className="text-primary">
                      Log In
                    </Link>{" "}
                    now.
                  </span>
                </form>
                <button
                  className=" rounded-xl flex
                 w-full border mt-[10px] h-[45px] 
                justify-center items-center gap-4"
                >
                  <Icon name="google" size={24} />
                  <p className=" text-[14px]">Sign Up with Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
