import { Box, CircularProgress, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductCards } from "../../Api/client/MainProductsApi";
import { useActions } from "../../hook/useActions";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { getProductByBrand } from "../../Api/client/ClientBrandApi";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";

const useStyles = makeStyles({
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
    padding: "35px 40px",
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
    background: "white",
    padding: "10px 39px 9px 38px",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: "solid 2px #065374",
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "14px",
    margin: "auto !important",
    '&:hover': {
      background: '#065374 !important',
      color: 'white !important',
      transitionDuration: '0.4s'
    }
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
});

const BrandClient = () => {
  const [discount, setDiscount] = useState([]);
  const classes = useStyles();
  async function getData() {
    const response: any = await getProductCards();
    setDiscount(response.data.all_brands);
  }

  const { brands, error, loading } = useTypedSelector(
    (state) => state.brandClient
  );

  const { fetchBrands } = useActions();
  useEffect(() => {
    getData();
    fetchBrands();
  }, []);

  const getProduct = async (id: any) => {
    const res: any = await getProductByBrand({}, id);
    console.log(res.data);
  };

  return (
    <>
      <h2 className={classes.title}>Brandlar</h2>
      <Container maxWidth="xl">
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
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "auto",
                  height: "300px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : brands ? (
              discount.map((item: any) => {
                const productByBrand = () => {
                  getProduct(item.id);
                };
                return (
                  <SplideSlide className={classes.splide}>
                    <Box className={classes.bodyCard} key={item.id}>
                      <Box>
                        <img
                          src={`${MINIO_FULL_ENDPOINT_FOR}/brand/${item.photo_name}`}
                          alt="img"
                          style={{
                            width: "150px",
                            height: "150px",
                            marginBottom: "20px",
                          }}
                        />
                        <Link to={`/product/by-brand/${item.id}`}>
                          <button
                            onClick={productByBrand}
                            className={classes.cardButton}
                          >
                            Barchasi
                          </button>
                        </Link>
                      </Box>
                    </Box>
                  </SplideSlide>
                );
              })
            ) : (
              <p>{error}</p>
            )}
          </Splide>
        </div>
      </Container>
    </>
  );
};

export default BrandClient;
