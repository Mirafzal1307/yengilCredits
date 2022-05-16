import { Box, Container, Input, InputAdornment, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { searchProduct } from "../../Api/client/MainPageApi";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import cart1 from "../../Images/cart1.svg";
import cart2 from "../../Images/cart2.svg";
import Notification from "../../adminContainer/Snackbar/Notification";
import { addToCart } from "../../redux/cart/action";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  searchInput: {
    
    marginTop: "9px !important",
    background: "white",
    width: "100% !important",
    "&::before": {
      content: "",
      display: "none !important",
    },
    border: '#065374',
    "&::after": {
      content: "",
      display: "none !important",
    },
    "&::placeholder": {
      color: "#9f9f9f !important",
    },
    padding: "1px 0px 1px 10px",
    borderRadius: "21px",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    color: "#000",
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
    borderRadius: "5px",
  },
  bottomText: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "22px",
    color: "#fff",
  },
  box_second: {
    margin: "15px 0 !important",
  },
});

const MainSearch = () => {
  const [param, setParam] = useState();
  const [products, setProducts] = useState<any>();
  const handleInputChange = (e: any) => {
    setParam(e.target.value);
  };
  const dispatch = useDispatch();
  const getData = async () => {
    const response: any = await searchProduct(param);
    setProducts(response.data.content);
  };
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    getData();
  }, [param]);

  const classes = useStyles();
  return (
    <>
      <div>
        <Input
          id="input-with-icon-adornment"
          className={classes.searchInput}
          placeholder="Izlash..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={handleInputChange}
        />

      </div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        flexWrap="wrap"
      >
        {param && products ? (
          products.map((item: any) => (
            <Box className={classes.bodyCard}>
              <Box>
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
            </Box>
          ))
        ) : (
          <>
     
          </>
        )}
      </Stack>
      <Notification notify={notify} setNotify={setNotify} />

    </>
  );
};

export default MainSearch;