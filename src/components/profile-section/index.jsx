import React, { useContext, useState } from "react";
import "./style.scss";
import axios from "axios";
import context from "../../context";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-hot-toast";
const ProfileSection = ({
  firstnameState,
  setFirstnameState,
  lastnameState,
  setLastnameState,
  phoneState,
  setPhoneState,
  avatar,
  setAvatar,
  avaLoad,
  setAvaLoad,
}) => {
  const contextDatas = useContext(context);
  const userDatas = contextDatas?.userDatas;
  const [countryPhone, setCountryPhone] = useState("uz");
  const [t, i18n] = useTranslation("global");

  const uploadAva = async (pics) => {
    console.log(pics);
    let type = pics.type.substring(pics.type.length - 3);
    if (pics && pics.type.split("/")[0] != "image") {
      return toast.error(t("invalidFile"));
    }
    if (pics && (type == "png" || "jpg" || "svg")) {
      try {
        setAvaLoad(true);
        const formDatas = new FormData();
        formDatas.append("file", pics);
        formDatas.append("upload_preset", "chat-app");
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/roadsidecoder/image/upload`,
          formDatas
        );
        setAvatar(data.url);
        toast.success("imgUpdated");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setAvaLoad(false);
      }
    }
  };

  return (
    <div className="profile_sec flex px-5 py-1 gap-4">
      <div className="left">
        <div className="photo">
          <img src={avatar} alt="avatar" />
          <label className="custom-upload">
            <span className="file-name cursor-pointer rounded-3 px-3 py-2 border text-center">
              <i className="fas fa-camera"></i>
            </span>
            <input
              className="d-none"
              type="file"
              accept="image/*"
              onChange={(e) => uploadAva(e.target.files[0])}
            />
            <b className="ms-2"></b>
          </label>
        </div>
      </div>
      <div className="right flex flex-column gap-4">
        <h2 className="title">{t("myProfile")}</h2>
        <form className="form pt-3 pb-4 border-bottom flex flex-column gap-3">
          <label className="flex flex-column gap-2">
            {t("firstname")}
            <input
              type="text"
              onChange={(e) => setFirstnameState(e.target.value)}
              defaultValue={firstnameState}
              placeholder={t("firstname")}
            />
          </label>
          <label className="flex flex-column gap-2">
            {t("lastname")}
            <input
              type="text"
              onChange={(e) => setLastnameState(e.target.value)}
              defaultValue={lastnameState}
              placeholder={t("lastname")}
            />
          </label>
          <label className="flex flex-column gap-2">
            {t("phone")}
            <PhoneInput
              value={phoneState}
              countryCodeEditable={false}
              country={countryPhone}
              placeholder={t("phone")}
              onChange={(value) => setPhoneState(value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default ProfileSection;
