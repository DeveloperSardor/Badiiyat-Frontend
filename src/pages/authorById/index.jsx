import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./style.scss";
import context from "../../context";
import { useTranslation } from "react-i18next";
import BookCard from "../../components/book-card";
import SpinnerLoader from "../../components/loader";
const AuthorById = () => {
  const [t, i18n] = useTranslation("global");
  const contextDatas = useContext(context);
  const currentLang = contextDatas.currentLang;
  const { id } = useParams();
  const [load, setLoad] = useState(false)
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([])
  
  document.title = author?.mainData?.firstname + " " + author?.mainData?.lastname
  
  async function getAuthorById() {
    try {
      setLoad(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/authors/${id}`
        );
        setAuthor(data.data);
        setAuthorBooks(data.data?.authorBooks?.slice(0, 4))
      } catch (error) {
        toast.error(error.message);
      }finally{
        setLoad(false)
      }
    }
    useEffect(() => {
      getAuthorById();
    }, []);
    
function viewAllBooks(){
    if(authorBooks?.length == 4){
        setAuthorBooks(author?.authorBooks)
    }else{
        setAuthorBooks(author?.authorBooks?.slice(0, 4))
    }
}

  function convertDate(dateString) {
    const date = new Date(dateString); // Ma'lumotni JavaScript Date obyektiga aylantirish

    // Sana tarkibidagi ma'lumotlarni olish
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    // Formatni o'zgartirish va natijani qaytarish
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="authorByID_page">
      <section className="mt-2 firtsSec flex ps-3 pb-5">
        <div className="left ">
          <img src={author?.mainData.img_link} alt="photo" />
        </div>
        <div className="right">
          <h1 className="name_author">
            {author?.mainData?.firstname} {author?.mainData?.lastname}
          </h1>
          <p className="desc_auth">
            {author?.mainData?.bio.find((el) => el.lang == currentLang).text}
          </p>
          <div className="dates mt-4 my-2 w-[55%] flex gap-4 items-center">
            <div className="flex flex-column gap-1">
              <p className="text">{t("dateOfBirth")}</p>
              <p className="date_a">
                {convertDate(author?.mainData?.date_of_birth)}
              </p>
              <p className="text">{author?.mainData?.country}</p>
            </div>
            <div className="flex">
              <p className="line">-</p>
            </div>
            <div className="flex flex-column gap-1">
              <p className="text">{t("dateOfDeath")}</p>
              <p className="date_a">
                {convertDate(author?.mainData?.date_of_death)}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="secondSec mb-2 mt-0  pt-2 pb-3">
        <div className="top items-center container flex justify-between">
          <h2 className="works">{t("authorBooks")}</h2>
          <p className="view_all cursor-pointer" onClick={viewAllBooks}>{t("viewAll")}</p>
        </div>
        {author == null && load ? <SpinnerLoader/> : ""}
        {author?.authorBooks?.length ? (
          <div className="books_container mt-3 mb-5 flex-wrap  flex justify-evenly items-center">
            {authorBooks?.map((el, idx) => (
              <BookCard book={el} author={author} key={idx} />
        ))}
          </div>
        ) : (
          <h1 className="text-center notFoundText">
            {t("authorWorksNotFound")} 🤔
          </h1>
        )}
      </section>
    </div>
  );
};

export default AuthorById;
