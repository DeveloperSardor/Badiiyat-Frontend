import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import context from '../../context'
import './style.scss'

const SettingsSection = () => {
  const [t, i18n] = useTranslation('global')
  const contextDatas = useContext(context);
  const setCurrentMode = contextDatas.setCurrentMode;
  const currentLang = contextDatas.currentLang;
  const modeRef =useRef()
  const currentMode = contextDatas?.currentMode;
  const langs = [
    {
      text : "English",
      lang : "en"
    },
    {
      text : "Russian",
      lang : 'ru'
    },
    {
      text : "O'zbekcha",
      lang : 'uz'
    }
  ]

  const activeLang = langs.find((el, idx)=>{
    return el.lang == currentLang
  })

  const changeLangHandler = (lang)=>{
    i18n.changeLanguage(lang)
    localStorage.setItem('currentLang', JSON.stringify(lang))
  }

  
const changeModeHandler = ()=>{
  if(currentMode == 'light'){
    setCurrentMode('dark')
    modeRef.current.classList.add('active')
    document.body.classList.add('bg-darkk')
    document.body.classList.add('text-light')
    localStorage.setItem('theme', 'dark')
  }else{
    setCurrentMode('light')
    modeRef.current.classList.remove('active')
    document.body.classList.remove('bg-darkk')
    document.body.classList.remove('text-light')
    localStorage.setItem('theme', 'light')
  }
}

  return (
    <div className='settings border-bottom mt-2 mb-5  w-[60%] mt-2 py-3 pb-4  flex flex-column gap-4 mx-auto'>
      <h1 className='heading'>{t('settings')}</h1>
      <div className='inputs flex flex-column gap-4'>
        <label className='flex flex-column gap-2'>
          {t('language')}
          <select className='form-select' onChange={e=>changeLangHandler(e.target.value)} defaultValue={activeLang.lang}>
          {langs.map((el, idx)=>(
            <option key={idx} value={el.lang}>{el.text}</option>
          ))}
          </select>
        </label>
        <label className='flex flex-column gap-2'>
          {t('theme')}
          <div ref={modeRef} onClick={()=>changeModeHandler()} className={`mode_btn ${currentMode == 'light' ? "" : "active"}`}></div>
        </label>
      </div>
    </div>
  )
}

export default SettingsSection
