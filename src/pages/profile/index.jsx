import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import ProfileSection from "../../components/profile-section";
import context from "../../context";
import { toast } from "react-hot-toast";
import axios from "axios";
import SecuritySection from "../../components/security-section";
import SettingsSection from "../../components/settings-section";
import { Link } from "react-router-dom";
const Profile = () => {
  const [t, i18n] = useTranslation("global");
  const contextDatas = useContext(context);
  const currentLang = contextDatas.currentLang;
  const userDatas = contextDatas?.userDatas;
  const currentMode = contextDatas.currentMode;
  const [activeOption, setActiveOption] = useState(0);
  const [firstnameState, setFirstnameState] = useState(userDatas?.firstname);
  const [lastnameState, setLastnameState] = useState(userDatas?.lastname);
  const [phoneState, setPhoneState] = useState(userDatas?.phone);
  const [avatar, setAvatar] = useState(userDatas?.img_link);
  const [avaLoad, setAvaLoad] = useState(false);
  const [profileLoad, setProfileLoad] = useState(false)
  const [emailState, setEmailState] = useState(userDatas?.email) 
  const [passwordState, setPasswordState] = useState(userDatas?.password) 
  const [loadSecurity, setLoadSecurity] = useState(false)
  const profileOptions = [
    {
      id: 1,
      text: t("navbar.profile"),
    },
    {
      id: 2,
      text: t("security"),
    },
    {
      id: 3,
      text: t("settings"),
    },
  ];

  const editProfile = async () => {
    console.log(phoneState);
    if (!firstnameState.trim().length) {
      return toast.error(t("requiredFirstname"));
    } else if (!lastnameState.trim().length) {
      return toast.error(t("requiredLastname"));
    } else if (!phoneState.trim().length) {
      return toast.error(t("requiredPhone"));
    } else if (
        phoneState.length &&
      !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        phoneState.trim()
      )
    ) {
      return toast.error(t("invalidPhone"));
    }
    try {
        setProfileLoad(true)
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
        {
          firstname: firstnameState.trim(),
          lastname: lastnameState.trim(),
          phone: phoneState.trim(),
          img_link : avatar
        },
        {
          headers: { token: userDatas?.token },
        }
      );
      if (data.success) {
        toast.success(data.message[currentLang]);
        const token = userDatas?.token;
        localStorage.setItem("userDatas", JSON.stringify({...data.data, token }))
        location.reload()
      } else {
        toast.error(data.message[currentLang]);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
        setProfileLoad(false)
    }
  };


  const editSecurity = async()=>{
    if(!emailState.trim().length){
     return toast.error(t('requiredEmail'))
    }else if(!passwordState.trim().length){
    return toast.error(t('requiredPassword'))
    }else if(! /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(emailState.trim())){
        return toast.error(t('invalidEmail'))
    }
    try {
        setLoadSecurity(true)
        const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/security`, {
            email : emailState.trim(),
            password : passwordState.trim()
        }, {
            headers : {token : userDatas?.token}
        })
        if(data.success){
         toast.success(data.message[currentLang])
         const token = userDatas?.token;
         localStorage.setItem("userDatas", JSON.stringify({...data.data, token }))
         location.reload()
        }else{
          toast.error(data.message[currentLang])
        }
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoadSecurity(false)
    }
  }

  document.title = t("navbar.profile");

  return (
    <div className={`profile-page  page ${currentMode == 'dark' ? "dark" : ""}`}>
      <div className="top-header flex">
        {profileOptions?.map((el, idx) => (
          <div
          key={idx}
            onClick={() => setActiveOption(idx)}
            className={`flex gap-2 cursor-pointer items-center option ${
              idx == activeOption ? "active_opt" : "just"
            }`}
          >
            <button className="btn">{idx + 1}</button>
            <p className="opt_text">{el.text}</p>
          </div>
        ))}
      </div>
      <section className="m-2 section ">
        {activeOption == 0 ? (
          <ProfileSection
            firstnameState={firstnameState}
            setFirstnameState={setFirstnameState}
            lastnameState={lastnameState}
            setLastnameState={setLastnameState}
            phoneState={phoneState}
            setPhoneState={setPhoneState}
            avatar={avatar}
            setAvatar={setAvatar}
            avaLoad={avaLoad}
            setAvaLoad={setAvaLoad}
          />
        ) : (
          activeOption == 1 ? (
            <SecuritySection emailState={emailState} setEmailState={setEmailState} passwordState={passwordState} setPasswordState={setPasswordState}/>
          ) : <SettingsSection/>
        )}
        <div className="bottom w-[60%] mx-auto items-center flex justify-between">
        <Link to={'/'} className="btn to_home">{t('backToHome')}</Link>
          <button className="btn save" onClick={activeOption == 0 ?()=> editProfile() : activeOption == 1 ? ()=>editSecurity() : ()=>{}}>
            {avaLoad || profileLoad || loadSecurity ? <div className="lds-dual-ring"></div> : t("saveChanges")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
