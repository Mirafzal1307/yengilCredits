import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, Container } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductCards } from "../../Api/client/MainProductsApi";
import cart2 from "../../Images/cart2.svg";
import "@splidejs/splide/dist/css/splide.min.css";
import { useActions } from "../../hook/useActions";
import BrandClient from "./brandClient";
import { addToCart } from "../../redux/cart/action";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import Notification from "../../adminContainer/Snackbar/Notification";
import Shop from "../../Images/baskets.png";
import Navbarbottom from "./Navbar/Navbarbottom";
import { useTypedSelector } from "../../hook/useTypedSelector";

const useStyles = makeStyles((theme) => ({
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
  cardButton: {
    background: "transparent",
    [theme.breakpoints.up(600)]: {
      padding: "10px 35px !important",
    },
    [theme.breakpoints.up(450)]: {
      padding: "10px 18px !important",
    },
    [theme.breakpoints.up(375)]: {
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
  cardNew: {
    position: "absolute",
    top: 0,
    left: 50,
    background: "#dd0820",
    paddingLeft: "15px",
    paddingRight: "15px",
    color: "#fff",
    fontFamily: "Poppins",
    borderBottomRightRadius: "10px",
  },
  cardNewSpan: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "#dfec00",
    paddingLeft: "11px",
    paddingRight: "15px",
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
  box_second: {
    margin: "15px 0 !important",
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
  BodyCardInside: {
    textAlign: "center",
  },
}));

function CardProducts(): JSX.Element {
  const classes = useStyles();
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  async function getData(): Promise<any> {
    await getProductCards();
  }
  const dispatch = useDispatch();
  const products = useTypedSelector((state) => state?.card?.cards);
  const error = useTypedSelector((state) => state?.card?.error);
  const loading = useTypedSelector((state) => state?.card?.loading);
  const last = products?.last_added_products;
  const popular = products?.popular_products;
  const recommended = products?.recommended_products;
  const { fetchCards } = useActions();
  useEffect(() => {
    getData();
    fetchCards();
  }, []);
  if (error) {
    return <h1 style={{ fontSize: "25px" }}>404 : Not found</h1>;
  }
  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={classes.title} style={{ fontWeight: "600" }}>
            Sizlar uchun tavsiyalar
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
              width: "100%",
              perPage: 6,
              pagination: false,
              arrows: true,
              autoScroll: {
                speed: 2,
              },
              breakpoints: {
                375: {
                  perPage: 1,
                },
                510: {
                  type: "loop",
                  drag: "free",
                  focus: "center",
                  perPage: 1.5,
                  autoScroll: {
                    speed: 2,
                  },
                },
                750: {
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
              recommended &&
              recommended?.map((item: any) => (
                <SplideSlide className={classes.splide} key={item.id}>
                  <Box className={classes.bodyCard}>
                    <Box style={{ margin: "0px 10px" }}>
                      <Link to={`/product/client/details/${item?.id}`}>
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
                          marginTop: "19px",
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
                            padding: "1px 5px",
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

                      {item?.availability === true ? (
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
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                          type="button"
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Sotuvda yo`q
                        </button>
                      )}
                      {item?.discount === 0 ? (
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
                          {item?.discount !== 0 ? item?.discount : null}%
                        </span>
                      )}
                    </Box>
                  </Box>
                </SplideSlide>
              ))
            )}
          </Splide>
        </div>
        <Link to="/all/card/1" className={classes.bottomText}>
          <div className={classes.cardBottom}>Barcha mahsulotlar</div>
        </Link>
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
              width: "100%",
              perPage: 6,
              pagination: false,
              arrows: true,
              gap: "0.7rem",
              autoScroll: {
                speed: 2,
              },
              breakpoints: {
                375: {
                  perPage: 1,
                },
                510: {
                  type: "loop",
                  drag: "free",
                  focus: "center",
                  perPage: 1.5,
                  autoScroll: {
                    speed: 2,
                  },
                },
                750: {
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
              popular?.map((item: any) => (
                <SplideSlide className={classes.splide} key={item.id}>
                  <Box className={classes.bodyCard}>
                    <Box>
                      <Link to={`/product/client/details/${item?.id}`}>
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
                          marginTop: "19px",
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
                            padding: "1px 5px",
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
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                          type="button"
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
                          className={classes.cardButton}
                          style={{ fontWeight: "600" }}
                          type="button"
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Sotuvda yo`q
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
        <Link
          to="/all/card/3"
          className={classes.bottomText}
          style={{ fontWeight: "600" }}
        >
          <div className={classes.cardBottom}>Barcha mahsulotlar</div>
        </Link>
      </Container>
      <Navbarbottom />
      <Container maxWidth="xl">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={classes.title} style={{ fontWeight: "600" }}>
            Yangi mahsulotlar
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
              width: "100%",
              perPage: 6,
              pagination: false,
              arrows: true,
              gap: "0.7rem",
              autoScroll: {
                speed: 2,
              },
              breakpoints: {
                375: {
                  perPage: 1,
                },
                510: {
                  type: "loop",
                  drag: "free",
                  focus: "center",
                  perPage: 1.5,
                  autoScroll: {
                    speed: 2,
                  },
                },
                750: {
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
              last &&
              last.map((item: any) => (
                <SplideSlide className={classes.splide} key={item.id}>
                  <Box className={classes.bodyCard}>
                    <Box>
                      <Link to={`/product/client/details/${item?.id}`}>
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
                          marginTop: "19px",
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
                            padding: "1px 5px",
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
                          Sotuvda yo`q
                        </button>
                      )}
                      <span
                        className={classes.cardNewSpan}
                        style={{
                          fontWeight: "600",
                          display: "block !important",
                        }}
                      >
                        new
                      </span>
                      {item.discount === 0 ? (
                        <span
                          className={classes.cardNew}
                          style={{
                            fontWeight: "600",
                            display: "none !important",
                          }}
                        />
                      ) : (
                        <span
                          className={classes.cardNew}
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
        <Link
          to="/all/card/4"
          className={classes.bottomText}
          style={{ fontWeight: "600" }}
        >
          <div className={classes.cardBottom}>Barcha mahsulotlar</div>
        </Link>
        <div>
          <BrandClient />
        </div>
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default CardProducts;
