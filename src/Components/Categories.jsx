import React, { useState } from "react";

function Categories({ value, onChangeCategory }) {
  const [categories, setCategorie] = useState([
    "все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            className={value === i ? "active" : ""}
            onClick={() => {onChangeCategory(i);}}
          >
            {categoryName}
          </li>
        ))}
      </ul>
      <button onClick={() => setCategorie([...categories, "Арс Лол"])}>
        +
      </button>
    </div>
  );
}

export default Categories;
