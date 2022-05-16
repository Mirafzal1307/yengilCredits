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
import Bt from "../../../Images/Logo1.svg";
import Search from "../../../Images/one.svg";
import Basket from "../../../Images/two.svg";
import Lang from "../../../Images/three.svg";
// import Telegram from "../../../Images/four.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
// import Fade from "@mui/material/Fade";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
import { SxProps } from "@mui/system";
import "./style.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getCategoryForClient } from "../../../Api/client/ClientCategoryApi";
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import iconCatalog from "../../../Images/Group 56493.svg";
import { getProductFromCategoryById } from "../../../Api/admin/AdminProductApi";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Pagination, PaginationItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/reducers";
import MainSearch from "../MainSearch";
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}
const useStyles = makeStyles((theme) => ({
  NavbarInsite: {
    display: "flex !important",
    justifyContent: 'space-between !important',
    position: "relative",
    flexDirection: 'column',

    [theme.breakpoints.down(1030)]: {
      // display: "flex !important",
      flexDirection: 'column ',
    },
    [theme.breakpoints.down(500)]: {
      // display: "flex !important",
      flexDirection: 'column !important',
    }

  },
  appBar: {
    background: '#065374 !important',
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
    position: "relative"
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
    width: '15px',
    height: '15px',
    fontSize: '13px',
    background: '#dd0820',
    position: 'absolute',
    top: '15px',
    right: '42px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',

    [theme.breakpoints.down(900)]: {
      top: '16px',
      right: '44px'
    },
    [theme.breakpoints.down(500)]: {
      top: '57px',
      right: '44px'
    },

  },
  oneGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(900)]: {
      display: 'flex',
      justifyContent: 'space-between',
    }

  },
  twoGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down(900)]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

  },
  NavbarMenu: {
    marginTop: '10px ',
    textAlign: 'center'
  },
  katalog: {
    position: "absolute",
    left: "90%",
    backgroundColor: "black !important"
  }
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

  let ddd: any = category




  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { keyword } = useSelector((state: rootState) => state.productsReducer);

  const cartProducts = useSelector(
    (state: rootState) => state.cartreducer.cartProducts
  );
  let total = cartProducts.length;


  // #005aff

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    getCategoryForCleintPage();
  }, []);

  const getCategoryForCleintPage = async () => {
    // let categoryArray = []
    let response: any = await getCategoryForClient();
    let categories: any = response.data
    // let {menu} = categories
    // .data?.menu || undefined
    // categoryArray.push(categories)
    // categoryArray.forEach((i:any) => {
    //   console.log(`my array ${i}`);
    // })    
    // console.log(typeof(categories));
    // console.log();
    // let categoryArray = Object.entries(menu)
    // categoryArray.forEach((i:any) => {
    //   console.log(i)
    // })
    // console.log(menu['Kichik texnika'])


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
          <Container maxWidth="xl" >

            <Grid spacing={1} container  >

              <Grid item xs={12} md={12} lg={2} className={classes.oneGrid} >
                <Link to='/' >
                  <div>
                    <img src={Bt} alt="Logo" className={classes.Logo} />
                  </div>
                </Link>

                <div>

                  <Tooltip title="Katalog">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className={classes.Katalog}
                      sx={{textTransform: 'capitalize'}}
                    >
                      <button className={classes.KatalogIcon}>
                        <img src={iconCatalog} alt="ooo" />
                      </button>
                      Katalog
                    </Button>
                  </Tooltip>
                  <div >
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      className={classes.NavbarMenu}

                    >
                      <div className="menuItem">
                         <MenuItem className={classes.parentCat}>Smartfonlar</MenuItem> 
                        {/* <div className={classes.katalog}> */}
                          {category?.Smartfonlar?.map((item: any, index: any) => {
                            const getCategory = () => {
                              getCategoryProductById(item.parent_id);
                            };
                            return (
                              <>
                                <MenuItem
                                  className="subCate"
                                  onClick={getCategory}
                                  component={RouterLink as any}
                                  to={`/product/product-by-category/${item.parent_id}`}
                                  key={index}
                                >
                                  {item.name}
                                </MenuItem>
                              </>
                            );
                          })}
                        {/* </div>  */}
{/* <TreeView
                          aria-label="file system navigator"
                          defaultCollapseIcon={<ExpandMoreIcon />}
                          defaultExpandIcon={<ChevronRightIcon />}
                          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                        >
                          <TreeItem nodeId="1" label="Smartfonlar"> 
                            {/* <TreeItem nodeId="2">{}</TreeItem> */}
{/*                              {category?.Smartfonlar?.map((item: any, index: any) => {
                              const getCategory = () => {
                                getCategoryProductById(item.parent_id);
                              };
                              return (
                                <>
                                  <MenuItem
                                    className="subCate"
                                    onClick={getCategory}
                                    component={RouterLink as any}
                                    to={`/product/product-by-category/${item.parent_id}`}
                                    key={index}
                                  >
                                    {item.name}
                                  </MenuItem>
                                </>
                              );
                            })}
                          </TreeItem>
                        </TreeView>  */} 
                        <div></div>
                      </div>
                      <div className="menuItem">
                        <MenuItem className={classes.parentCat}>Aksesuar</MenuItem>
                        {category?.Aksesuar?.map((item: any, index: any) => {
                          const getCategory = () => {
                            getCategoryProductById(item.parent_id);
                          };
                          return (
                            <>
                              <MenuItem
                                className="subCate"
                                onClick={getCategory}
                                component={RouterLink as any}
                                to={`/product/product-by-category/${item.parent_id}`}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            </>
                          );
                        })}
                        <div></div>
                      </div>

                      <div className="menuItem">
                        <MenuItem className={classes.parentCat}   >Kichik texnika</MenuItem>
                        {category?.['Kichik texnika']?.map((item: any, index: any) => {
                          const getCategory = () => {
                            getCategoryProductById(item.parent_id);
                          };
                          return (
                            <>
                              <MenuItem
                                className="subCate"
                                onClick={getCategory}
                                component={RouterLink as any}
                                to={`/product/product-by-category/${item.parent_id}`}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            </>
                          );
                        })}
                        <div></div>
                      </div>

                      <div className="menuItem">
                        <MenuItem className={classes.parentCat}   >Smartfonlar</MenuItem>
                        {category?.Smartfonlar?.map((item: any, index: any) => {
                          const getCategory = () => {
                            getCategoryProductById(item.parent_id);
                          };
                          return (
                            <>
                              <MenuItem
                                className="subCate"
                                onClick={getCategory}
                                component={RouterLink as any}
                                to={`/product/product-by-category/${item.parent_id}`}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            </>
                          );
                        })}
                        <div></div>
                      </div>



                      <div onClick={handleClose} className={classes.CloseIcon}>
                        <ExpandLessIcon />
                      </div>
                    </Menu>
                  </div>

                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={10} className={classes.NavbarInsite}   >
                <Grid item xs={12} md={10} >
                  <MainSearch />
                </Grid>
                <Grid item xs={12} md={2} style={{}} className={classes.twoGrid} >
                  <div className={classes.NavbarRight}  >


                    <Tooltip title="Telegram">
                      <a href="https://t.me/itechcompany_uz"><img src={Basket} alt="Basket" className={classes.Icons} /></a>
                    </Tooltip>
                    <Tooltip title="Savatcha">
                      <>
                        <Link to={"/cart"}>
                          <img
                            src={Lang}
                            alt="Language"
                            className={classes.Icons}
                            style={{ position: 'relative', marginTop: '10px !important' }}
                          />
                          <b className={classes.CartTotal}>{total}</b>
                        </Link>
                      </>
                    </Tooltip>
                    <Tooltip title="Tilni tanlang">
                      <img src={Search} alt="Search" className={classes.Icons} />
                    </Tooltip>

                  </div>
                </Grid>

              </Grid>

            </Grid>
            <div >




            </div>
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
