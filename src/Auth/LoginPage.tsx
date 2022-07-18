import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Navigate, useNavigate } from "react-router-dom";
import lockImg from "../Images/lock.png";
import AuthService from "../Api/authService";

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

function LoginPage(): JSX.Element {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const onChangeUsername = (e: any): any => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: any): any => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const handleLogin = (e: any): any => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (username.length === 0 || password.length === 0) {
      setMessage("Please enter username and password");
      setLoading(false);
    } else {
      AuthService.login(username, password)
        .then((res: any) => {
          if (res.status === 200) {
            // debugger;
            // window.location.href = "/dashboard";
            navigate("/dashboard");
            // <Navigate to="/dashboard" />;
          }
          // window.location.reload();
        })
        .catch((error: any) => {
          const resMessage: any =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            setMessage(() => resMessage);
          setLoading(false);
        });
    }
  };
  return (
    <div className={classes.pageStyle}>
      <div className={classes.loginBox}>
        <div className={classes.lockImg}>
          <img loading="lazy" src={lockImg} alt="sss" />
        </div>
        <form onSubmit={handleLogin} style={{ marginTop: "50px" }}>
          <div>
            <input
              type="text"
              name="username"
              className={classes.loginInput}
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div>
            <input
              type="Password"
              name="password"
              value={password}
              className={classes.loginInput}
              placeholder="Parol"
              onChange={onChangePassword}
            />
          </div>
          <button
            type="submit"
            className={classes.loginButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {message && <div style={{ color: "red" }}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
