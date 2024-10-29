import { Box, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NextLink from "next/link";
import { useContext } from "react";

import {Context} from '../App';
import { FruitCard } from "../Cards";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    link: {
        color: theme.palette.primary.main,
    },
    title: {
        color: "#245130",
        marginBlock: theme.spacing(2),
        lineHeight: "60px",
        fontSize: "28px",
        [theme.breakpoints.up("lg")] : {
            fontSize: "40px",
        }
    },
    descriptionBox: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("lg")] : {
            flexDirection: "row",
            alignItems: 'center'
        }
    },
    picture: {
        maxWidth: 300,
        alignSelf: 'center',
        [theme.breakpoints.up('md')] : {
            
        },

    },
    descriptionContent: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(5),
        [theme.breakpoints.up("lg")] : {
            marginInline: theme.spacing(5),
            marginTop: 0,
        }
    },
    subtitle: {
        fontSize: 24,
        marginBottom: theme.spacing(3),
    },
    description: {
        
    },
}))

export default function ProductTitle({title, picture, description})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return(<Box className={classes.root}>
        <NextLink passHref href="/products"><Link className={classes.link}>{"<"}{dictionary.general.goBack}</Link></NextLink>
        <Typography component="h1" variant="h1" className={classes.title}>{title}</Typography>
        <Box className={classes.descriptionBox}>
          <FruitCard img={picture} className={classes.picture}/>
          <Box className={classes.descriptionContent}>
            <Typography variant="h2" component="h3" className={classes.subtitle} children={dictionary.productInfo.description}/>
            <Typography children={description} className={classes.description}/>
          </Box>
          
        </Box>
    </Box>)
}