import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, logIn } from "../actions";

import "./sign-in.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const { usersList } = useSelector((store) => store);
  const store = useSelector((store) => store);

  const emailRef = useRef("");
  const passRef = useRef("");
  const [passErr, setPassErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const signUp = (e) => {
    console.log(store);
    e.preventDefault();
    let errText = "";
    const email = emailRef.current.value;
    const password = passRef.current.value;

    const inDB = usersList.findIndex((user) => {
      return user.email === email;
    });
    console.log(inDB);
    if (inDB >= 0 && usersList[inDB].pass === password) {
      dispatch(logIn());
      return;
    }
    if (inDB >= 0 && usersList[inDB].pass !== password) {
      setEmailErr("Пользователь уже зарегистрирован, но пароль неверный");
      return;
    }
    if (inDB < 0) {
      dispatch(addUser(email, password, usersList));
      dispatch(logIn());
      return;
    }
  };

  const checkPass = (e) => {
    setEmailErr("");
    const input = e.target.value;
    let errText = "";
    if (input.match(/[а-яА-Я]/)) {
      errText += "Пожалуйста, используйте только латинские символы.";
    }
    if (input.length < 8) {
      errText += " Пароль должен быть не короче 8 символов";
    }
    setPassErr(errText);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="layer" />
        <img src="./wing.png" alt="background" className="bg-pic" />
      </div>

      <div className="login-card">
        <h1>Simple Flight Check</h1>
        <form className="login-form" onSubmit={(e) => signUp(e)}>
          <label htmlFor="email">Логин:</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            required
          />
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            ref={passRef}
            onChange={(e) => checkPass(e)}
            type="password"
            pattern="^\w{8,}$"
            required
          />
          <span className="error-msg">{`${passErr} ${emailErr}`}</span>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}
