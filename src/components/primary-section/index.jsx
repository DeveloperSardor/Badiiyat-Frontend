import React, { useEffect, useState } from "react";
import { backgroundImages } from "../../constans/datas";
import "./style.scss";
import SearchPanel from "../search-panel";

const PrimarySection = ({option,searchState, setSearchState, catId,  setAuthors, reloadAuthors}) => {
  const [activeBackimg, setActiveBackImg] = useState(0);
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
        if(activeBackimg === backgroundImages.length - 1){
            setActiveBackImg(0)
        }else{
            setActiveBackImg(activeBackimg + 1)
        }
    }, 3500);
    return ()=> clearTimeout(timer)
  }, [activeBackimg])

  return (
    <section className="primary_section p-3">
      <div
        className="first rounded-2"
        style={{
          backgroundImage: `url(${backgroundImages[activeBackimg].img})`,
        }}
      >
        <h1 className="title">{backgroundImages[activeBackimg].text}</h1>
        <div className="indicatiors-wrp">
        {backgroundImages.map((el, idx) => (
          <span
            key={idx}
            onClick={()=>setActiveBackImg(idx)}
            className={`indecators ${idx == activeBackimg ? "activ_ind" : ""}`}
          ></span>
        ))}
        </div>
      </div>
      <SearchPanel catId={catId} searchState={searchState} setSearchState={setSearchState} option={option} setAuthors={setAuthors} reloadAuthors={reloadAuthors}/>
    </section>
  );
};

export default PrimarySection;
