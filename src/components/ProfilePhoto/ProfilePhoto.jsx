import React, { useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import {  ScaleLoader } from "react-spinners";

const ProfilePhoto = ({ data }) => {
  const photo = useRef();
  const [layer, setLayer] = useState(false);
  // change profile image ======================================
  function changeProfilePhoto() {
    // prepare my new photo====================================
    const formdata = new FormData();
    formdata.append("photo", photo.current.files[0]);
    return axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formdata,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
  }
  const querylient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: changeProfilePhoto,
    onSuccess: (data) => {
      querylient.invalidateQueries({
        queryKey: ["profileData"],
      });
      toast.success(data.data.message);
      setLayer(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  // onChange input handle =======================================
  function handleInput() {
    mutate();
    setLayer(true);
  }
  // ?jsx code====================================
  return (
    <>
      <figure className="w-[120px] h-[120px] rounded-full overflow-hidden relative group mx-auto border-1 ">
        <img
          className="w-full h-full object-cover "
          src={data?.data?.user?.photo}
        />
        <label
          htmlFor="profilePhoto"
          className="bg-[#0000007e] opacity-0 transition-all duration-300 absolute z-10  group-hover:opacity-100 flex justify-center items-center top-0 bottom-0 start-0 end-0 text-light text-[1.5rem] cursor-pointer"
        >
          <input
            type="file"
            id="profilePhoto"
            onChange={handleInput}
            className="hidden"
            ref={photo}
          />
          <MdAddPhotoAlternate />
        </label>
      </figure>
      <div
        className={` ${
          layer ? "block" : "hidden"
        } absolute top-0 start-0 end-0 bottom-0 bg-[#0000007e] z-30 flex justify-center items-center`}
      >
        {isPending && <ScaleLoader color="#fff" width={4} />}
      </div>
    </>
  );
};

export default React.memo(ProfilePhoto);
