
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../ui/Loading/Loading";
import toast from "react-hot-toast";
import Post from "../../ui/post/Post";
import AddPost from "../../ui/addPost/AddPost";
const GetUSerPost = () => {
  const { user } = jwtDecode(localStorage.token);

  function getUserPosts({signal}) {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${user}/posts?limit=50`,
      {
        headers: {
          Token: localStorage.token,
        },
        signal
      }
    );
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    keepPreviousData: true
  });
  // handle loading===========================================================
  if (isLoading) {
    return <Loading padding={5} />;
  }
  // handle error===========================================
  if (isError) {
    toast.error("some thing went wrong");
  }
    const posts = [...(data?.data?.posts || [])].reverse();
  return (
    <>
    
      <section className="container mx-auto pt-[2rem] flex justify-center ">
        <section className="w-full md:w-[90%] lg:w-[60%]  ">
          <AddPost />
          {posts.map((post, idx) => {
            return <Post key={idx} post={post} />;
          })}
        
        </section>
      </section>
    </>
  );
};

export default GetUSerPost;
