import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import ProductList from "./ProductList";

const useStyles = makeStyles({
  Container: {
    maxWidth: "1450px !important",
  },
  header: {
    display: "flex;",
    marginTop: "50px",
  },
});
function AllUsers(props: any): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <MiniDrawer />

      <Container
        style={{ padding: "0", marginRight: "100px", marginLeft: "0" }}
      >
        <Container style={{ marginTop: "50px" }} className={classes.Container}>
          <ProductList />
        </Container>
      </Container>
    </div>
  );
}
export default AllUsers;
