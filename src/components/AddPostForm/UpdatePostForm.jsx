import React, { useContext, useEffect } from "react";
import { infoContext } from "../../context/UerIfonProvider";
import { useForm } from "react-hook-form";
import { IoIosSend, IoMdPhotos } from "react-icons/io";
import AuthLoading from "../ui/authLoading/AuthLoading";
import { updateContext } from "../../context/UpdatePostProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
const UpdatePostForm = ({ postBody, postId }) => {
  const { data } = useContext(infoContext);
  const { showForm, setShowForm, setRemoveOldimage, setNewImage } =
    useContext(updateContext);
  const { pathname } = useLocation();
  // handle update form ====================================================
  const { register, handleSubmit ,reset} = useForm({
    defaultValues: {
      body: postBody,
      image: "",
    },
  });
  // update post=====================================
  function updatePost(values) {
    const formdata = new FormData();
    if (values.body == "" && values.image == "") return;
    if (values.body != "") {
      formdata.append("body", values.body);
    }
    if (values.image != "") {
      formdata.append("image", values.image[0]);
    }
    return axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formdata,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
  }
  // handle update post  api===========================================
  const querylient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      setShowForm(" ");
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (pathname == "/") {
        querylient.invalidateQueries({
          queryKey: ["post"],
        });
      } else if (pathname == "/profile") {
        querylient.invalidateQueries({
          queryKey: ["userPosts"],
        });
      }
      toast.success(data.data.message);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  // handle show image=================================================
  function handleImage() {
    const src = URL.createObjectURL(event.target.files[0]);
    setNewImage(src);
    setRemoveOldimage(postId);
  }
  // cancel edite=======================================================
  function cancelEdite() {
    setShowForm("");
    setNewImage(null);
    setRemoveOldimage("");
  }
  useEffect(() => {
  if (showForm === postId) {
    reset({
      body: postBody,
      image: "",
    });
  }
}, [showForm, postBody, postId, reset]);
  // ?jsx code =========================================================
  return (
    <>
      <form
        className={` grow flex   gap-3 items-center ${
          showForm == postId ? "block" : "hidden"
        }`}
        onSubmit={handleSubmit(mutate)}
      >
        <button
          type="button"
          className="text-[1.4rem] cursor-pointer"
          onClick={cancelEdite}
        >
          <IoCloseSharp />
        </button>
        <input
          type="text"
          className=" w-full border-1  dark:border-0 border-[#d5d5d5] bg-[#F9FAFC] dark:bg-[#333334] dark:placeholder:text-gray-400 dark:text-light px-3 py-[.4rem] rounded-[25px] outline-0 text-black "
          placeholder={`what's on your mind , ${data?.data?.user.name} `}
          {...register("body")}
        />
        <label
          htmlFor={`updateImage-${postId}`}
          className="text-[1.3rem] cursor-pointer"
        >
          <IoMdPhotos />
        </label>
        <input
          type="file"
          id={`updateImage-${postId}`}
          className="hidden"
          {...register("image", {
            onChange: () => {
              handleImage();
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
    </>
  );
};

export default UpdatePostForm;
