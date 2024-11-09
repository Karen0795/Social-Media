import React, { useEffect } from "react";
import "./LoginPage.css";
import Logo from "../../components/Img/Logo.jpeg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/UserSlice";
import main from "../../components/Img/main.mp4";
const LoginPage = () => {
  const { User_Data, Loged_User_Data } = useSelector(selectUser);
  const navigate = useNavigate();

  if (Loged_User_Data.length !== 0) {
    navigate("/profile");
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const [Login] = e.target;
    const result = User_Data.find((el) => el.Login === Login.value);
    if (result) {
      await fetch("http://localhost:3005/Loged_User", {
        method: "POST",
        body: JSON.stringify(result),
      });
      navigate("/profile");
    }
    e.target.reset();
  };

  return (
    <div className="main">
      <div className="overplay"></div>

      <video src={main} autoPlay loop muted />
      <div className="LoginPage">
        <div className="Header">
          <img className="img" src={Logo} alt="Logo" />
        </div>
        <div className="LoginWindow">
          <form onSubmit={(e) => handlerSubmit(e)}>
            <input className="LoginInput" type="text" placeholder="Login" />
            <input
              className="LoginInput"
              type="password"
              placeholder="Password"
            />
            <button className="LoginButton">Enter</button>
            <p>If you dont have account </p>
            <button
              className="CreateAccount"
              onClick={() => {
                navigate("/");
              }}
            >
              Create new Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
