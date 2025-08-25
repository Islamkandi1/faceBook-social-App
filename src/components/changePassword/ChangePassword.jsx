import React, { useContext } from "react";
import { translateContext } from "../../context/TranslatePRovider";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import AuthLoading from "../ui/authLoading/AuthLoading";
import { seeAndHidePassword } from "../../context/SeeAndHidePassword";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const ChangePassword = () => {
  const { t } = useContext(translateContext);
  const { password, seeAndHidePasswrod, rePassword, seeAndHideRepassword } =
    useContext(seeAndHidePassword);
  // handle validation  schema =================================================
  const schema = z.object({
    password: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
      ),
    newPassword: z
      .string()
      .nonempty("new password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
      ),
  });
  // handle change paswword form =========================================================
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  // change paswword=============================================================
  function changePassword(values) {
    return axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      values,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
  }

  // change paswword handle ====================================================
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      document.activeElement.blur();
      toast.success(data.data.message);
      localStorage.setItem("token", data?.data?.token);
      reset();
      document.getElementById("my_modal_5").close();
    },
    onError: (e) => {
      toast.error(e.response.data.error);
    },
  });
  // ? jsx code =========================================================
  return (
    <>
      <button
        className="text-main cursor-pointer"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        {t("change password")}
      </button>
      <dialog id="my_modal_4" className={`modal modal-bottom sm:modal-middle `}>
        <div className="modal-box">
          <form onSubmit={handleSubmit(mutate)}>
            <h2 className="capitalize text-[1.3rem] text-main font-semibold mb-3">
              {t("change password")}
            </h2>
            {/* Password */}
            <section className="input-box mb-5 relative">
              <section className="relative">
                <input
                  type={password}
                  placeholder={t("type your old password....")}
                  className="placeholder:text-gray-400 dark:text-light dark:bg-[#333334] dark:border-0 w-full border-1 border-[#d5d5d5] bg-[#F9FAFC] px-3 py-[.4rem] rounded-lg outline-0 text-black  "
                  {...register("password")}
                />
                <div
                  onClick={seeAndHidePasswrod}
                  className="absolute text-black dark:text-light cursor-pointer end-0  top-1/2 -translate-1/2"
                >
                  {password == "password" ? <FaEyeSlash /> : <FaEye />}
                </div>
              </section>
              {/* errors handle */}
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
            {/* new password */}
            <section className="input-box mb-5 relative">
              <section className="relative">
                <input
                  type={rePassword}
                  placeholder={t("type your new Password....")}
                  className="placeholder:text-gray-400 dark:text-light dark:bg-[#333334] dark:border-0 w-full border-1 border-[#d5d5d5] bg-[#F9FAFC] px-3 py-[.4rem] rounded-lg outline-0 text-black  "
                  {...register("newPassword")}
                />

                <div
                  onClick={seeAndHideRepassword}
                  className="absolute text-black dark:text-light cursor-pointer end-0  top-1/2 -translate-1/2"
                >
                  {rePassword == "password" ? <FaEyeSlash /> : <FaEye />}
                </div>
              </section>
              {errors.newPassword && touchedFields.newPassword && (
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
                  {t(errors.newPassword.message)}
                </p>
              )}
            </section>
            <button
              type="submit"
              className="bg-main px-5 py-[7px] rounded-xl capitalize mb-3 cursor-pointer text-light"
            >
              {isPending ? <AuthLoading /> : t("change pssword")}
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn text-light bg-main">{t("Close")}</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ChangePassword;
