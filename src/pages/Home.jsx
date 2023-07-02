import React from "react";
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import Pagination from "../Components/Pagination/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({name: "популярности",sort: "rating",});
  const order = sortType.sort.includes("-") ? "asc" : "desc";
  const skeletons = [...new Array(6)].map((_, index) => (<Skeleton key={index} />));
  const sortBy = sortType.sort.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";
  const [currentPage, setCurrentPage] = React.useState(1)

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://649299ad428c3d2035d05219.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
