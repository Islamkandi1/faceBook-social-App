import React, { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { HiDotsHorizontal } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import { updateContext } from "../../context/UpdatePostProvider";
import { translateContext } from "../../context/TranslatePRovider";
const DeleteAndUpdatePost = ({ userId, postId }) => {
  const { user } = jwtDecode(localStorage.token);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const querylient = useQueryClient();
  const { setShowForm } = useContext(updateContext);
  const { t } = useContext(translateContext);
  //  delete post======================================================
  function deletPost() {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.token,
      },
    });
  }
  // handle delete post =============================================================
  const { mutate, isPending } = useMutation({
    mutationFn: deletPost,
    onSuccess: (data) => {
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
      } else if (pathname.includes(`/postDetails`)) {
        navigate(-1);
      }
      toast.success(data.data.message);
    },
    onError: () => {
      toast.error("some thing went wrong");
    },
  });
  // edite handle fun==================================
  function handlEdite() {
    document.activeElement.blur();
    setShowForm(postId);
  }
  //   ?jsx code====================================================
  return (
    <div>
      {userId == user && (
        <div className="dropdown dropdown-left">
          <HiDotsHorizontal
            tabIndex={0}
            role="button"
            className=" m-1 text-gray-700 dark:text-light cursor-pointer text-[1.6rem]"
          />
          <ul
            tabIndex={0}
            className="dropdown-content bg-light text-gray-700 dark:text-light dark:bg-dark menu  rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li className="hover:bg-main transition-all duration-300 hover:text-light mb-2 rounded-lg">
              <button className="capitalize " onClick={handlEdite}>
                {t("edite")}
              </button>
            </li>
            <li className="hover:bg-red-600 transition-all duration-300 hover:text-light mb-2 rounded-lg">
              <button className="capitalize " onClick={mutate}>
                {isPending ? (
                  <p className="flex">
                    <ScaleLoader color="#fff" height={20} width={3} />
                  </p>
                ) : (
                  t("delete")
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(DeleteAndUpdatePost);
