import * as React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import HomePageTop from "./HomeTopName";
import HomePageTopButtons from "./HomeTopButton";
import HomeMarketPage from "./HomeMarketPage";
import HomeChartTableButton from "./HomeChartTableBottom";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#f8f9fa !important",
    display: "flex",
  },
});

function HomeHeader(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <MiniDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 4,
          marginRight: "100px",
        }}
      >
        <Container maxWidth="lg" style={{ marginTop: "50px", marginLeft: "0" }}>
          <Grid container>
            <Grid item xs={12}>
              <HomePageTop />
            </Grid>
          </Grid>
          <HomePageTopButtons />
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ marginBottom: "30px" }}>
              <HomeMarketPage />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: "30px" }}>
            <Grid item xs={12}>
              <HomeChartTableButton />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
export default class Demo extends React.Component<object, object> {
  public render(): React.ReactNode {
    return <HomeHeader />;
  }
}
