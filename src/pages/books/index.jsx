import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PrimarySection from "../../components/primary-section";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import CategoryButton from "../../components/category-button";
import "./style.scss";
import SpinnerLoader from "../../components/loader";
import BookCard from "../../components/book-card";
import context from "../../context";
import { useNavigate } from "react-router-dom";
 

const Books = () => {
    const [t, i18n] = useTranslation("global");
  document.title = t('navbar.books')
    const [activeCat, setActiveCat] = useState(0);
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([])
    const [loadBooks, setLoadBooks] = useState(false)
    const [loadCat, setLoadCat] = useState(false)
    const [searchState, setSearchState] = useState('')

    async function getCategories() {
        try {
          setLoadCat(true)
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/categories`
            );
            setCategories(data.data);
          } catch (error) {
            toast.error(error.message);
          }finally{
            setLoadCat(true)
          }
      }


      async function getBooks(catId) {
        try {
          setLoadBooks(true)
          const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books?category=${catId}`)
          setBooks(data.data)
        } catch (error) {
          toast.error(error.message)
        }
        finally{
          setLoadBooks(false)
        }
      }

      useEffect(()=>{
       getCategories()
      }, [])

      useEffect(()=>{
        const catId = categories[activeCat]?._id;
        getBooks(catId)
      }, [categories, activeCat])
    
  return (
    <div className='books-page page'>
     <PrimarySection
      option={'books'}
      catId={categories[activeCat]?._id}
      searchState={searchState}
      setSearchState={setSearchState}
      setAuthors={setBooks}
      reloadAuthors={getBooks}
     />
     <section className="p-3 mainCSec">
     <h1 className="text-center main_title">{t("mainCategories")}</h1>
     <div className="btn-group w-75 mx-auto  flex justify-around mt-3 flex-wrap">
          {!categories?.length && loadCat ? <SpinnerLoader /> : ""}
          {categories?.map((el, idx) => (
            <CategoryButton
              category={el}
              setActive={setActiveCat}
              activeCat={activeCat}
              idx={idx}
              key={idx}
            />
          ))}
        </div>
        {loadBooks && <SpinnerLoader/>}
        {!loadBooks && (
            <div className="books_wrp flex items-center flex-wrap justify-around">
                {books?.map((el, idx)=>(
                    <BookCard key={idx} book={el} author={el.author}/>
                ))}
            </div>
        )}

        {!books?.length && (
            <h1 className="text-center notFoundText">{t("notFoundBooks")}🤔</h1>
        )}
     </section>
    </div>
  )
}

export default Books
