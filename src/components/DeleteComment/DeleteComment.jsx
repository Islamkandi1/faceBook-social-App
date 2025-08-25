import React, { useContext } from "react";
import { translateContext } from "../../context/TranslatePRovider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AuthLoading from "../ui/authLoading/AuthLoading";

const DeleteComment = ({ commentId, posId }) => {
  const { t } = useContext(translateContext);
  const { pathname } = useLocation();
  // delete comment==========================
  function deleteComment() {
    return axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
  }

  // handle delete comment ===============================================
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      toast.success(data.data.message);

      document.activeElement.blur();

      if (document.activeElement) {
        document.activeElement.blur();
      }
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
      toast.error("something went wrong");
    },
  });

  return (
    <>
      <button className="capitalize flex" onClick={mutate}>
        {isPending ? <AuthLoading /> : t("delete")}
      </button>
    </>
  );
};

export default DeleteComment;
