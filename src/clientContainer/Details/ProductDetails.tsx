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
import BigPhoto from "../../Images/image 26.png";
import { useTypedSelector } from "../../hook/useTypedSelector";
import Shop from "../../Images/baskets.png"
import { Link } from 'react-router-dom';
import { refresh } from '../../adminContainer/Modal/refresh';

const useStyles = makeStyles(theme => ({
  DetailsBody: {
    padding: '45px 0',
    background: 'rgba(6, 83, 116, 0.1)',
  },
  h1: {
    fontSize: '25px',
    fontWeight: 700,
    position: 'absolute',
    top: '0',
  },
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down(900)]: {
      marginTop: '60px',
      marginBottom: '40px',
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

    '& img': {
      width: "90%",
      height: "110px",
      borderRadius: '10px',
      filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
    },
    [theme.breakpoints.down(900)]: {
      width: '20%',
      display: 'block',
      marginTop: '20px',

      '& img': {
        width: '100%'
      }
    }
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
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
  },
  cardTop: {},
  cardButton: {
    background: "transparent",
    padding: "10px 22px",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #065374",
    color: "#065374",
    fontFamily: "Poppins",
    fontSize: "14px",
    margin: "auto !important",
  },
  cardSpan: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "#C33E4D",
    paddingLeft: "4px",
    paddingRight: "4px",
    color: "#fff",
    fontFamily: "Poppins",
    // fontWeight: "600",
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

    [theme.breakpoints.down(700)]: {
      display: 'none'
    }
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
    borderRadius: '10px',

    [theme.breakpoints.down(900)]: {
      marginTop: '40px',
    }
  },
  productName: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "27px",

    [theme.breakpoints.down(700)]: {
      display: "block",
    }
  },
  priceSale: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "22px",

    [theme.breakpoints.down(800)]: {
      fontSize: "14px",
    }
  },
  productSaleSpan: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",

    [theme.breakpoints.down(800)]: {
      fontSize: "15px",
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

    [theme.breakpoints.down(700)]: {
      margin: '0'
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
    display: 'none',

    "& a": {
      fontSize: '15px',
      color: '#065374',
      borderBottom: '1px solid #065374'
    },
    [theme.breakpoints.down(700)]: {
      display: 'block'
    }
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
}))

const ProductDetails = () => {
  const [products, setProducts] = useState<any>();
  const { fetchProductClientDetails } = useActions()
  const [recommended, setRecommended] = React.useState([]);
  const [popular, setPopular] = React.useState([]);


  let pro: any = products?.Product;
  let des: any = products?.Description[0];

  const { id } = useParams();
  const classes = useStyles()
   
   const photo = pro?.map((i:any)=> i?.photos[0]) ;

  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  const loading = useTypedSelector(state => state.card.loading);

  async function getData() {
    const response: any = await getProductCards();
    setPopular(response.data.popular_products);
    setRecommended(response.data.recommended_products)
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
    setProducts(res?.data);
  }

  return (
    <>
      <BackToTop />
      <div style={{ background: '#fff', paddingTop: '40px' }}>
        <Container maxWidth="xl">
          <img src={BigPhoto} alt="" className={classes.BigPhoto} />
        </Container>
        <Container maxWidth="xl">

          {pro?.map((product: any) =>
            <div className={classes.BigPhotoBottom}>
              <h2 className={classes.productName}>{product?.name}</h2>
              <div className={classes.RightBtn}>
                <p className={classes.priceSale}>Chegirma narxda: <span className={classes.productSaleSpan}>{product?.after_discount.toLocaleString()} so’m</span></p>
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
              md={5}
              xs={12}
              style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
            >
              <h1 className={classes.h1}>Mahsulot haqida</h1>
              <Grid item xs={12}>
                <div className={classes.div}>
                  <ul className={classes.ulLi}>
                    <li>
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
                    <li>
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
            <Grid container item md={6} xs={12} className={classes.right}>
              <Grid item xs={12} md={9}>
                {
                  photo?.map((item:any) => (
                     <img style={{ width: '100%', height: '500px', borderRadius: '10px', filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))' }} src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item?.name}`} alt="Rasm bor edi" />  
                  ))
                }
                
              </Grid>
              <Grid item xs={12} md={3} className={classes.right2}>
                
                    <div className={classes.imgDiv}>
                    {
                  photo?.map((item:any) => (
                     <img src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item?.name}`} alt="Rasm bor edi" />  
                  ))
                }
                
                    </div>
              
               
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }} >
              <div>
                <h3 className={classes.ProductBottomName} >
                  {pro?.map((i:any ) => i?.name)}
                </h3>
                <h4 className={classes.ShortName} >{pro?.map((i:any ) => i?.short_name)}</h4>
              </div>
              <div>

                <div>
                  <p className={classes.price} > {pro?.map((i:any ) => i?.price.toLocaleString())} so'm </p>
                  <p className={classes.afterDiscount} > {pro?.map((i:any ) => i?.after_discount.toLocaleString())} so'm </p>
                  <p className={classes.discount} > {pro?.map((i:any ) => i?.discount)} %</p>
                </div>
              </div>
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
              rewind: true,
              width: "100%",
              gap: "0.5rem",
              perPage: 6,
              pagination: false,
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

            {loading ?
              <CircularProgress style={{ margin: 'auto', marginTop: '30px', marginBottom: '30px' }} /> :
              recommended &&
              recommended.map((item: any) => (
                <SplideSlide className={classes.splide}>
                  <Box className={classes.bodyCard} key={item.id}>
                    <Box>
                      <Link to={`/product/client/details/${item.id}`}>
                      {
                        
                        item?.photos.map((photo:any)=> (
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
                          marginTop: "10px",
                          marginBottom: "10px",
                          height: "30px",
                          fontWeight: '600'
                        }}
                      >
                        {item.short_name}
                      </h6>
                      <p
                        className={classes.cardPrice}
                        style={{
                          color: "#ff4802",
                          fontSize: "14px",
                          textDecoration: "line-through",
                          fontWeight: '600'
                        }}
                      >
                        {item?.price?.toLocaleString()} so'm
                      </p>
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
                      <span className={classes.cardSpan} style={{ fontWeight: '600' }}>
                        {item.discount}% off
                      </span>
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
              rewind: true,
              width: "100%",
              gap: "0.5rem",
              perPage: 6,
              pagination: false,
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
                        
                        item?.photos.map((photo:any)=> (
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
                            marginTop: "10px",
                            marginBottom: "10px",
                            height: "30px",
                            fontWeight: '600'
                          }}
                        >
                          {item.short_name}
                        </h6>
                        <p
                          className={classes.cardPrice}
                          style={{
                            color: "#ff4802",
                            fontSize: "14px",
                            textDecoration: "line-through",
                            fontWeight: '600'
                          }}
                        >
                          {item?.price?.toLocaleString()} so'm
                        </p>
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
                        <span className={classes.cardSpan}>
                          {item.discount}%
                        </span>
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


