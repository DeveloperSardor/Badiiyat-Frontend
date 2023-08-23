import React, { useEffect, useState } from "react";
import './style.scss'
const CategoryButton = ({category, setActive, idx, activeCat}) => {
  

  return( 
  
   <button onClick={()=>setActive(idx)} className={`category ${idx == activeCat ? "active_cat" : ""}`}>
    {category.category}
   </button>
  )
};

export default CategoryButton;
