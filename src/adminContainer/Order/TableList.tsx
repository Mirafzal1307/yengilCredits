import { Container, Paper, Typography } from "@mui/material";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import TableOrder from "./TableOrder";

const Order: React.FC = () => {
  return (
    <div>
      <MiniDrawer />
      <Container
        style={{ marginTop: "50px"}}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "28px",
          }}
        >
          Buyurtma
        </Typography>

        <Paper elevation={3}>
          <TableOrder />
        </Paper>
      </Container>
    </div>
  );
};

export default Order;
