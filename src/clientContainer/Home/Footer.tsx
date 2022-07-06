import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import FooterLeft from "../../Images/footer_left.svg";
// import Logo from "../../Images/Logo1.svg";
// import { green } from "@mui/material/colors";
// import FootLogo from '../../Images/FootLogo.png'
// import InstagramImg from '../../Images/Group 227.png'
// import TelegramImg from '../../Images/telegram(1).png'
// import AppleImg from '../../Images/Group 240.png'
// import PlayMarketImg from '../../I/mages/Vector (4).png'
// import Photo from "../../Images/Group 56444.png"
import Brand from "../../Images/Yengilcredit.uz © 2022.png";
import Ys from "../../Images/Logo Yc.png";

const useStyles = makeStyles((theme) => ({
  Item: {
    maxWidth: "100%",
  },
  ItemButton: {
    textAlign: "center",

    "& p": {
      fontSize: "18px",
      fontWeight: 700,
      color: "#fff",
    },
    "& h3": {
      fontSize: "18px",
      fontWeight: 700,
      color: "#fff",
    },
    "& img": {
      marginRight: "15px",
    },
    "& button": {
      maxWidth: "180px",
      height: "50px",
      fontSize: "16px",
      fontWeight: 600,
      color: "#fff",
      background: "transparent",
      border: "1px solid #fff",
      borderRadius: "5px",
      padding: "0 10px",

      "& div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  footer_text: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "20px",
    color: "white",
    [theme.breakpoints.down(599)]: {
      fontSize: "16px",
      margin: 0,
      marginBottom: "19px",
    },
  },
  Ys: {
    [theme.breakpoints.down(599)]: {
      display: "none !important",
    },
  },
  Brand: {
    [theme.breakpoints.down(599)]: {
      display: "none !important",
    },
  },
  Grid: {
    display: "flex",
    justifyContent: "space-between !important",
    textAlign: "center",
    alignItems: "center",
    [theme.breakpoints.down(600)]: {
      flexDirection: "column !important",
    },
  },
}));
function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <Box style={{ background: "#065374", padding: "30px 0" }}>
      <Container maxWidth="xl">
        <Grid className={classes.Grid}>
          <Grid item xs={12}>
            <p className={classes.footer_text} style={{ textAlign: "left" }}>
              Barcha huquqlar himoyalangan
            </p>
          </Grid>
          <Grid item xs={4}>
            <div>
              <img
                src={Ys}
                style={{ marginRight: "6px" }}
                className={classes.Ys}
                alt=""
              />
              <img src={Brand} alt="" className={classes.Brand} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.footer_text} style={{ textAlign: "right" }}>
              Powered by “iTech Company”
            </p>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
