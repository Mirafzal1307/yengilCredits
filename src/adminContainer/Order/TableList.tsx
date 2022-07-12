import { Container, Paper, Typography } from "@mui/material";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import TableOrder from "./TableOrder";

function Order(): JSX.Element {
  return (
    <div>
      <MiniDrawer />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "28px",
          }}
          variant="h1"
        >
          Buyurtma
        </Typography>

        <Paper elevation={3}>
          <TableOrder />
        </Paper>
      </Container>
    </div>
  );
}

export default Order;
