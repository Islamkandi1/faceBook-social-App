import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPhotos } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AuthLoading from "./../authLoading/AuthLoading";
import { IoCloseSharp } from "react-icons/io5";
import { infoContext } from "../../../context/UerIfonProvider";
import { translateContext } from "../../../context/TranslatePRovider";
const AddPost = () => {
  const { data: userName } = useContext(infoContext);
  const { t } = useContext(translateContext);
  const [src, setSrc] = useState(null);
  const [closeImg, setCloseImg] = useState(true);
  const { pathname } = useLocation();
  const { data } = useContext(infoContext);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  function addPost(values) {
    const formdata = new FormData();
    if (values.body == "" && values.image == "") return;
    if (values.body != "") {
      formdata.append("body", values.body);
    }
    if (values.image != "") {
      formdata.append("image", values.image[0]);
    }

    return axios.post("https://linked-posts.routemisr.com/posts", formdata, {
      headers: {
        token: localStorage.token,
      },
    });
  }
  // mutarion post==================
  const querylient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      if (pathname == "/") {
        querylient.invalidateQueries({
          queryKey: ["post"],
        });
      } else if (pathname == "/profile") {
        querylient.invalidateQueries({
          queryKey: ["userPosts"],
        });
      }
      setSrc("");
      toast.success(data?.data?.message);
      reset();
    },
    onError: () => {
      toast.success("some thing went wrong");
    },
  });

  // show image====================================================
  function showImgPost() {
    const src = URL.createObjectURL(event.target.files[0]);
    setSrc(src);
    setCloseImg(true);
  }
  // close image=========================
  function closeImage() {
    setCloseImg(false);
    setValue("image", "");
  }
  return (
    <>
      <section className=" rounded-xl py-[3rem] px-[2rem] bg-light shadow-lg dark:bg-dark ">
        <section className="container">
          <section className="flex  items-center justify-between gap-5 ">
            <div className="avatar rounded-full overflow-hidden">
              <div className="w-12">
                <img src={data?.data?.user?.photo} />
              </div>
            </div>
            <form
              className=" grow flex   gap-3 items-center"
              onSubmit={handleSubmit(mutate)}
            >
              <input
                type="text"
                className=" w-full border-1  dark:border-0 border-[#d5d5d5] bg-[#F9FAFC] dark:bg-[#333334] dark:placeholder:text-gray-400 dark:text-light px-3 py-[.4rem] rounded-[25px] outline-0 text-black "
                placeholder={`${t("what's on your mind")} , ${userName?.data?.user.name} `}
                {...register("body")}
              />
              <label htmlFor="img" className="text-[1.3rem] cursor-pointer">
                <IoMdPhotos />
              </label>
              <input
                type="file"
                id="img"
                className="hidden"
                {...register("image", {
                  onChange: () => {
                    showImgPost();
                  },
                })}
              />
              <button
                type="submit"
                className="bg-main text-light text-[1.5rem] flex justify-center w-[100px]  py-2 cursor-pointer rounded-2xl"
              >
                {isPending ? <AuthLoading /> : <IoIosSend />}
              </button>
            </form>
          </section>
          {src && (
            <section
              className={` mt-4 mx-auto ${closeImg ? "" : "hidden"}`}
            >
              <p
                className="text-[1.3rem] flex justify-end cursor-pointer"
                onClick={closeImage}
              >
                <IoCloseSharp />
              </p>
              <img src={src} className=" mt-2 w-full " />
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default React.memo(AddPost);
