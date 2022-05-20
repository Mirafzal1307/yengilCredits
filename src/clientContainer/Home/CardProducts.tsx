import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, Container } from "@mui/material";
import { getProductCards } from "../../Api/client/MainProductsApi";
import cart2 from "../../Images/cart2.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useActions } from "../../hook/useActions";
import BrandClient from "./brandClient";
import { Link, useParams } from "react-router-dom";
import { rootState } from "../../redux/reducers/index";
import { addToCart, productByCategory } from "../../redux/cart/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
      fontWeight: '500 !important',
      fontSize: '18px !important'
    }
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
  },
  cardButton: {
    background: "transparent",
    padding: "10px 22px  !important",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "solid 2px #065374 ",
    color: "#065374",
    fontFamily: "Poppins",
    fontSize: "14px",

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
    fontSize: "18px",
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
        fontWeight: '400 !important'
      },
    },
    [theme.breakpoints.down(700)]: {
      display: "block",
    },

  },
}));

const CardProducts = () => {
  const classes = useStyles();
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  async function getData() {
    const response: any = await getProductCards();
  }

  const dispatch = useDispatch();
  const products = useTypedSelector((state) => state?.card?.cards);
  const error = useTypedSelector((state) => state?.card?.error);
  const loading = useTypedSelector((state) => state?.card?.loading);

  let discount = products?.with_discount_products;
  let last = products?.last_added_products;
  let popular = products?.popular_products;
  let recommended = products?.recommended_products;

  console.log(recommended);

  let { darktheme } = useSelector((state: rootState) => state.productsReducer);

  const handleCategorySelect = (event: any) => {
    dispatch(productByCategory(event.target.value));
  };

  const { fetchCards } = useActions();
  useEffect(() => {
    getData();
    fetchCards();
  }, []);
  if (error) {
    return <h1 style={{ fontSize: "25px" }}>404 : Not found</h1>;
  }
  var num: number = 1234567890,
    result = num.toLocaleString();
  console.log(result);
  // result will equal to "1 234 567 890"

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
              <a href="#">Barchasi</a>
            </Link>
          </div>
        </div>
        <div className={classes.mainCard}>
          <Splide
            options={{

              width: "100%",

              perPage: 6,
              pagination: false,
              arrows: false,
              type: 'loop',
              drag: 'free',
              gap: '0.7rem',
              autoScroll: {
                speed: 2
              },
              breakpoints: {
                300: {
                  perPage: 1,
                },
                450: {
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
              recommended &&
              recommended?.map((item: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item?.id}>
                    <Box>
                      <Link to={`/product/client/details/${item?.id}`}>
                        {

                          item?.photos?.map((photo: any) => (
                            <img
                              src={`${MINIO_FULL_ENDPOINT_FOR}/product/${photo?.name}`}
                              alt="img"
                              style={{ width: "150px", height: "150px" }}
                            />
                          ))

                        }

                      </Link>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: '19px',
                          height: "30px",
                          fontSize: '14px',
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
                          fontSize: '14px',
                          fontFamily: 'Poppins'
                        }}
                      >
                        {item.name}
                      </h6>
                      {
                        item.discount === 0 ? <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",

                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: 'none !important',
                            paddingBottom: '22px'
                          }}
                        >
                        </p>
                          :
                          <p
                            className={classes.cardPrice}
                            style={{
                              color: "#065374",
                              fontSize: "14px",
                              textDecoration: "line-through",
                              fontWeight: "500",
                              display: 'block !important'
                            }}
                          >
                            {item?.price?.toLocaleString()} so'm
                          </p>
                      }

                      <p
                        className={classes.cardPrice}
                        style={{
                          marginBottom: "10px",
                          height: "45px",
                          fontWeight: "600",
                        }}
                      >
                        {item?.after_discount?.toLocaleString()} so'm
                      </p>

                      {item?.availability === true ? (
                        <button
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
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Sotuvda yo'q
                        </button>
                      )}
                      {


                        item?.discount === 0 ?
                          <span
                            className={classes.cardSpan}
                            style={{ fontWeight: "600", display: 'none !important' }}
                          >

                          </span>
                          :
                          <span
                            className={classes.cardSpan}
                            style={{ fontWeight: "600", display: 'block !important' }}
                          >
                            {item?.discount !== 0 ? item?.discount : null}%
                          </span>

                      }

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
              <a href="#">Barchasi</a>
            </Link>
          </div>
        </div>
        <div className={classes.mainCard}>
          <Splide
        options={{

          width: "100%",

          perPage: 6,
          pagination: false,
          arrows: false,
          type: 'loop',
          drag: 'free',
          gap: '0.7rem',
          autoScroll: {
            speed: 2
          },
          breakpoints: {
            300: {
              perPage: 1,
            },
            450: {
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
              popular?.map((item: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item?.id}>
                    <Box>
                      <Link to={`/product/client/details/${item?.id}`}>
                        {

                          item?.photos.map((photo: any) => (
                            <img
                              src={`${MINIO_FULL_ENDPOINT_FOR}/product/${photo?.name}`}
                              alt="img"
                              style={{ width: "150px", height: "150px" }}
                            />
                          ))

                        }
                      </Link>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: '19px',
                          height: "30px",
                          fontSize: '14px',
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
                          fontSize: '14px',
                          fontFamily: 'Poppins'
                        }}
                      >
                        {item.name}
                      </h6>
                      {
                        item.discount === 0 ? <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",

                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: 'none !important',
                            paddingBottom: '22px'
                          }}
                        >
                        </p>
                          :
                          <p
                            className={classes.cardPrice}
                            style={{
                              color: "#065374",
                              fontSize: "14px",
                              textDecoration: "line-through",
                              fontWeight: "500",
                              display: 'block !important'
                            }}
                          >
                            {item?.price?.toLocaleString()} so'm
                          </p>
                      }

                      <p
                        className={classes.cardPrice}
                        style={{
                          marginBottom: "10px",
                          height: "45px",
                          fontWeight: "600",
                        }}
                      >
                        {item?.after_discount?.toLocaleString()} so'm

                      </p>

                      {item.availability === true ? (
                        <button
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
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Sotuvda yo'q
                        </button>
                      )}
                      {


                        item.discount === 0 ?
                          <span
                            className={classes.cardSpan}
                            style={{ fontWeight: "600", display: 'none !important' }}
                          >

                          </span>
                          :
                          <span
                            className={classes.cardSpan}
                            style={{ fontWeight: "600", display: 'block !important' }}
                          >
                            {item.discount !== 0 ? item.discount : null}%
                          </span>

                      }
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
      <Container maxWidth="xl">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={classes.title} style={{ fontWeight: "600" }}>
            Chegirmadagi mahsulotlar
          </h2>
          <div className={classes.barchasi}>
            <Link to="/all/card/1" style={{ fontWeight: "600" }}>
              <a href="#">Barchasi</a>
            </Link>
          </div>
        </div>
        <div className={classes.mainCard}>
          <Splide
              options={{

                width: "100%",
  
                perPage: 6,
                pagination: false,
                arrows: false,
                type: 'loop',
                drag: 'free',
                gap: '0.7rem',
                autoScroll: {
                  speed: 2
                },
                breakpoints: {
                  300: {
                    perPage: 1,
                  },
                  450: {
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
              discount &&
              discount.map((item: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item.id}>
                    <Box>
                      <Link to={`/product/client/details/${item.id}`}>
                        {

                          item?.photos.map((photo: any) => (
                            <img
                              src={`${MINIO_FULL_ENDPOINT_FOR}/product/${photo?.name}`}
                              alt="img"
                              style={{ width: "150px", height: "150px" }}
                            />
                          ))

                        }
                      </Link>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: '19px',
                          height: "30px",
                          fontSize: '14px',
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
                          fontSize: '14px',
                          fontFamily: 'Poppins'
                        }}
                      >
                        {item.name}
                      </h6>
                      {
                        item.discount === 0 ? <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",

                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: 'none !important',
                            paddingBottom: '22px'
                          }}
                        >
                        </p>
                          :
                          <p
                            className={classes.cardPrice}
                            style={{
                              color: "#065374",
                              fontSize: "14px",
                              textDecoration: "line-through",
                              fontWeight: "500",
                              display: 'block !important'
                            }}
                          >
                            {item?.price?.toLocaleString()} so'm
                          </p>
                      }
                      <p
                        className={classes.cardPrice}
                        style={{
                          marginBottom: "10px",
                          height: "45px",
                          fontWeight: "600",
                        }}
                      >
                        {item?.after_discount?.toLocaleString()} so'm
                      </p>

                      {item.availability === true ? (
                        <button
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
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Sotuvda yo'q
                        </button>
                      )}
                      {


                        item.discount === 0 ?
                          <span
                            className={classes.cardSpan}
                            style={{ fontWeight: "600", display: 'none !important' }}
                          >

                          </span>
                          :
                          <span
                            className={classes.cardSpan}
                            style={{ fontWeight: "600", display: 'block !important' }}
                          >
                            {item.discount !== 0 ? item.discount : null}%
                          </span>

                      }
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
              <a href="#">Barchasi</a>
            </Link>
          </div>
        </div>
        <div className={classes.mainCard}>
          <Splide
             options={{

              width: "100%",

              perPage: 6,
              pagination: false,
              arrows: false,
              type: 'loop',
              drag: 'free',
              gap: '0.7rem',
              autoScroll: {
                speed: 2
              },
              breakpoints: {
                300: {
                  perPage: 1,
                },
                450: {
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
              last &&
              last.map((item: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item.id}>
                    <Box>
                      <Link to={`/product/client/details/${item.id}`}>
                        {

                          item?.photos.map((photo: any) => (
                            <img
                              src={`${MINIO_FULL_ENDPOINT_FOR}/product/${photo?.name}`}
                              alt="img"
                              style={{ width: "150px", height: "150px" }}
                            />
                          ))

                        }
                      </Link>
                      <h6
                        className={classes.cardTitle}
                        style={{
                          margin: 0,
                          marginTop: '19px',
                          height: "30px",
                          fontSize: '14px',
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
                          fontSize: '14px',
                          fontFamily: 'Poppins'
                        }}
                      >
                        {item.name}
                      </h6>
                      {
                        item.discount === 0 ? <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",

                            textDecoration: "line-through",
                            fontWeight: "500",
                            display: 'none !important',
                            paddingBottom: '22px'
                          }}
                        >
                        </p>
                          :
                          <p
                            className={classes.cardPrice}
                            style={{
                              color: "#065374",
                              fontSize: "14px",
                              textDecoration: "line-through",
                              fontWeight: "500",
                              display: 'block !important'
                            }}
                          >
                            {item?.price?.toLocaleString()} so'm
                          </p>
                      }

                      <p
                        className={classes.cardPrice}
                        style={{
                          marginBottom: "10px",
                          height: "45px",
                          fontWeight: "600",
                        }}
                      >
                        {item?.after_discount?.toLocaleString()} so'm
                      </p>

                      {item.availability === true ? (
                        <button
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
                        >
                          <img
                            src={cart2}
                            alt="img"
                            style={{
                              marginRight: "5px",
                              border: "2px solid #C33E4D",
                            }}
                          />
                          Sotuvda yo'q
                        </button>
                      )}

                      <span
                        className={classes.cardNewSpan}
                        style={{ fontWeight: "600", display: 'block !important' }}
                      >
                        new
                      </span>
                      {


                        item.discount === 0 ?
                          <span
                            className={classes.cardNew}
                            style={{ fontWeight: "600", display: 'none !important' }}
                          >

                          </span>
                          :
                          <span
                            className={classes.cardNew}
                            style={{ fontWeight: "600", display: 'block !important' }}
                          >
                            {item.discount !== 0 ? item.discount : null}%
                          </span>

                      }
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
};

export default CardProducts;
