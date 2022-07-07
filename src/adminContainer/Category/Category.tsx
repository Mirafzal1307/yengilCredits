import { Container } from "@mui/material";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import CategoryList from "./CategoryList";

function Category(): JSX.Element {
  return (
    <>
      <MiniDrawer />
      <Container>
        <CategoryList />
      </Container>
    </>
  );
}

export default Category;
