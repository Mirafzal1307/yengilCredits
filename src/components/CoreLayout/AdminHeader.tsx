import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Link as RouterLink,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Avatar, Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { makeStyles } from "@mui/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TableViewIcon from "@mui/icons-material/TableView";
import AvatarImage from "../../Images/Rectangle 287.png";
import Icon from "../../Images/Logo BT.svg";
import Brand from "../../Images/Yengilcredit.uz.svg";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles({
  Layout_All: {
    padding: "0px 0px 0px 50px !important",
  },
  Header_layout_page: {
    paddingLeft: "20px !important",
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "17px !important",
    lineHeight: "138% !important",
    display: "flex !important",
    alignItems: "center !important",
    color: "#464646 !important",
  },
  Header_Icon: {
    maxWidth: "45px !important",
    maxHeight: "46px !important",
  },
  Header_Brand: {
    maxWidth: "189px !important",
    maxHeight: "16px !important",
    marginLeft: "10px !important",
    marginTop: "10px",
  },
  appBar: {
    backgroundColor: "#fff !important",
    boxShadow: "none !important",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12) !important",
  },
  nativeSelect: {
    "&::before": {
      borderBottom: "unset !important",
    },
  },
  formControl: {
    borderBottom: "2px solid white !important",
  },
  HomeIcon: {
    color: "#464646 !important",
  },
  Tabs: {
    display: "flex unset !important",
  },
  active: {
    backgroundColor: "crimson",
  },
});
export default function MiniDrawer(props: any): any {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  function logout(): void {
    localStorage.clear();
    navigate("/");
  }
  const handleKeyDown = (): void => {
    logout();
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        style={{ fontFamily: "Poppins", fontSize: "16px" }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <div
          role="button"
          tabIndex={0}
          onClick={logout}
          onKeyDown={handleKeyDown}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "16px",
            fontFamily: "Poppins",
            color: "#000",
          }}
        >
          Logout
        </div>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        />
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const classes = useStyles();
  const [activeItem, setActiveitem] = React.useState(null);

  const handleActiveCard = (): void => {
    const actualCardId = activeItem;
    setActiveitem(activeItem);
  };
  return (
    <Box sx={{ display: "flex" }} className={classes.Layout_All}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
            style={{ color: "#9a9999" }}
          >
            <Tooltip title="Menu">
              <MenuIcon />
            </Tooltip>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ minWidth: 120 }} className={classes.formControl}>
            <Tooltip title="Tilni tanlash">
              <FormControl fullWidth className={classes.formControl}>
                <NativeSelect
                  className={classes.nativeSelect}
                  defaultValue={30}
                  inputProps={{
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>Russian</option>
                  <option value={30}>Uzbek</option>
                </NativeSelect>
              </FormControl>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Tooltip title="Profil">
                <Avatar src={AvatarImage} alt="Avatar" />
              </Tooltip>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img className={classes.Header_Icon} src={Icon} alt="rasm" />
          <Link to="/">
            {" "}
            <img className={classes.Header_Brand} src={Brand} alt="rasm" />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Tooltip title="Home Page">
            <ListItem
              button
              component={RouterLink as any}
              to="/dashboard"
              className={classes.Header_layout_page}
            >
              <ListItemIcon>
                <HomeIcon className={classes.HomeIcon} />
              </ListItemIcon>
              <ListItemText primary="Панель управления" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Product Page">
            <ListItem
              button
              component={RouterLink as any}
              to="/product"
              className={classes.Header_layout_page}
            >
              <ListItemIcon>
                <BusinessCenterIcon className={classes.HomeIcon} />
              </ListItemIcon>
              <ListItemText primary="Продукты" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Category Page">
            <ListItem
              button
              component={RouterLink as any}
              to="/category"
              className={classes.Header_layout_page}
            >
              <ListItemIcon>
                <TableViewIcon className={classes.HomeIcon} />
              </ListItemIcon>
              <ListItemText primary="Категории" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Order Page">
            <ListItem
              button
              component={RouterLink as any}
              to="/order"
              className={classes.Header_layout_page}
            >
              <ListItemIcon>
                <BookmarkBorderIcon className={classes.HomeIcon} />
              </ListItemIcon>
              <ListItemText primary="Заказы" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Brand Page">
            <ListItem
              button
              component={RouterLink as any}
              to="/brand"
              className={classes.Header_layout_page}
            >
              <ListItemIcon>
                <FavoriteBorderIcon className={classes.HomeIcon} />
              </ListItemIcon>
              <ListItemText primary="Боенды" />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} />
    </Box>
  );
}
