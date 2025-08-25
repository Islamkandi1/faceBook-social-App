import React, { useContext } from "react";
import { contextMode } from "../../../context/DarkMode";
const Loading = ({padding}) => {
  const { mood } = useContext(contextMode);
  return (
    <>
      <section className={`flex justify-center  min-h-dvh  bg-light dark:bg-section `}  >
        <div className={`flex w-full md:w-[80%] lg:w-[50%] pt-[${padding}rem]  flex-col gap-4`}>
          <div
            className={`skeleton ${
              mood == "light" && "my-skeleton"
            }  bg-[#EEEEEE] shadow-lg dark:bg-dark h-32 w-full`}
          ></div>
          <div
            className={`skeleton ${
              mood == "light" && "my-skeleton"
            } bg-[#EEEEEE] shadow-lg dark:bg-dark h-[300px] w-full`}
          ></div>
          <div
            className={`skeleton ${
              mood == "light" && "my-skeleton"
            } bg-[#EEEEEE] shadow-lg dark:bg-dark h-4 w-28`}
          ></div>
          <div
            className={`skeleton ${
              mood == "light" && "my-skeleton"
            } bg-[#EEEEEE] shadow-lg dark:bg-dark h-4 w-full`}
          ></div>
          <div
            className={`skeleton ${
              mood == "light" && "my-skeleton"
            } bg-[#EEEEEE] shadow-lg dark:bg-dark h-4 w-full`}
          ></div>
        </div>
      </section>
    </>
  );
};

export default Loading;
