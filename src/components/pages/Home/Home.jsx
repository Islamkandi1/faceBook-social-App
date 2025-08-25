import React, { useEffect, useRef } from "react";
import AddPost from "../../ui/addPost/AddPost";
import Post from "./../../ui/post/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import Loading from "../../ui/Loading/Loading";
import AuthLoading from "../../ui/authLoading/AuthLoading";
import { PropagateLoader } from "react-spinners";
const Home = () => {
  // handle cancile api unmount and change title =========================================
  // get posts api===================================
  function getPosts({ pageParam = 1, signal }) {
    return axios.get(
      `https://linked-posts.routemisr.com/posts?limit=15&sort=-createdAt&page=${pageParam}`, //&sort=-createdAt
      {
        headers: {
          token: localStorage.token,
        },
        signal,
      }
    );
  }
  // api handle==================================================
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["post"],
    queryFn: ({ pageParam = 1, signal }) => getPosts({ pageParam, signal }),
    getNextPageParam: (_, allpages) => {
      return allpages.length < 171 ? allpages.length + 1 : undefined;
    },
  });

  // what is this mean (done now )======================================================================================
  const loadMoreRef = useRef();
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0, rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <Loading padding={5} />;
  }
  if (isError) {
    toast.error(error.message);
  }
  // ? jsx code =============================================
  return (
    <>
      <section className="home bg-light dark:bg-section min-h-dvh">
        <section className="container mx-auto pt-[5rem] flex justify-center ">
          <section className="w-full md:w-[90%] lg:w-[60%]  ">
            <AddPost />
            {data?.pages?.map((page, idx) => {
              return (
                <div key={idx}>
                  {page?.data?.posts.map((post, idx) => (
                    <Post key={idx} post={post} />
                  ))}
                </div>
              );
            })}
          </section>
        </section>

        <div
          type="button"
          className="text-center  bg-[#FFFFFF] dark:bg-section"
          ref={loadMoreRef}
        >
          {isFetchingNextPage && <Loading />}
          {!hasNextPage && "No more posts"}
        </div>
      </section>

      <title>home</title>
    </>
  );
};

export default Home;
