import React, { useState } from "react";
import "./sign-in.css";

export default function SignIn() {
  const [passErr, setPassErr] = useState("");

  const checkInput = (e) => {
    let input = e.target.value;
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
        <form className="login-form">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            id="login"
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            required
          />
          <label htmlFor="password">Пароль:</label>
          <input
            onChange={(e) => checkInput(e)}
            type="password"
            pattern="^\w{8,}$"
            required
          />
          <div className="error-msg">{passErr}</div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}
