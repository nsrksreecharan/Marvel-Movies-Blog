import { useState, useEffect, useContext, useMemo } from "react";
import Cookies from "js-cookie";
import MovieCard from "../components/MovieCard";
import Navigator from "../components/Navigator";
import ThemeContext from "../context/ThemeContext";
import { BsSearch } from "react-icons/bs";
import { useGetAllMoviesQuery } from "../redux/apis/moviesApi";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

export const rupeeConversionRates = {
  2008: 43.15, 2009: 48.41, 2010: 45.73, 2011: 46.67,
  2012: 53.44, 2013: 56.57, 2014: 62.33, 2015: 62.97,
  2016: 66.46, 2017: 67.79, 2018: 70.09, 2019: 70.39,
  2020: 76.38, 2021: 74.57, 2022: 81.35,
};

export const convert = (amount, year) => {
  debugger
    const rate = rupeeConversionRates[Number(year)] || 1;
    return Math.ceil((Number(amount) * rate) / 10000000);
};

const Movies = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading,setLoading]=useState(true);
  const [search, setSearch] = useState("");
  const [dataSet, setDataSet] = useState(false);
  const [success, setSuccess] = useState(false);

  const {data:allMovies,error,isLoading}=useGetAllMoviesQuery();

  const user = useSelector((state)=>state.user);
  const dark=useMemo(()=> user?.theme==="dark",[user]);
  const nav=useMemo(()=>user?.nav,[user]);

  useEffect(() => {
    if(allMovies?.movies){
      setInitialData(allMovies?.movies);
      setFilteredData(allMovies?.movies);
      setData(allMovies?.movies);
      setLoading(false);
    }else if(error) {
      setSuccess(false);
      setLoading(false);
    }
  }, [allMovies]);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const SearchName = () => {
    if (search === "") {
      setData(initialData);
    } else {
      const modified = initialData.filter((i) =>
        i.film.toLowerCase().includes(search.toLowerCase())
      );
      setData(modified);
    }
  };

  const filterByHero = (hero) => {
    const heroMap = {
      cap: "America",
      ironMan: "Iron",
      capM: "Marvel",
      hulk: "Hulk",
      thor: "Thor",
      spider: "Spider",
      strange: "Strange",
      galaxy: "Galaxy",
      widow: "Widow",
      Ant: "Ant",
      panther: "Panther",
      avengers: "Avengers",
      shi: "Shang",
      eternals: "Eternals",
    };

    const keyword = heroMap[hero] || "";
    const modified = initialData.filter((i) => i.film.includes(keyword));
    setData(modified);
    setFilteredData(modified);
    setDataSet(false);
  };

  

  const sortByBudget = (order) => {
    const source = filteredData.length ? [...filteredData] : [...initialData];
    if (order === "low" || order === "high") {
      source.sort((a, b) => {
        const yearA = new Date(a.date).getFullYear();
        const yearB = new Date(b.date).getFullYear();
        const aBudget = convert(a.budget, yearA);
        const bBudget = convert(b.budget, yearB);
        return order === "low" ? aBudget - bBudget : bBudget - aBudget;
      });
      setData(source);
      setDataSet(false);
    } else {
      setData(filteredData);
      setDataSet(false);
    }
  };

  const sortByCollection = (order) => {
    const source = filteredData.length ? [...filteredData] : [...initialData];
    if (order === "low1" || order === "high1") {
      source.sort((a, b) => {
        const yearA = new Date(a.date).getFullYear();
        const yearB = new Date(b.date).getFullYear();
        const aCol = convert(a.movie_collection, yearA);
        const bCol = convert(b.movie_collection, yearB);
        return order === "low1" ? aCol - bCol : bCol - aCol;
      });
      setData(source);
      setDataSet(false);
    } else {
      setData(filteredData);
      setDataSet(false);
    }
  };

  const setToDefaultData = () => {
    setData(initialData);
    setDataSet(true);
  };

  const renderLoader = () => (
    <div className={`${nav ? "MoviesWithNav" : ""} MoviesNavContainer`}>
      <div className={`${dark ? "blackMovies" : ""} loadingContainer1`}>
        <TailSpin color="blue"/>
      </div>
    </div>
    );
    
  if(loading) return renderLoader();
  return (
    <div className={`${nav ? "MoviesWithNav" : ""} MoviesNavContainer`}>
      <div className={`${dark ? "blackMovies" : ""} Movies`}>
        <div className="searchContainer">
          <div className="SearchBox">
            <input
              autocomplete="off"
              type="search"
              className="search"
              value={search}
              onChange={updateSearch}
              placeholder="Search"
            />
            <button type="button" onClick={SearchName} className="searchButton">
              <BsSearch />
            </button>
          </div>
        </div>
        <div className="MoviesContainer">
          {data.map((i) => (
            <MovieCard key={i.movieId} itemDetails={i} />
          ))}
        </div>
      </div>

      {nav && data.length ? (
        <div className={`${dark ? "darkNavigator" : "Navigator"}`}>
          <Navigator
            filterByHero={filterByHero}
            sortByBudget={sortByBudget}
            sortByCollection={sortByCollection}
          />
        </div>
      ) : dataSet ? null : setToDefaultData()}
    </div>
  );
};

export default Movies;
