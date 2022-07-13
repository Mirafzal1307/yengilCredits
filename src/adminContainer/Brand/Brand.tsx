import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import BrandCreate from "./BrandCreate";
import BrandRead from "./BrandRead";

const useStyles = makeStyles({
  title: {
    fontFamily: "Poppins",
    fontSize: "28px",
    fontWeight: 600,
  },
  bigFirstBox: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    padding: "40px 40px 330px 42px",
  },
  itemBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  boxFirstTitle: {
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
  },
  boxSecondTitle: {
    color: "#464646",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
    marginLeft: "auto",
  },
  forBoxInput: {
    padding: "8px 20px 9px 15px",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    border: "2px solid #9F9F9F",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#9F9F9F",
  },
  forButton: {
    padding: "9px 34px 8px 30px",
    background: "#065374",
    color: "#fff",
    borderRadius: "5px",
    fontFamily: "Poppins",
    border: "none",
  },
  inBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  bigSecondBOX: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "6px",
    padding: "40px 20px 50px",
  },
});

function BrandList(): JSX.Element {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Container
        style={{ marginTop: "80px", marginRight: "80px", marginLeft: "0" }}
      >
        <h1 className={classes.title}>Brand</h1>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={5}>
            <BrandCreate />
          </Grid>
          <Grid item xs={7}>
            <Box className={classes.bigSecondBOX}>
              <BrandRead />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default BrandList;
