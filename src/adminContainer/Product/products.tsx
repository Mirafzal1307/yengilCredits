import { Container } from "@mui/material";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import { makeStyles } from "@mui/styles";
import ProductList from "./ProductList";

const useStyles = makeStyles({
  Container: {
    maxWidth: "1450px !important",
  },
});

const AllUsers = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <MiniDrawer />
        <Container style={{padding: "0"}}>
        <Container style={{ marginTop: "50px" }} className={classes.Container}>
          <ProductList />
        </Container>
      </Container>  
    </>
  );
};

export default AllUsers;
