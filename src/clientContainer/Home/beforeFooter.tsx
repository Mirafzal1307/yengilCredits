import { Container, Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import FooterLeft from "../../Images/footer_left.svg";

const useStyles = makeStyles((theme) => {
  return {
    ul: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      textAlign: "left",
    },
    FooterTopTitle: {
      fontFamily: "Poppins",
      fontSize: "22px",
      fontWeight: 700,
      [theme.breakpoints.down("md")]: {
        fontSize: "19px",
      },
    },
    footerTopText: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
        textAlign: "center",
      },
    },
    footerBottomText: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "20px",
      marginBottom: "0",
      marginTop: "0",
      textAlign: "center",
    },
    footerLink: {
      fontFamily: "Poppins",
      fontWeight: 600,
      textDecoration: "none",
      color: "#fff",
    },
  };
});

const BeforeFooter = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1100px)");

  return (
    <>
      <Box
        sx={{ width: "100%" }}
        style={{ paddingTop: "39px", paddingBottom: "20px" }}
      >
        <Container maxWidth="xl">
          <Grid xs={12}>
            <h2
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "22px",
                marginBottom: "20px",
              }}
            >
              Biz haqimizda
            </h2>
          </Grid>
        </Container>
        <Box sx={{ width: "100%" }}>
          <Container style={{ display: "flex", alignItems: "center" }}>
            <Grid
              container
              spacing={6}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12} md={matches ? 6 : 12}>
                <img src={FooterLeft} alt="" style={{ width: "100%" }} />
              </Grid>
              <Grid item xs={12} md={matches ? 6 : 12}>
                <span className={classes.FooterTopTitle}>
                  YengilSavdo.uz onlayn do'koni - xarid qilish uchun qulay
                  gipermarket
                </span>
                <p
                  style={{ textIndent: "5%" }}
                  className={classes.footerTopText}
                >
                  Har qanday insoning hayoti va qulay sharoitlarini zamonaviy
                  texnologiyalarsiz tasavvur qilib bo'lmaydi. Ish va shaxsiy
                  savollar smart- fonda, sevimli filmlar, seriallar va
                  teleko'rsatuvlar - televizor, tozalash, yig’ishtirish –
                  changyutgich, pishirish, tayyorlash - pechka, pech va ko'plab
                  kichikroq, ammo undan kam bo'lmagan foydali qurilmalar va
                  mahsulotlar. Bundan tashqari, texnologiyalar rivojlanmoqda va
                  shuning uchun jihozlar muntazam yangilanishlarni talab qiladi,
                  men yangi modellarni sinab, tekshirib ko'rishni xohlayman
                  lekin mavjud qurilmalar va texnikalarning kuchi yetarli emas.
                </p>
                <ul className="ul">
                  <li className={classes.ul}>
                    Shu nuqtai nazardan, maishiy texnika sotib olish uchun
                    xavfsiz va qulay joy, online-do’kon bo'lishi foydalidir.
                  </li>
                  <li className={classes.ul}>
                    Bundan tashqari, texnologiyalar rivojlanmoqda va shuning
                    uchun jihozlar muntazam yangilanishlarni talab qiladi, men
                    yangi modellarni sinab, tekshirib ko'rishni xohlayman lekin
                    mavjud qurilmalar va texnikalarning kuchi yetarli emas.
                  </li>
                </ul>
                <p className={classes.footerTopText}>
                  Agar siz hali o'zingiz uchun mahsulot - tovar topa olmagan
                  bo'lsangiz, biz sizni web - saytimizda bir necha daqiqa
                  qolishga taklif qilamiz. Sizni ishontirib aytamizki,
                  vaqtingizni behuda sarf qilmaganli-ginggizga ishonch hosil
                  qilasiz.
                </p>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default BeforeFooter;
