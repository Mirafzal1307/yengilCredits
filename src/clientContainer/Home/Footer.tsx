import { Container, Grid, Paper, useMediaQuery } from "@mui/material";
import { Box, color } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import FooterLeft from "../../Images/footer_left.svg";
import Logo from "../../Images/Logo1.svg";
import { green } from "@mui/material/colors";
import FootLogo from '../../Images/FootLogo.png'
import InstagramImg from '../../Images/Group 227.png'
import TelegramImg from '../../Images/telegram(1).png'
import AppleImg from '../../Images/Group 240.png'
import PlayMarketImg from '../../Images/Vector (4).png'

const useStyles = makeStyles(theme => {
  return {
    Item: {
      maxWidth: '100%'
    },
    ItemButton: {
      textAlign: 'center',

      '& p': {
        fontSize: '18px',
        fontWeight: 700,
        color: '#fff',
      },
      '& h3': {
        fontSize: '18px',
        fontWeight: 700,
        color: "#fff"
      },
      '& img': {
        marginRight: '15px'
      },
      '& button': {
        maxWidth: '180px',
        height: '50px',
        fontSize: '16px',
        fontWeight: 600,
        color: "#fff",
        background: 'transparent',
        border: '1px solid #fff',
        borderRadius: '5px',
        padding: '0 10px',

        '& div': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }
    }
  }
});


const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <Box style={{ background: '#065374', padding: '30px 0' }}>
        <Container maxWidth='xl'>
          <Grid container item spacing={1} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
            <Grid className={classes.Item} item xs={12} md={4} order={{ sm: 4, md: 1 }}>
              <div className={classes.ItemButton}>
                <img style={{ width: '80%' }} src={FootLogo} alt="" />
                <p>Mijozlarni qo’llab-quvatlash <br />+998 94 412 70 70 </p>
              </div>
            </Grid>
            <Grid className={classes.Item} item xs={6} md={2} sm={6} order={{ sm: 1, md: 1 }}>
              <div className={classes.ItemButton}>
                <h3>Bosh sahifa</h3>
                {/* <Link to='https://www.instagram.com/itechcompany_uz/'> */}
                <a href="https://www.instagram.com/itechcompany_uz/">
                  <button>
                    <div>
                      <img src={InstagramImg} alt="" />
                      Instagram
                    </div>
                  </button>
                </a>
                {/* </Link> */}
              </div>
            </Grid>
            <Grid className={classes.Item} item xs={6} md={2} sm={6} order={{ sm: 1, md: 1 }}>
              <div className={classes.ItemButton}>
                <h3>Do’kon haqida</h3>
                {/* <Link to='https://t.me/itechcompany_uz'> */}
                <a href="https://t.me/itechcompany_uz">
                  <button>
                    <div>
                      <img src={TelegramImg} alt="" />
                      Telegram
                    </div>
                  </button>
                </a>
                {/* </Link> */}
              </div>
            </Grid>
            <Grid className={classes.Item} item xs={6} md={2} sm={6} order={{ sm: 1, md: 1 }}>
              <div className={classes.ItemButton}>
                <h3>Katalog</h3>
                {/* <Link to='https://www.instagram.com/itechcompany_uz/'> */}
                <a href="https://play.google.com/store/apps/details?id=jp.konami.pesam">
                  <button>
                    <div>
                      <img src={AppleImg} alt="" />
                      App store
                    </div>
                  </button>
                </a>
                {/* </Link> */}
              </div>
            </Grid>
            <Grid className={classes.Item} item xs={6} md={2} sm={6} order={{ sm: 1, md: 1 }}>
              <div className={classes.ItemButton}>
                <h3>Yetkazib berish</h3>
                {/* <Link to='https://www.instagram.com/itechcompany_uz/'> */}
                <a href="https://play.google.com/store/apps/details?id=jp.konami.pesam">
                  <button>
                    <div>
                      <img src={PlayMarketImg} alt="" />
                      Google play
                    </div>
                  </button>
                </a>
                {/* </Link> */}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;