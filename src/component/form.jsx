import React from "react";
import "../file.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const [Input, setInput] = useState({
    mail: "",
    passWord: "",
    passWord1: "",
    suscribe: false,
  });

  const mailWarning = document.querySelector(".mail-warning");
  const validate_Mail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setInput((prevInputs) => {
      return { ...prevInputs, [name]: type === "checkbox" ? checked : value };
    });

    if (!Input.mail.match(validate_Mail)) {
      mailWarning.classList.remove("hidden");
      mailWarning.innerText = "Correct mail format is example@mail.com";
    }
  };

  const notify = () =>
    toast.success("Signup was successful", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(Input);

    const mail = document.querySelector(".mail");
    const password1 = document.querySelector(".password1");
    const password2 = document.querySelector(".password2");
    const passwordWarning = document.querySelectorAll(".password-warning");
    const chekbox_Div = document.querySelector(".check-container");
    const checkWarning = document.querySelector(".check-warning");
    const submit_btn = document.querySelector(".button");

    if (!Input.mail.match(validate_Mail)) {
      mail.classList.add("outline");
      mailWarning.classList.remove("hidden");
    } else {
      mail.classList.remove("outline");
      mailWarning.classList.add("hidden");
    }

    if (Input.passWord !== Input.passWord1) {
      password1.classList.add("outline");
      password2.classList.add("outline");
      passwordWarning.forEach((el) => el.classList.remove("hidden"));
    } else {
      password1.classList.remove("outline");
      password2.classList.remove("outline");
      passwordWarning.forEach((el) => el.classList.add("hidden"));
    }

    if (Input.suscribe === false) {
      chekbox_Div.classList.add("outline");
      checkWarning.classList.remove("hidden");
    } else {
      chekbox_Div.classList.remove("outline");
      checkWarning.classList.add("hidden");
    }

    if (
      Input.mail.match(validate_Mail) &&
      Input.suscribe &&
      Input.passWord1 === Input.passWord
    ) {
      document.querySelector(".suscribed").classList.remove("hidden");
      submit_btn.disabled = true;
      submit_btn.classList.add("disabled");
      notify();
    } else {
      document.querySelector(".suscribed").classList.add("hidden");
    }
  };

  return (
    <main className="main-container container-fluid">
      <div className="form-container container d-flex align-items-center">
        <form
          onSubmit={handleSubmit}
          className="form container-fluid d-flex flex-column align-items-center justify-content-center"
        >
          <div className="container d-flex justify-contents-center flex-column">
            <h1 className="text-center">HELLO</h1>
            <small className="text-center">Sign up to get amazing offers</small>
          </div>
          <div className="input-field-general container d-flex flex-column align-items-center justify-contents-center">
            <div className="mail-field d-flex flex-column">
              <input
                className="field mail"
                type="email"
                name="mail"
                placeholder="E-mail"
                value={Input.mail}
                onChange={handleChange}
              />
              <p className="mail-warning text-danger hidden">Invalid Mail</p>
            </div>

            <div className="password-con d-flex flex-column">
              <input
                className="field password1"
                type="password"
                name="passWord"
                placeholder="Password"
                value={Input.passWord}
                onChange={handleChange}
              />
              <p className="password-warning text-danger hidden">
                Password Mismatch
              </p>

              <input
                className="field password2"
                type="password"
                name="passWord1"
                placeholder="Confirm Password"
                value={Input.passWord1}
                onChange={handleChange}
              />
              <p className="password-warning text-danger hidden">
                Password Mismatch
              </p>
            </div>
            <div className="d-flex flex-column my-4 justify-content-center align-items-center check-container">
              <div className="d-flex">
                <input
                  type="checkbox"
                  name="suscribe"
                  checked={Input.suscribe}
                  id="suscribe"
                  onChange={handleChange}
                />
                <label className="check-label ms-2" htmlFor="suscribe">
                  I want to join the newsletter
                </label>
              </div>
              <p className="text-danger check-warning hidden">Required Field</p>
              <small className="bg-success suscribed hidden">
                Successfully subscribed to our newsletter ✔
              </small>
            </div>
            <button className="button">Signup</button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </main>
  );
}
