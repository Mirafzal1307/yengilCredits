import { Container } from "@mui/material";
import { Box } from "@mui/system";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import CategoryList from "./CategoryList";

function Category(): JSX.Element {
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Container
        sx={{
          marginLeft: "0",
          marginRight: "100px",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        <CategoryList />
      </Container>
    </Box>
  );
}

export default Category;
