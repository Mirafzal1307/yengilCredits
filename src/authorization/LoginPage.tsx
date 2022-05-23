import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  pageStyle: {
    background: "#065374",
    height: "100vh",
  },
  forSpan: {},
  loginBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    padding: "40px",
    transform: "translate(-50%, -50%)",
    background: "rgba(0,0,0,.5)",
    boxSizing: "border-box",
    boxShadow: "0 15px 25px rgba(0,0,0,.6)",
    borderRadius: "10px",
    h2: {
      margin: "0 0 30px",
      padding: "0",
      color: "#fff",
      textAlign: "center !important",
    },
  },
  //   userBox: {
  //     position: "relative",
  //     input: {
  //         width: "100%",
  //         padding: "10px 0",
  //         fontSize: "16px",
  //         color: "#fff",
  //         marginBottom: "30px",
  //         border: "none",
  //         borderBottom: "1px solid #fff",
  //         outline: "none",
  //         background: "transparent"
  //     },
  //     label: {
  //         position: "absolute",
  //         top:"0",
  //         left: "0",
  //         padding: "10px 0",
  //         fontSize: "16px",
  //         color: "#fff",
  //         pointerEvents: "none",
  //         tran   sition: ".5s"
  //     }
  //   },
  loginTitle: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins",
  },
  loginInput: {
    border: "none",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      fontFamily: "Poppins",
    },
    display: "block",
    margin: "auto",
    marginBottom: "10px",
    padding: "10px 15px",
    fontFamily: "Poppins",
    borderRadius: "5px",
    color: "#565656",
  },
  loginButton: {
    borderRadius: "5px",
    border: "none",
    padding: "8px 15px",
    // display: "block",
    // margin: "auto",
    textAlign: "left",
    fontFamily: "Poppins",
    color: "#565656",
    cursor: "pointer",
    marginLeft: "16px"
  },
});

const LoginPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageStyle}>
      <div className={classes.loginBox}>
        <h2 className={classes.loginTitle}>Login</h2>
        <form>
          <div>
            <input
              type="text"
              name=""
              className={classes.loginInput}
              placeholder="Username"
            />
            {/* <label>Username</label> */}
          </div>
          <div>
            <input
              type="password"
              name=""
              className={classes.loginInput}
              placeholder="Parol"
            />
            {/* <label>Password</label> */}
          </div>
          <button className={classes.loginButton}>Kirish</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
