import React, { useContext } from "react";
import facebookUer from "./../../assets/images/facebook-user-icon-19.jpg";
import { Link } from "react-router-dom";
import Comment from "./../comment/comment";
import UpdateCommentForm from "../updaateCommentForm/UpdateCommentForm";
import { jwtDecode } from "jwt-decode";
import { commentCotext } from "../../context/UpdateCommentProvider";
import { translateContext } from "../../context/TranslatePRovider";
const OneComment = ({ post }) => {
  const { user } = jwtDecode(localStorage.token);
  const { activeUpdateComment } = useContext(commentCotext);
  const { t } = useContext(translateContext);

  return (
    <>
      <Link
        to={`/postDetails/${post._id}`}
        className="mb-3 block cursor-pointer text-main capitalize w-fit"
      >
        {t("show more comments")} {`(${post.comments.length})`}
      </Link>
      <section className="bg-[#F3F4F6] dark:bg-section p-5 rounded-2xl">
        <Comment
          commentId={post?.comments[post.comments.length - 1]?._id}
          userId={post.comments[post.comments.length - 1].commentCreator._id}
          postUserId={post.user._id}
          name={post.comments[post.comments.length - 1].commentCreator.name}
          createdAt={post.comments[post.comments.length - 1].createdAt.slice(
            0,
            10
          )}
          photo={
            post.comments[
              post.comments.length - 1
            ].commentCreator.photo.includes("undefined")
              ? facebookUer
              : post.comments[post.comments.length - 1].commentCreator.photo
          }
        />
        <p className="text-gray-700 dark:text-light capitaliz mb-3">
          {activeUpdateComment !=
            post?.comments[post.comments.length - 1]?._id &&
            post?.comments[post.comments.length - 1]?.content}
        </p>
        {user == post.comments[post.comments.length - 1].commentCreator._id && (
          <UpdateCommentForm
            commentId={post.comments[post.comments.length - 1]._id}
            content={post?.comments[post.comments.length - 1]?.content}
          />
        )}
      </section>
    </>
  );
};

export default OneComment;
