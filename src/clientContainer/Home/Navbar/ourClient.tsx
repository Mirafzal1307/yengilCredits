import { Container, Grid } from "@mui/material";
import Alif from "../../../Images/Group 56530.png";
import Paymart from "../../../Images/image 58.png";
import Iman from "../../../Images/image 59 (1).png";
import { makeStyles } from "@material-ui/core/styles";
import Dostavka from "../../../Images/Dostavka.svg";
import Galochka from "../../../Images/Galochka.svg";
import Image from "../../../Images/Image.svg";
import Operator from "../../../Images/Operator.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100% !important",
    cursor: "pointer",
    height: "calc(((100% + 110px) / 3) - 15px)",
    [theme.breakpoints.up(600)]: {
      // width: "60% !important",
      height: "calc(((100% + 130px) / 3) - 15px)",
    },
    "&:hover": {
      opacity: "0.9 !important",
    },
  },
  Partner: {
    color: "#065374",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "45px",
    fontFamily: "Poppins",
    [theme.breakpoints.down(600)]: {
      fontSize: "25px",
    },
  },
  Slide: {
    textAlign: "center",
    boxSizing: "border-box",
    "&:hover": {
      opacity: "0.99 !important",
      transform: "scale(1.06)",
      transition: "1ms",
      borderRadius: "50px",
      zIndex: "9999 !important",
    },
  },
  client: {
    display: "flex !important",
    justifyContent: "space-around !important",
  },
  grid: {
    display: "flex !important",
    justifyContent: "space-around !important",
    [theme.breakpoints.down(1300)]: {
      display: "none !important",
    },
  },
  div: {
    display: "grid",
    placeItems: "center",
    textAlign: "center",
  },
  text: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "18px",
    color: "#065374",
    margin: "10px 0 0 0",
    [theme.breakpoints.down(600)]: {
      fontSize: "10px !important",
    },
  },
  paragraph: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "13px",
    textAlign: "center",
    [theme.breakpoints.down(600)]: {
      fontSize: "10px !important",
    },
  },

  carousel: {
    [theme.breakpoints.up(1300)]: {
      display: "none !important",
    },
  },
  caruselImg: {
    width: "112px",
    height: "112px",
    display: "grid",
    placeItems: "center",
  },
}));

const Partner = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "48px" }}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={2} lg={2} className={classes.div}>
            <Grid>
              <img src={Dostavka} alt="" />
            </Grid>
            <p className={classes.text}>Bepul yetkazib berish</p>
            <p className={classes.paragraph}>
              Sizning xotirjamligingiz uchun 3 yilgacha sayt kafolati mavjud.
            </p>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.div}>
            <Grid>
              <img src={Galochka} alt="" />
            </Grid>
            <p className={classes.text}>Bo’lib to’lash </p>
            <p className={classes.paragraph}>
              Katta chegirmalar, bepul yetkazib berish va maxsus yordam
              mutaxassisi bilan.
            </p>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.div}>
            <Grid>
              <img src={Image} alt="" />
            </Grid>
            <p className={classes.text}>1 yil garantiya</p>
            <p className={classes.paragraph}>
              Yangi mahsulotlarga 70% gacha chegirma, siz eng yaxshi narxga amin
              bo'lishingiz mumkin.
            </p>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.div}>
            <Grid>
              <img src={Operator} alt="" />
            </Grid>
            <p className={classes.text}>Qo’llab quvatlash xizmati</p>
            <p className={classes.paragraph}>
              Yangi mahsulotlarga 70% gacha chegirma, siz eng yaxshi narxga amin
              bo'lishingiz mumkin.
            </p>
          </Grid>
        </Grid>
        <Splide
          className={classes.carousel}
          options={{
            width: "100%",
            pagination: false,
            arrows: false,
            autoplay: true,
            type: "loop",
            autoScroll: {
              speed: 2,
            },
            breakpoints: {
              600: {
                perPage: 1,
              },
              992: {
                perPage: 2,
              },
              1300: {
                perPage: 2,
              },
            },
          }}
        >
          <SplideSlide>
            <Grid item md={12} lg={12} className={classes.div}>
              <Grid className={classes.caruselImg}>
                <img src={Dostavka} alt="" />
              </Grid>
              <p className={classes.text}>Bepul yetkazib berish</p>
              <p className={classes.paragraph}>
                Sizning xotirjamligingiz uchun 3 yilgacha sayt kafolati mavjud.
              </p>
            </Grid>
          </SplideSlide>
          <SplideSlide>
            <Grid item md={12} lg={12} className={classes.div}>
              <Grid className={classes.caruselImg}>
                <img src={Galochka} alt="" />
              </Grid>
              <p className={classes.text}>Bo’lib to’lash </p>
              <p className={classes.paragraph}>
                Katta chegirmalar, bepul yetkazib berish va maxsus yordam
                mutaxassisi bilan.
              </p>
            </Grid>
          </SplideSlide>
          <SplideSlide>
            <Grid item md={12} lg={12} className={classes.div}>
              <Grid className={classes.caruselImg}>
                <img src={Image} alt="" />
              </Grid>
              <p className={classes.text}>1 yil garantiya</p>
              <p className={classes.paragraph}>
                Yangi mahsulotlarga 70% gacha chegirma, siz eng yaxshi narxga
                amin bo'lishingiz mumkin.
              </p>
            </Grid>
          </SplideSlide>
          <SplideSlide>
            <Grid item md={12} lg={12} className={classes.div}>
              <Grid className={classes.caruselImg}>
                <img src={Operator} alt="" />
              </Grid>
              <p className={classes.text}>Qo’llab quvatlash xizmati</p>
              <p className={classes.paragraph}>
                Yangi mahsulotlarga 70% gacha chegirma, siz eng yaxshi narxga
                amin bo'lishingiz mumkin.
              </p>
            </Grid>
          </SplideSlide>
        </Splide>
      </Container>
      <Container maxWidth="xl" style={{ marginTop: "20px" }}>
        <p className={classes.Partner}>Bizning hamkorlar</p>

        <Grid container className={classes.client}>
          <Grid item xs={4} md={4} lg={2.5} className={classes.div}>
            <img src={Alif} alt="" className={classes.img} />
          </Grid>
          <Grid item xs={4} md={4} lg={2.5} className={classes.div}>
            <img src={Paymart} alt="" className={classes.img} />
          </Grid>

          <Grid item xs={4} md={4} lg={2.5} className={classes.div}>
            <img src={Iman} alt="" className={classes.img} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Partner;
