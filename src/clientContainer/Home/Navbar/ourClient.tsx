import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from '@mui/material';
import Alif from "../../../Images/Group 56530.png";
import Paymart from '../../../Images/image 58.png';
import Iman from '../../../Images/image 59.png';

import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    img: {

        width: '300px !important',
        height: '110px !important',
        borderRadius: '5px !important',
        cursor: 'pointer',
        alignItems: 'center',


    },
    Partner: {

        color: '#065374',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: "45px",
        fontFamily: 'Poppins'
    },
    Slide: {
        textAlign: "center",
        boxSizing: 'border-box'
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
                        breakpoints: {
                            400: {
                                perPage: 1,
                            },
                            700: {
                                perPage: 2,
                            },
                            992: {
                                perPage: 3,
                            },
                            1300: {
                                perPage: 4,
                            }
                        },
                        type: 'loop',
                       
                        autoplay: true,
                        autoScroll: {
                            speed: 1
                        },

                    }}

                >
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
