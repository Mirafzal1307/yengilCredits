import { makeStyles } from "@material-ui/core/styles";
import CarouselImg from "../../Images/Group 271.png";
import Footer from "./Footer";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import BackToTop from "./Navbar/Navbar";
import BeforeFooter from "./beforeFooter";
import CardProducts from "./CardProducts";
import { Container } from "@mui/material";
import { useState } from "react";
import Navbarbottom from "./Navbar/Navbarbottom";


const useStyles = makeStyles((theme) => {
  return {
    Carousel: {
      width: "100% !important",
     
      marginTop: '30px !important',
      [theme.breakpoints.down(1201)]: {
        marginTop: '60px !important'
      },
      [theme.breakpoints.down(499)]: {
        marginTop: '80px !important'
      },
      [theme.breakpoints.down(499)]: {
        marginTop: '120px !important'
      },
    },
    carouselImg: {
      width: "100%",
      height: "auto",
     
      borderRadius: "10px !important",
    },
    searchInput: {
      marginBottom: "50px !important",
      width: "100% !important",
      "&::before": {
        content: "",
        display: "none !important",
      },
      border: "2px solid #9F9F9F",
      "&::after": {
        content: "",
        display: "none !important",
      },
      "&::placeholder": {
        color: "#9f9f9f !important",
      },
      padding: "5px 0 5px 10px",
      borderRadius: "10px",
    },
  };
});

export type CartItemType = {
  id: number;
  short_name: string;
  discount: number;
  price: number;
  after_discount: number;
  image: string;
};

const Header = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState();

  return (
    <>
      <BackToTop />
     
      <Container maxWidth="xl" >
        <Splide
          className={classes.Carousel}
          options={{
            rewind: true,
            arrows:false,
            width: "100%",
            height: "100%",
            perPage: 1,
            pagination: false,
            autoplay: true,
          }}
        >
          <SplideSlide>
            <img src={CarouselImg} className={classes.carouselImg} />
          </SplideSlide>
          <SplideSlide>
            <img src={CarouselImg} className={classes.carouselImg} />
          </SplideSlide>

        </Splide>
      </Container>
    
      <Navbarbottom />
      <CardProducts />
      <BeforeFooter />
      <Footer />
    </>
  );
};
export default Header;
