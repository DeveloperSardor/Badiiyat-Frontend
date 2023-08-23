import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { I18nextProvider } from 'react-i18next'

import i18next from 'i18next'
import enTranslation from './translations/en/global.json'
import uzTranslation from './translations/uz/global.json'
import ruTranslation from './translations/ru/global.json'


const currentLang =JSON.parse(localStorage.getItem('currentLang')) || "uz";

i18next.init({
  intorpalation : {escapeValue : false},
  lng : currentLang,
  resources : {
    en : {
      global : enTranslation
    },
    uz : {
      global : uzTranslation
    },
    ru : {
      global : ruTranslation
    }
  }
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
