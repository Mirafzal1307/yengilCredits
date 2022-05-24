import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from "@mui/material";
import Aksesuar from "../../../Images/aksesuarlar.jpeg";
import Desktop from "../../../Images/Desktop.jpeg";
import forKitchen from "../../../Images/forKitchen.jpeg";
import refrigerators from "../../../Images/refrigerators.jpeg";
import smartphones from "../../../Images/smartphones.jpeg";
import washingmashine from "../../../Images/washingmashine.jpeg";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100% !important",
    height: "150px !important",
    borderRadius: "5px !important",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.7 !important",
    },
  },
}));

const Navbarbottom = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "20px" }}>
        <Splide
          options={{
            perPage: 5,
            arrows: false,
            pagination: false,
            focus: "center",
            gap: "0.5rem",
            breakpoints: {
              400: {
                perPage: 1,
              },
              700: {
                perPage: 2,
              },
              992: {
                perPage: 3,
              },
              1300: {
                perPage: 4,
              },
            },
            type: "loop",
            drag: "free",
            autoplay: true,
            autoScroll: {
              speed: 2,
            },
          }}
        >
          <SplideSlide>
            <Link to={"/product/product-by-category/1015"}>
              <img src={Aksesuar} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide>
            <Link to={"/product/product-by-category/1015"}>
              <img src={Desktop} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide>
            <Link to={"/product/product-by-category/1015"}>
              <img src={forKitchen} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide>
            <Link to={"/product/product-by-category/1015"}>
              <img src={refrigerators} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide>
            <Link to={"/product/product-by-category/1015"}>
              <img src={smartphones} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide>
            <Link to={"/product/product-by-category/1015"}>
              <img src={washingmashine} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
        </Splide>
      </Container>
    </>
  );
};
export default Navbarbottom;
