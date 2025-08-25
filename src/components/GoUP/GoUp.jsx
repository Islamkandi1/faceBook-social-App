import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
const GoUp = () => {
  const [upArrow, setUpArrow] = useState("hidden");
  // go up and refetch data============================
  function goUp() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // detect arrow ============================
  function scrollUp() {
    if (scrollY >= 500) {
      setUpArrow("block");
    } else {
      setUpArrow("hidden");
    }
  }
  // handle performanse of event===========================================
  useEffect(() => {
    window.addEventListener("scroll", scrollUp);
    return () => {
      window.removeEventListener("scroll", scrollUp);
    };
  }, []);
  return (
    <>
      <button
        className={`fixed ${upArrow}  end-[20px] bottom-[20px] cursor-pointer bg-main p-3 rounded-xl`}
        onClick={goUp}
      >
        <div className="text-light">
          <FaArrowUp />
        </div>
      </button>
    </>
  );
};

export default GoUp;
