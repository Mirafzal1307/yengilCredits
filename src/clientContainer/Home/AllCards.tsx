import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCards } from "../../Api/client/MainProductsApi";
import {
  Container,
  Box,
  Stack,
  Grid,
  SelectChangeEvent,
  PaginationItem,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { makeStyles } from "@mui/styles";
import BackToTop from "./Navbar/Navbar";
import BigPhoto from "../../Images/image 26.png";
import cart1 from "../../Images/cart1.svg";
import cart2 from "../../Images/cart2.svg";
import { getProductByBrand } from "../../Api/client/ClientBrandApi";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Link as NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Notification from "../../adminContainer/Snackbar/Notification";
import { addToCart } from "../../redux/cart/action";
import Footer from "./Footer";
import "./style.css";

const useStyles = makeStyles({
  styledButton: {
    position: "absolute",
    zIndex: "100",
    right: "353px",
    top: "10px",
  },
  container: {
    textAlign: "center",
    marginTop: "20px !important",
    marginBottom: "20px !important",
  },
  cardButtonSecond: {
    background: "transparent",
    padding: "10px 22px",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #C33E4D",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "14px",
    margin: "auto !important",
    color: "#C33E4D",
  },
  cardName: {
    marginTop: "0",
    marginBottom: "10px",
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: "13px",
  },
  null: {
    width: "220px",
    height: "1448px",
    background: "#C4C4C4",
  },
  BigPhoto: {
    width: "100% ",
    margin: "60px 0px 0px 0px",
    borderRadius: "3px",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
  },
  mainCard: {
    display: "flex",

    flexWrap: "wrap",
  },
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
    fontWeight: "600",
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
    fontWeight: "600",
    borderBottomRightRadius: "10px",
  },
  cardTitle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "13px",
    color: "#000",
  },
  cardPrice: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "13px",
    color: "#000",
    margin: 0,
  },
  cardPriceDiscount: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "600",
    marginTop: "0",
    marginBottom: "10px",
  },
  splide: {
    marginTop: "10px !important",
    marginBottom: "10px !important",
  },
  cardBottom: {
    background: "transparent",
    padding: "10px 22px",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #065374",
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "14px",
    margin: "auto !important",
  },
  bottomText: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "22px",
    color: "#fff",
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
  searchText: {
    padding: "10px 80px 10px 15px",
    border: "2px solid #C9CDD8",
    background: "transparent",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: "400",
      color: "#A2A6B0",
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  back: {
    minWidth: "100%",
    height: "40px",
    alignItems: "center",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "600",
    border: "2px solid #C9CDD8",
    borderRadius: "5px",
    display: "flex",
    cursor: "pointer",
  },
  secondDiv: {
    minWidth: "100%",
    height: "50px",
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "400",
    color: "#A2A6B0",
    border: "2px solid #C9CDD8",
    borderRadius: "2px",
    "& p": {
      paddingLeft: "15px",
    },
    "&::placeholder": {
      color: "#A2A6B0",
    },
    "&:focus": {
      outline: "none",
    },
  },
  locationOfCard: {
    minWidth: "100%",
    height: "40px",
    border: "2px solid #C9CDD8",
    borderRadius: "2px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Select: {
    height: "50px",
    border: "2px solid #C9CDD8",
    borderRadius: "2px !important",
  },
  filterPrice: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "13px",
    color: "#A2A6B0",
  },
  lowPrice: {
    color: "#000",
  },
  ArrowBackIosNewIcon: {
    paddingRight: "5px ",
  },
  sortButton: {
    background: "transparent",
    border: "none",
    width: "auto",
    height: "auto",
    cursor: "pointer",
  },
  sortBodyCard: {
    width: "100%",
    display: "flex",
    backgroundColor: "white",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    },
    transition: ".5s",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  sortCardTitle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    color: "#000",
    marginTop: "15px",
    marginBottom: "0 !important",
  },
  sortCardPrice: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "17px",
    color: "#000",
    margin: 0,
    marginBottom: "20px",
  },
  sortCardButton: {
    background: "transparent",
    padding: "7px 12px",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #065374",
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "18px",
    marginRight: "10px",
  },
  sortCardDescription: {
    margin: "0 !important",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "13px",
    color: "#000",
  },
  pagination: {
    width: "315px",
    justifyContent: "center",
    margin: "10px !important",
    padding: "5px 5px 5px 5px !important",
  },
  paginationItem: {
    width: "100%",
    border: " solid 1px #065374 !important",
    margin: "0 !important",
    display: "flex",
    justifyContent: "center",
    borderRadius: "50px !important",
  },
});

const AllCards = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [sort, setSort] = useState(true);
  const [pageQty, setPageQty] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("react");
  const [searchTerm, setSearchTerm] = useState("");
  const getData = async (id: any) => {
    const response: any = await getAllCards(id, `${page - 1}`);
    setProducts(response.data.content);
    setPageQty(response.data.totalPages);
  };
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setProductPrice(event.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getData(id);
    if (pageQty < page) {
      setPage(1);
    }
  }, [query, page]);

  const getProduct = async (id: any) => {
    let res: any = await getProductByBrand({}, id);
    setProducts(res.data.content);
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <>
      <BackToTop />
      <Container className={classes.container} maxWidth="xl">
        <img src={BigPhoto} alt="" className={classes.BigPhoto} />
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={6} md={1} sm={4}>
            <Link to="/">
              <button className={classes.back}>
                {" "}
                <ArrowBackIosNewIcon
                  className={classes.ArrowBackIosNewIcon}
                />{" "}
                Orqaga
              </button>
            </Link>
          </Grid>

          <Grid
            item
            xs={6}
            md={1}
            sm={4}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <div className={classes.locationOfCard}>
              <button
                className={classes.sortButton}
                onClick={() => setSort(false)}
                style={sort ? { opacity: "40%" } : { color: "#000 !important" }}
              >
                <AppsIcon />
              </button>
              <button
                className={classes.sortButton}
                onClick={() => setSort(true)}
                style={
                  !sort ? { opacity: "40%" } : { color: "#000 !important" }
                }
              >
                <FormatListBulletedIcon />
              </button>
            </div>
          </Grid>
        </Grid>
        <Container maxWidth="xl">
          {!sort ? (
            <div className={classes.mainCard}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                flexWrap="wrap"

              // flexDirection='column'
              >
                {products
                  .map((item: any, key: any) => (
                    <Box
                      className={classes.bodyCard}
                      key={key}
                      sx={{ margin: "10px 10px !important" }}
                    >
                      <Box>
                        <Link to={`/product/client/details/${item.id}`}>
                          <img
                            src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                            alt="img"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </Link>
                        <p
                          className={classes.cardTitle}
                          style={{
                            margin: 0,
                            marginTop: "10px",
                            marginBottom: "10px",
                            height: "30px",
                          }}
                        >
                          {item.short_name}
                        </p>
                        {/* <p
                          className={classes.cardPrice}
                          style={{
                            color: "#065374",
                            fontSize: "14px",
                            textDecoration: "line-through",
                          }}
                        >
                          {item?.price?.toLocaleString()} so'm
                        </p> */}
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
                          {
                            Math.floor(item?.after_discount * 1.44 / 12).toLocaleString()
                          } so'm
                          <span style={{
                            background: 'red',
                            color: 'white',
                            fontSize: '10px',
                            borderRadius: '10px',
                            padding: '1px 6px',
                            marginLeft: '10px',

                          }} >
                            x 12 oy
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
                          {item?.after_discount?.toLocaleString()} so'm
                        </p>
                        {item.availability === true ? (
                          <button
                            className={classes.cardButton}
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
                              src={cart1}
                              alt="img"
                              style={{ marginRight: "5px" }}
                            />
                            Savatchaga
                          </button>
                        ) : (
                          <button className={classes.cardButtonSecond}>
                            <img
                              src={cart2}
                              alt="img"
                              style={{
                                marginRight: "5px",
                              }}
                            />
                            Sotuvda yo'q
                          </button>
                        )}
                        {/* <span className={classes.cardSpan}>
                          {item.discount}%
                        </span> */}
                      </Box>
                    </Box>
                  ))}
              </Stack>
            </div>
          ) : (
            <div>
              <Stack flexDirection="column">
                {products.map((item: any, key: any) => (
                  <Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <Box className={classes.sortBodyCard} key={key}>
                        <Link
                          to={`/product/client/details/${item.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "25%",
                          }}
                        >
                          <img
                            src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                            alt="img"
                            style={{
                              width: "80%",
                              height: "70%",
                              // padding: "20px",
                              alignSelf: "center !important",
                              justifySelf: "center !important",
                            }}
                          />
                        </Link>
                        <div style={{ alignSelf: "center" }}>
                          <h6 className={classes.sortCardTitle}>
                            {item.short_name}
                          </h6>
                          <p className={classes.sortCardDescription}>
                            {item.name}
                          </p>
                          <div
                            style={{ display: "flex", flexDirection: 'column' }}
                          >
                            <p
                              className={classes.sortCardPrice}
                              style={{
                                fontWeight: "600",
                                fontFamily: "Poppins",
                                fontSize: "18px",
                                color: "#000",
                                margin: 0,
                              }}
                            >
                              {
                                Math.floor(item?.after_discount * 1.44 / 12).toLocaleString()
                              } so'm
                              <span style={{
                                background: 'red',
                                color: 'white',
                                fontSize: '10px',
                                borderRadius: '10px',
                                padding: '1px 6px',
                                marginLeft: '10px',

                              }} >
                                x 12 oy
                              </span>
                            </p>
                            <p
                              className={classes.sortCardPrice}
                              style={{
                                marginBottom: "10px",
                                height: "45px",
                                fontWeight: "500",
                              }}
                            >
                              {item?.after_discount?.toLocaleString()} so'm
                            </p>
                          </div>
                          {item.availability === true ? (
                            <button
                              className={classes.sortCardButton}
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
                                src={cart1}
                                alt="img"
                                style={{ marginRight: "5px" }}
                              />
                              Savatchaga
                            </button>
                          ) : (
                            <button className={classes.sortCardButton}>
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
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </div>
          )}

          <Grid
            container
            sx={{ mb: "20px", mt: "20px", justifyContent: "center !important" }}
            xs={12}
            direction="row"
          >
            {!!pageQty && (
              <Pagination
                className={
                  `${classes.pagination}` && `css-wjh20t-MuiPagination-ul`
                }
                count={pageQty}
                page={page}
                onChange={(_, num) => setPage(num)}
                sx={{
                  margin: "10px !important",
                  justifyContent: "center !important",
                }}
                renderItem={(item) => (
                  <PaginationItem
                    className={classes.paginationItem}
                    component={NavLink}
                    to={`/product/product-by-category/${id}?page=${item.page}`}
                    {...item}
                    variant="text"
                    shape={"rounded"}
                    sx={{ justifyContent: "center !important" }}
                  />
                )}
              />
            )}
          </Grid>
        </Container>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
      <Footer />
    </>
  );
};

export default AllCards;
