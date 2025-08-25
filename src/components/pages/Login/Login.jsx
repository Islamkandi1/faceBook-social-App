import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import axios from "axios";
import AuthLoading from "../../ui/authLoading/AuthLoading";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import { TokenContext } from "./../../../context/TokenProvider";
import { translateContext } from "../../../context/TranslatePRovider";
import { infoContext } from "./../../../context/UerIfonProvider";
import { seeAndHidePassword } from "../../../context/SeeAndHidePassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isloading, setIsLoading] = useState(false);
  const controllerRef = useRef(new AbortController());
  const navigate = useNavigate();
  const { saveToken } = useContext(TokenContext);
  const { t } = useContext(translateContext);
  const { refetch } = useContext(infoContext);
  const { password, seeAndHidePasswrod } = useContext(seeAndHidePassword);

  // error schema =================================================
  const schema = z.object({
    email: z.string().nonempty("Email is required").email("invalid email"),
    password: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
      ),
  });
  // form hook =================================================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  // login api =================================================
  async function login(values) {
    controllerRef.current = new AbortController();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values,
        { signal: controllerRef.current.signal }
      );
      saveToken(data.token);
      refetch();
      toast.success("Successfully login");
      navigate("/");

      reset();
    } catch (error) {
      toast.error(error?.response?.data?.error);
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
          <section className="registration flex flex-col items-center justify-center h-dvh">
            <h1 className="text-main text-[2.4rem] capitalize tracking-wide mb-4 font-semibold">
              {t("facebook")}
            </h1>
            <section className="bg-light  p-6 rounded-lg shadow-2xl w-full lg:w-[50%]">
              <form onSubmit={handleSubmit(login)}>
                <h2 className="capitalize text-[1.3rem] text-main font-semibold mb-3">
                  {t("login now")}
                </h2>
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
                    <p className="alert bg-[#fe1010] border-0 z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
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
                      {t(errors.email.message)}
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
                  {errors.password && touchedFields.password && (
                    <p className="alert bg-[#fe1010] border-0 z-10 my-2 px-2 py-1 rounded-lg capitalize absolute w-full">
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
                      {t(errors.password.message)}
                    </p>
                  )}
                </section>
                <button
                  type="submit"
                  className="bg-main px-5 py-[7px] rounded-xl capitalize mb-3 cursor-pointer text-light"
                >
                  {isloading ? <AuthLoading /> : t("signin")}
                </button>
              </form>
              <section className="flex gap-2">
                <p className="text-gray-500 capitalize">
                  {" "}
                  {t("no registraion")} :{" "}
                </p>
                <Link
                  to="/signup"
                  className="text-main capitalize block font-semibold"
                >
                  {t("create new account?")}
                </Link>
              </section>
            </section>
          </section>
        </section>
      </section>
      <title>{t("signin")}</title>
    </>
  );
};

export default Login;
