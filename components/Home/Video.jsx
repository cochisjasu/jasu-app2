import {makeStyles} from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { useContext } from "react";

import { Context } from "../App";

const useStyles = makeStyles(theme => ({
    root:{
        background: `linear-gradient(180deg, ${theme.palette.background.main} 0%, #EDEDED 100%)`,
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
    },
    leftCorner: {
        position: 'absolute',
        zIndex: 1,
        bottom: 70,
        left: 0,
        height: 100,
        [theme.breakpoints.up('md')]: {
            height: 350,
            bottom: 0,
        },
    },
    rightCorner: {
        position: 'absolute',
        zIndex: 1,
        bottom: 70,
        right: 0,
        height: 100,
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
    content:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: 500,
        paddingInline: theme.spacing(1),
    },
    title:{
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.up('lg')] : {
            fontSize: 32,
            paddingBottom: theme.spacing(5),
        },
    },
    description:{
        color: theme.palette.gray.main,
        fontSize: 18,
        lineHeight: '1.5rem',
        paddingBottom: theme.spacing(4),
        maxWidth: 600,
    },
    video:{
        width: '100%',
        [theme.breakpoints.up('md')] : {
            maxWidth: 430,
        },
        zIndex: 1
    },
}));

export default function Video() {
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return(<Container maxWidth={false} className={classes.root}>
        <img src="/images/decorations/home/video-left.png" className={classes.leftCorner}/>
        <img src="/images/decorations/home/video-right.png" className={classes.rightCorner}/>
        <img src="/svg/decorations/home/video-left.svg" className={classes.leftSide}/>
        <img src="/svg/decorations/home/video-right.svg" className={classes.rightSide}/>
        <Box className={classes.content}>
            <Typography variant='h2' component='h2' className={classes.title}>{dictionary.home.howItWorksTitle}</Typography>
            <Typography className={classes.description}>{dictionary.home.howItWorksDescription}</Typography>
            <Box className={classes.video}>
                <ReactPlayer
                    className={classes.video}
                    url={dictionary.home.howItWorksVideo}
                    width='100%'
                    height='100%'
                    controls={true}
                />
            </Box>
        </Box>
    </Container>)
}