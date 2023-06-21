import React, { useState } from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategorie] = useState(["все",  "Мясные", "Вегетарианская", "Гриль", "Острые","Закрытые"])

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li key={i}
          className={activeIndex === i? "active" : ""} 
          onClick={() => setActiveIndex(i)}
          > 
          {value} 
          </li>
        ))}
      </ul>
      <button onClick={() => setCategorie([...categories, 'Арс Лол'])}>+</button>
    </div>
  );
}

export default Categories;
