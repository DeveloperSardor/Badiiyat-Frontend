import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import RegisterImg from '../../assets/images/register.png'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import context from "../../context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Register = () => {
  const [t, i18n] = useTranslation("global");
  const contextDatas = useContext(context);
  const currentLang = contextDatas?.currentLang;
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [countryPhone, setCountryPhone] = useState("uz");
  const [phoneState, setPhoneState] = useState("");
  const passwordRef = useRef();
  const [loadRegist, setLoadRegist] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!firstNameRef.current.value.trim().length) {
      return toast.error(t("requiredFirstname"));
    } else if (!lastNameRef.current.value.trim().length) {
      return toast.error(t("requiredLastname"));
    } else if (!phoneState.trim().length) {
      return toast.error(t("requiredPhone"));
    } else if (!emailRef.current.value.trim().length) {
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
    } else if (
      phoneState.length &&
      !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        phoneState.trim()
      )
    ) {
      return toast.error(t("invalidPhone"));
    }
    try {
      setLoadRegist(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        {
          firstname: firstNameRef.current.value.trim(),
          lastname: lastNameRef.current.value.trim(),
          phone: `+${phoneState}`,
          email: emailRef.current.value.trim(),
          password: passwordRef.current.value.trim(),
        }
      );
      console.log(data.message[currentLang]);
      if (!data?.success) {
        toast.error(data?.message[currentLang]);
      } else {
        toast.success(data?.message[currentLang]);
        localStorage.setItem(
          "userDatas",
          JSON.stringify({ ...data?.data, token: data?.token })
        );
        navigate("/");
        location.reload()
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadRegist(false);
    }
  };

  return (
    <div className="register-page page">
      <div className="left flex items-center justify-center">
        <img src={RegisterImg} alt="register"/>
      </div>
      <div className="right">
        <h1 className="main_title">{t("signUp")}</h1>
        <p className="info_text">
          {t("alreadyHaveAccount")}
          <span onClick={() => navigate("/login")} className="sign_up_text">
            {t("signIn")}
          </span>
        </p>
        <form
          className="flex gap-4 py-3  my-4 flex-column"
          onSubmit={registerHandler}
        >
          <div className="inputs flex flex-column gap-3">
            <input
              type="text"
              placeholder={t("firstname")}
              ref={firstNameRef}
            />
            <input type="text" placeholder={t("lastname")} ref={lastNameRef} />
            <PhoneInput
              countryCodeEditable={false}
              country={countryPhone}
              placeholder={t("phone")}
              onChange={(value) => setPhoneState(value)}
            />
            <input type="email" placeholder={t("email")} ref={emailRef} />
            <input type="text" placeholder={t("password")} ref={passwordRef} />
          </div>
          <button className="next_btn">
            {loadRegist ? <div className="lds-dual-ring"></div> : t("nextStep")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
