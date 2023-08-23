import React, { useContext } from 'react'
import context from '../../context'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const BookCard = ({book, author}) => {
    const [t, i18n] = useTranslation("global");
    const contextDatas = useContext(context);
    const currentMode = contextDatas.currentMode;
    const userDatas = contextDatas.userDatas;
    const navigate = useNavigate()


    
 async function changeLink(id){
    if(userDatas){
      navigate(`/books/${id}`)
    }else{
    toast.error(t('youMustRegister'))
    }
 }

  return (
    <div className='book-card flex flex-column gap-3 cursor-pointer' onClick={()=>changeLink(book?._id)}>
      <img alt={book?.title} title={book?.title} className='book_img' src={book?.img_link}/>
      <div className='body flex flex-column gap-1'>
      <h3 className={`title_book ${currentMode == 'dark' ? "text-light" : ""}`}>{book?.title}</h3>
      <p className={`author_name ${currentMode == 'dark' ? "text-light" : ""}`}>{book.author?.firstname || author?.mainData.firstname} {book.author?.lastname || author?.mainData?.lastname}</p>
      </div>
    </div>
  )
}

export default BookCard
