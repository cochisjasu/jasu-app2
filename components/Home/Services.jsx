import {makeStyles} from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { useContext } from "react";

import { Context } from "../App";

const useStyles = makeStyles(theme => ({
    root:{
        paddingInline: theme.spacing(1),
        paddingBottom: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title:{
        paddingBottom: theme.spacing(10),
        lineHeight: '1.25rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '2rem',
            lineHeight: '2.5rem',
        },
    },
    servicesBox: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            maxWidth: 1100,
        },
    },
    serviceCard:{
        flex: 1,
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: theme.spacing(4),
        '&:last-child': {
            marginBottom: 0,
        },
        [theme.breakpoints.up('lg')]: {
            marginRight: theme.spacing(4),
            '&:last-child': {
                marginRight: 0,
            }
        },
    },
    pictureBack:{
        width: "100%",
        aspectRatio: 1,
        background: 'url(/svg/decorations/home/service-back.svg)',
        backgroundSize: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardPicture:{
        width:"70%",
    },
    cardTitle:{
        marginBlock: theme.spacing(4)
    },
    cardDescription:{
        color: theme.palette.gray.main,
    },
}));

export default function Services() {
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    const services = [
        {
            title: dictionary.home.customerTitle,
            description: dictionary.home.customerDescription,
            image: "/images/decorations/home/services-1.png",
        },
        {
            title: dictionary.home.shippingTitle,
            description: dictionary.home.shippingDescription,
            image: "/images/decorations/home/services-2.png",
        },
        {
            title: dictionary.home.financialTitle,
            description: dictionary.home.financialDescription,
            image: "/images/decorations/home/services-3.png",
        },
    ]

    return(<Container maxWidth={false} className={classes.root}>
        <Typography variant="h2" component="h3" className={classes.title}>{dictionary.home.serviceTitle}</Typography>
        <Box className={classes.servicesBox}>
            {services.map(({title, description, image}, index) => 
                <Box className={classes.serviceCard} key={index}>
                    <Box className={classes.pictureBack}>
                        <img src={image} alt={title} className={classes.cardPicture} />
                    </Box>
                    <Typography variant='h2' component='h3' className={classes.cardTitle}>{title}</Typography>
                    <Typography className={classes.cardDescription}>{description}</Typography>
                </Box>
            )}
        </Box>
    </Container>)
}