"use client";
import Layout from "@/layout/loginAndSignup/Layout";

import { useState } from "react";

import { useFormik } from "formik";
import Link from "next/link";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { signupSchema } from "@/validation/auth";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import { createDB } from "@/functions/firebase";

const Signup = () => {
  const [submit, setSubmit] = useState(false);
  const { setIsSigning, getPatientData } = useUserAuth();

  const router = useRouter();
  const onSubmit = async (values) => {
    setSubmit(!submit);
    setIsSigning(true);
    const { email, password, name } = values;

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);

      // ...
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      if (auth.currentUser) {
        // Create a user document in Firestore
        await createDB("patients", auth.currentUser.uid, {
          ...values,
        });

        await getPatientData();
        setSubmit(false);
        if (auth.currentUser) {
          router.push("/dashboard/patient");
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
      },
      validationSchema: signupSchema,
      onSubmit,
    });
  return (
    <Layout>
      <ToastContainer />
      <div className="  pb-[100px] flex items-center relative z-30 justify-center">
        <div className="px-4 tablet:w-[400px] flex  flex-col gap-4">
          <div className="bg-white flex h-600px]  shadow-xl flex-col items-center py-5 w-full  rounded-lg ">
            <h1 className=" text-xl  font-semibold">Sign Up To Medvive</h1>
            <div className=" relative max-w-[400px] mx-auto h-[500px] md:h-screen z-20 flex justify-center items-center  px-2">
              <div className="  px-4 pt-4 rounded-lg">
                <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
                  <InputField
                    label="Full Name"
                    name="name"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                    errMessage={touched.name && errors.name && errors.name}
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
                    errMessage={touched.email && errors.email && errors.email}
                    placeholder="Enter your email"
                  />
                  <InputField
                    label="Choose Password"
                    name="password"
                    id="password"
                    type="password"
                    required
                    errMessage={
                      touched.password && errors.password && errors.password
                    }
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Minimum 8 characters"
                  />

                  <div className=" text-base items-center flex  gap-3">
                    <input type="checkbox" name="" id="" />
                    <span>
                      By lobby the button above, you agree to our{" "}
                      <Link href="/term" className=" underline text-primary">
                        Terms of Service
                      </Link>{" "}
                      . and{" "}
                      <Link href="/term" className=" underline text-primary ">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    isSubmit={submit}
                    type="button"
                    text="Sign Up"
                  />
                  <span className="text-base">
                    Do have an account?,{" "}
                    <Link href="/login" className="text-primary">
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
