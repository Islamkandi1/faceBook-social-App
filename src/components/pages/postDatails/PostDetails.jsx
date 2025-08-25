import React from "react";
import Post from "../../ui/post/Post";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../ui/Loading/Loading";
import toast from "react-hot-toast";
const PostDetails = () => {
  const { id } = useParams();
  // get post details==================
  function getPostDetails({ signal }) {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.token,
      },
      signal,
    });
  }

  
  // api handle==================================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: getPostDetails,
  });
  //  * check loadin ad error============================================
  if (isLoading) {
    return <Loading padding={5} />;
  }
  if (isError) {
    return toast.error(error.message);
  }
  // ?jsx code ===================================================
  return (
    <>
      <section className="home   dark:bg-section min-h-dvh">
        <section className="container mx-auto pt-[5rem] flex justify-center ">
          <section className="w-full md:w-[90%] lg:w-[60%]  ">
            {data && <Post post={data?.data?.post} check={true} />}
          </section>
        </section>
      </section>
      <title>{`post:${data?.data?.post.user.name}`}</title>
    </>
  );
};

export default PostDetails;
