import { Container } from "@mui/material";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import CategoryList from "./CategoryList";

const Category = () => {
  return (
    <>
      <MiniDrawer />
      <Container>
        <CategoryList />
      </Container>
    </>
  );
};

export default Category;

console.clear()