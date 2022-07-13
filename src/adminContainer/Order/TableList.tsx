import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import TableOrder from "./TableOrder";

function Order(): JSX.Element {
  return (
    <Box sx={{ display: "flex", mt: "50px" }}>
      <MiniDrawer />
      <Container
        maxWidth="lg"
        style={{ marginTop: "50px", marginLeft: "0", marginRight: "80px" }}
      >
        <Typography
          sx={{
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "28px",
          }}
          variant="h1"
        >
          Заказ
        </Typography>

        <Paper elevation={3}>
          <TableOrder />
        </Paper>
      </Container>
    </Box>
  );
}

export default Order;
