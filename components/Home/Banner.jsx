import {makeStyles} from '@material-ui/core/styles';
import { Box, Container, Typography } from "@material-ui/core"
import NextLink from "next/link";
import { useContext } from 'react';

import { Context } from '../App';
import { StyledButton } from '../StyledComponents'

const useStyles = makeStyles(theme => ({
    backgroundBanner:{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #FFF 0%, #EDEDED 100%)',
        position: 'relative',
        padding: theme.spacing(0, 0, 15, 0),
        '&::before': {
            zIndex: 2,
            backgroundColor: theme.palette.background.main,
            content: '""',
            position: 'absolute',
            width: '100%',
            height: theme.spacing(15),
            bottom: 0,
            left: 0,
            borderRadius: '50% 50% 0 0',
        },
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
        },
    },
    leftCorner: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        height: 100,
        [theme.breakpoints.up('md')]: {
            height: 350,
        },
    },
    rightCorner: {
        position: 'absolute',
        zIndex: 1,
        bottom: 70,
        right: 0,
        height: 150,
        [theme.breakpoints.up('md')]: {
            height: 300,
            bottom: 0,
        },
    },
    leftSide: {
        position: 'absolute',
        left: 0,
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    rightSide: {
        position: 'absolute',
        right: 0,
    },
    contentBanner:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 500,
        textAlign: 'center',
        paddingInline: theme.spacing(1),
    },
    bannerTitle:{
        fontSize: 32,
        fontWeight: 800,
        color: theme.palette.secondary.main,
        paddingBottom: '30px',
        letterSpacing: '0.05em',
        [theme.breakpoints.up('lg')] : {
            fontSize: 60,
            fontWeight: 800,
        }
    },
    bannerDescription:{
        color: '#202422',
        paddingBottom: '30px',
        width: '70%',
        margin: '0 auto',
        letterSpacing: '0.05em',
        maxWidth: 700,
        [theme.breakpoints.up('lg')] : {
            width: '100%',
        }
    },
}));

const Banner = () => {
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return(<Container maxWidth={false} className={classes.backgroundBanner}>
        <img src="/images/decorations/home/banner-top.png" className={classes.leftCorner}/>
        <img src="/images/decorations/home/banner-bottom.png" className={classes.rightCorner}/>
        <img src="/svg/decorations/home/banner-left.svg" className={classes.leftSide}/>
        <img src="/svg/decorations/home/banner-right.svg" className={classes.rightSide}/>
        <Box className={classes.contentBanner}>
            <Typography variant='h1' component='h1' className={classes.bannerTitle}>{dictionary.home.bannerTitle}</Typography>
            <Typography className={classes.bannerDescription}>{dictionary.home.bannerDescription}</Typography>
            <NextLink href="/products" passHref><StyledButton label={dictionary.general.showProducts}/></NextLink>
        </Box>
    </Container>);
}

export default Banner;