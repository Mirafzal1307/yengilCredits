import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import BackUp from "../../Images/UploadPhoto.png";
import {
  getProductCreate,
  postProductCreate,
} from "../../Api/admin/AdminProductApi";
import { Link as RouterLink } from "react-router-dom";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import Notification from "../Snackbar/Notification";
import BasicModal from "./modal";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@material-ui/core/IconButton';
import {  useNavigate } from "react-router-dom";
import "./create.css";
const useStyles = makeStyles({
  bigFirstBox: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    padding: "0px 40px 40px 42px",
    marginBottom: "70px !important",
  },
  itemBox: {
    display: "flex",
    paddingTop: "40px",
  },
  itemBoxCategory: {
    paddingTop: "30px",
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
    color: "black",
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
    fontWeight: 500,
    color: "black",
  },
  forButton: {
    padding: "9px 34px 8px 30px",
    background: "#065374 !important",
    color: "#fff !important",
    borderRadius: "5px",
    fontFamily: "Poppins",
    border: "none",
    cursor: "pointer !important",
  },
  inBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  CreateContainerTitle: {
    maxWidth: "1200px !important",
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
    marginLeft: "185px !important",
    display: "flex",
  },
  spanDiscount: {
    fontSize: "22px",
    fontWeight: "normal",
    fontStyle: "normal",
  },
  CategoryBox: {
    marginLeft: "276px !important",
  },
  ProducutPhoto: {
    marginLeft: "186px !important",
  },
  characterBox: {
    marginLeft: "56px !important",
  },
  statusBox: {
    marginLeft: "117px !important",
  },
  cancel: {
    backgroundColor: "#464646!important",
    borderRadius: "5px !important",
    color: "#fff !important",
    marginLeft: "15px !important",
  },
  Photosettings: {
    display: "flex",
  },
  stack: {
    "&::before": {
      borderBottom: "white",
    },
    border: "2px solid #9f9f9f",
    borderRadius: "5px",
    color: "#9f9f9f",
    padding: "5px 5px 5px 5px !important",
  },
  forImagePreview: {
    width: "95px",
    height: "95px",
    borderRadius: "5px",
    marginRight: "10px",
    padding: "3px 3px 3px 3px",
    border: "1px solid #ad9f9f",
  },
  input: {
    padding: "5px 3px 5px 3px !important",
  },
  DynamicFeilds: {
    flexDirection: 'column',
    marginLeft: '56px',
    marginTop: '5px',

  }
});
interface Brands {
  name: string;
  id: number;
}
interface Categories {
  name: string;
  id: number;
}
interface characterNames {
  name: string;
  id: number;
}
interface characterProperties {
  value: string;
  id: number;
}
const ProductsCreate = () => {
  const [productName, setProductName] = React.useState<any>({});
  const [productShortName, setProductShortName] = React.useState<any>({});
  const [characterNames, setCharacterNames] = React.useState<characterNames[]>([]);
  const [characterProperties, setCharacterProperties] = React.useState<characterProperties[]>([]);
  const [productPrice, setProductPrice] = React.useState<any>({});
  const [productDiscount, setProductDiscount] = React.useState<any>('0');
  const [brands, setBrands] = React.useState<Brands[]>([]);
  const [categories, setCategories] = React.useState<Categories[]>([]);
  const [image, setImage] = React.useState<any>();
  const [preview, setPreview] = React.useState<any>();
  const [brandName, setBrandName] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [productStatus, setProductStatus] = React.useState("true");
  const classes = useStyles();
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleChangeBrand = (event: SelectChangeEvent) => {
    setBrandName(event.target.value);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryName(event.target.value);
  };
 
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setProductStatus(event.target.value);
  };
  const [inputFields, setInputFields] = React.useState([
    { id: uuidv4(), character: '', property: '' },
  ]);
  const characters: any = inputFields.map(character => (
    {
      characterId: character.character,
      propertyId: character.property
    }
  ))
  const refresh = () => {
    setTimeout(() => window.location.reload(),
    2000)
}
  const handleChangeInput = (id: any, event: any) => {
    const newInputFields = inputFields.map((i: any) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }
  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), character: '', property: '' }])
  }
  const handleRemoveFields = (id: any) => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  const fileInputRef = React.useRef<any>();
  const handleInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  React.useEffect(() => {
    getAllData();
  }, []);
  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  const getAllData = async () => {
    let response: any = await getProductCreate();
    setCategories(response.data.all_categories[0]);
    setBrands(response.data.all_brands[0]);
    setCharacterNames(response.data.all_characters[0]);
    setCharacterProperties(response.data.all_properties[0]);
  };
  const navigate = useNavigate();
  function onSubmit() {
    const form = new FormData();
    form.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name: productName,
            short_name: productShortName,
            price: productPrice,
            discount: productDiscount,
            category_id: categoryName,
            availability: productStatus,
            brand_id: brandName,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    form.append("files", image);
    form.append("characters", new Blob([JSON.stringify(characters)], { type: 'application/json' })
    );
    try {
      postProductCreate(form)
        .then(async (res: any) => {
          if (res.status === 400) {
            setNotify({
              isOpen: true,
              message: `Xatolik yuz berdi!`,
              type: "error",
            });
        

          }
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Muafaqiyatli yaratildi",
            type: "success",
          });
          setTimeout(() => {
            navigate("/product");
          }, 1000)
        });
    } catch (err) {
      setNotify({

        isOpen: true,
        message: `${err}`,
        type: "error",
      });
    }

  }
  function length() {
    const inp = document.querySelectorAll('input');

    inp.forEach(element => {
      if (inp[4].value.length === 0) {
        inp[4].style.borderColor = '#9F9F9F'
      }
      if (inp[4].value.length === 1) {
        inp[4].style.borderColor = '#9F9F9F'
        element.title = 'Xatolik yuz berdi 2 tadan ko`p ma`lumot kiriting'
      }
      else {
        inp[4].style.borderColor = '#9F9F9F'
      }
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
  }
  length()

  return (
    <React.Fragment>
      <MiniDrawer />
      <Container
        style={{ marginTop: "50px" }}
        className={classes.CreateContainerTitle}
      >
        <form action="" >
          <h1 className={classes.CreateProductTitle}><span className="maxLength">Mahsulot Qo'shish</span> </h1>
          <Box className={classes.bigFirstBox}>
            <Box className={classes.itemBox}>
              <h2 className={classes.boxFirstTitle}>1.Umumiy ma'lumot</h2>
              <div className={classes.GeneralInfoInside}>
                <Box>
                  <h2 className={classes.boxSecondTitle}
                  ><span className="let">Mahsulotning to'liq nomi</span> <span
                    style={{ color: 'red' }} > *</span></h2>

                  <input
                    type="text"
                    placeholder="Nomi"
                    className={classes.forBoxInput}
                    onChange={(e) => setProductName(e.target.value)}
                    minLength={3}
                  />
                </Box>
                <Box>
                  <h2 className={classes.boxSecondTitle}><span className="let">Qisqa nomi</span><span style={{ color: 'red' }} > *</span></h2>
                  <input
                    type="text"
                    placeholder="Nomi"
                    className={classes.forBoxInput}
                    onChange={(e) => setProductShortName(e.target.value)}
                    minLength={3}
                  />
                </Box>
                <Box>
                  <h2 className={classes.boxSecondTitle}>Brend nomi<span style={{ color: 'red' }} > *</span></h2>
                  <FormControl
                    sx={{ minWidth: 120 }}
                    className={classes.FormControl}
                  >
                    <Select
                      value={brandName}
                      onChange={handleChangeBrand}
                      displayEmpty
                      className={classes.Select}
                    >
                      <MenuItem value="">
                        <span className="notranslate">Brendni tanlang</span>
                      </MenuItem>

                      {brands.map((brand, index) => (
                        <MenuItem value={brand.id} key={index}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </Box>
            <Box className={classes.itemBoxprice}>
              <h2 className={classes.boxFirstTitle}>2.Narxlash</h2>
              <div className={classes.Pricebox}>
                <Box>
                  <h2 className={classes.boxSecondTitle}>Mahsulot narxi<span style={{ color: 'red' }} > *</span></h2>
                  <input
                    type="number"
                    placeholder="Number"
                    className={classes.forBoxInputPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    minLength={3}
                  />
                </Box>
                <Box>
                  <h2 className={classes.boxSecondTitle}>Chegirma<span style={{ color: 'red' }} > *</span>  </h2>
                  <input
                    maxLength={2}
                    type="text"
                    style={{
                      padding: "9px 2px 8px 17px",
                      width: "80px",
                      marginTop: "5px",
                      marginRight: "5px",
                      border: "2px solid #9F9F9F",
                      borderRadius: '5px',
                      outline: "none",
                      fontFamily: "Poppins",
                      fontWeight: '400',
                      fontSize: '14px',
                      color: "black"
                    }}
                    className="inpchegirma"
                    onChange={(e) => setProductDiscount(e.target.value)}
                  />
                  <span className={classes.spanDiscount}>%</span>
                </Box>
              </div>
            </Box>
            <Box className={classes.itemBoxCategory}>
              <h2 className={classes.boxFirstTitle}>3.Kategoriyalar</h2>
              <Box className={classes.CategoryBox}>
                <h2 className={classes.boxCategoryTitle}>Kategoriya nomi<span style={{ color: 'red' }} > *</span></h2>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ padding: "0 !important", margin: "0 !important" }}
                >
                  <Select
                    value={categoryName}
                    onChange={handleChangeCategory}
                    displayEmpty
                    className={classes.Select}
                  >
                    <MenuItem value="">
                      <b>Turkumni tanlang</b>
                    </MenuItem>

                    {categories.map((category, index) => (
                      <MenuItem value={category.id} key={index}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box className={classes.itemBox} style={{ marginTop: "35px" }}>
              <h2 className={classes.boxFirstTitle}>4.Rasmlar</h2>
              <Box
                style={{ marginLeft: "20px" }}
                className={classes.ProducutPhoto}
              >
                <h2 className={classes.boxSecondTitle}>Mahsulot rasmi<span style={{ color: 'red' }} > *</span></h2>
                <div className={classes.Photosettings}>
                  <form style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={preview}
                      style={{ display: preview ? "block" : "none" }}
                      className={classes.forImagePreview}
                    />
                    <FormLabel
                      htmlFor="file-input"
                      onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click();
                      }}
                    >
                      <img src={BackUp} alt="dddd" />
                    </FormLabel>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleInputChange}
                      minLength={3}
                    />
                  </form>
                  <div></div>
                </div>
              </Box>
            </Box>
            <Box className={classes.itemBox}  >
              <h2 className={classes.boxFirstTitle}>5.Mahsulot xususiyatlari</h2>
              <div className={classes.DynamicFeilds} >
                {inputFields.map(inputField => (
                  <div key={inputField.id}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ padding: "0 !important", margin: "0 !important" }}
                    >
                      <Select
                        name='character'
                        value={inputField.character}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        displayEmpty
                        style={{ marginRight: '20px', marginBottom: '20px' }}
                        className={classes.Select}
                      >
                        <MenuItem value="">
                          <span>Xossa nomi </span>
                        </MenuItem>
                        {characterNames.map((characterName, index) => (
                          <MenuItem value={characterName.id} key={index}>
                            {characterName.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ padding: "0 !important", margin: "0 !important" }}
                    >
                      <Select
                        name='property'
                        value={inputField.property}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        displayEmpty
                        className={classes.Select}
                      >
                        <MenuItem value="">
                          <span>Xossa qiymati </span>
                        </MenuItem>
                        {characterProperties.map((characterProperty, index) => (
                          <MenuItem value={characterProperty.id} key={index}>
                            {characterProperty.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleAddFields}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
              <BasicModal />
            </Box>
            <Box className={classes.itemBox}>
              <h2 className={classes.boxFirstTitle}>8.Mahsulot holati</h2>
              <Box className={classes.statusBox}>
                <h2 className={classes.boxSecondTitle}>Holat</h2>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ padding: "0 !important", margin: "0 !important" }}
                >
                  <Select
                    className={classes.Select}
                    value={productStatus}
                    onChange={handleChangeStatus}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <span>Holatni tanlang</span>
                    </MenuItem>
                    <MenuItem value="true">Sotuvda</MenuItem>
                    <MenuItem value="false">Sotuvda emas</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <div style={{ display: "flex" }}>
              <Button
                sx={{ textTransform: 'capitalize' }}
                className={classes.forButton}
                onClick={() => {
                  onSubmit();
             
                }}
                style={{ marginLeft: "auto", display: "flex" }}
              >
                Saqlash
              </Button>
              <Button
                sx={{ textTransform: 'capitalize' }}
                component={RouterLink as any}
                to="/product"
                className={classes.cancel}
              >
                Bekor qilish
              </Button>
            </div>
          </Box>
          <Notification notify={notify} setNotify={setNotify} />
        </form>
      </Container>
    </React.Fragment>
  );
};

export default ProductsCreate;
