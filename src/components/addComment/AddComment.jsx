import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import AuthLoading from "./../ui/authLoading/AuthLoading";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { translateContext } from "../../context/TranslatePRovider";
const AddComment = ({ postId }) => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

const {t} = useContext(translateContext)
// form handle ==============================================================
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
  });
  // reset form to update postId =======================
  useEffect(() => {
    reset({ content: "", post: postId });
  }, [postId, reset]);
  // create comment=====================================================
  function createComment(values) {
    return axios.post("https://linked-posts.routemisr.com/comments", values, {
      headers: {
        token: localStorage.token,
      },
    });
  }
  // handle creating comment========================================================
  const { mutate, isPending , } = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      if (pathname == "/") {
        queryClient.invalidateQueries({
          queryKey: ["post"],
        });
      }
      if (pathname.includes("postDetails")) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      } else if (pathname == "/profile") {
        queryClient.invalidateQueries({
          queryKey: ["userPosts"],
        });
      }
      toast.success(data.data.message);
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data.error);
      
    },
  });
  // ? jsx code =============================================================
  return (
    <>
      <section className="bg-[#F3F4F6] my-3 p-4 dark:bg-section rounded-2xl">
        <Toaster />
        <form
          action=""
          className="flex flex-wrap items-center gap-3 "
          onSubmit={handleSubmit(mutate)}
        >
          <input
            type="text"
            placeholder={t("add comment")}
            className="grow px-4 py-2 border border-[#d5d5d5] outline-0 rounded-xl dark:bg-[#333334] dark:border-0"
            {...register("content")}
          />
          <button
            type="submit"
            className=" bg-main px-4 py-2 rounded-xl text-[1.4rem] text-light cursor-pointer"
          >
            {isPending ? <AuthLoading /> : <IoMdSend />}
          </button>
        </form>
      </section>
    </>
  );
};

export default React.memo(AddComment);
