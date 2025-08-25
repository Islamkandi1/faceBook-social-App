import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../ui/Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import GetUSerPost from "../getUserPost/GetUSerPost";
import ChangePassword from "../../changePassword/ChangePassword";
import ProfilePhoto from "../../ProfilePhoto/ProfilePhoto";

const Profile = () => {
  // get profile user data==========================================================
  function getUserData({signal}) {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        Token: localStorage.token,
      },
      signal
    });
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileData"],
    queryFn: getUserData,
  });
  // handle loading===========================================================
  if (isLoading) {
    return <Loading padding={5}/>;
  }
  // handle error===========================================
  if (isError) {
    toast.error("some thing went wrong");
  }

  return (
    <>
      <Toaster />
      <div className="bg-light dark:bg-section min-h-dvh">
        <section className="container mx-auto  pt-[5rem] flex justify-center ">
          <section className=" rounded-xl relative py-[2rem] px-[2rem] flex flex-col items-center gap-3 bg-light shadow-lg dark:bg-dark  w-full md:w-[90%] lg:w-[60%]">
          <ProfilePhoto data={data}/>
            <h2 className="text-[1.5rem] capitalize">
              {data?.data?.user?.name}
            </h2>
            <h2>{data?.data?.user?.email}</h2>
            <ChangePassword />
          </section>
        </section>
        <GetUSerPost />
      </div>
      <title>profile</title>
    </>
  );
};

export default Profile;
