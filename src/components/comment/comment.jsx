import React, { useContext } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import { commentCotext } from "../../context/UpdateCommentProvider";
import { translateContext } from "../../context/TranslatePRovider";
import DeleteComment from "../DeleteComment/DeleteComment";
const Comment = ({
  name,
  createdAt,
  photo,
  userId,
  commentId,
  postId,
  postUserId
}) => {
  const { user } = jwtDecode(localStorage.token);
  const { setActiveUpdateComment } = useContext(commentCotext);
  const { t } = useContext(translateContext);

  // handle close when update====================================
  function handleUpdate() {
    document.activeElement.blur();
    setActiveUpdateComment(commentId);
  }
  
  // ? jsx code =====================================================
  return (
    <>
      <section className="flex justify-between items-center  mb-7 ">
        <section className="flex items-center gap-4">
          <div className="avatar rounded-full overflow-hidden">
            <div className="w-12">
              <img src={photo} />
            </div>
          </div>
          <div>
            <p className="text-dark dark:text-light  capitalize">{name}</p>
            <p className="text-neutral-500  dark:text-gray-300 capitalize">
              {createdAt}
            </p>
          </div>
        </section>
        {/* problem here */}
        <section>
          {user == userId && (
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
                  <button className="capitalize " onClick={handleUpdate}>
                    {t("edite")}
                  </button>
                </li>
                {userId == postUserId && (
                  <li className="hover:bg-red-600 transition-all duration-300 hover:text-light mb-2 rounded-lg">
                    <DeleteComment commentId={commentId} posId={postId} />
                  </li>
                )}
              </ul>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default Comment;
