import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const exit = () => {
    dispatch(logOut());
  };
  const store = useSelector((store) => store);
  console.log(store);
  return (
    <div>
      Dashboard
      <button onClick={exit}>Выйти</button>
    </div>
  );
}
