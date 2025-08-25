import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../../../context/TokenProvider";

const NotFound = () => {
    const {token} = useContext(TokenContext);
  return (
    <>
      <section class="bg-white dark:bg-section h-dvh flex items-center justify-center">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-main">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </p>
            <Link
              to={token?"/":"/login"}
              class="inline-flex text-light bg-primary-600 bg-main focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              {token ? "Go to Home page" : "Go to Login"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
