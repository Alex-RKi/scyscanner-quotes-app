import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incFav, decFav, resetFavs } from "../actions";
import plane from "./plane.svg";
import likeOf from "./like.svg";
import likeOn from "./like-on.svg";
import arrowsm from "./arrowsm.svg";
import "./search-results.scss";

import moment from "moment";

export default function SearchResults() {
  const { flights } = useSelector((store) => store);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (flights) {
      setList(createList(flights));
    }
  }, [flights]);

  if (!flights) {
    return <div>Loading...</div>;
  }

  function createList(flights) {
    const { Quotes, Carriers, Places, Currencies } = flights;

    const params = {
      from: Places[1].CityName || "loading",
      to: Places[0].CityName || "loading",
      fromIATA: Places[1].IataCode || "loading",
      toIATA: Places[0].IataCode || "loading",
      currencySymbol: Currencies[0].Symbol || "loading",
    };

    if (!Quotes) return <div>No results to display</div>;
    const rowParams = Object.assign({}, params);

    const list = Quotes.map((quote) => {
      //price
      rowParams.price = quote.MinPrice || "no data";
      // time
      const timestamp = quote.OutboundLeg.DepartureDate;
      rowParams.departure = moment(timestamp).format("Do MMM, YYYY - h:mm");
      //carrier name
      const carrierId = quote.OutboundLeg.CarrierIds[0];
      const carrierData = Carriers.find((carrier) => {
        return carrier.CarrierId === carrierId;
      });
      rowParams.carrierName = carrierData.Name;
      //---
      return <Row {...rowParams} key={quote.QuoteId} />;
    });
    return list;
  }

  return <>{list}</>;
}

const Row = ({
  from,
  to,
  fromIATA,
  toIATA,
  currencySymbol,
  departure,
  price,
  carrierName,
}) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const { favorits } = useSelector((store) => store);
  const formatedPrice = Intl.NumberFormat("ru-RU").format(price);

  useEffect(() => {
    dispatch(resetFavs());
  }, []);
  const handleLike = () => {
    if (liked) {
      favorits > 0 ? dispatch(decFav()) : console.log("can't be below zero!");
      setLiked(false);
    } else {
      dispatch(incFav());
      setLiked(true);
    }
  };
  return (
    <>
      <li className="list__elem">
        <div className="container">
          <div className="quote">
            <div className="quote__icon">
              <img className="plane-icon" src={plane} alt="plane icon" />
            </div>
            <div className="quote__details flight">
              <div className="flight__path">
                {`${from} (${fromIATA})   `}
                <span className="ico-container">
                  <img
                    className="arrowsm-ico"
                    src={arrowsm}
                    alt="arrow icon small"
                  />
                </span>{" "}
                {`${to} ${toIATA}`}
              </div>
              <div className="flight__time">{`   ${departure}`}</div>
              <div className="flight__carrier">{`${carrierName}`}</div>
            </div>
          </div>

          <div className="price">
            <button className="price__like-button" onClick={handleLike}>
              <img
                className="like-icon"
                src={liked ? likeOn : likeOf}
                alt="like button"
              />
            </button>
            <div className="price__amount">
              <span className="w">Price: </span>
              {`${formatedPrice} ${currencySymbol}`}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
