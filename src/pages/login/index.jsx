import React, { useContext, useRef, useState } from "react";
import "./style.scss";
import LoginImg from '../../assets/images/login.png'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import context from "../../context";

const Login = () => {
    const contextDatas = useContext(context);
    const currentLang = contextDatas.currentLang;
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [loadLogin, setLoadLogin] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value.trim().length) {
      return toast.error(t("requiredEmail"));
    } else if (!passwordRef.current.value.trim().length) {
      return toast.error(t("requiredPassword"));
    } else if (
      emailRef.current.value.length &&
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        emailRef.current.value.trim()
      )
    ) {
        return toast.error(t("invalidEmail"));
    }

    try {
        setLoadLogin(true)
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
          email : emailRef?.current.value.trim(),
          password : passwordRef.current.value.trim()  
        })
        if(data?.success){
        toast.success(data?.message[currentLang])
        localStorage.setItem('userDatas', JSON.stringify({...data?.data, token : data?.token}))
        navigate('/')
        location.reload()
        }else{
        toast.error(data?.message[currentLang])
        }
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setLoadLogin(false)
    }
  };

  return (
    <div className="login-page page">
      <div className="left flex items-center justify-center">
        <img
          alt="sign-in"
          className=""
          src={LoginImg}
        />
      </div>
      <div className="right">
        <h1 className="main_title">{t("signIn")}</h1>
        <p className="info_text">
          {t("dontHaveAccount")}{" "}
          <span onClick={() => navigate("/register")} className="sign_up_text">
            {t("signUp")}
          </span>
        </p>
        <form onSubmit={loginHandler} className="flex gap-4 py-3  my-4 flex-column">
          <div className="inputs flex flex-column gap-3">
            <input type="email" placeholder={t("email")} ref={emailRef}/>
            <input type="text" placeholder={t("password")} ref={passwordRef}/>
          </div>
          <button className="next_btn">
          {loadLogin ? <div className="lds-dual-ring"></div> : t("nextStep")}
          
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
