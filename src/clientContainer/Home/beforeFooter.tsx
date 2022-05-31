import { Container, Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import FooterLeft from "../../Images/footer_left.svg";

const useStyles = makeStyles((theme) => {
  return {
    ul: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      textAlign: "left",
    },
    FooterTopTitle: {
      fontFamily: "Poppins",
      fontSize: "22px",
      fontWeight: 700,
      [theme.breakpoints.down("md")]: {
        fontSize: "19px",
      },
    },
    footerTopText: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      textAlign: "left",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
        textAlign: "center",
      },
    },
    footerBottomText: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "20px",
      marginBottom: "0",
      marginTop: "0",
      textAlign: "center",
    },
    footerLink: {
      fontFamily: "Poppins",
      fontWeight: 600,
      textDecoration: "none",
      color: "#fff",
    },
  };
});

const BeforeFooter = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1100px)");

  return (
    <>
      <Box
        sx={{ width: "100%" }}
        style={{ paddingTop: "39px", paddingBottom: "20px" }}
      >
        <Container maxWidth="xl">
          <Grid xs={12}>
            <h2
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "22px",
                marginBottom: "20px",
              }}
            >
              Biz haqimizda
            </h2>
          </Grid>
        </Container>
        <Box sx={{ width: "100%" }}>
          <Container style={{ display: "flex", alignItems: "center" }}>
            <Grid
              container
              spacing={6}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12} md={matches ? 6 : 12}>
                <img src={FooterLeft} alt="" style={{ width: "100%" }} />
              </Grid>
              <Grid item xs={12} md={matches ? 6 : 12}>
                <span className={classes.FooterTopTitle}>
                  Yengilcredit.uz online do'koni xaridlar uchun juda ham qulay
                  do'kon
                </span>
                <p
                  // style={{ textIndent: "5%" }}
                  className={classes.footerTopText}
                >
                  Bizning maqsadimiz zamonaviy texnologiyalar orqali
                  vatandoshlarimizni hayotlarini osonlashtirish! Bizdan arzonini
                  topsangiz pulni qaytarib beramiz.
                </p>
                <p
                  style={{ marginTop: "50px" }}
                  className={classes.footerTopText}
                >
                  Mijozlar biz uchun emas biz mijozlar uchun ishlaymiz!
                </p>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default BeforeFooter;
