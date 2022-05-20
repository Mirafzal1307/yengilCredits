import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCards } from "../../Api/client/MainProductsApi";
import {
  Container,
  Box,
  Stack,
  Grid,
  FormControl,
  Select,
  MenuItem,
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
import { Link as NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import Notification from "../../adminContainer/Snackbar/Notification";
import { addToCart } from "../../redux/cart/action";


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
    margin: "40px 0px 70px 0px",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
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
      color: "#A2A6B0"
    },
    "&:focus": {
      outline: "none",
    },
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
    width: "100% !important",
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
});

const AllCards = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [sort, setSort] = useState(false);
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
    if(pageQty < page){
      setPage(1)
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
            {/* <FormControl
              sx={{ minWidth: 300 }}
              style={{
                minWidth: "100%",
                padding: "0 !important",
                margin: "0 !important",
              }}
            >
              <Select
                value={productPrice}
                onChange={handleChangeCategory}
                displayEmpty
                className={classes.Select}
              >
                <MenuItem value="">
                  <b className={classes.filterPrice}>
                    {" "}
                    Saralash:
                    <span className={classes.lowPrice}> Narx(past)</span>{" "}
                  </b>
                </MenuItem>
                {products.map((item: any, index: any) => (
                  <MenuItem value={item?.price?.toLocaleString()} key={index}>
                    {item?.price?.toLocaleString()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
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
            {console.log(searchTerm)}
          </Grid>
          <Grid item xs={6} md={1} sm={4} order={{ xs: 2, sm: 2, md: 4 }}>
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
          <Stack
            direction={sort ? { xs: "column" } : { xs: "row" }}
            spacing={2}
            style={
              sort
                ? { flexWrap: "nowrap", flexDirection: "column" }
                : {
                    flexWrap: "wrap",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
            }
          >
            {products
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
              .map((item: any, key: any) =>
                !sort ? (
                  <Box className={classes.bodyCard} key={key}>
                    <Link to={`/product/client/details/${item.id}`}>
                      <img
                        src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                        alt="img"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </Link>
                    <h6
                      className={classes.cardTitle}
                      style={{
                        margin: 0,
                        marginTop: "10px",
                        marginBottom: "10px",
                        height: "30px",
                      }}
                    >
                      {item.short_name}
                    </h6>
                    <p
                      className={classes.cardPrice}
                      style={{
                        color: "#065374",
                        fontSize: "14px",
                        textDecoration: "line-through",
                      }}
                    >
                      {item?.price?.toLocaleString()} so'm
                    </p>
                    <p
                      className={classes.cardPrice}
                      style={{ marginBottom: "10px", height: "45px" }}
                    >
                      {item?.after_discount?.toLocaleString()} so'm
                    </p>

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
                          src={cart1}
                          alt="img"
                          style={{ marginRight: "5px" }}
                        />
                        Savatchaga
                      </button>
                    ) : (
                      <button className={classes.cardButton}>
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
                    <span className={classes.cardSpan}>{item.discount}%</span>
                  </Box>
                ) : (
                  <Box className={classes.sortBodyCard} key={key}>
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
                      <p className={classes.sortCardDescription}>{item.name}</p>
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
              )}
          </Stack>
          <Notification notify={notify} setNotify={setNotify} />
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
                  to={`/all/card/${id}?page=${page}`}
                  {...item}
                  variant="text"
                  shape={"rounded"}
                />
              )}
            />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AllCards;
