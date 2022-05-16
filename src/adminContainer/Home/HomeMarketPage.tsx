import { Box } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import IosShareIcon from "@mui/icons-material/IosShare";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const useStyles = makeStyles({
  Marketing: {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important",
    borderRadius: "5px !important",
    padding: "16px 35px 37px 25px !important",
    backgroundColor: "#fff !important",
    fontFamily: "Poppins !important",
  },
  Home_Facebook: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#adb5bd !important",
    paddingTop: "15px !important",
    paddingBottom: "3px !important",
    fontSize: "14px !important",
  },
  Home_Instagram: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#adb5bd !important",
    paddingTop: "15px !important",
    paddingBottom: "3px !important",
    fontSize: "14px !important",
  },
  Home_Google: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#adb5bd !important",
    paddingTop: "15px !important",
    paddingBottom: "3px !important",
    fontSize: "14px !important",
  },
  Home_Other: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#adb5bd !important",
    paddingTop: "15px !important",
    paddingBottom: "3px !important",
    fontSize: "14px !important",
  },
  other_links: {
    background: "#fff !important",
    color: "#000 !important",
    padding: "0.5rem 0.75rem !important",
    fontSize: "1rem !important",
    borderRadius: "0.25rem !important",
    border: "1px solid rgba(108 , 117 , 125 , 0.25) !important",
    marginTop: "25px !important",
  },
  icon_button: {
    paddingTop: "7px !important",
    color: "#adb5bd !important",
    textAlign: "center",
  },
  borderLinearProgress: {
    borderRadius: "0.25rem !important",
    height: "17px !important",
    backgroundImage:
      "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent) !important",
    backgroundSize: "1rem 1rem !important",
    background: "#cacaca !important",
  },
});

const HomeMarketPage = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.Marketing}>
        <h2>Marketing</h2>
        <Box sx={{ flexGrow: 1 }}>
          <p className={classes.Home_Facebook}>Facebook page</p>

          <BorderLinearProgress
            variant="determinate"
            value={15}
            color="info"
            className={classes.borderLinearProgress}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <p className={classes.Home_Instagram}>Instagram page</p>

          <BorderLinearProgress
            variant="determinate"
            value={65}
            color="success"
            className={classes.borderLinearProgress}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <p className={classes.Home_Google}>Google page</p>

          <BorderLinearProgress
            variant="determinate"
            value={51}
            color="error"
            className={classes.borderLinearProgress}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <p className={classes.Home_Other}>Other links page</p>

          <BorderLinearProgress
            variant="determinate"
            value={80}
            color="secondary"
            className={classes.borderLinearProgress}
          />
        </Box>
        <button className={classes.other_links}>
          Open analytics <IosShareIcon className={classes.icon_button} />
        </button>
      </div>
    </div>
  );
};

export default HomeMarketPage;