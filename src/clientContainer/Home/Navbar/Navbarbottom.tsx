import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from "@mui/material";
import Aksesuar from "../../../Images/Group1.png";
import Desktop from "../../../Images/Group2.png";
import forKitchen from "../../../Images/Group3.png";
import refrigerators from "../../../Images/Group4.png";
import smartphones from "../../../Images/Group5.png";
import six from "../../../Images/Group6.png";
import seven from "../../../Images/Group7.png";
import eight from "../../../Images/Group8.png";
import wash from "../../../Images/Group9.png";
import washing from "../../../Images/Group10.png";
import washingmashine from "../../../Images/Group11.png";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100% !important",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.9 !important",  
    },
    
  },
  Slide: {
    // borderRadius: '10px !important',
    // background: 'red',
    "&:hover": {
      opacity: "0.99 !important",
      transform: 'scale(1.06)',
      transition: '1ms',
      borderRadius: "50px",
      zIndex: '9999 !important'
     

    },
  }
}));

const Navbarbottom = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "20px" }}>
        <Splide
          options={{
            perPage: 6,
            arrows: true,
            pagination: false,
          
            gap: "15px",
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
         
          }}
        >
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={Aksesuar} alt="" className={classes.img} />
            </Link>
          </SplideSlide   >
           <SplideSlide className={classes.Slide}>
            <Link to={"/product/product-by-category/1015"}>
              <img src={Desktop} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={forKitchen} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={refrigerators} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide  className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={smartphones} alt="" className={classes.img} />
            </Link>
          </SplideSlide>
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={washingmashine} alt="" className={classes.img} />
            </Link>
          </SplideSlide> 
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={washing} alt="" className={classes.img} />
            </Link>
          </SplideSlide> 
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={six} alt="" className={classes.img} />
            </Link>
          </SplideSlide> 
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={eight} alt="" className={classes.img} />
            </Link>
          </SplideSlide> 
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={seven} alt="" className={classes.img} />
            </Link>
          </SplideSlide> 
          <SplideSlide className={classes.Slide} >
            <Link to={"/product/product-by-category/1015"}>
              <img src={wash} alt="" className={classes.img} />
            </Link>
          </SplideSlide> 
        </Splide>
      </Container>
    </>
  );
};
export default Navbarbottom;
