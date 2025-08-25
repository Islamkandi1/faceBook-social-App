import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import { translateContext } from "./../../../context/TranslatePRovider";
import AuthLoading from "./../../ui/authLoading/AuthLoading";
import { seeAndHidePassword } from "../../../context/SeeAndHidePassword";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
const Signup = () => {
  const [isloading, setIsLoading] = useState(false);
  const controllerRef = useRef(new AbortController());
  const { t } = useContext(translateContext);
  const { password, seeAndHidePasswrod, rePassword, seeAndHideRepassword } =
    useContext(seeAndHidePassword);
  const navigate = useNavigate();
  // error schema =================================================
  const schema = z
    .object({
      name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(20, "Name must be at most 20 characters long"),
      email: z.string().nonempty("Email is required").email("invalid email"),
      password: z
        .string()
        .nonempty("password is required")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
        ),
      rePassword: z
        .string()
        .nonempty("rePassword is required")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
        ),
      dateOfBirth: z.coerce.date("date is required ").refine((date) => {
        const today = new Date().getFullYear();
        const userYear = date.getFullYear();
        return today - userYear >= 18 ? true : false;
      }, "You must be at least 18 years old to register"),
      gender: z.enum(["male", "female"], "Gender is required"),
    })
    // ensure that password and rePassword match========================================
    .refine((data) => (data.password === data.rePassword ? true : false), {
      message: "Password & rePassword do not match",
      path: ["rePassword"],
    });
  // form hook =================================================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  // sign up api =================================================
  async function signUp(values) {
    controllerRef.current = new AbortController();
    try {
      setIsLoading(true);
      await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values,
        { signal: controllerRef.current.signal }
      );
      toast.success("Successfully registered");
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    return () => {
      controllerRef.current.abort(); // Clean up the abort controller on component unmount
    };
  }, []);
  // ? jsx code =================================================
  return (
    <>
      <section>
        <section className="container mx-auto ">
          <section className="registration flex flex-col items-center  h-dvh">
            <h1 className="text-main text-[2.4rem] capitalize tracking-wide mb-4 font-semibold">
              {t("facebook")}
            </h1>
            <section className="bg-light  p-6 rounded-lg shadow-2xl w-full lg:w-[50%]">
              <form className="" onSubmit={handleSubmit(signUp)}>
                <h2 className="capitalize text-[1.3rem] text-main font-semibold mb-3">
                  {t("register now")}
                </h2>
                {/* name */}
                <section className="input-box mb-5 relative">
                  <input
                    type="text"
                    placeholder={t("type your name....")}
                    className="placeholder:text-gray-400 w-full border-1 border-[#d5d5d5] bg-[#F9FAFC] px-3 py-[.4rem] rounded-lg outline-0 text-black  "
                    {...register("name")}
                  />
                  {/* errors handle */}
                  {errors.name && touchedFields.name && (
                    <p className="alert border-0 bg-[#fe1010] z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(errors?.name?.message)}
                    </p>
                  )}
                </section>
                {/* email */}
                <section className="input-box mb-5 relative">
                  <input
                    type="email"
                    placeholder={t("type your email....")}
                    className="placeholder:text-gray-400 w-full border-1 border-[#d5d5d5] bg-[#F9FAFC] px-3 py-[.4rem] rounded-lg outline-0 text-black  "
                    {...register("email")}
                  />
                  {/* errors handle */}
                  {errors.email && touchedFields.email && (
                    <p className="alert border-0 bg-[#fe1010] z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(errors?.email?.message)}
                    </p>
                  )}
                </section>
                {/* password */}
                <section className="input-box mb-5 relative">
                  <section className="relative">
                    <input
                      type={password}
                      placeholder={t("type your password....")}
                      className="placeholder:text-gray-400 w-full border-1 border-[#d5d5d5] bg-[#F9FAFC] px-3 py-[.4rem] rounded-lg outline-0 text-black  "
                      {...register("password")}
                    />
                    <div
                      onClick={seeAndHidePasswrod}
                      className="absolute text-black  cursor-pointer end-0  top-1/2 -translate-1/2"
                    >
                      {password == "password" ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </section>
                  {/* errors handle */}
                  {errors.password && touchedFields.password && (
                    <p className="alert border-0 bg-[#fe1010] z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(errors.password?.message)}
                    </p>
                  )}
                </section>
                {/* rePassword */}
                <section className="input-box mb-5 relative">
                  <section className="relative">
                    <input
                      type={rePassword}
                      placeholder={t("confirm password....")}
                      className="placeholder:text-gray-400 w-full border-1 border-[#d5d5d5] bg-[#F9FAFC] px-3 py-[.4rem] rounded-lg outline-0 text-black  "
                      {...register("rePassword")}
                    />
                    <div
                      onClick={seeAndHideRepassword}
                      className="absolute text-black  cursor-pointer end-0  top-1/2 -translate-1/2"
                    >
                      {rePassword == "password" ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </section>
                  {/* errors handle */}
                  {errors.rePassword && touchedFields.rePassword && (
                    <p className="alert border-0 bg-[#fe1010] z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(errors.rePassword.message)}
                    </p>
                  )}
                </section>
                {/* dateOfBirth */}
                <section className="input-box mb-5 relative ">
                  <input
                    type="date"
                    placeholder={t("date of birth")}
                    className="placeholder:text-gray-400 w-full border-1  px-3 py-[.4rem] rounded-lg outline-0 text-gray-400 border-[#d5d5d5] bg-[#F9FAFC] "
                    {...register("dateOfBirth")}
                  />
                  {/* errors handle */}
                  {errors.dateOfBirth && touchedFields.dateOfBirth && (
                    <p className="alert border-0 bg-[#fe1010] z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(errors.dateOfBirth.message)}
                    </p>
                  )}
                </section>
                {/* gender */}
                <section className="gender flex items-center gap-5 mb-2">
                  <section className="flex items-center relative">
                    <input
                      type="radio"
                      name="gender"
                      className="radio bg-red border-main radio-primary  w-[15px] h-[15px] checked:bg-light checked:text-main me-1"
                      id="male"
                      value="male"
                      {...register("gender")}
                    />
                    {/* errors handle */}
                    <label
                      htmlFor="male"
                      className="text-black capitalize font-medium"
                    >
                      {t("male")}
                    </label>
                  </section>
                  <section className="flex items-center relative">
                    <input
                      type="radio"
                      name="gender"
                      className="radio bg-red border-main radio-primary  w-[15px] h-[15px] checked:bg-light checked:text-main me-1"
                      id="female"
                      value="female"
                      {...register("gender")}
                    />
                    <label
                      htmlFor="female"
                      className="text-black capitalize font-medium"
                    >
                      {t("female")}
                    </label>
                  </section>
                </section>
                {/* errors handle */}
                {errors.gender && touchedFields.gender && (
                  <p className="alert border-0 text-start  bg-[#fe1010] z-10 my-2 px-2 py-1 rounded-lg capitalize  w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {errors.gender.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-main px-5 py-[7px] rounded-xl capitalize my-2 cursor-pointer text-light"
                >
                  {isloading ? <AuthLoading /> : t("sign up")}
                </button>
              </form>
              <Link
                to="/login"
                className="text-main capitalize block w-fit font-semibold"
              >
                {t("already have an account?")}
              </Link>
            </section>
          </section>
        </section>
      </section>

      <title>{t("sign up")}</title>
    </>
  );
};
export default Signup;
