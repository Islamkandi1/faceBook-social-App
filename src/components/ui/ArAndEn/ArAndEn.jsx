import React, { useContext } from "react";
import { translateContext } from "../../../context/TranslatePRovider";
import { AiOutlineGlobal } from "react-icons/ai";
import saudiArabia from "./../../../assets/images/saudi arabia.svg";
import usa from "./../../../assets/images/usa.webp";
const ArAndEn = () => {
  const { changeLanguage } = useContext(translateContext);
  return (
    <>
      <section className="dropdown dropdown-bottom">
        <section
          tabIndex={0}
          role="button"
          className=" text-[1.3rem] text-gray-700 dark:text-light cursor-pointer "
        >
          <AiOutlineGlobal />
        </section>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-1 w-52 p-2 start-[-40px]   shadow-sm bg-light dark:bg-dark "
        >
          <li
            className={`${
              localStorage.lang == "Ar" && "hidden"
            } hover:bg-main   rounded-l hover:text-light text-gray-900 dark:text-light   px-2 my-1 duration-300 cursor-pointer py-1 `}
            onClick={() => {
              changeLanguage("Ar");
            }}
          >
            <img
              src={saudiArabia}
              className="w-[30px]   block  p-0  hover:bg-transparent"
              alt="arabic lang"
            />
          </li>
          <li
            className={`${
              localStorage.lang == "en" && "hidden"
            } hover:bg-main rounded-l hover:text-light text-gray-900  dark:text-light   px-2 my-1 duration-300 cursor-pointer py-1`}
            onClick={() => {
              changeLanguage("en");
            }}
          >
                  <img
              src={usa}
              className="w-[30px]   block  p-0  hover:bg-transparent"
              alt="arabic lang"
            />
          </li>
        </ul>
      </section>
    </>
  );
};

export default React.memo(ArAndEn);
