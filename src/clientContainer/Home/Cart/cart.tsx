import { deleteAllFromCart, deleteFromCart, updatePrice } from '../../../redux/cart/action';
import { rootState } from '../../../redux/reducers/index';
import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, Table } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import BackToTop from '../Navbar/Navbar';
import Footer from '../Footer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { MINIO_FULL_ENDPOINT_FOR } from '../../../constants/ApiConstants';
import React from "react";
import { postProductOrder } from '../../../Api/client/CardOrderAPI';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import emptyCard from '../../../Images/ShoppingCart.png';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Notification from '../../../adminContainer/Snackbar/Notification';
import { SelectChangeEvent } from "@mui/material";
import MoneyIcon from '@mui/icons-material/Money';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import { refresh } from '../../../adminContainer/Modal/refresh';
// import { refresh } from '../../../adminContainer/Modal/refresh';
import './style.css'
import { useNavigate } from "react-router-dom";
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 450,
  margin: 0,
  padding: "0 0 0 10px",
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  borderRadius: '4px',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li[data-focus="true"]': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3,
};


const useStyles = makeStyles(theme => ({
  style:{
    width: '450px',
    [theme.breakpoints.down(600)]:{
      width: '90%',
    }
   
  },
  MainPage: {
    marginTop: '20px',
    [theme.breakpoints.down(700)]: {
      marginTop: '60px',
    },
    [theme.breakpoints.down(600)]: {
      marginTop: '90px',
    },
    background: 'transparent',
    border: 'unset',
    display: 'flex',
    alignItems: 'center !important',
    cursor: 'pointer',
    padding: 'unset !important  '
  },
  ArrowIcon: {
    fontFamily: 'Poppins',
    fontSize: '20px !important',
    fontWeight: 400,
    color: '#000000'
  },
  Inside: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 400,
    color: '#000000'
  },
  basket: {
    fontFamily: 'Poppins',
    fontSize: '32px',
    fontWeight: 600,

    [theme.breakpoints.down(600)]: {
      textAlign: "left",
      fontSize: '22px !important',
    },
  },
  text1: {
    margin: 'unset',
    color: 'rgb(103 103 103)',
    textAlign: 'justify',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px'

  },
  text2: {
    margin: 'unset',
    color: 'rgb(167 167 167)',
    textAlign: 'justify',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px'
  },
  text3: {
    margin: 'unset',
    color: ' rgb(222 222 222)',
    textAlign: 'justify',
    paddingBottom: '40px ',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px'
  },
  textName: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    color: '#A2A6B0',

  },
  image: {
    width: '25%',
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    color: '#000000',

    [theme.breakpoints.down(600)]: {
      textAlign: "center",
    },
  },
  NameTop: {
    borderBottom: '1px solid #CACDD8',
    marginBottom: '25px !important'
  },
  carts: {
    borderBottom: '1px solid #CACDD8',
    padding: '10px 0px 10px 0px !important',

    [theme.breakpoints.down(600)]: {
      "& td": {
        textAlign: "center",
        fontSize: '10px',
        "& h5": {
          fontSize: '10px'
        }
      },
    },
    '& img': {
      maxWidth: '120px',
      width: '100%',
      height: 'auto'
    }
  },
  cartMin: {
    display: 'flex',
    borderBottom: '1px solid #CACDD8',
    padding: '10px 0px 10px 0px !important',
    background: '#F5F7FF',
    border: 'solid 0.5px #A2A6B0',
    borderRadius: '5px ',
    [theme.breakpoints.down(600)]: {
      "& td": {
        textAlign: "center",
        fontSize: '10px',
        "& h5": {
          fontSize: '10px'
        }
      },
    },
    '& img': {
      width: '75%',
      marginTop: '30px',
      marginLeft: "10px" ,
      height: 'auto'
    }
  },
  name: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    color: 'black',

  },
  nameRes: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    color: 'black',
    [theme.breakpoints.down(500)]: {
      fontSize: '14px',
      fontWeight: 400,
    }
  },
  price: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    color: 'black'
  },
  close: {
    borderRadius: '50px',
    border: '2px solid #CACDD8',
    color: '#A2A6B0'
  },
  dropDown: {
    background: '#F5F7FF',

    [theme.breakpoints.down(500)]: {
      width: "30px",
      height: '35px',
    },
  },
  dropDownMin: {
    background: '#F5F7FF',

    [theme.breakpoints.down(600)]: {
      width: "55px",
      height: '35px',
      padding: '0px'
    },
  },
  totalPage: {
    background: '#ecf0ff',
    padding: '17px'
  },
  TotalPageTop: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  insideOfPage: {
    fontSize: '10px',
    fontWeight: 400,
    fontFamily: 'Poppins',
    color: '#A2A6B0'
  },
  TotalAmount: {
    color: '#000000',
    fontSize: '24px',
    fontWeight: 600,
    marginTop: 0
  },
  pPage: {
    color: '#000000',
    fontSize: '14px',
    fontWeight: 600,
  },
  sale: {
    width: '100%',
    height: '50px',
    border: 'unset !important',
    background: '#065374 !important',
    borderRadius: '50px !important',
    fontSize: '14px !important',
    fontWeight: 600,
    color: 'white !important',
    fontFamily: 'Poppins !important',
    cursor: 'pointer !important',
    marginTop: " 10px !important",
    "&:disabled": {
      backgroundColor: '#065374 !important',
      opacity: 0.4,

    }
  },
  basketButton: {
    borderRadius: '50px !important',
    background: 'black !important',
    color: 'white !important',
    padding: '5px 20px !important',
    marginBottom: '30px !important',
    [theme.breakpoints.down(900)]: {
      marginTop: '20px !important'
    },
  },
  UniversalP: {
    margin: '0',
    paddingRight: '20px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '13px'

  },
  Input: {
    background: 'white',
    border: '1px solid #A2A6B0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    width: '100% !important',
    padding: '7px',
    margin: '5px 0px 5px 0px',
    '&:focus': {
      outline: 'none'
    },
    fontFamily: "Poppins"
  },
  PhoneInputInput: {
    background: 'white',
    border: '1px solid #A2A6B0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    width: '100% !important',
    padding: '7px',
    margin: '5px 0px 5px 0px'
  },
  PhoneInput: {
    background: 'white',
    border: '1px solid #A2A6B0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    width: '100% !important',
    padding: '7px',
    margin: '5px 0px 5px 0px'
  },
  Grid: {
    width: '100%',
    [theme.breakpoints.down(900)]: {
      display: 'flex',
      "& input": {
        width: '90%'
      }
    },
    [theme.breakpoints.down(600)]: {
      display: 'block',
      "& input": {
        width: '100%'
      }
    },
  },
  MinGrid: {
    [theme.breakpoints.up(600)]: {
      display: 'none'
    }
  },
  MaxGrid: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    }
  }
}))

const top100Films = [
  { title: 'Angren shahri' },
  { title: 'Bekobod shahri va tumani' },
  { title: "Bo'ka shahri va tumani" },
  { title: "Do'stobod shahri" },
  { title: "Keles shahri" },
  { title: "Olmaliq shahri" },
  { title: "Oqqo'rg'on shahri va tumani" },
  { title: "Ohangaron shahri va tumani" },
  { title: "Parkent shahri va tumani" },
  { title: "Piskent shahri va tumani" },
  { title: "Toshkent shahri" },
  { title: "To'ytepa shahri" },
  { title: "Chinoz shahri va tumani" },
  { title: "Chirchiq shahri" },
  { title: "Yangiyo'l shahri" },
  { title: "Yangiobod shahri" },
  { title: "G'azalkent shahri" },
  { title: "Alimkent shaharchasi" },
  { title: "Bo'zsuv shaharchasi" },
  { title: "Gulbahor shaharchasi" },
  { title: "Zafar shaharchasi" },
  { title: "Iskandar shaharchasi" },
  { title: "Krasnogorsk shaharchasi" },
  { title: "Nurobod shaharchasi" },
  { title: "Olmazor shaharchasi" },
  { title: "Salor shaharchasi" },
  { title: "Tuyabo'g'iz shaharchasi" },
  { title: "Chig'iriq shaharchasi" },
  { title: "Chorvoq shaharchasi" },
  { title: "Eshonguzar shaharchasi" },
  { title: "Yangibozor shaharchasi" },
  { title: "Yangi chinoz shaharchasi" },
  { title: "Yangihayot shaharchasi" },
  { title: "O'rtaovul shaharchasi" },
  { title: "Qibray shaharchasi va tumani" },
  { title: "Bo'stonliq tumani" },
  { title: "Zangiota tumani" },
  { title: "Yuqori Chirchiq tumani" },
  { title: "Yangiyo'l tumani" },
  { title: "O'rta Chirchiq tumani" },
  { title: "Quyi Chirchiq tumani" },
];

export default function Cart() {
  const [alignment, setAlignment] = React.useState<string | null>('Naqd');
  const [fullName, setFullName] = React.useState(null);
  const [phone, setPhone] = React.useState<any>(null);
  const [city, setCity] = React.useState(null);
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = React.useState(true)
  const { cartProducts } = useSelector((state: rootState) => state.cartreducer);
  console.log(cartProducts);

  const navigate = useNavigate();

  const refresh = (): void => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } // refresh page after 2 seconds



  const dispatch = useDispatch();
  let total = cartProducts.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);
  const products = cartProducts.map(i => (
    {
      product_id: i.id,
      quantity: i.quantity,
      price: i.price

    })
  )


  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
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
      setDisabled(false)
    }

  }
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });
  let options: any = getInputProps();
  const address = options.value;








  function Submit() {
    const form = JSON.stringify({
      products: products,
      buyer: {
        full_name: fullName,
        address: city,
        phone: phone,
        city: address,
        pay_type: alignment,
      },
      total_price: total
    })


    try {
      postProductOrder(form)
        .then(async (res: any) => {
          if (res.status === 200) {
            setNotify({
              isOpen: true,
              message: "Sizning ma'lumotlaringiz jo'natildi",
              type: "success",
            });
            setTimeout(() => {
              navigate("/");
            }, 1000);
            refresh();
          }
        }).catch((err) => {
          setNotify({
            isOpen: true,
            message: "Iltimos barchasini to'ldiring",
            type: "error",
          });
          console.log(err);
        })
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Xatolik yuz berdi...",
        type: "error",
      });
      console.log(error);

    }
  }
  let { darktheme } = useSelector((state: rootState) => state.productsReducer);
  const classes = useStyles()


  const inp = document.querySelectorAll('input');
  inp.forEach(element => {
    if (element.value.length === 0) {
      element.style.borderColor = '#9F9F9F'
    }
    else if (element.value.length <= 3) {
      element.style.borderColor = 'red'
      element.title = 'Xatolik yuz berdi 3 tadan ko`p ma`lumot kiriting'
    }
    else {
      element.style.borderColor = '#9F9F9F'
    }
  });


  return (
    <>
      <BackToTop />
      <Container maxWidth="xl" >
        <div>
          <Link to={'/'}>
            <button className={classes.MainPage} >
              <div className={classes.Inside} > Bosh sahifa</div>
              <KeyboardArrowRightIcon className={classes.ArrowIcon} />
              <div className={classes.Inside} > Savatcha </div>
            </button>
          </Link>
        </div>
        <div>
          <h2 className={classes.basket} >
            Xarid savatchasi
          </h2>
        </div>
        <Grid container spacing={2} >
          {cartProducts.length === 0 ?
            <Grid item xs={12} md={8} >
              <div >
                <h3>
                  Siz hali hech narsa xarid qilmadingiz !
                </h3>
                <img src={emptyCard} alt='empty card' style={{ width: '64%' }} />
              </div>
            </Grid>
            :
            <>
              <Grid item xs={12} md={8} className={classes.MinGrid}>
                {cartProducts.length > 0 &&
                  <Table>

                    <div>
                      {cartProducts && cartProducts?.map((product: any) => (
                        <div key={product.id} className={classes.cartMin} style={{ margin: '15px 0px ' }}  >
                          <div style={{ width: '25%' }}  >

                            <Link to={`/product/client/details/${product.id}`} >
                              <img src={`${MINIO_FULL_ENDPOINT_FOR}/product/${product?.photos[0]?.name}`} />

                            </Link>
                          </div>
                          <div style={{ width: '50%' }} >
                            <div style={{ display: 'flex' }} >
                              <div>
                                <h5 className={classes.nameRes} >{product.short_name}</h5>
                              </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <h5 className={classes.nameRes}>{product.price.toLocaleString()} so'm</h5>
                            </div>

                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '25%' }}>
                            <Button onClick={() => dispatch(deleteFromCart(product))} value={product.short_name}  >
                              <CloseIcon className={classes.close} />
                            </Button>
                            <div style={{ width: '25%', marginLeft: '7px' }}>
                              <Select key={product.id} name="quantity" onChange={(event: any) => dispatch(updatePrice(product, event.target.value))} defaultValue={product.quantity} className={classes.dropDownMin}>
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
                      <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '17px' }} > Umumiy narx</p>
                        </div>
                        <p style={{ fontWeight: 600, fontSize: '17px' }} >{total.toLocaleString()}  so'm</p>
                      </div>
                    </div>
                  </Table>
                }
              </Grid>
              <Grid item xs={12} md={8} className={classes.MaxGrid} >
                {cartProducts.length > 0 &&
                  <Table>
                    <thead>
                      <tr className={classes.NameTop} >
                        <th className={classes.image} >Rasm</th>
                        <th className={classes.image} >Nomi</th>
                        <th className={classes.image} >Son</th>
                        <th className={classes.image} >Narx</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts && cartProducts?.map((product: any) => (
                        <tr key={product.id} className={classes.carts} >
                          <td>
                            {console.log(product)}
                            <Link to={`/product/client/details/${product.id}`} >

                              <img src={`${MINIO_FULL_ENDPOINT_FOR}/product/${product?.photos[0]?.name}`} />

                            </Link>

                            {/* <img src={`${MINIO_FULL_ENDPOINT_FOR}/product/${product.photo}`} alt=''></img> */}
                          </td>
                          <td>
                            <h5 className={classes.name} >{product.short_name}</h5>
                          </td>
                          <td style={{ width: '25%' }}>
                            <Select key={product.id} name="quantity" onChange={(event: any) => dispatch(updatePrice(product, event.target.value))} defaultValue={product.quantity} className={classes.dropDown}>
                              <MenuItem value="1">1</MenuItem>
                              <MenuItem value="2">2</MenuItem>
                              <MenuItem value="3">3</MenuItem>
                              <MenuItem value="4">4</MenuItem>
                              <MenuItem value="5">5</MenuItem>
                              <MenuItem value="6">6</MenuItem>
                            </Select>

                          </td>
                          <td>
                            <h5 className={classes.price}>{product.price.toLocaleString()} so'm</h5>
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteFromCart(product))} value={product.short_name}  >
                              <CloseIcon className={classes.close} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      <tr style={{ width: '100%' }} key="total">
                        <td><h4>Umumiy narx</h4></td>
                        <td>{total.toLocaleString()}  so'm</td>
                      </tr>
                    </tbody>
                  </Table>
                }
              </Grid>
            </>

          }


          <Grid item xs={12} md={4}>
            <div className={classes.totalPage} >
              <form>
                <p className={classes.TotalAmount} >Qiymat</p>
                <div className={classes.TotalPageTop} >
                  <p className={classes.pPage} >
                    Narx
                  </p>
                  <p className={classes.pPage} >
                    {total.toLocaleString()} so'm
                  </p>
                </div>
                <div className={classes.TotalPageTop} >
                  <p className={classes.pPage} >
                    Yetkazish Xaqqi
                  </p>
                  <p className={classes.pPage} >
                    $0.00
                  </p>
                </div>
                <p className={classes.insideOfPage} >
                  (Standart tarif - Narx mahsulot/maqsadga qarab farq qilishi mumkin. TECS xodimlari siz bilan bog'lanadi.)

                </p>
                <div className={classes.TotalPageTop} >
                  <p className={classes.pPage} >
                    Taxi
                  </p>
                  <p className={classes.pPage} >
                    $0.00
                  </p>
                </div>
                <div className={classes.TotalPageTop} >
                  <p className={classes.pPage} >
                    Umumiy qiymat
                  </p>
                  <p className={classes.pPage} >
                    {total.toLocaleString()}
                    so'm
                  </p>
                </div>
                <h3>Yetkazish ma'lumotlari</h3>
                <Grid className={classes.Grid} container spacing={2}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Box>
                      <p className={classes.UniversalP} >Ismingiz <span style={{ color: 'red' }} >*</span> </p>
                      <input type="text" required
                        id='name' onKeyUp={isEmpty}
                        onChange={(e: any) => setFullName(e.target.value)}
                        className={classes.Input}
                      />
                    </Box>
                    <Box>
                      <p className={classes.UniversalP} >
                        Telefon raqamingiz <span style={{ color: 'red' }} >*</span>
                      </p>
                      <PhoneInput
                        international
                        defaultCountry="UZ"
                        onChange={setPhone}
                        limitMaxLength
                        id='phone' onKeyUp={isEmpty}

                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} >
                    <Box>
                      <p className={classes.UniversalP} >
                        Shahar, tuman <span style={{ color: 'red' }} >*</span>
                      </p>
                      {/* <input type="text" required
                        onChange={(e: any) => setAddress(e.target.value)}
                        className={classes.Input}
                        id='city' onKeyUp={isEmpty}
                      />
                      /> */}
                      <div>
                        <div {...getRootProps()}>
                          <Input {...getInputProps()} className={classes.Input} />
                        </div>
                        {groupedOptions.length > 0 ? (
                          <Listbox {...getListboxProps()}>
                            {(groupedOptions as typeof top100Films).map((option, index) => (
                              <li {...getOptionProps({ option, index })}>{option.title}</li>
                            ))}
                          </Listbox>
                        ) : null}
                      </div>
                    </Box>
                    <Box>
                      <p className={classes.UniversalP} >
                        Yashash manzili <span style={{ color: 'red' }} >*</span>
                      </p>
                      <input type="text" required
                        onChange={(e: any) => setCity(e.target.value)}
                        className={classes.Input}
                        id='address' onKeyUp={isEmpty}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment} >
                    <ToggleButton value="Naqd" className='css-ueukts-MuiButtonBase-root-MuiToggleButton-root.Mui-selected'  >
                      <MoneyIcon />
                    </ToggleButton>
                    <ToggleButton value="Card" >
                      <CreditCardIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <div style={{ display: 'flex', }} >
                    <p className={classes.UniversalP} >
                      Naqd
                    </p>
                    <p className={classes.UniversalP} >
                      Card
                    </p>
                  </div>
                </Box>

                <div>
                  <button disabled={disabled} onClick={handleOpen} className={classes.sale} >Xarid qilish</button>
                  <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <Box sx={style} className={classes.style} >
                      <h3>Xarid qilingan mahsulotlar</h3>
                      {cartProducts.map((p, i) =>
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}  >
                            <p key={i} style={{ margin: 0, padding: '4px 0px 4px 0px' }} >
                              {p.short_name}
                            </p>
                            <p key={i} style={{ margin: 0, }} >{p?.price.toLocaleString()}</p>
                          </div>
                        </>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h4 style={{ margin: 0, }}>
                          Umumiy narx
                        </h4>
                        <h4 style={{ margin: 0, }}>
                          {total.toLocaleString()}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Button onClick={handleClose} sx={{
                          background: '#FF4B4B'
                          , color: 'white'
                          , textTransform: 'capitalize',
                          '&:hover': {
                            background: '#FF4B4B'
                          },
                          marginTop: '10px'


                        }}  >
                          Bekor qilish
                        </Button>
                        <Button
                          sx={{
                            background: '#065374'
                            , color: 'white'
                            , textTransform: 'capitalize',
                            '&:hover': {
                              background: '#065374'
                            },
                            marginTop: '10px'

                          }}
                          onClick={() => {
                            Submit();
                            handleClose();
                            // refresh();
                            dispatch(deleteAllFromCart())
                          }}
                        >Sotib olish</Button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
        <Button onClick={() => dispatch(deleteAllFromCart())} className={classes.basketButton}>Savatni Tozalash</Button>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
      <Footer />
    </>
  )
}


