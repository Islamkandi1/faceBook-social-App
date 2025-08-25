import React, { useContext } from "react";
import facebookUer from "./../../assets/images/facebook-user-icon-19.jpg";
import Comment from "./../comment/comment";
import UpdateCommentForm from "../updaateCommentForm/UpdateCommentForm";
import { commentCotext } from "../../context/UpdateCommentProvider";
const Comments = ({ comment, posId,userId }) => {
  const { activeUpdateComment } = useContext(commentCotext);

  // ? jsx code ======================================================================
  return (
    <>
      <section className="bg-[#F3F4F6] dark:bg-section mb-3 p-5 rounded-2xl">
        <Comment
          commentId={comment?._id}
          postUserId={userId}
          postId = {posId}
          userId={comment.commentCreator._id}
          name={comment?.commentCreator?.name}
          createdAt={comment?.createdAt.slice(0,10)}
          photo={
            comment?.commentCreator?.photo.includes("undefined")
              ? facebookUer
              : comment?.commentCreator?.photo
          }
        />
        <p className="text-gray-700 dark:text-light capitaliz mb-3">
          {activeUpdateComment !== comment._id && comment?.content}
        </p>
        {userId == comment.commentCreator._id && (
          <UpdateCommentForm
            posId={posId}
            commentId={comment?._id}
            content={comment.content}
          />
        )}
      </section>
    </>
  );
};

export default Comments;
