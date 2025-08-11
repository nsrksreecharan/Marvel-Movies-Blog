import { useState, useEffect, useContext, useMemo } from "react";
import Cookies from "js-cookie";
import Slider from "react-slick";

import ThemeContext from "../context/ThemeContext";
import MovieItem from "../components/MovieItem";
import Footer from "../components/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useGetTopMoviesQuery } from "../redux/apis/moviesApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(true);
  const user = useSelector((state)=>state.user);
  const dark=useMemo(()=> user?.theme==="dark",[user]);
  const {data:mostLikedMovies}=useGetTopMoviesQuery({sortBy:"likes",limit:5,page:1});
  debugger
  useEffect(() => {
    if(mostLikedMovies?.movies?.length){
      const movies = mostLikedMovies?.movies;
      setData(movies);
    } else {
        setSuccess(false);
    }
  }, [mostLikedMovies]);

  const settings = {
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    scroll: true,
  };

  return (
    <>
      <div className={`${dark ? "blackHome" : ""} Home`}>
        <div className="Banner">
          <div className="Banner1">
            <h1 className="BannerTitle">
              Welcome, Here you can Know About Different Marvel Movies. Also, You can Add Like Comment to your Favorite Marvel Movie
            </h1>
          </div>
        </div>
        <div className={`${dark ? "blackSlick" : ""} SlickContainer`}>
          <div className="SlickHeader">
            <h1>Most Liked Movies</h1>
            <Link to="/movies" style={{ textDecoration: "none", color: "inherit" }}>
              <button className="moviesButton">Movies</button>
            </Link>
          </div>
          <div className="ReactSlickContainer">
            <Slider {...settings} className="slider">
              {data.map((i) => (
                <MovieItem key={i._id} itemDetails={i} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
