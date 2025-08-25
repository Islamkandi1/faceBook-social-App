import React, { useContext, useEffect } from "react";
import { commentCotext } from "../../context/UpdateCommentProvider";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AuthLoading from "../ui/authLoading/AuthLoading";
import toast from "react-hot-toast";
import { translateContext } from "../../context/TranslatePRovider";
import { IoCloseSharp } from "react-icons/io5";

const UpdateCommentForm = ({ content, commentId, posId }) => {
  const { activeUpdateComment, setActiveUpdateComment } =
    useContext(commentCotext);
  const { t } = useContext(translateContext);
  const { pathname } = useLocation();
  // handle form==============================================
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: content,
    },
  });
  // update Commnet===========================================
  function updateComment(valuse) {
    return axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      valuse,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
  }
  const queryClient = useQueryClient();
  // handle Api=======================================================
  const { mutate, isPending } = useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      setActiveUpdateComment(null);
      toast.success(data.data.message);
      if (pathname == "/") {
        queryClient.invalidateQueries({
          queryKey: ["post"],
        });
      } else if (pathname == "/profile") {
        queryClient.invalidateQueries({
          queryKey: ["userPosts"],
        });
      } else if (pathname.includes(`/postDetails`)) {
        queryClient.invalidateQueries({
          queryKey: ["post", posId],
        });
      }
    },
    onError: () => {
      toast.error("something went worng");
    },
  });
  // close form====================================================
  function ClosForm() {
    setActiveUpdateComment(null);
  }
  // reset content form =================================================
  useEffect(() => {
    reset({ content });
  }, [content, reset]);
  // ? jsx code ========================================================================
  return (
    <>
      {activeUpdateComment == commentId && (
        <form
          action=""
          className="flex flex-wrap gap-4"
          onSubmit={handleSubmit(mutate)}
        >
          <button
            type="button"
            className="text-[1.4rem] cursor-pointer"
            onClick={ClosForm}
          >
            <IoCloseSharp />
          </button>
          <input
            type="text"
            className="grow px-4 py-2 border border-[#d5d5d5] outline-0 rounded-xl dark:bg-[#333334] dark:border-0"
            {...register("content")}
          />
          <button
            type="submit"
            className="bg-main px-3 py-2 rounded-xl cursor-pointer"
          >
            {isPending ? <AuthLoading /> : t("update")}
          </button>
        </form>
      )}
    </>
  );
};

export default UpdateCommentForm;
