import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import { useContext } from "react";

import { Context } from "../App";
import { StyledButton } from "../StyledComponents";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: "80vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    title: {
        color: theme.palette.green.dark,
        marginBottom: theme.spacing(1),
        fontSize: 80,
        lineHeight: '90px',
        [theme.breakpoints.up('md')] : {
            fontSize: 190,
            lineHeight: '200px',
        },
        
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '28px',
        lineHeight: '34px',
        color: theme.palette.green.dark,
        marginBottom: theme.spacing(1),
    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '20px',
        lineHeight: '24px',
        color: theme.palette.green.dark,
        marginBottom: theme.spacing(3),
    },
}));

export default function CustomCode({code})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);
    
    return <Box className={classes.root}>
        <Typography variant="h1" component="h1" className={classes.title}>{code}</Typography>
        <Typography variant="h2" component="h2" className={classes.subtitle}>{dictionary[code].title}</Typography>
        <Typography className={classes.text}>{dictionary[code].description}</Typography>
        <Link href="/"><StyledButton label={dictionary.general.showProducts}/></Link>
    </Box>
}