import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import { useContext } from "react";

import { StyledButton } from "../StyledComponents";
import { Context } from "../App";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    message: {
        color: theme.palette.secondary.main,
        [theme.breakpoints.up('md')] : {
            maxWidth: 617,
        },
        marginBottom: theme.spacing(4)
    },
}));

export default function Message({message, loading=false})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context)

    return(<Box className={classes.root}>
        <Typography component='h2' variant='h1' className={classes.message}>{message}</Typography>
        <Link href="/products"><StyledButton label={dictionary.general.showProducts} loading={loading}/></Link>
    </Box>)
}