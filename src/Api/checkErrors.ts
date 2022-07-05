import AuthService from "./authService";
import TokenService from "./tokenService";

const data = {
  refreshToken: localStorage.getItem("refreshToken"),
};
export const checkErrorOne = (message: any, status: any): any => {
  console.log(message);
  if (status === 403) {
    switch (message) {
      case "code=1":
        AuthService.getrefreshToken(data).then((res: any) => {
          console.log(res, "res");
          TokenService.removeAdmin();
          TokenService.setAdmin(res.data);
        });
        break;
      default:
        return message;
    }
  }
};
export const checkErrorTwo = (message: any, status: any): any => {
  // const mess = JSON.stringify(message);
  // const messageTwo = JSON.parse(mess);

  // console.log( typeof messageTwo);
  console.log(status, "status");

  console.log(message);
  if (status === 403) {
    switch (message) {
      case "code=2":
        window.location.href = "/login";
        break;
      default:
        return message;
    }
  }
};
export const checkErrorThree = (message: any, status: any): any => {
  // const mess = JSON.stringify(message);
  // const messageTwo = JSON.parse(mess);

  // console.log( typeof messageTwo);
  console.log(status, "status");

  console.log(message);
  if (status === 403) {
    switch (message) {
      case "code=3":
        window.location.href = "/login";
        break;
      default:
        return message;
    }
  }
};
