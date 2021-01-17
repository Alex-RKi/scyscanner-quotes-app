import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadData, logOut } from "../actions";
import moment from "moment";

import "./flights-browser.scss";
import arrow from "./arrow.svg";
import logout from "./logout.svg";

import SwiperUnfixed from "../swiper/swiper";
import SearchResults from "../search-data/search-results";
//api
import { getURL } from "../API.data";

//hardcoded data for API
const from = "SVO-sky"; // originplace
const to = "JFK-sky"; //destinationplace
//const date = '2021-01-17' //get from input

export default function FlightsBrowser() {
  const dispatch = useDispatch();

  let today = moment().format("YYYY-MM-DD");
  const currentTime = new Date();
  if (currentTime.getHours() > 21) {
    const newTimestamp = currentTime.setDate(currentTime.getDate() + 1);
    today = moment(newTimestamp).format("YYYY-MM-DD");
  }
  const dateRef = useRef("");
  const { favorits } = useSelector((store) => store);

  const [searchDate, setSearchDate] = useState(today);

  useEffect(() => {
    const url = getURL(from, to, searchDate);
    dispatch(loadData(url)); //saga action
  }, [searchDate]);

  const exit = () => {
    dispatch(logOut());
  };
  const trackDate = () => {
    const newDate = dateRef.current.value;
    setSearchDate(newDate);
  };
  const displayFrom = from.slice(0, 3);
  const displayTo = to.slice(0, 3);

  return (
    <div className="page">
      <button className="btn-logout" onClick={exit}>
        <div>Выйти</div>
        <img className="logout-icon" src={logout} alt="log-out button"></img>
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
              {`${displayFrom} - ${displayTo}`}
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
