import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import lockImg from ".././Images/lock.png";
import { getToken } from "../Api/admin/AdminAuth";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { RouteComponentProps } from "react-router";
// const currency = React.useContext();

// type SomeComponentProps = RouteComponentProps;

const useStyles = makeStyles({
  pageStyle: {
    position: "relative",
    background:
      "linear-gradient(227.49deg, rgba(255, 95, 0, 0.2) 3.4%, rgba(113, 149, 161, 0.2) 98.27%), linear-gradient(132.76deg, rgba(6, 83, 116, 0.78) 4.12%, rgba(6, 83, 116, 0.68) 53.94%, rgba(6, 83, 116, 0.68) 93.25%)",
    height: "100vh",
  },
  loginBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: "50px",
    transform: "translate(-50%, -50%)",
    background:
      "linear-gradient(114.91deg, rgba(172, 212, 219, 0.44) 11.44%, rgba(119, 188, 200, 0.1452) 65.01%, rgba(193, 220, 224, 0.308) 90.26%)",
    borderRadius: "22px",
  },
  lockImg: {
    position: "absolute",
    top: "-12%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "100px",
    background: "#065374",
    borderRadius: "25px",

    "& img": {
      width: "50px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  loginInput: {
    maxWidth: "100%",
    padding: "15px 170px 12px 25px",
    borderRadius: "12px",
    border: "none",
    marginBottom: "30px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      fontSize: "18px",
      color: "#065374",
    },
  },
  loginButton: {
    width: "100%",
    height: "45px",
    background: "#065374",
    border: "none",
    borderRadius: "12px",
    fontSize: "22px",
    fontWeight: "500",
    color: "#E0E0E0",
    cursor: "pointer",
    fontFamily: "Poppins",
    padding: "8px 12px",
  },
});

const LoginPage = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [auth, setAuth] = useState<any>("");

  const handleChangeUsername = (e: any) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  // console.log(userName, password);

  let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = "/dashboard";
    
  // };

  const login = {
    username: userName,
    password: password,
  };

  const navigateTo = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const sendDataToApi = async () => {
    await getToken(login)
      .then((res: any) => {
        let token = res.data.split(":")[1];
        localStorage.setItem("auth", token);
        setAuth(token);
      });
    navigateTo();
  };

  return (
    <div className={classes.pageStyle}>
      <div className={classes.loginBox}>
        <div className={classes.lockImg}>
          <img src={lockImg} alt="" />
        </div>
        <form
          style={{ marginTop: "50px" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <input
              type="text"
              name=""
              className={classes.loginInput}
              placeholder="Username"
              onChange={handleChangeUsername}
            />
          </div>
          <div>
            <input
              type="Password"
              name=""
              className={classes.loginInput}
              placeholder="Parol"
              onChange={handleChangePassword}
            />
          </div>
          <button className={classes.loginButton} onClick={sendDataToApi}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;