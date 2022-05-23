// import React from "react";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   pageStyle: {
//     background: "#065374",
//     height: "100vh",
//   },
//   forSpan: {},
//   loginBox: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     width: "400px",
//     padding: "40px",
//     transform: "translate(-50%, -50%)",
//     background: "rgba(0,0,0,.5)",
//     boxSizing: "border-box",
//     boxShadow: "0 15px 25px rgba(0,0,0,.6)",
//     borderRadius: "10px",
//     h2: {
//       margin: "0 0 30px",
//       padding: "0",
//       color: "#fff",
//       textAlign: "center !important",
//     },
//   },
//   //   userBox: {
//   //     position: "relative",
//   //     input: {
//   //         width: "100%",
//   //         padding: "10px 0",
//   //         fontSize: "16px",
//   //         color: "#fff",
//   //         marginBottom: "30px",
//   //         border: "none",
//   //         borderBottom: "1px solid #fff",
//   //         outline: "none",
//   //         background: "transparent"
//   //     },
//   //     label: {
//   //         position: "absolute",
//   //         top:"0",
//   //         left: "0",
//   //         padding: "10px 0",
//   //         fontSize: "16px",
//   //         color: "#fff",
//   //         pointerEvents: "none",
//   //         tran   sition: ".5s"
//   //     }
//   //   },
//   loginTitle: {
//     color: "#fff",
//     textAlign: "center",
//     fontFamily: "Poppins",
//   },
//   loginInput: {
//     border: "none",
//     "&:focus": {
//       outline: "none",
//     },
//     "&::placeholder": {
//       fontFamily: "Poppins",
//     },
//     display: "block",
//     margin: "auto",
//     marginBottom: "10px",
//     padding: "10px 15px",
//     fontFamily: "Poppins",
//     borderRadius: "5px",
//     color: "#565656",
//   },
//   loginButton: {
//     borderRadius: "5px",
//     border: "none",
//     padding: "8px 15px",
//     // display: "block",
//     // margin: "auto",
//     textAlign: "left",
//     fontFamily: "Poppins",
//     color: "#565656",
//     cursor: "pointer",
//     marginLeft: "16px"
//   },
// });

// const LoginPage = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.pageStyle}>
//       <div className={classes.loginBox}>
//         <h2 className={classes.loginTitle}>Login</h2>
//         <form>
//           <div>
//             <input
//               type="text"
//               name=""
//               className={classes.loginInput}
//               placeholder="Username"
//             />
//             {/* <label>Username</label> */}
//           </div>
//           <div>
//             <input
//               type="password"
//               name=""
//               className={classes.loginInput}
//               placeholder="Parol"
//             />
//             {/* <label>Password</label> */}
//           </div>
//           <button className={classes.loginButton}>Kirish</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";

type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data: any) => {
    let params = {
      username: data.email,
      password: data.password,
    };
    axios
      .post("https://api.yengilcredit.uz/security/login", params)
      .then(function (response) {
        //   IF EMAIL ALREADY EXISTS
        if (response.data.success === false) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          console.log(response)
          let str =""
          str = response.data

          let token = str.split(":")[1]
          localStorage.setItem("auth", token);
          setTimeout(() => {
            history.push("/");
          }, 3000);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3" style={{ maxWidth: "320px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Login Form
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="exampleFormControlInput1"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
               
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};
export default Login;
