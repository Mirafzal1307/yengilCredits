import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams, Link, Link as NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch } from "react-redux";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BigPhoto from "../../Images/image26.png";
import { useTypedSelector } from "../../hook/useTypedSelector";
import cart1 from "../../Images/cart1.svg";
import cart2 from "../../Images/cart2.svg";

import { getProductFromCategoryById } from "../../Api/admin/AdminProductApi";
// import { SelectChangeEvent } from "@mui/material";

import BackToTop from "./Navbar/Navbar";
import Footer from "./Footer";
import { getCategoryForClient } from "../../Api/client/ClientCategoryApi";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import shop from "../../Images/baskets.png";

import { addToCart } from "../../redux/cart/action";
import Notification from "../../adminContainer/Snackbar/Notification";
import { useActions } from "../../hook/useActions";
import "./style.css";

const useStyles = makeStyles(() => ({
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
    fontWeight: "400",
    fontSize: "13px",
    color: "#065374",
    margin: 0,
  },
  cardPriceDiscount: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "0",
    marginBottom: "10px",
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
  },
  locationOfCard: {
    minWidth: "100%",
    height: "40px",
    border: "2px solid #C9CDD8",
    borderRadius: "5px",
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
  BigPhoto: {
    width: "100% ",
    margin: "60px 0px 0px 0px",
    borderRadius: "3px",
  },
  active: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "16px",
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
  img: {
    width: "auto",
    height: "70%",
    alignSelf: "center !important",
    justifySelf: "center !important",
  },
}));
function CategoryProducts(): JSX.Element {
  const { error, loading } = useTypedSelector(
    (state) => state.productByCategoryReducer,
  );
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = React.useState<any>();
  // const [productPrice, setProductPrice] = React.useState("");
  // const [value, setValue] = React.useState(0);
  const [pageQty, setPageQty] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("react");
  const [sort, setSort] = useState<boolean>(false);
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const getProduct = async (id: any): Promise<any> => {
    const res: any = await getProductFromCategoryById(id, `${page - 1}`, {});
    setProduct(res.data.content);
    setPageQty(res.data.totalPages);
  };
  const getCategoryForCleintPage = async (): Promise<any> => {
    const response: any = await getCategoryForClient();
    setCategory(response.data.menu);
  };
  React.useEffect(() => {
    getCategoryForCleintPage();
  }, []);
  const { fetchCards } = useActions();
  useEffect(() => {
    fetchCards();
  }, []);
  useEffect(() => {
    getProduct(id);
    if (pageQty < page) {
      setPage(1);
    }
  }, [query, page]);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <BackToTop />
      <Container className={classes.container} maxWidth="xl">
        <img src={BigPhoto} alt="" className={classes.BigPhoto} />
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={3} item>
          <Grid item xs={6} md={1} sm={4}>
            <Link to="/">
              <button className={classes.back} type="button">
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
                type="button"
              >
                <AppsIcon />
              </button>
              <button
                className={classes.sortButton}
                onClick={() => setSort(true)}
                type="button"
                style={
                  !sort ? { opacity: "40%" } : { color: "#000 !important" }
                }
              >
                <FormatListBulletedIcon />
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        {!sort ? (
          <div className={classes.mainCard}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              flexWrap="wrap"
            >
              {product.map((item: any) => (
                <Box
                  className={classes.bodyCard}
                  key={item.id}
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
                    <p
                      className={classes.cardPrice}
                      style={{
                        color: "#065374",
                        fontSize: "14px",
                        textDecoration: "line-through",
                      }}
                    >
                      {item?.price?.toLocaleString()} so`m
                    </p>
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
                      className={classes.cardPriceDiscount}
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
                          src={shop}
                          alt="img"
                          style={{ marginRight: "5px" }}
                        />
                        Savatchaga
                      </button>
                    ) : (
                      <button
                        className={classes.cardButtonSecond}
                        type="button"
                      >
                        <img
                          src={cart2}
                          alt="img"
                          style={{
                            marginRight: "5px",
                          }}
                        />
                        Sotuvda yo`q
                      </button>
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </div>
        ) : (
          <div>
            <Stack flexDirection="column">
              {product.map((item: any) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={item.id}>
                  <Box className={classes.sortBodyCard}>
                    <Link
                      to={`/product/client/details/${item.id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40%",
                      }}
                    >
                      <img
                        src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                        alt="img"
                        className={classes.img}
                      />
                    </Link>
                    <div style={{ alignSelf: "center" }}>
                      <h6 className={classes.sortCardTitle} key={item.id}>
                        {item.short_name}
                      </h6>
                      <p className={classes.sortCardDescription}>{item.name}</p>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                              padding: "1px 5 px",
                              marginLeft: "10px",
                            }}
                          >
                            12 oy
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
                          {item?.after_discount?.toLocaleString()} so`m
                        </p>
                      </div>
                      {item.availability === true ? (
                        <button
                          className={classes.sortCardButton}
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
                            src={cart1}
                            alt="img"
                            style={{ marginRight: "5px" }}
                          />
                          Savatchaga
                        </button>
                      ) : (
                        <button
                          className={classes.sortCardButton}
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
                    </div>
                  </Box>
                </Grid>
              ))}
            </Stack>
          </div>
        )}
        <Grid
          container
          item
          sx={{ mb: "20px", mt: "20px", justifyContent: "center !important" }}
          xs={12}
          direction="row"
        >
          {!!pageQty && (
            <Pagination
              className={
                `${classes.pagination}` && "css-wjh20t-MuiPagination-ul"
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
                  shape="rounded"
                  sx={{ justifyContent: "center !important" }}
                />
              )}
            />
          )}
        </Grid>
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
      <Footer />
    </>
  );
}

export default CategoryProducts;
