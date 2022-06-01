import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container, Grid } from '@mui/material';
import Alif from "../../../Images/Group 56530.png";
import Paymart from '../../../Images/image 58.png';
import Iman from '../../../Images/image 59 (1).png';
import { makeStyles } from "@material-ui/core/styles";
import Dostavka from "../../../Images/Dostavka.png"
import Galochka from "../../../Images/Galochka.png"
import Image from "../../../Images/image.png"
import Operator from "../../../Images/Operator.png"

const useStyles = makeStyles(theme => ({
    img: {
        width: "300px !important",
        cursor: "pointer",
        height: "calc(((100% + 110px) / 3) - 15px)",
        [theme.breakpoints.up(600)]: {
            // width: "60% !important",
            height: "calc(((100% + 130px) / 3) - 15px)",
        },
        "&:hover": {
            opacity: "0.9 !important",
        },
    },
    Partner: {

        color: '#065374',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: "45px",
        fontFamily: 'Poppins',
        [theme.breakpoints.down(600)]: {
            fontSize: "25px",
        }
    },
    Slide: {
        textAlign: "center",
        boxSizing: 'border-box',
        "&:hover": {
            opacity: "0.99 !important",
            transform: 'scale(1.06)',
            transition: '1ms',
            borderRadius: "50px",
            zIndex: '9999 !important'


        },
    },
    client: {
        display: "flex !important",
        justifyContent: "space-between !important"
    },
    grid: {
        display: "flex !important",
        justifyContent: "space-around !important"
    },
    div: {
        textAlign: "center",
    },
    text: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontSize: "18px",
        color: "#065374",
        margin: "10px 0 0 0"
    },
    paragraph: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "13px",
        textAlign: "center",
    }
}))

const Partner = () => {
    const classes = useStyles()
    return (
        <>
            <Container maxWidth="xl" style={{ marginTop: "48px" }}>
                <Grid className={classes.grid}>
                    <Grid xs={2} item className={classes.div}>
                        <Grid>
                            <img src={Dostavka} alt="" />
                        </Grid>
                        <p className={classes.text}>Bepul yetkazib berish</p>
                        <p className={classes.paragraph}>Sizning xotirjamligingiz uchun 3 yilgacha sayt kafolati mavjud.</p>
                    </Grid>
                    <Grid xs={2} item className={classes.div}>
                        <Grid>
                            <img src={Galochka} alt="" />
                        </Grid>
                        <p className={classes.text}>Bo’lib to’lash </p>
                        <p className={classes.paragraph}>Katta chegirmalar, bepul yetkazib berish va maxsus yordam mutaxassisi bilan.</p>
                    </Grid>
                    <Grid xs={2} item className={classes.div}>
                        <Grid>
                            <img src={Image} alt="" />
                        </Grid>
                        <p className={classes.text}>1 yil garantiya</p>
                        <p className={classes.paragraph}>Yangi mahsulotlarga 70% gacha chegirma, siz eng yaxshi narxga amin bo'lishingiz mumkin.</p>
                    </Grid>
                    <Grid xs={2} item className={classes.div}>
                        <Grid>
                            <img src={Operator} alt="" />
                        </Grid>
                        <p className={classes.text}>Qo’llab quvatlash xizmati</p>
                        <p className={classes.paragraph}>Yangi mahsulotlarga 70% gacha chegirma, siz eng yaxshi narxga amin bo'lishingiz mumkin.</p>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl" style={{ marginTop: '20px', }}  >
                <p className={classes.Partner} >Bizning hamkorlar</p>
                {/* <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        gap: "15px",
                        breakpoints: {
                            400: {
                                perPage: 3,
                            },
                            700: {
                                perPage: 1,
                            },
                            992: {
                                perPage: 2,
                            },
                            1300: {
                                perPage: 3,
                            }
                        },
                        type: 'loop',
                        autoplay: true,
                        autoScroll: {
                            speed: 1
                        },
                    }}>
                    <SplideSlide className={classes.Slide} >
                        <img src={Alif} alt='' className={classes.img} />
                    </SplideSlide>
                    <SplideSlide className={classes.Slide} >
                        <img src={Paymart} alt='' className={classes.img} />
                    </SplideSlide>
                    <SplideSlide className={classes.Slide} >
                        <img src={Iman} alt='' className={classes.img} />
                    </SplideSlide>
                </Splide> */}
                <Grid>
                    <div className={classes.client}>
                        {/* <div> */}
                        <img src={Alif} alt='' className={classes.img} />
                        {/* </div> */}
                        {/* <div> */}
                        <img src={Paymart} alt='' className={classes.img} />
                        {/* </div> */}
                        {/* <div> */}
                        <img src={Iman} alt='' className={classes.img} />
                        {/* </div> */}
                    </div>
                </Grid>
            </Container>
        </>
    );
};
export default Partner;
