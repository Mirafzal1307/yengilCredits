import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductItem } from '../../Api/admin/AdminProductApi';
import { useActions } from '../../hook/useActions';
import BackToTop from '../Home/Navbar/Navbar';
import Footer from '../Home/Footer';
import { getProductCards } from '../../Api/client/MainProductsApi';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import cart1 from "../../Images/cart1.svg";
import cart2 from "../../Images/cart2.svg";
import { MINIO_FULL_ENDPOINT_FOR } from '../../constants/ApiConstants';
import { addToCart } from "../../redux/cart/action";
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from "../../redux/reducers/index";
import Notification from "../../adminContainer/Snackbar/Notification";
import BigPhoto from "../../Images/BigPhoto.svg";
import Shop from "../../Images/baskets.png"
import CancelBtnImg from '../../Images/Group56524.png'
import { useTypedSelector } from "../../hook/useTypedSelector";
import { Link } from 'react-router-dom';
import { refresh } from '../../adminContainer/Modal/refresh';
import "@splidejs/splide/dist/css/splide.min.css";
import notFount from "../../Images/NotFound.jpg"

const useStyles = makeStyles(theme => ({
  DetailsBody: {
    padding: '45px 0',
    background: 'rgba(6, 83, 116, 0.1)',
    [theme.breakpoints.down(600)]: {
      padding: '0 0 25px 0 !important',
    }
  },
  h1: {
    fontSize: '25px',
    fontWeight: 700,
    position: 'absolute',
    top: '0',
    [theme.breakpoints.down(600)]: {
      fontSize: '22px',
      fontWeight: 600,
    }
  },
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down(900)]: {
      marginTop: '60px',
      marginBottom: '40px',
    },
    [theme.breakpoints.down(600)]: {
      marginTop: '60px',
      marginBottom: '20px',
      borderBottom: '0.5px dashed grey',

    }
  },
  ulLi: {
    '& li': {
      fontSize: '20px',
      lineHeight: '35px',
    }
  },
  ulLi2: {
    '& li': {
      fontSize: '20px',
      lineHeight: '35px',
      textAlign: 'right'
    }
  },
  right: {
    [theme.breakpoints.down(900)]: {
      display: 'block'
    }
  },
  right2: {
    [theme.breakpoints.down(900)]: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: '20px',
    [theme.breakpoints.up(600)]: {
      display: 'flex',
      justifyContent: 'center ',
    },
    '& img': {
      width: "90%",
      height: "110px",
      [theme.breakpoints.up(600)]: {
        height: '300px',
        width: "60%",
        justifyContent: 'center',
      },

      borderRadius: '0px',
      filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
    },
    [theme.breakpoints.down(900)]: {
      width: '20%',
      display: 'block',
      marginTop: '20px',

      '& img': {
        width: '100%'
      }
    },
    [theme.breakpoints.down(600)]: {
      width: '100%',
      display: 'block',
      marginTop: '20px',
      height: '300px',
      borderRaduis: '0px !important',
      '& img': {
        height: '100%',
        width: '100%'
      }
    }
  },
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
    // display: "flex",
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
    textAlign: 'left'
  },
  cardTop: {},
  cardButton: {
    background: "transparent",
    [theme.breakpoints.up(600)]: {
      padding: '10px 35px !important'
    },
    [theme.breakpoints.up(450)]: {
      padding: '10px 18px !important'
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
    margin: 'auto !important'
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
    // fontWeight: 600,
    fontSize: "13px",
    color: "#000",
  },
  cardPrice: {
    fontFamily: "Poppins",
    // fontWeight: "600",
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
    // fontWeight: "600",
    fontSize: "22px",
    color: "#fff",
  },
  BigPhoto: {
    width: "100% ",
    marginBottom: '50px',
    borderRadius: '5px',

    [theme.breakpoints.down(900)]: {
      marginTop: '40px',
    },
    [theme.breakpoints.down(600)]: {
      marginBottom: '10px',
      borderRadius: '3px',
    }

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

    }
  },
  priceSale: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "22px",
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down(600)]: {
      fontSize: "16px",
      fontWeight: 600,
    }
  },
  productSaleSpan: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",

    [theme.breakpoints.down(600)]: {
      fontSize: "14px",
    }
  },
  cardButtonBasket: {
    background: "#065374",
    color: "white",
    width: '150px',
    height: '50px',
    border: "none",
    borderRadius: "50px",
    marginLeft: "21px",

    [theme.breakpoints.down(600)]: {
      margin: '0',
      display: 'none !important'

    },
  },
  cardButtonBasketMin: {
    background: "#065374",
    color: "white",
    width: '150px',
    height: '50px',
    border: "none",
    borderRadius: "50px",
    marginLeft: "21px",

    [theme.breakpoints.up(600)]: {
      display: 'none !important'
    },
    [theme.breakpoints.down(700)]: {
      width: '100%',
      marginLeft: "0px",
    },
  },
  BigPhotoBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingBottom: "30px",

    [theme.breakpoints.down(700)]: {
      display: "block",
      textAlign: 'center'
    },

  },
  RightBtn: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down(450)]: {
      display: "block",
    }
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
  ProductBottomName: {
    fontWeight: 600,
    fontSize: '22px',
    color: 'black',
    margin: 'unset'
  },
  ShortName: {
    fontWeight: 500,
    fontSize: '18px',
    color: 'rgba(6, 83, 116, 1)',
    margin: 'unset'
  },
  price: {
    textDecoration: 'line-through',
    fontWeight: 500,
    fontSize: '18px',
    color: '#065374',
    margin: 'unset',
    padding: '5px',
    textAlign: 'right'
  },
  afterDiscount: {
    fontWeight: 600,
    fontSize: '22px',
    color: '#000',
    margin: 'unset',
    padding: '5px',
    textAlign: 'right'
  },
  discount: {
    fontWeight: 600,
    fontSize: '22px',
    color: '#000',
    margin: 'unset',
    padding: '5px',
    textAlign: 'right'
  },
  Links: {
    paddingTop: '10px',

  },
  linksInsideSpan: {

  }
  ,
  BodyCardInside: {
    textAlign: 'center'
  },
  CharacterAndProperty: {
    [theme.breakpoints.down(600)]: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  imgInDetails: {
    width: '100%'
  }
}))

const ProductDetails = () => {
  const [products, setProducts] = useState<any>();
  const { fetchProductClientDetails } = useActions()
  const [recommended, setRecommended] = React.useState([]);
  const [popular, setPopular] = React.useState([]);


  let pro: any = products?.Product;
  console.log(pro);

  let des: any = products?.Description[0];

  const { id } = useParams();
  const classes = useStyles()

  const photo = pro?.map((i: any) => i?.photos[0]);
  const name23 = pro?.map((i: any) => i?.name);


  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  const loading = useTypedSelector(state => state?.card?.loading);

  async function getData() {
    const response: any = await getProductCards();
    setPopular(response?.data?.popular_products);
    setRecommended(response?.data?.recommended_products)
  }

  React.useEffect(() => {
    fetchProductClientDetails(`${id}`)
    getData();
  }, []);

  React.useEffect(() => {
    getProduct(id);
  }, []);

  const getProduct = async (id: any) => {
    const res: any = await getProductItem(id);
    console.log(res);
    setProducts(res?.data);
  }

  return (
    <>
      <BackToTop />
      <div style={{ background: '#fff', paddingTop: '40px' }}>
        <Container maxWidth="xl">
          <img src={BigPhoto} alt="" className={classes.BigPhoto} />
        </Container>
        <div style={{ background: '#fff', padding: '10px 0' }}>
          <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginRight: '20px' }}>
              <Link to={"/"} >

                <img src={CancelBtnImg} alt="Cancel" />
              </Link>
            </div>
            <div className={classes.Links}>
              <span style={{ fontWeight: '500', fontSize: '18px', color: '#000', }}  >
                <Link to="/" style={{ color: 'rgb(159 159 159)', }}  >
                  Bosh sahifa
                  <span style={{ color: '#065374', fontWeight: '500', fontSize: '16px', padding: '0px 5px' }} >/</span>
                </Link>
              </span>
              <span style={{ fontWeight: '600', fontSize: '18px', color: '#000', }}  >

                {pro?.map((parCategory: any) => (
                  <Link to={`/product/product-by-category/${parCategory?.category?.parent_category?.id}`} style={{ color: 'rgb(159 159 159)', textTransform: 'capitalize' }}  >
                    {parCategory?.category?.parent_category?.name}
                    <span style={{ color: '#065374', fontWeight: '500', fontSize: '16px', padding: '0px 5px' }} >/</span>
                  </Link>
                ))}

              </span>
              <span style={{ fontWeight: '600', fontSize: '18px', color: '#000', }}  >

                {pro?.map((SubCategory: any) => (
                  <Link to={`/product/product-by-category/${SubCategory?.category?.id}`} style={{ color: 'rgb(159 159 159)', textTransform: 'capitalize' }} >
                    {SubCategory?.category?.name}
                  </Link>
                ))}
              </span>
            </div>
          </Container>
        </div>
        <Container maxWidth="xl">
          {pro?.map((product: any) =>
            <div className={classes.BigPhotoBottom}>
              <h2 className={classes.productName} style={{ textAlign: 'left', fontSize: '20px', fontWeight: '600' }} >{product?.name}</h2>
              <div className={classes.RightBtn}>
                <p className={classes.priceSale}><span>Chegirma narxda:</span> <span className={classes.productSaleSpan}>{product?.after_discount.toLocaleString()} so’m</span></p>
                <div>
                  <button
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
          )}
        </Container>
      </div>

      <div className={classes.DetailsBody}>
        <Container maxWidth='xl'>
          <Grid
            container
            style={{ display: 'flex', justifyContent: "space-between" }}
          >
            <Grid
              container
              item
              md={6}
              xs={12}
              style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
            >
              <h1 className={classes.h1}>
                {pro?.map((product: any) =>
                  (<> {product?.short_name}</>)
                )}
              </h1>
              <Grid item xs={12}>
                <div className={classes.div}>
                  <ul className={classes.ulLi}>
                    <li className={classes.CharacterAndProperty} >
                      {
                        des?.map((item: any) => (
                          <>

                            {item?.character_name}

                          </>
                        ))
                      }
                    </li>
                  </ul>
                  <ul className={classes.ulLi2}>
                    <li className={classes.CharacterAndProperty} >
                      {
                        des?.map((item: any) => (
                          <>

                            {item?.character_value}

                          </>
                        ))
                      }
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>



            <Grid
              // style={{ display: 'flex', justifyContent: 'center !important' }}
              sx={{ display: 'flex !important', justifyContent: 'center !important' }}
              item
              md={6}
              sm={6}
              xs={9}
            >
              <div className={classes.imgDiv} style={{alignSelf: 'center'}}  >
                {
                  photo?.map((item: any) => (
                    <Splide
                      options={{
                        perPage: 1,
                        arrows: false,
                        pagination: true,
                        focus: 'center',
                        gap: '0.5rem',

                        type: 'loop',
                        drag: 'free',
                        autoplay: true,
                        autoScroll: {
                          speed: 2
                        },


                      }}
                    

                    >
                      <SplideSlide >
                        <img src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item?.name}`} alt="Rasm bor edi" />
                      </SplideSlide>






                    </Splide>

                  ))
                }

              </div>
            </Grid>





          </Grid>
          <Grid item xs={12} >
            <div>
              {pro?.map((product: any) => (
                <button
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className={classes.title} style={{ fontWeight: '600' }}>Sizlar uchun maxsus mahsulotlar</h2>
          <div className={classes.barchasi}>
            <Link to="/all/card/1" style={{ fontWeight: '600' }}>
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
                450: {
                  type: 'loop',
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

            {loading ?
              <CircularProgress style={{ margin: 'auto', marginTop: '30px', marginBottom: '30px' }} /> :
              recommended &&
              recommended.map((item: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item.id}>
                    <Box>
                      <Link to={`/product/client/details/${item.id}`}>
                        {

                          item?.photos.map((photo: any) => (
                            <div className={classes.BodyCardInside}  >
                              <img
                                src={`${MINIO_FULL_ENDPOINT_FOR}/product/${photo?.name}`}
                                alt="img"
                                style={{ width: "150px", height: "150px" }}
                              />
                            </div>
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
                        style={{ marginBottom: "10px", height: "45px", fontWeight: '600' }}
                      >
                        {item?.after_discount?.toLocaleString()} so'm
                      </p>

                      {item.availability === true ? (
                        <button
                          className={classes.cardButton}
                          style={{ fontWeight: '600' }}
                          onClick={() => {
                            dispatch(addToCart(item));
                            setNotify({
                              isOpen: true,
                              message: "Savatchaga qo'shildi",
                              type: "success",
                            });
                          }}
                        >
                          < img src={Shop} alt='' style={{ paddingRight: '10px' }} />
                          Savatchaga
                        </button>
                      ) : (
                        <button className={classes.cardButton} style={{ fontWeight: '600' }}>
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

            }

          </Splide>
        </div>
        <div className={classes.cardBottom}>
          <Link to="/all/card/1" className={classes.bottomText} style={{ fontWeight: '600' }}>
            Barcha mahsulotlar
          </Link>
        </div>
      </Container>
      <Container maxWidth="xl">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className={classes.title} style={{ fontWeight: '600' }}>Ommabob maxsulotlar</h2>
          <div className={classes.barchasi}>
            <Link to="/all/card/1" style={{ fontWeight: '600' }}>
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
                450: {
                  type: 'loop',
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
            {
              loading ?
                <CircularProgress style={{ margin: 'auto', marginTop: '30px', marginBottom: '30px' }} /> :
                popular &&
                popular.map((item: any) => (
                  <SplideSlide className={classes.splide}>
                    <Box className={classes.bodyCard} key={item.id}>
                      <Box>
                        <Link to={`/product/client/details/${item.id}`}>
                          {

                            item?.photos.map((photo: any) => (
                              <div className={classes.BodyCardInside}  >
                                <img
                                  src={`${MINIO_FULL_ENDPOINT_FOR}/product/${photo?.name}`}
                                  alt="img"
                                  style={{ width: "150px", height: "150px" }}
                                />
                              </div>
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
                          style={{ marginBottom: "10px", height: "45px", fontWeight: '600' }}
                        >
                          {item.after_discount.toLocaleString()} so'm


                        </p>

                        {item.availability === true ? (
                          <button
                            className={classes.cardButton}
                            style={{ fontWeight: '600' }}
                            onClick={() => {
                              dispatch(addToCart(item));
                              setNotify({
                                isOpen: true,
                                message: "Savatchaga qo'shildi",
                                type: "success",
                              });
                            }}
                          >
                            < img src={Shop} alt='' style={{ paddingRight: '10px' }} />
                            Savatchaga
                          </button>
                        ) : (
                          <button className={classes.cardButton} style={{ fontWeight: '600' }}>
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
                ))}
          </Splide>
        </div>
        <div className={classes.cardBottom} style={{ marginBottom: '30px' }}>
          <Link to="/all/card/3" className={classes.bottomText} style={{ fontWeight: '600' }}>
            Barcha mahsulotlar
          </Link>
        </div>
      </Container>
      <Footer />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
export default ProductDetails;


