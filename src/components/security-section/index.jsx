import React from "react";
import { useTranslation } from "react-i18next";
import './style.scss'
const SecuritySection = ({emailState, setEmailState, passwordState, setPasswordState}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="security mt-2 py-3 px-5 w-[65%] mx-auto">
      <h1 className="heading">{t("changeOrRecoverYourPassword")}:</h1>
      <div className="inputs mt-5 p-2 flex gap-3 flex-column">
        <label className="flex flex-column gap-2">
          {t("email")}
          <input type="email" placeholder={t('email')} defaultValue={emailState} onChange={e=>setEmailState(e.target.value)}/>
        </label>
        <label className="flex flex-column gap-2">
          {t("password")}
          <input type="text" placeholder={t('password')} defaultValue={passwordState} onChange={e=> setPasswordState(e.target.value)}/>
        </label>
      </div>
    </div>
  );
};

export default SecuritySection;
