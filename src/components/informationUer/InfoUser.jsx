import React from "react";

import UpdatePostForm from "../AddPostForm/UpdatePostForm";
import DeleteAndUpdatePost from "../DeleteAndUpdatePost/DeletePost";
const InfoUser = ({ name, createdAt, photo, userId, postId, postBody }) => {
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
              {createdAt.slice(0, 10)}
            </p>
          </div>
        </section>
        <section>
          <DeleteAndUpdatePost userId={userId} postId={postId} />
        </section>
      </section>
      <UpdatePostForm postBody={postBody}   postId={postId} />
    </>
  );
};

export default InfoUser;
