import {
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import BigPhoto from "../../Images/image 26.png";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { getProductByBrand } from "../../Api/client/ClientBrandApi";
import { SelectChangeEvent } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CardDrop from "../../Images/Group 201.svg";
import CardFlex from "../../Images/Group 202.svg";
import BackToTop from "./Navbar/Navbar";
import Footer from "./Footer";
import { Link as NavLink } from "react-router-dom";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import Shop from "../../Images/baskets.png";
import cart2 from "../../Images/cart2.svg";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import cart1 from "../../Images/cart1.svg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/action";
import Notification from "../../adminContainer/Snackbar/Notification";

const useStyles = makeStyles({
  styledButton: {
    position: "absolute",
    zIndex: "100",
    right: "353px",
    top: "10px",
  },
  container: {
    textAlign: "center",
    marginTop: "38px !important",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
  },
  mainCard: {
    display: "flex",
    justifyContent: 'flex-start',

    flexWrap: "wrap",
  },
  bodyCard: {
    width: "235px !important",
    backgroundColor: "white",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    },
    padding: "28px 20px 20px 20px",
    margin: "20px 5px 20px 5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: "10px",
    cursor: "pointer",
    transition: ".5s",
    overflow: "hidden",
    borderBox: "box-sizing",
    textAlign: "center",
  },
  cardButton: {
    background: "white",
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
    fontWeight: "600",
    fontSize: "18px",
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
    margin: "40px 0px 70px 0px",
    borderRadius: "4px",
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
  back: {
    minWidth: "100%",
    height: "50px",
    alignItems: "center",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "600",
    border: "2px solid #C9CDD8",
    borderRadius: "2px",
    display: "flex",
    cursor: "pointer",
  },
  Select: {
    height: "50px",
    border: "2px solid #C9CDD8",
    borderRadius: "2px !important",
  },
  locationOfCard: {
    minWidth: "100%",
    height: "50px",
    border: "2px solid #C9CDD8",
    borderRadius: "2px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {
    width: "315px",
    marginRight: "unset !important",
    padding: "5px 5px 5px 5px !important",
  },
  paginationItem: {
    width: "100%",
    border: " solid 1px #9F9F9F !important",
    margin: "0 !important",
    borderRadius: "50px !important",
    padding: "20px 14px 20px 14px !important",
  },
  sortButton: {
    background: "transparent",
    border: "none",
    width: "auto",
    height: "auto",
    cursor: "pointer",
  },
  sortBodyCard: {
    width: '100% !important',
    display: "flex",
    padding: "20px 40px",
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
  },
  sortCardDescription: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "13px",
    color: "#000",
  },
});

const BrandPage = () => {
  const { products, error, loading } = useTypedSelector(
    (state) => state.productByCategoryReducer
  );
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productPrice, setProductPrice] = React.useState("");
  const [pageQty, setPageQty] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("react");
  const [sort, setSort] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setProductPrice(event.target.value);
  };

  const getProduct = async (id: any) => {
    let res: any = await getProductByBrand(`${page - 1}`, id);
    setProduct(res.data.content);
    console.log(res.data.content);
    setPageQty(res.data.totalPages);
  };
  const dispatch = useDispatch();


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
      <Container maxWidth="xl">
        <img src={BigPhoto} alt="" className={classes.BigPhoto} />
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={6} md={2} sm={4} order={{ xs: 1, sm: 1, md: 1 }}>
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
          <Grid item xs={12} md={6} order={{ xs: 4, sm: 4, md: 2 }}>
            <div className={classes.secondDiv}>
              <p>Natija 1-35</p>
            </div>
          </Grid>
          <Grid item xs={12} md={3} sm={4} order={{ xs: 3, sm: 3, md: 3 }}>
            <input
              type="text"
              placeholder="Mahsulot nomini kiriting..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className={classes.secondDiv}
              style={{
                background: "transparent",
                fontFamily: "Poppins",
                paddingLeft: "15px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={1}
            sm={4}
            style={{ display: "flex", justifyContent: "end" }}
            order={{ xs: 2, sm: 2, md: 4 }}
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
        <div>
          <div className={classes.mainCard}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  width: '200px !important ',
                  margin: "auto",
                  height: "300px",

                }}
              >
                <CircularProgress />
              </Box>
            ) : products ? (
              product
                .filter((val: any) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.short_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (val.price <= searchTerm) {
                    return val;
                  }
                })
                .map((item: any) =>
                  !sort ? (
                    <Box className={classes.bodyCard} key={item.id}>
                      <Link to={`/product/client/details/${item.id}`}>
                        <img
                          src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                          alt="img"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </Link>


                      <div>
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
                          style={{ marginBottom: "10px", height: "45px" }}
                        >
                          {item?.after_discount?.toLocaleString()} so'm
                        </p>
                      </div>
                      <div>
                        {item.availability === true ? (
                          <button className={classes.cardButton}
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
                      </div>

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

                      }                    </Box>
                  ) : (
                    <Box className={classes.sortBodyCard}>
                      <Link to={`/product/client/details/${item.id}`}>
                        <img
                          src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                          alt="img"
                          style={{
                            width: "250px",
                            height: "250px",
                            marginRight: "60px",
                          }}
                        />
                      </Link>
                      <div>
                        <h6 className={classes.sortCardTitle}>
                          {item.short_name}
                        </h6>
                        <p className={classes.sortCardDescription}>
                          {item.name}
                        </p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p
                            className={classes.sortCardPrice}
                            style={{
                              color: "#065374",
                              fontSize: "14px",
                              textDecoration: "line-through",
                            }}
                          >
                            {item?.price?.toLocaleString()} so'm
                          </p>
                          <span
                            className={classes.sortCardPrice}
                            style={{
                              marginLeft: "10px",
                              textDecoration: "none",
                            }}
                          >
                            {item?.after_discount?.toLocaleString()} so'm
                          </span>
                        </div>
                        {item.availability === true ? (
                          <button className={classes.sortCardButton}
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
                  )
                )
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
        <Grid
          container
          sx={{ mr: "50px", mb: "40px", mt: "40px" }}
          xs={12}
          direction="row"
          justifyContent="flex-end"
        >
          {!!pageQty && (
            <Pagination
              className={classes.pagination}
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)}
              sx={{ marginY: 3, marginX: "auto" }}
              renderItem={(item) => (
                <PaginationItem
                  className={classes.paginationItem}
                  component={NavLink}
                  to={`/product/by-brand/${id}?page=${item.page}`}
                  {...item}
                  variant="text"
                  shape={"rounded"}
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
};

export default BrandPage;
