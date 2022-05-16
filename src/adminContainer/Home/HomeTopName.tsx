import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  root: {
    background: "#3167eb !important",
    border: "1px solid transparent !important",
    borderRadius: "0.25rem !important",
    boxShadow:
      "inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%) !important",
    color: "white !important",
    fontSize: "16px !important",
    padding: "0.5rem 0.75rem !important",
    textTransform: "lowercase",
  },
  homeTop: {
    fontSize: "30px !important",
    fontWeight: "600 !important",
    margin: "0 !important",
  },
  dashboard: {
    display: "flex !important",
    justifyContent: "space-between !important",
    marginBottom: "40px !important",
  },
});

const HomePageTop = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.dashboard}>
        <h2 className={classes.homeTop}>Dashboard</h2>
        <Button className={classes.root}>Create report</Button>
      </div>
    </>
  );
};
export default HomePageTop;
