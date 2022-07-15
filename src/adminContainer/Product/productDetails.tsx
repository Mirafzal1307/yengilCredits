import React from "react";
import { Button } from "@material-ui/core";
import { useParams, Link as RouterLink, Link } from "react-router-dom";
import { CircularProgress, Container, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useActions } from "../../hook/useActions";

const useStyles = makeStyles({
  itemBox: {
    display: "flex",
    paddingTop: "40px",
  },
  itemBoxprice: {
    display: "flex",
    marginTop: "40px",
  },
  boxFirstTitle: {
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
  },
  boxSecondTitle: {
    color: "#464646",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
    marginLeft: "auto",
  },
  boxCategoryTitle: {
    color: "#464646",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
    marginLeft: "auto",
    paddingBottom: "10px !important",
  },
  forBoxInput: {
    padding: "8px 340px 9px 15px",
    margin: "10px 0px 20px 0px !important",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    border: "2px solid #9F9F9F",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "17px",
    color: "#303030",
  },
  forBoxInputPrice: {
    padding: "8px 50px 9px 15px",
    marginRight: "15px",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    border: "2px solid #9F9F9F",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#9F9F9F",
  },
  forBoxInputDiscount: {
    padding: "8px 2px 9px 8px",
    width: "40px",
    marginTop: "5px",
    marginRight: "10px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    border: "2px solid #9F9F9F",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#9F9F9F",
  },
  forButton: {
    padding: "9px 34px 8px 30px",
    background: "#065374",
    color: "#fff",
    borderRadius: "5px",
    fontFamily: "Poppins",
    border: "none",
  },
  inBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  CreateContainerTitle: {
    maxWidth: "1200px !important",
    background: "white",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2) !important",
    borderRadius: "5px",
    padding: "40px 50px  !important",
  },
  CreateProductTitle: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    color: "#000",
  },
  GeneralInfoInside: {
    marginLeft: "105px",
  },
  Select: {
    padding: "none !important",
    border: "2px solid #9F9F9F",
    borderRadius: "5px !important",
  },
  FormControl: {
    padding: "none !important",
  },
  characterName: {
    padding: "8px 40px 9px 15px",
    margin: "10px 0px 20px 0px !important",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    border: "2px solid #9F9F9F",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#9F9F9F",
  },
  characterValue: {
    padding: "8px 40px 9px 15px",
    margin: "10px 0px 20px 0px !important",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    border: "2px solid #9F9F9F",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#9F9F9F",
  },
  AllCategory: {
    padding: "none !important",
  },
  Pricebox: {
    marginLeft: "145px !important",
    display: "flex",
  },
  spanDiscount: {
    fontSize: "22px",
    fontWeight: "normal",
    fontStyle: "normal",
  },
  CategoryBox: {
    marginLeft: "220px !important",
  },
  ProducutPhoto: {
    marginLeft: "220px !important",
  },
  characterBox: {
    marginLeft: "40px !important",
  },
  statusBox: {
    marginLeft: "70px !important",
  },
  cancel: {
    backgroundColor: "#065374 !important",
    borderRadius: "5px !important",
    color: "#fff !important",
    marginLeft: "15px !important",
  },
  save: {
    backgroundColor: "#FF4B4B !important",
    borderRadius: "5px !important",
    color: "#fff !important",
    marginLeft: "15px !important",
  },
  img: {
    width: "50%",
    borderRadius: "10px",
  },
  forPrice: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "30px",
    color: "#000",
    margin: 0,
  },
  productName: {
    marginLeft: "180px",
    fontFamily: "Poppins",
    fontSize: "30px",
    fontWeight: 400,
    marginBottom: "100px",
    textTransform: "capitalize",
  },
  ProductName: {
    margin: "unset",
    marginBottom: "37px",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
    color: "#065374",
  },
  BrandName: {
    fontFamily: "Poppins",
    fontWeight: 800,
    fontSize: "22px",
    color: "#065374",
  },
  CharacterAndProperty: {
    background: " rgba(6, 83, 116, 0.1)",
    padding: "30px 60px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  Character: {
    listStyle: "none !important",
    fontSize: "17px !important",
    fontWeight: 300,
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
  title1: {
    marginTop: "100px",
  },
});

function ProductDetails(): JSX.Element {
  const { products, error, loading } = useTypedSelector((state) => state.byId);
  const pro: any = products?.Product?.[0];
  const des: any = products?.Description?.[0];
  const classes = useStyles();
  const { id } = useParams();
  const { fetchProductsById } = useActions();
  React.useEffect(() => {
    fetchProductsById(id);
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box sx={{ ml: "0", mr: "50px", mb: "50px" }}>
        <h2 className={classes.title1}>О продукте</h2>
        <Container
          style={{ marginTop: "20px" }}
          className={classes.CreateContainerTitle}
        >
          {loading && products ? (
            <CircularProgress disableShrink />
          ) : (
            <>
              <Grid item xs={12}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 className={classes.ProductName}>{pro?.name}</h3>
                  <i className={classes.BrandName}>{pro?.brand?.name}</i>
                </div>
              </Grid>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  >
                    <img
                      src={`${MINIO_FULL_ENDPOINT_FOR}/product/${pro?.photos?.[0].name}`}
                      alt="Rasm bor edi"
                      className={classes.img}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.CharacterAndProperty}>
                    <li className={classes.Character}>
                      <h4>Названия характеристики</h4>
                      {des?.map((item: any) => (
                        <div style={{ flexDirection: "column" }}>
                          {item?.character_name}
                        </div>
                      ))}
                    </li>
                    <li
                      className={classes.Character}
                      style={{ textAlign: "right" }}
                    >
                      <h4>Свойства характеристики</h4>
                      {des?.map((item: any) => (
                        <div style={{ flexDirection: "column" }}>
                          {item?.character_value}
                        </div>
                      ))}
                    </li>
                  </div>
                </Grid>
              </Box>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <div>
                    <h3 className={classes.ProductBottomName}>{pro?.name}</h3>
                    <h4 className={classes.ShortName}>{pro?.short_name}</h4>
                  </div>
                  <div>
                    <div>
                      <p className={classes.price}> {pro?.price} сум </p>
                      <p className={classes.afterDiscount}>
                        {" "}
                        {pro?.after_discount?.toLocaleString()} сум{" "}
                      </p>
                      <p className={classes.discount}> {pro?.discount} %</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Link to="/product">
                        <Button className={classes.save}>Отменить</Button>
                      </Link>
                      <Button
                        component={RouterLink as any}
                        to="/product"
                        className={classes.cancel}
                      >
                        Хранить
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </>
          )}
          {error ? <h1>error</h1> : null}
        </Container>
      </Box>
    </Box>
  );
}

export default ProductDetails;
