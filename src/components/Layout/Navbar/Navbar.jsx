import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import faceBook from "./../../../assets/facbook.svg";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { contextMode } from "./../../../context/DarkMode";
import { translateContext } from "../../../context/TranslatePRovider";
import ArAndEn from "./../../ui/ArAndEn/ArAndEn";
import { infoContext } from "../../../context/UerIfonProvider";
import { TokenContext } from "../../../context/TokenProvider";
const Navbar = () => {
  const [nav, setNav] = useState("top-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const { mood, setMood } = useContext(contextMode);
  const { t } = useContext(translateContext);
  const { data } = useContext(infoContext);
  const { LogOut: clearDataAndContext } = useContext(TokenContext);
  // logOUt
  function logOut() {
    clearDataAndContext();
    navigate("/login");
  }

  // change mood===============
  function changeMood() {
    if (mood === "dark") {
      setMood("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      setMood("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }
  // mood effect=========================================================
  useEffect(() => {
    if (localStorage.theme) {
      document.documentElement.classList.add(localStorage.theme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        setMood("dark");
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        setMood("light");
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  // hidnavbar===========================================================
  const hidNav = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setNav("top-[-100px]");
    } else {
      setNav("top-[0]");
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);
  // detect scroll navbar=====================================================
  useEffect(() => {
    window.addEventListener("scroll", hidNav);
    return () => {
      window.removeEventListener("scroll", hidNav);
    };
  }, [hidNav]);

  // close drop down when we click ====================================================
  function closeDropDown() {
    document.activeElement.blur();
  }
  // ?jsx code====================================
  return (
    <>
      <div
        className={`navbar  block z-20 bg-light shadow-lg dark:bg-dark py-2 fixed  start-0 end-0 ${nav} transition-all duration-600`}
      >
        <section className="container mx-auto flex justify-between items-center px-4  ">
          <div className="">
            <Link to="/" className="flex items-center gap-2 ">
              <img className="w-[40px]" src={faceBook} />
              <p className=" tracking-wide text-main font-semibold capitalize text-[1.8rem]">
                {t("facebook")}
              </p>
            </Link>
          </div>
          <div className=" gap-3 flex z-20 items-center">
            <div className="dropdown dropdown-end cursor-pointer">
              <div
                tabIndex={0}
                role="button"
                className=" btn-ghost btn-circle w-[45px] avatar"
              >
                <div className="rounded-full">
                  <img className="" src={data?.data?.user?.photo} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content overflow-hidden  rounded-box  mt-3 w-52 p-2 bg-light shadow-lg dark:bg-dark dark:outline-1  dark:outline-gray-600"
              >
                <Link
                  to="/profile"
                  className="px-4 py-3 text-sm text-gray-900 dark:text-white"
                  onClick={closeDropDown}
                >
                  <div className="capitalize">{data?.data?.user?.name}</div>
                  <div className="font-medium truncate">
                    {data?.data?.user?.email}
                  </div>
                </Link>
                <li className="px-2">
                  <NavLink
                    onClick={closeDropDown}
                    to="/"
                    className="justify-between  text-black dark:text-light capitalize text-[1rem] font-medium hover:bg-main mb-3 hover:text-light"
                  >
                    {t("home")}
                  </NavLink>
                </li>
                <li className="px-2">
                  <NavLink
                    onClick={closeDropDown}
                    to="/profile"
                    className="justify-between text-black dark:text-light capitalize text-[1rem] font-medium hover:bg-main mb-3 hover:text-light"
                  >
                    {t("profile")}
                  </NavLink>
                </li>
                <li onClick={logOut} className="px-2">
                  <p className="justify-between capitalize text-black dark:text-light text-[1rem] font-medium hover:bg-red-500 hover:text-light">
                    {t("logout")}
                  </p>
                </li>
              </ul>
            </div>
            <span className="w-fit mx-auto">
              {mood == "dark" ? (
                <CiLight
                  onClick={changeMood}
                  className=" text-light cursor-pointer text-[1.4rem] "
                />
              ) : (
                <MdDarkMode
                  className=" text-gray-700 cursor-pointer text-[1.4rem] "
                  onClick={changeMood}
                />
              )}
            </span>
            <ArAndEn />
          </div>
        </section>
      </div>
    </>
  );
};

export default Navbar;
