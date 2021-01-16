import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions";
import "./dashboard.css";

import moment from "moment";
import arrow from "./arrow.svg";
import SwiperUnfixed from "../swiper/swiper";

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
    const data = getData(url);
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
      <button onClick={exit}>Выйти</button>
      <div className="card">
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
        <div className="favorited">`Добавлено в Избранное ${1} рейсов`</div>
        <div>res</div>
      </div>
    </div>
  );
}
