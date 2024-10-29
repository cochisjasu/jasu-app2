import { makeStyles } from "@material-ui/styles";
import { Container, Typography } from "@material-ui/core";
import NextLink from "next/link";
import { useContext } from "react";

import { Context } from "../App";
import { Carousel } from "../Cards";
import {StyledButton} from "../StyledComponents";

const useStyles = makeStyles(theme => ({
    root:{
        paddingBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    },
    title:{
        fontSize: 32,
        textAlign: 'center',
        marginBottom: theme.spacing(5),
    },
    button:{
        marginTop: theme.spacing(3),
        width: 'fit-content',
        marginInline: 'auto',
    }
}));

export default function OtherProcess({product, relatedProcesses})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    const showCards = {
        max: 3,
        lg: 3,
        md: 2,
        sm: 1
    }

    return (<Container className={classes.root}>
        <Typography variant='h2' component='h2' className={classes.title}>{dictionary.productInfo.otherPresentations}</Typography>
        <Carousel type="presentation" data={relatedProcesses} show={showCards} arrows={false}/>
        <NextLink href={`/products/${product}`} passHref><StyledButton className={classes.button} label={dictionary.general.showMore}/></NextLink>
    </Container>)
}