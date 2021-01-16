import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions";
import "./dashboard.scss";
import moment from "moment";
import arrow from "./arrow.svg";
import logout from "./logout.svg";

import SwiperUnfixed from "../swiper/swiper";
import SearchResults from "../search-data/search-results";
//api
import { getURL, getData } from "../API.data";
//hardcoded data for API
const country = "RU";
const currency = "RUB";
const lang = "ru-RU"; // API locale
const departure = "SVO-sky"; // originplace
const destination = "JFK-sky"; //destinationplace

export default function Dashboard() {
  const dispatch = useDispatch();
  const today = moment().format("YYYY-MM-DD");
  const dateRef = useRef("");
  const { favorits } = useSelector((store) => store);
  const [searchDate, setSearchDate] = useState(today);
  const [flightsData, setFlightsData] = useState({});
  const [liked, setLiked] = useState(0);
  useEffect(() => {
    const url = getURL(
      country,
      currency,
      lang,
      departure,
      destination,
      searchDate
    );
    //const data = getData(url);
  }, [searchDate]);

  const store = useSelector((store) => store);
  const exit = () => {
    dispatch(logOut());
  };
  const trackDate = () => {
    const newDate = dateRef.current.value;
    setSearchDate(newDate);
  };
  const displayDep = departure.slice(0, 3);
  const displayDest = destination.slice(0, 3);
  return (
    <div className="page">
      <button className="btn-logout" onClick={exit}>

          <div>Выйти</div>
            <img
              className="logout-icon"
              src={logout}
              alt="log-out button"
            ></img>

      </button>
      <div className="card">
        <div className="top">
          <div className="info">
            <div className="info__location">
              Вылеты{" "}
              {
                <span>
                  <img src={arrow} alt="arrow icon" />
                </span>
              }{" "}
              {`${displayDep} - ${displayDest}`}
            </div>
            <input
              className="info__calendar"
              ref={dateRef}
              type="date"
              id="calendar"
              min={today}
              value={searchDate}
              onChange={trackDate}
            />
          </div>
          <SwiperUnfixed className="swiper" />
        </div>
        <div className="favs">
          Добавлено в Избранное <span className="favs__qty">{favorits}</span>{" "}
          рейсов
        </div>
        <div className="bottom">
          <ul className="results__list">
            <SearchResults />
          </ul>
        </div>
      </div>
    </div>
  );
}
