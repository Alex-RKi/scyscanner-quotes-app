import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incFav, decFav, resetFavs } from "../actions";
import plane from "./plane.svg";
import likeOf from "./like.svg";
import likeOn from "./like-on.svg";

import "./search-results.scss";

export default function SearchResults() {
  return (
    <>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </>
  );
}
const Row = () => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const { favorits } = useSelector((store) => store);

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
            <div className="quote__details">Details here</div>
          </div>

          <div className="price">
            <button className="price__like-button" onClick={handleLike}>
              <img
                className="like-icon"
                src={liked ? likeOn : likeOf}
                alt="like button"
              />
            </button>
            <div className="price__amount"> 00 000 ₽</div>
          </div>
        </div>
      </li>
    </>
  );
};
