import React, { useContext, useEffect, useState } from "react";
import context from "../../context";
import { useTranslation } from "react-i18next";
import './style.scss'
import { toast } from "react-hot-toast";
import axios from "axios";

const SearchPanel = ({option,searchState, catId, setSearchState, reloadAuthors, setAuthors}) => {
  const [t, i18n] = useTranslation("global");

const searchHandler = async(option, e)=>{
  if(e){
    e.preventDefault()
  }
  if(searchState?.trim()?.length){
    try {
     const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${option}?search=${searchState}`)
     setAuthors(data.data)
    } catch (error) {
     toast.error(error.message)
    }
  }else{
    console.log(searchState);
    reloadAuthors(catId)
  }
}

useEffect(()=>{
searchHandler(option)
}, [searchState])

  return (
    <form className="search-panel" onSubmit={(e)=>searchHandler(option, e)}>
      <h2 className="search_title">{t("search")}</h2>
    <div className="search_wrp my-3 items-center flex px-5 justify-around">
    <input onChange={e=>setSearchState(e.target.value)} type="search" onInput={e=>searchHandler(option)} onKeyUp={e=>setSearchState(e.target.value)} className="form-control p-2 w-[80%]" placeholder={option == 'books' ? t('navbar.books') : t("authors")}/>
    <button className="btn search_btn p-2 px-3">🔎 {t('search')}</button>
    </div>
      
    </form>
  );
};

export default SearchPanel;
