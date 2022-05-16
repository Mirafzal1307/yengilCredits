import { makeStyles } from "@mui/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  button: {
    display: "flex !important",
    backgroundColor: "#fff !important",
    width: "100% !important",
    boxShadow: "0 0.1rem 0.25rem rgb(0 0 0 / 8%) !important",
    border: "0 solid rgba(222 , 226 , 230 , 0.7) !important",
    marginBottom: "1.5rem !important",
    padding: "1.3rem 1.3rem !important",
    borderRadius: "0.25rem !important",
  },
  icon: {
    color: "#0f4be4 !important",
    padding: "13px 13px 13px 13px !important",
    marginRight: "15px !important",
    height: "50px !important",
    width: "50px !important",
    borderRadius: "50% !important",
    backgroundColor: "rgba(49, 103, 235, .2) !important",
  },
  button_inside: {
    "& h6": {
      fontSize: "1rem !important",
      margin: "0 !important",
      padding: "0 !important",
      fontWeight: "600 !important",
      marginBottom: "0.25rem !important",
    },
    "& p": {
      margin: "0 !important",
      padding: "0 !important",
    },
  },
  icon_deliver: {
    color: "#00b517 !important",
    padding: "13px 13px 13px 13px !important",
    marginRight: "15px !important",
    height: "50px !important",
    width: "50px !important",
    borderRadius: "50% !important",
    backgroundColor: "rgba(0, 181, 23, .2) !important",
  },
  icon_basket: {
    color: "#fd8a14 !important",
    padding: "13px 13px 13px 13px !important",
    marginRight: "15px !important",
    height: "50px !important",
    width: "50px !important",
    borderRadius: "50% !important",
    backgroundColor: " rgba(253, 138, 20, .2) !important",
  },
});

const HomePageTopButtons = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div className={classes.button}>
              <AttachMoneyIcon className={classes.icon} />
              <div className={classes.button_inside}>
                <h6>Total sales</h6>
                <p> $ 120,321,154.20</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.button}>
              <LocalShippingIcon className={classes.icon_deliver} />
              <div className={classes.button_inside}>
                <h6>Total sales</h6>
                <p> $ 120,321,154.20</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.button}>
              <ShoppingBasketIcon className={classes.icon_basket} />
              <div className={classes.button_inside}>
                <h6>Total sales</h6>
                <p> $ 120,321,154.20</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default HomePageTopButtons;
