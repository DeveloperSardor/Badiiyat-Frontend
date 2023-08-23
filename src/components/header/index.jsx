import React, { useContext, useState } from "react";
import context from "../../context";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { Dropdown, Ripple, initTE } from "tw-elements";
import { toast } from "react-hot-toast";

const Header = () => {
  initTE({ Dropdown, Ripple });
  const [t, i18n] = useTranslation("global");
  const contextDatas = useContext(context);
  const userDatas = contextDatas.userDatas;
  const currentMode = contextDatas.currentMode;

  const logoutHandler = () => {
    localStorage.removeItem("userDatas");
    location.reload();
  };
  return (
    <header
      className={`p-3 px-5 position-sticky top-0  left-0 w-[100%] pe-5 flex items-center justify-between ${
        currentMode == "dark" ? "dark-header" : "header"
      }`}
    >
      <Link to={"/"} className="ps-4 nav_brand">
        Badiiyat
      </Link>
      <div className="right-menu d-flex">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active-link item" : "item"
          }
          to={"/"}
        >
          {t("navbar.home")}
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active-link item" : "item"
          }
          to={"/books"}
        >
          {t("navbar.books")}
        </NavLink>
        {userDatas ? (
          <div className="relative ava_r" data-te-dropdown-ref>
            <button
              className="flex items-center whitespace-nowrap rounded  p-2 px-4 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out   focus:bg-primary-600  focus:outline-none focus:ring-0 active:bg-primary-700  motion-reduce:transition-none"
              type="button"
              id="dropdownMenuButton1"
              data-te-dropdown-toggle-ref
              aria-expanded="false"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <img
                loading="lazy"
                src={userDatas?.img_link}
                className="rounded-5 avatar"
              />
              <span className="ml-2 w-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <ul
              className="absolute bg-stone-100 z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none drop_ul bg-clip-padding text-left text-base  [&[data-te-dropdown-show]]:block"
              aria-labelledby="dropdownMenuButton1"
              data-te-dropdown-menu-ref
            >
              <li>
                <Link
                  className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  to={"/profile"}
                  data-te-dropdown-item-ref
                >
                  {t("navbar.profile")}
                </Link>
              </li>
              <li>
                <a
                  className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  href="#"
                  onClick={() => logoutHandler()}
                  data-te-dropdown-item-ref
                >
                  {t("navbar.logout")}
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to={"/login"}
            className={({ isActive, isPending }) => {
              isActive ? "active-link" : "";
            }}
          >
            {t("navbar.login")}
          </NavLink>
        )}

        <div className="relative hamburger_mobile" data-te-dropdown-ref>
          <button
            className="flex items-center whitespace-nowrap rounded  p-2 px-4 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out   focus:bg-primary-600  focus:outline-none focus:ring-0 active:bg-primary-700  motion-reduce:transition-none"
            type="button"
            id="dropdownMenuButton1"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <i className="fa-sharp hamburger_icon fa-solid fa-bars"></i>
            <span className="ml-2 w-2">
            
            </span>
          </button>
          <ul
            className="absolute bg-stone-100 z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none drop_ul bg-clip-padding text-left text-base  [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButton1"
            data-te-dropdown-menu-ref
          >
            <li>
              <Link
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                to={"/"}
                data-te-dropdown-item-ref
              >
                {t("navbar.home")}
              </Link>
            </li>
            <li>
              <Link
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                to={"/books"}
                data-te-dropdown-item-ref
              >
                {t("navbar.books")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
