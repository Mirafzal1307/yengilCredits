import {
  deleteAllFromCart,
  deleteFromCart,
  updatePrice,
} from "../../../redux/cart/action";
import { rootState } from "../../../redux/reducers/index";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Table,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackToTop from "../Navbar/Navbar";
import Footer from "../Footer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import { API_URL, MINIO_FULL_ENDPOINT_FOR } from "../../../constants/ApiConstants";
import React from "react";
import { postProductOrder } from "../../../Api/client/CardOrderAPI";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import emptyCard from "../../../Images/ShoppingCart.png";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Notification from "../../../adminContainer/Snackbar/Notification";
import MoneyIcon from "@mui/icons-material/Money";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";
import { postPhone } from "./VerificationsApi";
import axios from "axios";
import { cities } from "./cities";
const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}));
const Listbox = styled("ul")(({ theme }) => ({
  width: 450,
  margin: 0,
  padding: "0 0 0 10px",
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  borderRadius: "4px",
  backgroundColor: theme.palette.background.paper,
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  '& li[data-focus="true"]': {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));
const useStyles = makeStyles((theme) => ({
  style: {
    width: "450px",
    [theme.breakpoints.down(600)]: {
      width: "90%",
    },
  },
  MainPage: {
    marginTop: "20px",
    [theme.breakpoints.down(700)]: {
      marginTop: "60px",
    },
    [theme.breakpoints.down(600)]: {
      marginTop: "90px",
    },
    background: "transparent",
    border: "unset",
    display: "flex",
    alignItems: "center !important",
    cursor: "pointer",
    padding: "unset !important  ",
  },
  ArrowIcon: {
    fontFamily: "Poppins",
    fontSize: "20px !important",
    fontWeight: 400,
    color: "#000000",
  },
  Inside: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 400,
    color: "#000000",
  },
  basket: {
    fontFamily: "Poppins",
    fontSize: "32px",
    fontWeight: 600,

    [theme.breakpoints.down(600)]: {
      textAlign: "left",
      fontSize: "22px !important",
    },
  },
  text1: {
    margin: "unset",
    color: "rgb(103 103 103)",
    textAlign: "justify",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
  },
  text2: {
    margin: "unset",
    color: "rgb(167 167 167)",
    textAlign: "justify",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
  },
  text3: {
    margin: "unset",
    color: " rgb(222 222 222)",
    textAlign: "justify",
    paddingBottom: "40px ",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
  },
  textName: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    color: "#A2A6B0",
  },
  image: {
    width: "25%",
    textAlign: "left",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    color: "#000000",

    [theme.breakpoints.down(600)]: {
      textAlign: "center",
    },
  },
  NameTop: {
    borderBottom: "1px solid #CACDD8",
    marginBottom: "25px !important",
  },
  carts: {
    borderBottom: "1px solid #CACDD8",
    padding: "10px 0px 10px 0px !important",

    [theme.breakpoints.down(600)]: {
      "& td": {
        textAlign: "center",
        fontSize: "10px",
        "& h5": {
          fontSize: "10px",
        },
      },
    },
    "& img": {
      maxWidth: "120px",
      width: "100%",
      height: "auto",
    },
  },
  cartMin: {
    display: "flex",
    borderBottom: "1px solid #CACDD8",
    padding: "10px 0px 10px 0px !important",
    background: "#F5F7FF",
    border: "solid 0.5px #A2A6B0",
    borderRadius: "5px ",
    [theme.breakpoints.down(600)]: {
      "& td": {
        textAlign: "center",
        fontSize: "10px",
        "& h5": {
          fontSize: "10px",
        },
      },
    },
    "& img": {
      width: "75%",
      marginTop: "30px",
      marginLeft: "10px",
      height: "auto",
    },
  },
  name: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    color: "black",
  },
  nameRes: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    color: "black",
    [theme.breakpoints.down(500)]: {
      fontSize: "14px",
      fontWeight: 400,
    },
  },
  price: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    color: "black",
  },
  close: {
    borderRadius: "50px",
    border: "2px solid #CACDD8",
    color: "#A2A6B0",
  },
  dropDown: {
    background: "#F5F7FF",

    [theme.breakpoints.down(500)]: {
      width: "30px",
      height: "35px",
    },
  },
  dropDownMin: {
    background: "#F5F7FF",

    [theme.breakpoints.down(600)]: {
      width: "55px",
      height: "35px",
      padding: "0px",
    },
  },
  totalPage: {
    background: "#ecf0ff",
    padding: "17px",
  },
  TotalPageTop: {
    display: "flex",
    justifyContent: "space-between",
  },
  insideOfPage: {
    fontSize: "10px",
    fontWeight: 400,
    fontFamily: "Poppins",
    color: "#A2A6B0",
  },
  TotalAmount: {
    color: "#000000",
    fontSize: "24px",
    fontWeight: 600,
    marginTop: 0,
  },
  pPage: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: 600,
  },
  sale: {
    width: "100%",
    height: "50px",
    border: "unset !important",
    background: "#065374 !important",
    borderRadius: "50px !important",
    fontSize: "14px !important",
    fontWeight: 600,
    color: "white !important",
    fontFamily: "Poppins !important",
    cursor: "pointer !important",
    marginTop: " 20px !important",
    "&:disabled": {
      backgroundColor: "#065374 !important",
      opacity: 0.4,
    },
  },
  basketButton: {
    borderRadius: "50px !important",
    background: "black !important",
    color: "white !important",
    padding: "5px 20px !important",
    marginBottom: "30px !important",
    [theme.breakpoints.down(900)]: {
      marginTop: "20px !important",
    },
  },
  UniversalP: {
    margin: "0",
    paddingRight: "20px",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "13px",
  },
  Input: {
    background: "white",
    border: "1px solid #A2A6B0",
    boxSizing: "border-box",
    borderRadius: "4px",
    width: "100% !important",
    padding: "7px",
    margin: "5px 0px 5px 0px",
    "&:focus": {
      outline: "none",
    },
    fontFamily: "Poppins",
  },
  PhoneInputInput: {
    background: "white",
    border: "1px solid #A2A6B0",
    boxSizing: "border-box",
    borderRadius: "4px",
    width: "100% !important",
    padding: "7px",
    margin: "5px 0px 5px 0px",
  },
  PhoneInput: {
    background: "white",
    border: "1px solid #A2A6B0",
    boxSizing: "border-box",
    borderRadius: "4px",
    width: "100% !important",
    padding: "7px",
    margin: "5px 0px 5px 0px",
  },
  Grid: {
    width: "100%",
    [theme.breakpoints.down(900)]: {
      display: "flex",
      "& input": {
        width: "90%",
      },
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
      "& input": {
        width: "100%",
      },
    },
  },
  MinGrid: {
    [theme.breakpoints.up(600)]: {
      display: "none",
    },
  },
  MaxGrid: {
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  smsVerification: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    boxShadow: '3px 3px 3px black 3px 3px 3px ',
    padding: '15px',
    width: '500px',
    background: 'white',
    [theme.breakpoints.down(600)]: {

      top: "50%",
      width: '300px',
    }
  }
}));
export default function Cart() {
  const [alignment, setAlignment] = React.useState<string | null>("Naqd");
  const [fullName, setFullName] = React.useState(null);
  const [phone, setPhone] = React.useState<any>(null);
  const [city, setCity] = React.useState(null);
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const [start, setStart] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const { cartProducts } = useSelector((state: rootState) => state.cartreducer);
  const [open, setOpen] = React.useState(false);
  const [timer, setTimer] = React.useState('00:00');
  const [count, setCount] = React.useState(60)
  const [code, setCode] = React.useState(null)
  const [status, setStatus] = React.useState<any>(null)

  const Ref = React.useRef(null);
  const handleOpen = () => {
    if (phone.length == 13 && fullName) {
      setOpen(true);
      postPhone({ phone, fullName })
      onClickReset()
    }
  };
  const PostCode = async (mass: any) => {
    const phone = mass[0]
    const code = mass[1]
    axios({
      url: `${API_URL}/sms/validation/${code}`,
      method: "GET",
      headers: {
        "number": `${phone}`
      }
    })
      .then((res) => {
        setStatus(res.status);
      })
      .catch((err) => err)
  }

  const mass = [phone, code]
  const handleClose = () => {
    PostCode(mass)
    if (status == 200) {
      setOpen(false);
    }

  };
  const navigate = useNavigate();
  const refresh = (): void => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  const dispatch = useDispatch();
  let total = cartProducts.reduce(
    (subtotal, product) => subtotal + product.price * product.quantity,
    0
  );
  const products = cartProducts.map((i) => ({
    product_id: i.id,
    quantity: i.quantity,
    price: i.price,
  }));
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  const isEmpty = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let name = fullName;
    let ownAddress = address;
    let telPhone = phone;
    let ownCity = city;
    if (name !== null && telPhone !== null && ownCity !== null) {
      setDisabled(false);
    }
  };
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: cities,
    getOptionLabel: (option) => option.title,
  });
  let options: any = getInputProps();
  const address = options.value;
  function Submit(e: any) {
    e.preventDefault()
    const form = JSON.stringify({
      products: products,
      buyer: {
        full_name: fullName,
        address: city,
        phone: phone,
        city: address,
        pay_type: alignment,
      },
      total_price: total,
    });
    try {
      postProductOrder(form)
        .then(async (res: any) => {
          if (res.status === 200) {
            dispatch(deleteAllFromCart());
            setTimeout(() => {
              navigate("/");
            }, 1000)
            refresh();
            setNotify({
              isOpen: true,
              message: "Sizning ma'lumotlaringiz jo'natildi",
              type: "success",
            });
          }
        })
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: "Iltimos barchasini to'ldiring",
            type: "error",
          });
        });
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Xatolik yuz berdi...",
        type: "error",
      });
    }
  }
  const classes = useStyles();
  const inp = document.querySelectorAll("input");
  inp.forEach((element) => {
    if (element.value.length === 0) {
      element.style.borderColor = "#9F9F9F";
    } else if (element.value.length <= 3) {
      element.style.borderColor = "red";
      element.title = "Xatolik yuz berdi 3 tadan ko`p ma`lumot kiriting";
    } else {
      element.style.borderColor = "#9F9F9F";
    }
  });
  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date() as any);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total, minutes, seconds
    };
  }
  const startTimer = (e: any) => {
    let { total, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }
  const clearTimer = (e: any) => {
    setTimer('00:60');
    if (Ref.current) clearInterval(Ref.current);
    const id: any = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + count);
    return deadline;
  }
  React.useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const onClickReset = () => {
    clearTimer(getDeadTime());
  }
  const handleResetTimer = () => {
    if (timer === "00:00") {
      postPhone({ phone, fullName })
      onClickReset()
    }
  }
  return (
    <>
      <BackToTop />
      <Container maxWidth="xl">
        <div>
          <Link to={"/"}>
            <button className={classes.MainPage}>
              <div className={classes.Inside}> Bosh sahifa</div>
              <KeyboardArrowRightIcon className={classes.ArrowIcon} />
              <div className={classes.Inside}> Savatcha </div>
            </button>
          </Link>
        </div>
        <div>
          <h2 className={classes.basket}>Xarid savatchasi</h2>
        </div>
        <Grid container spacing={2}>
          {cartProducts.length === 0 ? (
            <Grid item xs={12} md={8}>
              <div>
                <h3>Siz hali hech narsa xarid qilmadingiz !</h3>
                <img
                  src={emptyCard}
                  alt="empty card"
                  style={{ width: "64%" }}
                />
              </div>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={8} className={classes.MinGrid}>
                {cartProducts.length > 0 && (
                  <Table>
                    <div>
                      {cartProducts &&
                        cartProducts?.map((product: any) => (
                          <div
                            key={product.id}
                            className={classes.cartMin}
                            style={{ margin: "15px 0px " }}
                          >
                            <div style={{ width: "25%" }}>
                              <Link
                                to={`/product/client/details/${product.id}`}
                              >
                                <img
                                  src={`${MINIO_FULL_ENDPOINT_FOR}/product/${product?.photos[0]?.name}`}
                                />
                              </Link>
                            </div>
                            <div style={{ width: "50%" }}>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <h5 className={classes.nameRes}>
                                    {product.short_name}
                                  </h5>
                                </div>
                              </div>
                              <div style={{ display: "flex" }}>
                                <h5 className={classes.nameRes}>
                                  {product.price.toLocaleString()} so'm
                                </h5>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                width: "25%",
                              }}
                            >
                              <Button
                                onClick={() =>
                                  dispatch(deleteFromCart(product))
                                }
                                value={product.short_name}
                              >
                                <CloseIcon className={classes.close} />
                              </Button>
                              <div style={{ width: "25%", marginLeft: "7px" }}>
                                <Select
                                  key={product.id}
                                  name="quantity"
                                  onChange={(event: any) =>
                                    dispatch(
                                      updatePrice(product, event.target.value)
                                    )
                                  }
                                  defaultValue={product.quantity}
                                  className={classes.dropDownMin}
                                >
                                  <MenuItem value="1">1</MenuItem>
                                  <MenuItem value="2">2</MenuItem>
                                  <MenuItem value="3">3</MenuItem>
                                  <MenuItem value="4">4</MenuItem>
                                  <MenuItem value="5">5</MenuItem>
                                  <MenuItem value="6">6</MenuItem>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: 600, fontSize: "17px" }}>
                            {" "}
                            Umumiy narx
                          </p>
                        </div>
                        <p style={{ fontWeight: 600, fontSize: "17px" }}>
                          {total.toLocaleString()} so'm
                        </p>
                      </div>
                    </div>
                  </Table>
                )}
              </Grid>
              <Grid item xs={12} md={8} className={classes.MaxGrid}>
                {cartProducts.length > 0 && (
                  <Table>
                    <thead>
                      <tr className={classes.NameTop}>
                        <th className={classes.image}>Rasm</th>
                        <th className={classes.image}>Nomi</th>
                        <th className={classes.image}>Son</th>
                        <th className={classes.image}>Narx</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts &&
                        cartProducts?.map((product: any) => (
                          <tr key={product.id} className={classes.carts}>
                            <td>
                              <Link
                                to={`/product/client/details/${product.id}`}
                              >
                                <img
                                  src={`${MINIO_FULL_ENDPOINT_FOR}/product/${product?.photos[0]?.name}`}
                                />
                              </Link>
                            </td>
                            <td>
                              <h5 className={classes.name}>
                                {product.short_name}
                              </h5>
                            </td>
                            <td style={{ width: "25%" }}>
                              <Select
                                key={product.id}
                                name="quantity"
                                onChange={(event: any) =>
                                  dispatch(
                                    updatePrice(product, event.target.value)
                                  )
                                }
                                defaultValue={product.quantity}
                                className={classes.dropDown}
                              >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                              </Select>
                            </td>
                            <td>
                              <h5 className={classes.price}>
                                {product.price.toLocaleString()} so'm
                              </h5>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteFromCart(product))
                                }
                                value={product.short_name}
                              >
                                <CloseIcon className={classes.close} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      <tr style={{ width: "100%" }} key="total">
                        <td>
                          <h4>Umumiy narx</h4>
                        </td>
                        <td>{total.toLocaleString()} so'm</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Grid>
            </>
          )}
          <Grid item xs={12} md={4}>
            <div className={classes.totalPage}>
              <form>
                <p className={classes.TotalAmount}>Qiymat</p>
                <div className={classes.TotalPageTop}>
                  <p className={classes.pPage}>Narx</p>
                  <p className={classes.pPage}>{total.toLocaleString()} so'm</p>
                </div>
                <div className={classes.TotalPageTop}>
                  <p className={classes.pPage}>Yetkazish Xaqqi</p>
                  <p className={classes.pPage}>$0.00</p>
                </div>
                <p className={classes.insideOfPage}>
                  (Standart tarif - Narx mahsulot/maqsadga qarab farq qilishi
                  mumkin. TECS xodimlari siz bilan bog'lanadi.)
                </p>
                <div className={classes.TotalPageTop}>
                  <p className={classes.pPage}>Taxi</p>
                  <p className={classes.pPage}>$0.00</p>
                </div>
                <div className={classes.TotalPageTop}>
                  <p className={classes.pPage}>Umumiy qiymat</p>
                  <p className={classes.pPage}>
                    {total.toLocaleString()}
                    so'm
                  </p>
                </div>
                <button
                  className={classes.sale}
                  onClick={() => setStart(true)}
                  style={start ? { display: "none" } : { display: "block" }}
                >
                  Xaridni boshlash
                </button>
                {start && (
                  <Grid item xs={12} sm={6} md={12}>
                    <h3>Yetkazish ma'lumotlari</h3>
                    <Box>
                      <p className={classes.UniversalP}>
                        Ismingiz <span style={{ color: "red" }}>*</span>{" "}
                      </p>
                      <input
                        type="text"
                        required
                        id="name"
                        onKeyUp={isEmpty}
                        onChange={(e: any) => setFullName(e.target.value)}
                        className={classes.Input}
                        disabled={status == 200 ? true : false}
                      />
                    </Box>
                    <Box>
                      <p className={classes.UniversalP}>
                        Telefon raqamingiz{" "}
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <PhoneInput
                        international
                        defaultCountry="UZ"
                        onChange={setPhone}
                        limitMaxLength
                        id="phone"
                        onKeyUp={isEmpty}
                        disabled={status == 200 ? true : false}
                      />
                    </Box>
                    <Box>
                      {status !== 200 &&
                        <button
                          onClick={handleOpen}
                          className={classes.sale}
                          type="button"
                        >
                          Tasdiqlash
                        </button>
                      }
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                      >
                        <Box className={classes.smsVerification} >
                          <h2>Tasdiqlash talab qilinadi</h2>
                          <p>
                            Quyidagi raqamga kod yubordik {phone}
                          </p>
                          <input onChange={(e: any) => setCode(e.target.value)} placeholder="Tasdiqlash kodini shu yerga kiriting..." className={classes.Input} required />
                          {status === 200 && <Typography sx={{ color: "green", fontSize: "14px" }}>Kod tasdiqlandi</Typography>}
                          {status === 400 && <Typography sx={{ color: "#FF4B4B", fontSize: "14px" }}>Telifon raqam yoki kod xato kiritildi</Typography>}
                          <button className={classes.sale} onClick={handleClose}>
                            {status === 200 && "Davom ettirish"} {status > 200 && "Davom ettirish"} {!status && "Tasdiqlash"}
                          </button>
                          <Typography onClick={handleResetTimer} sx={{ cursor: "pointer", textAlign: "center", mt: "20px", color: timer !== "00:00" ? "#FF4B4B" : "green" }} >Kodni qayta jo’natishni so’rash {timer !== "00:00" && timer}</Typography>
                        </Box>
                      </Modal>
                    </Box>
                  </Grid>
                )}
                {
                  status == 200 &&
                  <>
                    <Grid className={classes.Grid} container spacing={2}>
                      <Grid item xs={12} sm={6} md={12}>
                        <Box>
                          <p className={classes.UniversalP}>
                            Shahar, tuman <span style={{ color: "red" }}>*</span>
                          </p>
                          <div>
                            <div {...getRootProps()}>
                              <Input
                                {...getInputProps()}
                                className={classes.Input}
                              />
                            </div>
                            {groupedOptions.length > 0 ? (
                              <Listbox {...getListboxProps()}>
                                {(groupedOptions as typeof cities).map(
                                  (option, index) => (
                                    <li {...getOptionProps({ option, index })}>
                                      {option.title}
                                    </li>
                                  )
                                )}
                              </Listbox>
                            ) : null}
                          </div>
                        </Box>
                        <Box>
                          <p className={classes.UniversalP}>
                            Yashash manzili <span style={{ color: "red" }}>*</span>
                          </p>
                          <input
                            type="text"
                            required
                            onChange={(e: any) => setCity(e.target.value)}
                            className={classes.Input}
                            id="address"
                            onKeyUp={isEmpty}
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    <Box>
                      <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                      >
                        <ToggleButton
                          value="Naqd"
                          className="css-ueukts-MuiButtonBase-root-MuiToggleButton-root.Mui-selected"
                        >
                          <MoneyIcon />
                        </ToggleButton>
                        <ToggleButton value="Card">
                          <CreditCardIcon />
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <div style={{ display: "flex" }}>
                        <p className={classes.UniversalP}>Naqd</p>
                        <p className={classes.UniversalP}>Card</p>
                      </div>
                    </Box>

                    <div>
                      <button
                        onClick={
                          Submit
                        }
                        disabled={disabled}
                        className={classes.sale}
                      >
                        Xarid qilish
                      </button>
                    </div>
                  </>
                }
              </form>
            </div>
          </Grid>
        </Grid>
        <Button
          onClick={() => dispatch(deleteAllFromCart())}
          className={classes.basketButton}
        >
          Savatni Tozalash
        </Button>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
      <Footer />
    </>
  );
}
