import React, { useContext, useState } from "react";
import OneComment from "./../../getonecomment/OneComment";
import AddComment from "./../../addComment/AddComment";
import InfoUser from "../../informationUer/InfoUser";
import Comments from "./../../commnets/Comments";
import { updateContext } from "../../../context/UpdatePostProvider";
import { translateContext } from "../../../context/TranslatePRovider";
const Post = ({ post, check }) => {
  const [visible, setVisible] = useState(3);
  const { showForm, removeOldimage, newImage } = useContext(updateContext);
  const { t } = useContext(translateContext);
 const comments = post?.comments?.slice() || [];

  return (
    <>
      <section className="bg-light shadow-lg dark:bg-dark my-[2rem] p-2 sm:p-4 md:p-5  rounded-xl">
        {/* head */}
        <InfoUser
          name={post?.user?.name}
          createdAt={post?.createdAt}
          photo={post?.user?.photo}
          userId={post?.user?._id}
          postId={post?._id}
          postBody={post?.body}
          postImage={post?.image}
        />
        {/* body */}
        <p className="text-gray-700 dark:text-light capitalize mb-4  break-all ">
          {showForm !== post?._id && post?.body}
        </p>
        {post?.image && (
          <img
            src={post?.image}
            loading="lazy"
            className={`w-full object-cover mb-4 ${
              removeOldimage == post?._id ? "hidden" : "block"
            }`}
          />
        )}
        {removeOldimage == post?._id && newImage && (
          <img
            src={newImage}
            alt=""
            className={`w-full object-cover mb-4 ${newImage && "block"}`}
          />
        )}
        {/* commnet */}
        {post?.comments?.length != 0 ? (
          <>
            <section>
              {check ? (
                <>
                  {comments
                    ?.reverse()
                    .slice(0, visible)
                    .map((comment, idx) => {
                      return (
                        <Comments
                          posId={post._id}
                          key={idx}
                          comment={comment}
                          userId={post?.user?._id}
                        />
                      );
                    })}
                  {visible < post?.comments?.length && (
                    <section className="flex justify-center items-center">
                      <button
                        className="text-main cursor-pointer "
                        onClick={() => {
                          setVisible((prev) => prev + 3);
                        }}
                      >
                        {t("see more")}
                      </button>
                    </section>
                  )}
                </>
              ) : (
                <OneComment post={post} />
              )}
            </section>
          </>
        ) : (
          <p className="bg-[#F3F4F6] dark:bg-section text-gray-600  dark:text-gray-300 p-3 text-center rounded-2xl">
            {t("No comments Yet")}
          </p>
        )}
        <AddComment postId={post?._id} />
      </section>
    </>
  );
};

export default React.memo(Post);
