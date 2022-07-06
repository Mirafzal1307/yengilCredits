import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import ProductList from "./ProductList";

const useStyles = makeStyles({
  Container: {
    maxWidth: "1450px !important",
  },
});
function AllUsers(props: any): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <MiniDrawer />
      <Container style={{ padding: "0" }}>
        <Container style={{ marginTop: "50px" }} className={classes.Container}>
          <ProductList />
        </Container>
      </Container>
    </>
  );
}
export default AllUsers;
