import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./style.scss";
import { useTranslation } from "react-i18next";
import context from "../../context";
import BookCard from "../../components/book-card";
import SpinnerLoader from "../../components/loader";

const BookById = () => {
  const [t, i18n] = useTranslation("global");
  const contextDatas = useContext(context);
  const currentLang = contextDatas.currentLang;
  const [similarAuthor, setSimilarAuthor] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [load, setLoad] = useState(false);

  async function getBookById() {
    try {
      setLoad(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/books/${id}`
      );
      setBook(data.data);
      setSimilarBooks(data.data.similarBooks.slice(0, 4));
    } catch (error) {
      toast.error(error.message);
    } finally {
        setLoad(false)
    }
  }

  useEffect(() => {
    getBookById();
  }, []);

  function viewAllBooks() {
    if (similarBooks?.length == 4) {
      setSimilarBooks(book?.similarBooks);
    } else {
      setSimilarBooks(book?.similarBooks?.slice(0, 4));
    }
  }

  async function getAuthorSimilar(id) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/authors/${id}`
      );
      return data.data;
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="bookByID_page">
    {load ? <SpinnerLoader/> : 
      <section className="mt-2 firtsSec flex ps-3 pb-5">
        <div className="left">
        <img
            src={book?.mainData?.img_link}
            alt={book?.mainData?.title}
            title={book?.mainData?.title}
          />
          
        </div>
        <div className="right">
          <h1 className="title_book">{book?.mainData?.title}</h1>
          <div className="datas mt-1 pe-5 w-[95%] flex flex-column gap-2">
            <div className="flex items-center justify-between">
              <p className="first_a">{t("numberOfPages")}: </p>
              <p className="second_a">
                {book?.mainData?.pages} {t("pages")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="first_a">{t("priceOfBook")}:</p>
              <p className="second_a">${book?.mainData?.price}</p>
            </div>
          </div>
          <div className="full_info mt-3 flex flex-column gap-3">
            <div className="top flex items-center gap-2">
              <p className="full_text">{t("fullInfo")}</p>
              <p className="arow">👇</p>
              <div className="line"></div>
            </div>
            <p className="desc">
              {
                book?.mainData?.full_info.find((el) => el.lang == currentLang)
                  ?.text
              }
            </p>
          </div>
        </div>
      </section>}
      <section className="secondSec mb-2 mt-0 pt-2 pb-3">
        <div className="top items-center container flex justify-between">
          <h2 className="similars">{t("similarBooks")}</h2>
          <p className="view_all cursor-pointer" onClick={viewAllBooks}>
            {t("viewAll")}
          </p>
        </div>
        {!similarBooks?.length && load ? <SpinnerLoader/> : ""}
        {similarBooks?.length ? (
          <div className="books_container  mt-3 mb-5 flex-wrap  flex justify-evenly items-center">
            {similarBooks.map((el, idx) => (
              <BookCard book={el} key={idx} />
            ))}
          </div>
        ) : (
          <h1 className="text-center notFoundText">
            {t("similarBooksNotFound")} 🤔
          </h1>
        )}
      </section>
    </div>
  );
};

export default BookById;
