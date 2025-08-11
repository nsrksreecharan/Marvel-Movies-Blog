import { AiFillStar, AiFillLike } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import ThemeContext from "../context/ThemeContext";

import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";

const MovieCard = ({ itemDetails }) => {
  const { poster, film, likes, rating, budget, movie_collection, date ,movieId} = itemDetails;
  debugger
  const user = useSelector((state)=>state.user);
  const dark=useMemo(()=> user?.theme==="dark",[user]);

  const year = new Date(date).getFullYear();

  let rupee = 1; // Default to 1 in case year doesn't match
  const rupeeByYear = {
    2008: 43.15,
    2009: 48.41,
    2010: 45.73,
    2011: 46.67,
    2012: 53.44,
    2013: 56.57,
    2014: 62.33,
    2015: 62.97,
    2016: 66.46,
    2017: 67.79,
    2018: 70.09,
    2019: 70.39,
    2020: 76.38,
    2021: 74.57,
    2022: 81.35
  };

  rupee = rupeeByYear[year] || 1;

  const spend = Math.ceil((budget * rupee) / 10000000); // Crores
  const profit = Math.ceil((movie_collection * rupee) / 10000000); // Crores

  return (
    <Link to={`/movies/${movieId}`} style={{ color: "inherit", textDecoration: "none" }}>
      <div className={`${dark ? "blackMovieCardContainer" : ""} MovieCardContainer`}>
        <p className="CardName">{film}</p>
        <img src={poster} alt="poster" className="poster" />
        <div className="bottomLineCard">
          <div className="BottomBox">
            <p className="BudgetName">Budget</p>
            <p className="Amount">
              <GiMoneyStack className="cash" /> {spend} Crs
            </p>
          </div>
          <div className="BottomBox">
            <p className="year">{year}</p>
          </div>
          <div className="BottomBox">
            <p className="BudgetName">Collection</p>
            <p className="Amount">
              <HiOutlineCurrencyRupee className="rupee" /> {profit} Crs
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
