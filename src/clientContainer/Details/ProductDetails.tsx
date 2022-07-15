import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { getProductItem } from "../../Api/admin/AdminProductApi";
import { useActions } from "../../hook/useActions";
import BackToTop from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer";
import { getProductCards } from "../../Api/client/MainProductsApi";
// import cart1 from "../../Images/cart1.svg";
import cart2 from "../../Images/cart2.svg";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import { addToCart } from "../../redux/cart/action";
// import { rootState } from "../../redux/reducers/index";
import Notification from "../../adminContainer/Snackbar/Notification";
import BigPhoto from "../../Images/BigPhoto.png";
import Shop from "../../Images/baskets.png";
import CancelBtnImg from "../../Images/GroupsBack.png";
import { useTypedSelector } from "../../hook/useTypedSelector";

import "@splidejs/splide/dist/css/splide.min.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";
import ColorToggleButton from "./newFeature";

const useStyles = makeStyles((theme) => ({
  DetailsBody: {
    padding: "45px 0",
    background: "white",
    [theme.breakpoints.down(600)]: {
      padding: "0 0 25px 0 !important",
    },
  },
  h1: {
    fontSize: "27px",
    fontWeight: 600,
    fontFamily: "Poppins",
    margin: 0,
    paddingLeft: "50px",
    paddingBottom: "20px",
    [theme.breakpoints.down(600)]: {
      fontSize: "22px",
      fontWeight: 600,
    },
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down(900)]: {
      marginTop: "60px",
      marginBottom: "40px",
    },
    [theme.breakpoints.down(600)]: {
      marginTop: "60px",
      marginBottom: "20px",
      borderBottom: "0.5px dashed grey",
    },
  },
  ulLi: {
    "& li": {
      fontSize: "20px",
      lineHeight: "35px",
    },
  },
  ulLi2: {
    "& li": {
      fontSize: "20px",
      lineHeight: "35px",
      textAlign: "right",
    },
  },
  right: {
    display: "flex !important",
    [theme.breakpoints.down(900)]: {
      display: "block",
    },
  },
  right2: {
    [theme.breakpoints.down(900)]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  imgDiv: {
    display: "flex",
    justifyContent: "end",
    marginBottom: "20px",
    [theme.breakpoints.up(600)]: {
      display: "flex",
      justifyContent: "center ",
    },
    "& img": {
      width: "90%",
      height: "110px",
      [theme.breakpoints.up(600)]: {
        height: "300px",
        width: "60%",
        justifyContent: "center",
      },
      borderRadius: "0px",
      filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
    },
    [theme.breakpoints.down(900)]: {
      width: "20%",
      display: "block",
      marginTop: "20px",
      "& img": {
        width: "100%",
      },
    },
    [theme.breakpoints.down(600)]: {
      width: "100%",
      display: "block",
      marginTop: "20px",
      height: "300px",
      borderRaduis: "0px !important",
      "& img": {
        height: "100%",
        width: "100%",
      },
    },
  },
  title: {
    fontFamily: "Poppins",
    fontSize: "22px",
    color: "#000",
    [theme.breakpoints.down(599)]: {
      fontWeight: "500 !important",
      fontSize: "18px !important",
    },
  },
  mainCard: {
    height: "90%",
  },
  bodyCard: {
    backgroundColor: "white",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    },
    padding: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    borderRadius: "10px",
    marginLeft: "4px",
    marginRight: "4px",
    cursor: "pointer",
    transition: ".5s",
    overflow: "hidden",
    borderBox: "box-sizing",
    textAlign: "left",
  },
  cardTop: {},
  cardButton: {
    background: "transparent",
    [theme.breakpoints.up(600)]: {
      padding: "10px 35px !important",
    },
    [theme.breakpoints.up(450)]: {
      padding: "10px 18px !important",
    },
    padding: "10px 45px  !important",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "solid 2px #065374 ",
    color: "#065374",
    fontFamily: "Poppins",
    fontSize: "14px",
    margin: "auto !important",
  },
  cardSpan: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "#dd0820",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#fff",
    fontFamily: "Poppins",
    borderBottomRightRadius: "10px",
  },
  cardTitle: {
    fontFamily: "Poppins",
    fontSize: "13px",
    color: "#000",
  },
  cardPrice: {
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "#000",
    margin: 0,
  },
  splide: {
    marginTop: "10px !important",
    marginBottom: "10px !important",
  },
  cardBottom: {
    background: "#065374",
    paddingBottom: "15px",
    paddingTop: "14px",
    paddingRight: "20px",
    display: "flex",
    justifyContent: "flex-end",
    borderRadius: "5px",
    backgroundImage: "#065374",
    [theme.breakpoints.down(700)]: {
      display: "none",
    },
  },
  bottomText: {
    fontFamily: "Poppins",
    fontSize: "22px",
    color: "#fff",
  },
  BigPhoto: {
    width: "100% ",
    marginBottom: "50px",
    borderRadius: "5px",
    [theme.breakpoints.down(900)]: {
      marginTop: "40px",
    },
    [theme.breakpoints.down(600)]: {
      marginBottom: "10px",
      borderRadius: "3px",
    },
  },
  productName: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "27px",
    [theme.breakpoints.down(700)]: {
      display: "block",
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
      fontWeight: 500,
      fontSize: "18px",
      margin: "0",
    },
  },
  priceSale: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "22px",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down(600)]: {
      fontSize: "16px",
      fontWeight: 600,
    },
  },
  productSaleSpan: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    [theme.breakpoints.down(600)]: {
      fontSize: "14px",
    },
  },
  cardButtonBasket: {
    background: "#065374",
    color: "white",
    width: "150px",
    height: "50px",
    border: "none",
    borderRadius: "50px",
    marginLeft: "21px",
    [theme.breakpoints.down(600)]: {
      margin: "0",
      display: "none !important",
    },
  },
  cardButtonBasketMin: {
    background: "#065374",
    color: "white",
    width: "150px",
    height: "50px",
    border: "none",
    borderRadius: "50px",
    marginLeft: "21px",
    [theme.breakpoints.up(600)]: {
      display: "none !important",
    },
    [theme.breakpoints.down(700)]: {
      width: "100%",
      marginLeft: "0px",
    },
  },
  BigPhotoBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "30px",
    [theme.breakpoints.down(700)]: {
      display: "block",
      textAlign: "center",
    },
  },
  RightBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down(450)]: {
      display: "block",
    },
  },
  barchasi: {
    display: "none",
    "& a": {
      fontSize: "15px",
      color: "#065374",
      borderBottom: "1px solid #065374",
      [theme.breakpoints.down(599)]: {
        fontSize: "15px !important",
        fontWeight: "400 !important",
      },
    },
    [theme.breakpoints.down(700)]: {
      display: "block",
    },
  },
  ProductBottomName: {
    fontWeight: 600,
    fontSize: "22px",
    color: "black",
    margin: "unset",
  },
  ShortName: {
    fontWeight: 500,
    fontSize: "18px",
    color: "rgba(6, 83, 116, 1)",
    margin: "unset",
  },
  price: {
    textDecoration: "line-through",
    fontWeight: 500,
    fontSize: "18px",
    color: "#065374",
    margin: "unset",
    padding: "5px",
    textAlign: "right",
  },
  afterDiscount: {
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
    margin: "unset",
    padding: "5px",
    textAlign: "right",
  },
  discount: {
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
    margin: "unset",
    padding: "5px",
    textAlign: "right",
  },
  Links: {
    paddingTop: "10px",
    display: "flex",
  },
  linksInsideSpan: {},
  BodyCardInside: {
    textAlign: "center",
  },
  CharacterAndProperty: {
    [theme.breakpoints.down(600)]: {
      fontSize: "14px",
      fontWeight: "500",
    },
  },
  imgInDetails: {
    width: "100%",
  },
  priceDetails: {
    color: "#DC3C3C",
    fontSize: "36px",
    fontWeight: 600,
    fontFamily: "Poppins",
    textDecoration: "line-through",
    margin: 0,
  },
  after_discount: {
    color: "#065374",
    fontSize: "42px",
    fontWeight: 500,
    fontFamily: "Poppins",
    textDecoration: "line-through",
    margin: "0 0 100px 0",
  },
  discountDetails: {
    color: "#2DA04E",
    fontFamily: "Poppins",
    fontSize: "30px",
    fontWeight: 500,
  },
  li: {
    listStyle: "disc",
    marginLeft: "50px",
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: 400,
    color: "#676767",
    [theme.breakpoints.down(600)]: {
      listStyle: "none !important",
      marginLeft: "10px",
    },
  },
  li_span: {
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: 400,
    margin: 0,
    color: "#676767",
  },
  parent_div: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  inSplideSlide: {
    [theme.breakpoints.down(600)]: {
      width: "100px",
    },
  },
  bigBox: {
    display: "flex",
    alignItems: "center",
  },
  spane: {
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  inSwiperSlide: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
  },
  NewFeatures: {
    [theme.breakpoints.down(1000)]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up(750)]: {
      flexDirection: "unset !important",
    },
  },
  Container: {},
}));

function ProductDetails(): JSX.Element {
  const [products, setProducts] = useState<any>();
  const { fetchProductClientDetails } = useActions();
  const [recommended, setRecommended] = React.useState([]);
  const [popular, setPopular] = React.useState([]);
  const pro: any = products?.Product;
  const des: any = products?.Description[0];
  const { id } = useParams();
  const classes = useStyles();
  const photo = pro?.map((i: any) => i?.photos);
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const refresh = (): void => {
    setTimeout(() => window.location.reload(), 10);
  };
  const dispatch = useDispatch();
  const loading = useTypedSelector((state): any => state?.card?.loading);

  async function getData(): Promise<any> {
    const response: any = await getProductCards();
    setPopular(response?.data?.popular_products);
    setRecommended(response?.data?.recommended_products);
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    fetchProductClientDetails(`${id}`);
  }, []);

  const getProduct = async (id: any): Promise<any> => {
    const res: any = await getProductItem(id);
    setProducts(res?.data);
  };

  useEffect(() => {
    getProduct(id);
  }, []);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <BackToTop />
      <div style={{ background: "#fff", paddingTop: "40px" }}>
        <Container maxWidth="xl">
          <img src={BigPhoto} alt="" className={classes.BigPhoto} />
        </Container>
        <Container maxWidth="xl">
          {pro?.map((product: any) => (
            <div className={classes.BigPhotoBottom} key={product.id}>
              <h2
                className={classes.productName}
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {product?.name}
              </h2>
              <div className={classes.RightBtn}>
                <p className={classes.priceSale}>
                  <span style={{ marginRight: "10px" }}>Скидка. narxda:</span>{" "}
                  <span className={classes.productSaleSpan}>
                    {product?.after_discount?.toLocaleString()} so’m
                  </span>
                </p>
                <div>
                  <button
                    type="button"
                    className={classes.cardButtonBasket}
                    onClick={() => {
                      setNotify({
                        isOpen: true,
                        message: "Savatchaga qo'shildi",
                        type: "success",
                      });
                      dispatch(addToCart(product));
                    }}
                  >
                    Savatchaga
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Container>
        <div style={{ background: "#fff", padding: "10px 0" }}>
          <Container
            maxWidth="xl"
            style={{ display: "flex", flexDirection: "column" }}
            className={classes.Container}
          >
            <div>
              <div style={{ marginRight: "20px", marginTop: "8px" }}>
                <Link to="/">
                  <img src={CancelBtnImg} alt="Cancel" />
                </Link>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className={classes.NewFeatures}
              >
                <Grid item xs={12} md={6}>
                  <div className={classes.Links}>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#000",
                      }}
                    >
                      <Link to="/" style={{ color: "rgb(159 159 159)" }}>
                        Bosh sahifa
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            padding: "0px 5px",
                          }}
                        >
                          ›
                        </span>
                      </Link>
                    </span>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#000",
                      }}
                      className={classes.spane}
                    >
                      {pro?.map((parCategory: any) => (
                        <Link
                          to={`/product/product-by-category/${parCategory?.category?.parent_category?.id}`}
                          style={{
                            color: "rgb(159 159 159)",
                            textTransform: "capitalize",
                          }}
                          key={parCategory.id}
                        >
                          {parCategory?.category?.parent_category?.name} ›
                        </Link>
                      ))}
                    </span>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#000",
                      }}
                    >
                      {pro?.map((SubCategory: any, key: any) => (
                        <Link
                          to={`/product/product-by-category/${SubCategory?.category?.id}`}
                          style={{
                            color: "rgb(159 159 159)",
                            textTransform: "capitalize",
                          }}
                          key={SubCategory.category.id}
                        >
                          {SubCategory?.category?.name}
                        </Link>
                      ))}
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {pro?.map((product: any) => (
                    <div key={product.id}>
                      <ColorToggleButton cost={product?.after_discount} />
                    </div>
                  ))}
                </Grid>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className={classes.DetailsBody}>
        <Container maxWidth="xl" className={classes.bigBox}>
          <Grid container style={{ display: "flex" }}>
            <Grid item xs={12} md={6}>
              <Swiper
                loop
                spaceBetween={10}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {photo?.map((item: any, key: any) =>
                  item?.map((value: any) => (
                    <SwiperSlide key={Math.random()}>
                      <img
                        src={`${MINIO_FULL_ENDPOINT_FOR}/product/${value?.name}`}
                        alt="Rasm bor edi"
                        style={
                          item?.length >= 2
                            ? { width: "60%" }
                            : { width: "auto" }
                        }
                      />
                    </SwiperSlide>
                  )),
                )}
              </Swiper>
              <Swiper
                onClick={setThumbsSwiper}
                loop
                spaceBetween={10}
                slidesPerView={3}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {photo?.map((item: any, index: any) =>
                  item?.map((value: any) => (
                    <SwiperSlide key={Math.random()}>
                      <img
                        key={Math.random()}
                        src={`${MINIO_FULL_ENDPOINT_FOR}/product/${value?.name}`}
                        alt="Rasm bor edi"
                        className={classes.inSwiperSlide}
                        style={
                          item?.length > 2
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      />
                    </SwiperSlide>
                  )),
                )}
              </Swiper>
            </Grid>
            <Grid item xs={12} md={6} style={{}}>
              <div
                style={{
                  display: "block",
                }}
              >
                <h1 className={classes.h1}>Mahsulot haqida</h1>
                <div>
                  <ul>
                    {pro?.map((product: any) => (
                      <>
                        <div className={classes.parent_div} key={product.id}>
                          <li className={classes.li}>Nomi</li>
                          <p className={classes.li_span}>
                            {product?.short_name}
                          </p>
                        </div>
                        <div className={classes.parent_div}>
                          <li className={classes.li}>Brend</li>
                          <p className={classes.li_span}>
                            {product?.brand?.name}
                          </p>
                        </div>
                        <div className={classes.parent_div}>
                          <li className={classes.li}>Kategoriya</li>
                          <p className={classes.li_span}>
                            {product?.category?.name}
                          </p>
                        </div>
                      </>
                    ))}
                  </ul>
                  <ul>
                    {des?.map((product: any, key: any) => (
                      <div className={classes.parent_div} key={Math.random()}>
                        <li className={classes.li}>
                          {product?.character_name}
                        </li>
                        <p className={classes.li_span}>
                          {product?.character_value}
                        </p>
                      </div>
                    ))}
                  </ul>
                  <ul>
                    {pro?.map((product: any) => (
                      <div className={classes.parent_div} key={product.id}>
                        <li className={classes.li}>Narxi</li>
                        <p className={classes.li_span}>
                          {product?.after_discount?.toLocaleString()} so’m
                        </p>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              {pro?.map((product: any) => (
                <button
                  type="button"
                  key={product.id}
                  className={classes.cardButtonBasketMin}
                  onClick={() => {
                    setNotify({
                      isOpen: true,
                      message: "Savatchaga qo'shildi",
                      type: "success",
                    });
                    dispatch(addToCart(product));
                  }}
                >
                  Savatchaga
                </button>
              ))}
            </div>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="xl" style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={classes.title} style={{ fontWeight: "600" }}>
            Sizlar uchun maxsus mahsulotlar
          </h2>
          <div className={classes.barchasi}>
            <Link to="/all/card/1" style={{ fontWeight: "600" }}>
              Barchasi
            </Link>
          </div>
        </div>
        <div className={classes.mainCard}>
          <Splide
            options={{
              perPage: 6,
              pagination: false,
              arrows: true,
              gap: "0.7rem",
              autoScroll: {
                speed: 2,
              },
              breakpoints: {
                450: {
                  type: "loop",
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
            {loading ? (
              <CircularProgress
                style={{
                  marginTop: "30px",
                  margin: "auto",
                  marginBottom: "30px",
                }}
              />
            ) : (
              recommended &&
              recommended.map((item: any, key: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item.id}>
                    <Box>
                      <Link
                        to={`/product/client/details/${item?.id}`}
                        onClick={refresh}
                      >
                        <div className={classes.BodyCardInside}>
                          <img
                            src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0]?.name}`}
                            alt="img"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      </Link>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: "20px",
                          height: "45px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {item.short_name}
                      </h6>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: "0px",
                          marginBottom: "20px",
                          height: "30px",
                          fontWeight: "400",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.name}
                      </h6>
                      {item.discount === 0 ? (
                        <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",

                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: "none !important",
                            paddingBottom: "22px",
                          }}
                        />
                      ) : (
                        <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",
                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: "block !important",
                          }}
                        >
                          {item?.price?.toLocaleString()} so`m
                        </p>
                      )}
                      <p
                        className={classes.cardPrice}
                        style={{
                          fontWeight: "600",
                          fontFamily: "Poppins",
                          fontSize: "18px",
                          color: "#000",
                          margin: 0,
                        }}
                      >
                        {Math.floor(
                          (item.after_discount * 1.44) / 12,
                        ).toLocaleString()}{" "}
                        so`m
                        <span
                          style={{
                            background: "red",
                            color: "white",
                            fontSize: "10px",
                            borderRadius: "10px",
                            padding: "1px 6px",
                            marginLeft: "10px",
                          }}
                        >
                          12 oy
                        </span>
                      </p>
                      <p
                        className={classes.cardPrice}
                        style={{
                          marginBottom: "10px",
                          height: "45px",
                          fontWeight: "500",
                        }}
                      >
                        {item?.after_discount?.toLocaleString()} so`m
                      </p>
                      {item.availability === true ? (
                        <button
                          type="button"
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                          onClick={() => {
                            dispatch(addToCart(item));
                            setNotify({
                              isOpen: true,
                              message: "Savatchaga qo'shildi",
                              type: "success",
                            });
                          }}
                        >
                          <img
                            src={Shop}
                            alt=""
                            style={{ paddingRight: "10px" }}
                          />
                          Savatchaga
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Нет в наличии
                        </button>
                      )}
                      {item.discount === 0 ? (
                        <span
                          className={classes.cardSpan}
                          style={{
                            fontWeight: "600",
                            display: "none !important",
                          }}
                        />
                      ) : (
                        <span
                          className={classes.cardSpan}
                          style={{
                            fontWeight: "600",
                            display: "block !important",
                          }}
                        >
                          {item.discount !== 0 ? item.discount : null}%
                        </span>
                      )}
                    </Box>
                  </Box>
                </SplideSlide>
              ))
            )}
          </Splide>
        </div>
        <div className={classes.cardBottom}>
          <Link
            to="/all/card/1"
            className={classes.bottomText}
            style={{ fontWeight: "600" }}
          >
            Barcha mahsulotlar
          </Link>
        </div>
      </Container>
      <Container maxWidth="xl">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={classes.title} style={{ fontWeight: "600" }}>
            Ommabob maxsulotlar
          </h2>
          <div className={classes.barchasi}>
            <Link to="/all/card/1" style={{ fontWeight: "600" }}>
              Barchasi
            </Link>
          </div>
        </div>
        <div className={classes.mainCard}>
          <Splide
            options={{
              perPage: 6,
              pagination: false,
              arrows: true,
              gap: "0.7rem",
              autoScroll: {
                speed: 2,
              },
              breakpoints: {
                450: {
                  type: "loop",
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
            {loading ? (
              <CircularProgress
                style={{
                  margin: "auto",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
            ) : (
              popular &&
              popular.map((item: any, key: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item.id}>
                    <Box>
                      <Link
                        to={`/product/client/details/${item?.id}`}
                        onClick={refresh}
                      >
                        <div className={classes.BodyCardInside}>
                          <img
                            src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0]?.name}`}
                            alt="img"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      </Link>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: "20px",
                          height: "45px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {item.short_name}
                      </h6>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: "0px",
                          marginBottom: "20px",
                          height: "30px",
                          fontWeight: "400",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.name}
                      </h6>
                      {item.discount === 0 ? (
                        <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",

                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: "none !important",
                            paddingBottom: "22px",
                          }}
                        />
                      ) : (
                        <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",
                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: "block !important",
                          }}
                        >
                          {item?.price?.toLocaleString()} so`m
                        </p>
                      )}
                      <p
                        className={classes.cardPrice}
                        style={{
                          fontWeight: "600",
                          fontFamily: "Poppins",
                          fontSize: "18px",
                          color: "#000",
                          margin: 0,
                        }}
                      >
                        {Math.floor(
                          (item.after_discount * 1.44) / 12,
                        ).toLocaleString()}{" "}
                        so`m
                        <span
                          style={{
                            background: "red",
                            color: "white",
                            fontSize: "10px",
                            borderRadius: "10px",
                            padding: "1px 6px",
                            marginLeft: "10px",
                          }}
                        >
                          12 oy
                        </span>
                      </p>
                      <p
                        className={classes.cardPrice}
                        style={{
                          marginBottom: "10px",
                          height: "45px",
                          fontWeight: "500",
                        }}
                      >
                        {item?.after_discount?.toLocaleString()} so`m
                      </p>
                      {item.availability === true ? (
                        <button
                          type="button"
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                          onClick={() => {
                            dispatch(addToCart(item));
                            setNotify({
                              isOpen: true,
                              message: "Savatchaga qo'shildi",
                              type: "success",
                            });
                          }}
                        >
                          <img
                            src={Shop}
                            alt=""
                            style={{ paddingRight: "10px" }}
                          />
                          Savatchaga
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Нет в наличии
                        </button>
                      )}
                      {item.discount === 0 ? (
                        <span
                          className={classes.cardSpan}
                          style={{
                            fontWeight: "600",
                            display: "none !important",
                          }}
                        />
                      ) : (
                        <span
                          className={classes.cardSpan}
                          style={{
                            fontWeight: "600",
                            display: "block !important",
                          }}
                        >
                          {item.discount !== 0 ? item.discount : null}%
                        </span>
                      )}
                    </Box>
                  </Box>
                </SplideSlide>
              ))
            )}
          </Splide>
        </div>
        <div className={classes.cardBottom} style={{ marginBottom: "30px" }}>
          <Link
            to="/all/card/3"
            className={classes.bottomText}
            style={{ fontWeight: "600" }}
          >
            Barcha mahsulotlar
          </Link>
        </div>
      </Container>
      <Footer />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
export default ProductDetails;
