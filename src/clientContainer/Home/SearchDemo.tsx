import {Input, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { searchProduct } from "../../Api/client/MainPageApi";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import Notification from "../../adminContainer/Snackbar/Notification";
import { useDispatch } from "react-redux";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const useStyles = makeStyles({
  searchInput: {
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
  const [param, setParam] = useState<any>();
  const [products, setProducts] = useState<any>();
  const handleInputChange = (e: any) => {
    setParam(e.target.value);
  };
  const dispatch = useDispatch();
  const getData = async () => {
    if (param?.length > 2) {
      const response: any = await searchProduct(param);
      setProducts(response.data.content);
    }
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
    <div style={{width: '100%'}}>
      <div style={{width: '100%'}} >
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
      <Paper sx={{ width: '94.7%', overflow: 'hidden', position: 'absolute', top: '127px', marginLeft: '-107px !important', borderRadius: '5px 5px 5px 5px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {param && products ? (
                products.map((item: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>
                      <Link to={`/product/client/details/${item.id}`}>
                        <img
                          src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photos[0].name}`}
                          alt="img"
                          style={{ width: "75px", height: "70px", padding: '12px 8px 6px 9px' }}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/product/client/details/${item.id}`}>
                        <h6
                          className={classes.cardTitle}
                          style={{
                            margin: 0,
                            marginTop: "10px",
                            marginBottom: "10px",
                            height: "30px",
                            fontFamily: "Poppins",
                            fontWeight: "400",
                            fontSize: "14px",
                          }}
                        >
                          {item.short_name}
                        </h6>
                      </Link>

                    </TableCell>
                    <TableCell>
                      <Link to={`/product/client/details/${item.id}`}>
                        <h6
                          className={classes.cardTitle}
                          style={{
                            margin: 0,
                            marginTop: "10px",
                            marginBottom: "10px",
                            height: "30px",
                            fontFamily: "Poppins",
                            fontWeight: "400",
                            fontSize: "14px",

                          }}
                        >
                          {item.price}
                        </h6>
                      </Link>

                    </TableCell>
                    <TableCell>
                      <Link to={`/product/client/details/${item.id}`}>
                        <ChevronRightIcon style={{color:'#000', fontSize: '18px' , marginRight: '10px'}} />
                      </Link>

                    </TableCell>
                  </TableRow>

                ))
              ) : (
                <>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default MainSearch;
