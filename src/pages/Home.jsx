import React from "react";
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState("");
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sort: "rating",
  });
  const order = sortType.sort.includes("-") ? "asc" : "desc";
  const sortBy = sortType.sort.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://649299ad428c3d2035d05219.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
