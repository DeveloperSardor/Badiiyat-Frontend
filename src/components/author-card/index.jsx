import React, { useContext } from 'react'
import './style.scss'
import context from '../../context'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import NaqshImg from '../../assets/images/naqsh.png'

const AuthorCard = ({author}) => {
    const [t, i18n] = useTranslation('global')
    const contextDatas = useContext(context);
    const userDatas = contextDatas.userDatas;
    const navigate = useNavigate()


    const changeLink = ()=>{
        if(userDatas){
         navigate(`authors/${author._id}`)
        }else{
            toast.error(t('youMustRegister'))
        }
    }

    const formatDate = (dateString) => {
        const dateParts = dateString.split('T')[0].split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        
        const formattedDate = `${day}.${month}.${year}`;
        return year;
      };
      
  return (
    <div className='author-card cursor-pointer  pb-3' onClick={changeLink}> 
      <img alt='author image' className='author_img' src={author?.img_link}/>
      <div className='body py-2 ps-4'>
      <h3 className='author_name'>{author.firstname} {author.lastname}</h3>
      <p className='author_date '>{formatDate(author?.date_of_birth)} - {formatDate(author?.date_of_death)}</p>
      </div>
      <div className='px-1'>
      <img src={NaqshImg} className='float-start naqsh h-[95px]'/>
      <img src={NaqshImg} className='float-end naqsh secondNaqsh h-[85px]'/>
      </div>
    </div>
  )
}

export default AuthorCard
