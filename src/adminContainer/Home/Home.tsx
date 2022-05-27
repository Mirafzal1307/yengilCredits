import * as React from "react";
import { Container, Grid } from "@mui/material";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import HomePageTop from "./HomeTopName";
import HomePageTopButtons from "./HomeTopButton";
import HomeMarketPage from "./HomeMarketPage";
import HomeChartTableButton from "./HomeChartTableBottom";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
import HomeChartTable from "./HomeChartTable";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#f8f9fa !important",
  },
});

const HomeHeader: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <MiniDrawer />
      <Container  maxWidth="lg"  style={{ marginTop: "50px" }}>
        <Grid container>
          <Grid item xs={12}>
            <HomePageTop />
          </Grid>
        </Grid>
        <HomePageTopButtons />
        <Grid container spacing={3}>
         <Grid item xs={7}>
            {/* <HomeChartTable /> */}
          </Grid>
          <Grid item xs={5} sx={{marginBottom: '30px'}} >
            <HomeMarketPage />
          </Grid>
        </Grid>
        <Grid container  sx={{marginBottom: '30px'}} >
          <Grid item xs={12}>
            <HomeChartTableButton />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default class Demo extends React.Component<object, object> {
  public render(): React.ReactNode {
    return (
      <>
        <HomeHeader />
      </>
    );
  }
}
