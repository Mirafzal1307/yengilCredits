import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { Grid, Tooltip } from "@mui/material";
import Ys from "../../../Images/Logo BT (1).svg";
import Basket from "../../../Images/two.svg";
import Lang from "../../../Images/three.svg";
import "./style.css";
import {
  getCategoryForClient, getParentCategories,
} from "../../../Api/client/ClientCategoryApi";
import { getProductFromCategoryById } from "../../../Api/admin/AdminProductApi";
import { rootState } from "../../../redux/reducers";
import MainSearch from "../MainSearch";
import "@szhsin/react-menu/dist/index.css";
import Baskets from "../../../Images/basket.svg";
import Telegram from "../../../Images/telegram.svg";
import LogoIcon from "../../../Images/LogoIcon.svg";
import SearchDemo from "../SearchDemo";
import TransitionsModal from "./NewKatalog";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
const useStyles = makeStyles((theme) => ({
  NavbarInsite: {
    display: "flex !important",
    justifyContent: "space-between !important",
    position: "relative",
    [theme.breakpoints.up(899)]: {
      display: "flex !important",
    },
    [theme.breakpoints.down(500)]: {
      flexDirection: "column !important",
    },
  },
  NavbarInsiteMax: {
    display: "flex !important",
    justifyContent: "center",
    position: "relative",
    [theme.breakpoints.up(899)]: {
      display: "flex !important",
      justifyContent: "space-between !important",
    },
    [theme.breakpoints.down(500)]: {
      flexDirection: "column !important",
    },
  },
  appBar: {
    background: "#065374 !important",
  },

  NavbarRight: {
    display: "flex",
    justifyContent: "flex-start !important",
  },
  Icons: {
    padding: "11px 5px 0px 5px !important",
    width: "43px !important",
  },
  Logo: {
    paddingTop: "5px !important",
    width: "41px !important",
  },
  fab: {
    background: "#fff  !important",
    color: "#065374 !important",
    fontSize: "24px !important",
    border: "solid 2px #065374 !important",
    boxShadow: "unset !important",
  },
  parentCat: {
    padding: "6px 77px !important",
    border: "solid 0.1px #065374 !important",
    fontFamily: "Electrolux Sans",
    fontStyle: "normal",
    fontWeight: 500,
    textTransform: "capitalize",
    position: "relative",
  },
  menu: {
    borderRadius: "0px !important",
    border: "solid 1px green !important",
  },
  CloseIcon: {
    background: "#065374 !important",
    textAlign: "center",
    paddingTop: "5px",
    color: "white",
    cursor: "pointer",
  },
  Katalog: {
    marginTop: "11px !important",
    color: "white !important",
    justifyContent: "space-between !important",
    background: "rgba(255, 255, 255, 0.34) !important",
    borderRadius: "34px !important",
    padding: "3px !important",
    paddingRight: "16px !important",
    textTransform: "capitalize",
  },
  KatalogIcon: {
    marginRight: "7px",
    background: "white",
    padding: "2px",
    border: "none",
    borderRadius: "24px !important",
    width: "28px !important",
    height: "28px !important",
  },
  CartTotal: {
    width: "15px",
    height: "15px",
    fontSize: "13px",
    background: "#dd0820",
    position: "absolute",
    top: "15px",
    right: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",

    [theme.breakpoints.down(900)]: {
      top: "16px",
      right: "0px",
    },
    [theme.breakpoints.down(500)]: {
      top: "57px",
      right: "44px",
    },
  },
  BasketTotal: {
    width: "15px",
    height: "15px",
    fontSize: "13px",
    background: "#dd0820",
    position: "absolute",
    top: "26px",
    right: "17px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  oneGrid: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down(900)]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  twoGrid: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down(900)]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  NavbarMenu: {
    marginTop: "10px ",
    textAlign: "center",
  },
  katalog: {
    position: "absolute",
    left: "90%",
    backgroundColor: "black !important",
  },
  navLink: {
    color: "#000",
  },
  menuButton: {
    background: "rgba(255, 255, 255) !important",
    borderRadius: "34px",
    border: "none",
    color: "rgba(124, 124, 124, 0.79)",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    transition: ".5s",
    height: "35px",
    paddingLeft: "7px",
    paddingRight: "0 !important",
    [theme.breakpoints.down(600)]: {
      display: "none !important",
    },
  },
  menuButtonMax: {
    marginTop: "10px",
    paddingTop: "0px",
    background: "rgba(255, 255, 255) !important",
    borderRadius: "34px",
    border: "none",
    color: "rgba(124, 124, 124, 0.79)",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    transition: ".5s",
    height: "35px",
    paddingLeft: "7px",
    paddingRight: "10px",
  },
  SubMenu: {
    width: "360px",
    [theme.breakpoints.down(400)]: {
      width: "130px",
    },
    [theme.breakpoints.down(500)]: {
      width: "220px",
    },
    [theme.breakpoints.down(600)]: {
      width: "260px",
    },
    padding: "0 !important",
  },
  MenuItem: {
    width: "255px",
    marginLeft: "10px !important",

    [theme.breakpoints.down(400)]: {
      width: "130px",
    },

    [theme.breakpoints.down(500)]: {
      width: "220px",
    },
    [theme.breakpoints.down(600)]: {
      width: "255px",
    },
  },
  Menu: {
    border: "solid 1px red !important",
  },
  NavbarContainer: {
    [theme.breakpoints.up(600)]: {
      display: "none !important",
    },
  },
  NavbarContainerMax: {
    padding: "0 !important",
    display: "flex",
    minHeight: "unset !important",
    [theme.breakpoints.down(599)]: {
      display: "none !important",
    },
  },
  mainMenu: {
    padding: "0 !important",
  },
}));
function ScrollTop(props: Props): JSX.Element {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event: React.MouseEvent<HTMLDivElement>): any => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 99,
        }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function BackToTop(): JSX.Element {
  const [category, setCategory] = React.useState<any>({});
  const cartProducts = useSelector(
    (state: rootState) => state.cartreducer.cartProducts,
  );
  const total = cartProducts.length;
  const getCategoryForCleintPage = async (): Promise<any> => {
    const response: any = await getCategoryForClient();
    setCategory(response.data.menu);
    const res: any = await getParentCategories();
  };
  React.useEffect(() => {
    getCategoryForCleintPage();
  }, []);
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            minHeight: "unset !important",
          }}
        >
          <Container
            maxWidth="xl"
            className={classes.NavbarContainer}
            sx={{ padding: 0 }}
          >
            <Grid spacing={1} container>
              <Grid item xs={12} style={{ background: "white" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <Link to="/">
                      <img src={LogoIcon} alt="" />
                    </Link>
                  </div>
                  <div>
                    <img
                      src={Telegram}
                      alt=""
                      style={{ paddingRight: "10px" }}
                    />
                    <Link to="/cart">
                      <img
                        src={Baskets}
                        alt="Baskets"
                        className={classes.Icons}
                        style={{
                          position: "relative",
                          marginTop: "10px !important",
                        }}
                      />
                      <b className={classes.BasketTotal}>{total}</b>
                    </Link>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
          <Container
            maxWidth="xl"
            className={classes.NavbarContainer}
            sx={{ padding: 0 }}
          >
            <Grid spacing={1} container>
              <Grid item xs={12} style={{ background: "#065374" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ marginLeft: "15px" }}>
                    <TransitionsModal />
                    <Menu
                      menuButton={
                        <MenuButton className={classes.menuButton}>
                          <ListIcon style={{ fontSize: "24px" }} />
                          <span style={{ marginLeft: "5px" }}>Katalog</span>
                        </MenuButton>
                      }
                      className={classes.mainMenu}
                    >
                      <SubMenu
                        label="Telefonlar va smartfonlar"
                        className={classes.SubMenu}
                      >
                        {category?.["Telefonlar va smartfonlar"]?.map(
                          (item: any) => (
                            <MenuItem
                              style={{
                                width: "400px",
                                marginLeft: "10px !important",
                              }}
                              key={item.parent_id}
                            >
                              <Link
                                to={`/product/product-by-category/${item.sub_id}`}
                                className={classes.navLink}
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ),
                        )}
                      </SubMenu>
                      <SubMenu label="Uy jihozlari" className={classes.SubMenu}>
                        {category?.["Uy jihozlari"]?.map((item: any) => (
                          <MenuItem
                            style={{
                              width: "400px",
                              marginLeft: "10px !important",
                            }}
                            key={item.parent_id}
                          >
                            <Link
                              to={`/product/product-by-category/${item.sub_id}`}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </SubMenu>
                      <SubMenu
                        label="Televizorlar va videotexnikalar"
                        className={classes.SubMenu}
                      >
                        {category?.["Televizorlar va videotexnikalar"]?.map(
                          (item: any) => (
                            <MenuItem
                              style={{
                                width: "400px",
                                marginLeft: "10px !important",
                              }}
                              key={item.parent_id}
                            >
                              <Link
                                to={`/product/product-by-category/${item.sub_id}`}
                                className={classes.navLink}
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ),
                        )}
                      </SubMenu>
                      <SubMenu
                        label="Sport va dam olish uchun mahsulotlar"
                        className={classes.SubMenu}
                      >
                        {category?.[
                          "Sport va dam olish uchun mahsulotlar"
                        ]?.map((item: any) => (
                          <MenuItem
                            style={{
                              width: "400px",
                              marginLeft: "10px !important",
                            }}
                            key={item.parent_id}
                          >
                            <Link
                              to={`/product/product-by-category/${item.sub_id}`}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </SubMenu>
                      <SubMenu
                        label="Sog'lik va go'zallik mahsulotlari"
                        className={classes.SubMenu}
                      >
                        {category?.["Sog'lik va go'zallik mahsulotlari"]?.map(
                          (item: any) => (
                            <MenuItem
                              style={{
                                width: "400px",
                                marginLeft: "10px !important",
                              }}
                              key={item.parent_id}
                            >
                              <Link
                                to={`/product/product-by-category/${item.sub_id}`}
                                className={classes.navLink}
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ),
                        )}
                      </SubMenu>
                      <SubMenu
                        label="Qurilish va ta'mirlash uchun mahsulotlar"
                        className={classes.SubMenu}
                      >
                        {category?.[
                          "Qurilish va ta'mirlash uchun mahsulotlar"
                        ]?.map((item: any) => (
                          <MenuItem
                            style={{
                              width: "400px",
                              marginLeft: "10px !important",
                            }}
                            key={item.parent_id}
                          >
                            <Link
                              to={`/product/product-by-category/${item.sub_id}`}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </SubMenu>
                      <SubMenu
                        label="Maishiy texnika"
                        className={classes.SubMenu}
                      >
                        {category?.["Maishiy texnika"]?.map((item: any) => (
                          <MenuItem
                            style={{
                              width: "400px",
                              marginLeft: "10px !important",
                            }}
                            key={item.parent_id}
                          >
                            <Link
                              to={`/product/product-by-category/${item.sub_id}`}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </SubMenu>
                      <SubMenu
                        label="Kompyuterlar va orgtexnika"
                        className={classes.SubMenu}
                      >
                        {category?.["Kompyuterlar va orgtexnika"]?.map(
                          (item: any) => (
                            <MenuItem
                              style={{
                                width: "400px",
                                marginLeft: "10px !important",
                              }}
                              key={item.parent_id}
                            >
                              <Link
                                to={`/product/product-by-category/${item.sub_id}`}
                                className={classes.navLink}
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ),
                        )}
                      </SubMenu>
                      <SubMenu
                        label="Bolalar mahsulotlari"
                        className={classes.SubMenu}
                      >
                        {category?.["Bolalar mahsulotlari"]?.map(
                          (item: any) => (
                            <MenuItem
                              style={{
                                width: "400px",
                                marginLeft: "10px !important",
                              }}
                              key={item.parent_id}
                            >
                              <Link
                                to={`/product/product-by-category/${item.sub_id}`}
                                className={classes.navLink}
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ),
                        )}
                      </SubMenu>
                      <SubMenu
                        label="Avto jihozlar"
                        className={classes.SubMenu}
                      >
                        {category?.["Avto jihozlar"]?.map((item: any) => (
                          <MenuItem
                            style={{
                              width: "400px",
                              marginLeft: "10px !important",
                            }}
                            key={item.parent_id}
                          >
                            <Link
                              to={`/product/product-by-category/${item.sub_id}`}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </SubMenu>
                      <SubMenu
                        label="Audio tizimlar"
                        className={classes.SubMenu}
                      >
                        {category?.["Audio tizimlar"]?.map((item: any) => (
                          <MenuItem
                            style={{
                              width: "400px",
                              marginLeft: "10px !important",
                            }}
                            key={item.parent_id}
                          >
                            <Link
                              to={`/product/product-by-category/${item.sub_id}`}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </SubMenu>
                    </Menu>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginLeft: "5px",
                      marginRight: "15px",
                    }}
                  >
                    <SearchDemo />
                  </div>
                  {/* <div style={{ marginRight: "15px" }}>
                    <AccountMenu />
                  </div> */}
                </div>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="xl" className={classes.NavbarContainerMax}>
            <Grid spacing={1} container>
              <Grid
                item
                xs={12}
                md={1}
                lg={1}
                className={classes.NavbarInsiteMax}
              >
                <Link to="/">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={Ys} alt="Logo" className={classes.Logo} />
                  </div>
                </Link>
              </Grid>
              <Grid item xs={2} md={2} lg={1}>
                <Menu
                  menuButton={
                    <MenuButton className={classes.menuButtonMax}>
                      <ListIcon />
                      <span style={{ marginLeft: "5px" }}>Katalog</span>
                    </MenuButton>
                  }
                >
                  <SubMenu
                    label="Telefonlar va smartfonlar"
                    className={classes.SubMenu}
                  >
                    {category?.["Telefonlar va smartfonlar"]?.map(
                      (item: any) => (
                        <MenuItem
                          style={{
                            width: "400px",
                            marginLeft: "10px !important",
                          }}
                          key={item.parent_id}
                        >
                          <Link
                            to={`/product/product-by-category/${item.sub_id}`}
                            className={classes.navLink}
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </SubMenu>
                  <SubMenu label="Uy jihozlari" className={classes.SubMenu}>
                    {category?.["Uy jihozlari"]?.map((item: any) => (
                      <MenuItem
                        style={{
                          width: "400px",
                          marginLeft: "10px !important",
                        }}
                        key={item.parent_id}
                      >
                        <Link
                          to={`/product/product-by-category/${item.sub_id}`}
                          className={classes.navLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                  <SubMenu
                    label="Televizorlar va videotexnikalar"
                    className={classes.SubMenu}
                  >
                    {category?.["Televizorlar va videotexnikalar"]?.map(
                      (item: any) => (
                        <MenuItem
                          style={{
                            width: "400px",
                            marginLeft: "10px !important",
                          }}
                          key={item.parent_id}
                        >
                          <Link
                            to={`/product/product-by-category/${item.sub_id}`}
                            className={classes.navLink}
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </SubMenu>
                  <SubMenu
                    label="Sport va dam olish uchun mahsulotlar"
                    className={classes.SubMenu}
                  >
                    {category?.["Sport va dam olish uchun mahsulotlar"]?.map(
                      (item: any) => (
                        <MenuItem
                          style={{
                            width: "400px",
                            marginLeft: "10px !important",
                          }}
                          key={item.parent_id}
                        >
                          <Link
                            to={`/product/product-by-category/${item.sub_id}`}
                            className={classes.navLink}
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </SubMenu>
                  <SubMenu
                    label="Sog'lik va go'zallik mahsulotlari"
                    className={classes.SubMenu}
                  >
                    {category?.["Sog'lik va go'zallik mahsulotlari"]?.map(
                      (item: any) => (
                        <MenuItem
                          style={{
                            width: "400px",
                            marginLeft: "10px !important",
                          }}
                          key={item.parent_id}
                        >
                          <Link
                            to={`/product/product-by-category/${item.sub_id}`}
                            className={classes.navLink}
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </SubMenu>
                  <SubMenu
                    label="Qurilish va ta'mirlash uchun mahsulotlar"
                    className={classes.SubMenu}
                  >
                    {category?.[
                      "Qurilish va ta'mirlash uchun mahsulotlar"
                    ]?.map((item: any) => (
                      <MenuItem
                        style={{
                          width: "400px",
                          marginLeft: "10px !important",
                        }}
                        key={item.parent_id}
                      >
                        <Link
                          to={`/product/product-by-category/${item.sub_id}`}
                          className={classes.navLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                  <SubMenu label="Maishiy texnika" className={classes.SubMenu}>
                    {category?.["Maishiy texnika"]?.map((item: any) => (
                      <MenuItem
                        style={{
                          width: "400px",
                          marginLeft: "10px !important",
                        }}
                        key={item.parent_id}
                      >
                        <Link
                          to={`/product/product-by-category/${item.sub_id}`}
                          className={classes.navLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                  <SubMenu
                    label="Kompyuterlar va orgtexnika"
                    className={classes.SubMenu}
                  >
                    {category?.["Kompyuterlar va orgtexnika"]?.map(
                      (item: any) => (
                        <MenuItem
                          style={{
                            width: "400px",
                            marginLeft: "10px !important",
                          }}
                          key={item.parent_id}
                        >
                          <Link
                            to={`/product/product-by-category/${item.sub_id}`}
                            className={classes.navLink}
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </SubMenu>
                  <SubMenu
                    label="Bolalar mahsulotlari"
                    className={classes.SubMenu}
                  >
                    {category?.["Bolalar mahsulotlari"]?.map((item: any) => (
                      <MenuItem
                        style={{
                          width: "400px",
                          marginLeft: "10px !important",
                        }}
                        key={item.parent_id}
                      >
                        <Link
                          to={`/product/product-by-category/${item.sub_id}`}
                          className={classes.navLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                  <SubMenu label="Avto jihozlar" className={classes.SubMenu}>
                    {category?.["Avto jihozlar"]?.map((item: any) => (
                      <MenuItem
                        style={{
                          width: "400px",
                          marginLeft: "10px !important",
                        }}
                        key={item.parent_id}
                      >
                        <Link
                          to={`/product/product-by-category/${item.sub_id}`}
                          className={classes.navLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                  <SubMenu label="Audio tizimlar" className={classes.SubMenu}>
                    {category?.["Audio tizimlar"]?.map((item: any) => (
                      <MenuItem
                        style={{
                          width: "400px",
                          marginLeft: "10px !important",
                        }}
                        key={item.parent_id}
                      >
                        <Link
                          to={`/product/product-by-category/${item.sub_id}`}
                          className={classes.navLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                </Menu>
              </Grid>
              <Grid
                item
                xs={10}
                md={8}
                lg={10}
                className={classes.NavbarInsite}
              >
                <Grid
                  item
                  md={10}
                  lg={11}
                  sx={{ marginLeft: "16px", width: "100%" }}
                >
                  <MainSearch />
                </Grid>
                <Grid item md={2} lg={1} className={classes.twoGrid}>
                  <div className={classes.NavbarRight}>
                    <Tooltip title="Telegram">
                      <a href="https://t.me/s/yengil_credit">
                        <img
                          src={Basket}
                          alt="Basket"
                          className={classes.Icons}
                        />
                      </a>
                    </Tooltip>
                    <Tooltip title="Savatcha">
                      <Link to="/cart">
                        <img
                          src={Lang}
                          alt="Language"
                          className={classes.Icons}
                          style={{
                            position: "relative",
                            marginTop: "10px !important",
                          }}
                        />
                        <b className={classes.CartTotal}>{total}</b>
                      </Link>
                    </Tooltip>

                    {/* <AccountMenu /> */}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <div />
          </Container>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />

      <ScrollTop>
        <Fab
          color="secondary"
          size="small"
          aria-label="scroll back to top"
          className={classes.fab}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
export default BackToTop;
