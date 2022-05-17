import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import Ys from "../../../Images/Logo Ys.svg";
import Search from "../../../Images/one.svg";
import Basket from "../../../Images/two.svg";
import Lang from "../../../Images/three.svg";
import ListIcon from "@mui/icons-material/List";
// import Telegram from "../../../Images/four.svg";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
// import Fade from "@mui/material/Fade";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
import { SxProps } from "@mui/system";
import "./style.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getCategoryForClient } from "../../../Api/client/ClientCategoryApi";
import { getProductFromCategoryById } from "../../../Api/admin/AdminProductApi";
import { Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/reducers";
import MainSearch from "../MainSearch";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import catalogicon from "../../../Images/catalogicon.svg";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
const useStyles = makeStyles((theme) => ({
  NavbarInsite: {
    display: "flex !important",
    justifyContent: "space-between !important",
    position: "relative",
    flexDirection: "column",

    [theme.breakpoints.down(1030)]: {
      // display: "flex !important",
      flexDirection: "column ",
    },
    [theme.breakpoints.down(500)]: {
      // display: "flex !important",
      flexDirection: "column !important",
    },
  },
  appBar: {
    background: "#065374 !important",
  },
  telNumber: {
    margin: "0 !important",
    paddingTop: "15px !important",
    fontSize: "17px !important",
    paddingRight: "8px",

    [theme.breakpoints.down(900)]: {
      display: "none",
    },
  },
  NavbarRight: {
    display: "inline",
    justifyContent: "flex-start !important",
  },
  Icons: {
    padding: "11px 5px 0px 5px !important",
    width: "43px !important",
  },
  Logo: {
    paddingTop: "6px !important",
    width: "43px !important",
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
    right: "42px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",

    [theme.breakpoints.down(900)]: {
      top: "16px",
      right: "44px",
    },
    [theme.breakpoints.down(500)]: {
      top: "57px",
      right: "44px",
    },
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
    background: "rgba(255, 255, 255, 0.34) !important",
    borderRadius: "34px",
    border: "none",
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    transition: ".5s",
    height: "35px",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
}));

function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 99 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const BackToTop = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [category, setCategory] = React.useState<any>();
  const [isOpen, setIsOpen] = React.useState<any>(false);

  let ddd: any = category;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { keyword } = useSelector((state: rootState) => state.productsReducer);

  const cartProducts = useSelector(
    (state: rootState) => state.cartreducer.cartProducts
  );
  let total = cartProducts.length;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    getCategoryForCleintPage();
  }, []);

  const getCategoryForCleintPage = async () => {
    let response: any = await getCategoryForClient();
    let categories: any = response.data;
    setCategory(response.data.menu);
  };
  const getCategoryProductById = async (id: any) => {
    const response = await getProductFromCategoryById(id, {});
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const styles: SxProps = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  };
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid spacing={1} container>
              <Grid
                item
                xs={12}
                md={12}
                lg={2}
                className={classes.oneGrid}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link to="/">
                  <div>
                    <img src={Ys} alt="Logo" className={classes.Logo} />
                  </div>
                </Link>
                <Menu
                  menuButton={
                    <MenuButton
                      className={classes.menuButton}
                      // onClick={() => {
                      //   if (isOpen) {
                      //     setIsOpen(false);
                      //   } else {
                      //     setIsOpen(true);
                      //   }
                      // }}
                      // onAuxClick={() => {
                      //   if (!isOpen) {
                      //     setIsOpen(true);
                      //   }
                      // }}

                    >
                      {/* <img src={catalogicon} style={{width: "25px", height: "25px", background: "#fff", borderRadius: "50%", padding: "7px"}}/> */}
                      <ListIcon />
                      <span style={{ marginLeft: "5px" }}>Katalog</span>
                    </MenuButton>
                  }
                >
                  <SubMenu
                    label="String"
                  >
                    {category?.string?.map((item: any, key: any) => {
                      const getCategory = () => {
                        getCategoryProductById(item.parent_id);
                      };
                      return (
                        <>
                          <MenuItem>
                            <Link
                              to={`/product/product-by-category/${item.parent_id}`}
                              key={key}
                              className={classes.navLink}
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        </>
                      );
                    })}
                  </SubMenu>
                </Menu>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={10}
                className={classes.NavbarInsite}
              >
                <Grid item xs={12} md={10}>
                  <MainSearch />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  style={{}}
                  className={classes.twoGrid}
                >
                  <div className={classes.NavbarRight}>
                    <Tooltip title="Telegram">
                      <a href="https://t.me/itechcompany_uz">
                        <img
                          src={Basket}
                          alt="Basket"
                          className={classes.Icons}
                        />
                      </a>
                    </Tooltip>
                    <Tooltip title="Savatcha">
                      <>
                        <Link to={"/cart"}>
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
                      </>
                    </Tooltip>
                    <Tooltip title="Tilni tanlang">
                      <img
                        src={Search}
                        alt="Search"
                        className={classes.Icons}
                      />
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <div></div>
          </Container>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />
      <Container></Container>
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
    </React.Fragment>
  );
};
export default BackToTop;
