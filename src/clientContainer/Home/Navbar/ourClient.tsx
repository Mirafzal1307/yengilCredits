import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from '@mui/material';
import Alif from "../../../Images/Group 56530.png";
import Paymart from '../../../Images/image 58.png';
import Iman from '../../../Images/image 59.png';

import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    img: {
        width: "100% !important",
        cursor: "pointer",
        height: "calc(((100% + 96px) / 3) - 15px)",
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
    }

}))

const Partner = () => {
    const classes = useStyles()
    return (
        <>
            <Container maxWidth="xl" style={{ marginTop: '20px', }}  >
                <p className={classes.Partner} >Bizning hamkorlar</p>
                <Splide
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
                </Splide>
            </Container>
        </>
    );
};
export default Partner;
