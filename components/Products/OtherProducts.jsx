import { makeStyles } from "@material-ui/styles";
import { Container, Typography } from "@material-ui/core";
import { useContext } from "react";
import NextLink from "next/link";

import { Context } from "../App";
import Cards from "../Cards";
import {StyledButton} from "../StyledComponents";

const useStyles = makeStyles(theme => ({
    root:{
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    },
    title:{
        textAlign: 'center',
        fontSize: 32,
        lineHeight: '40px',
        marginBottom: theme.spacing(5),
    },
    button:{
        marginTop: theme.spacing(5),
        width: 'fit-content',
        marginInline: 'auto',
    }

}));

export default function OtherProducts({process, relatedProducts})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    const showCards = {
        max: 4,
        lg: 4,
        md: 3,
        sm: 1.5
    }

    return (<Container className={classes.root}>
        <Typography variant='h1' component='h2' className={classes.title}>{dictionary.productInfo.otherFruits}</Typography>
        <Cards.Carousel type="fruit" data={relatedProducts} show={showCards} arrows={false}/>
        <NextLink href={`/products/${process}`} passHref><StyledButton className={classes.button} label={dictionary.general.showMore}/></NextLink>
    </Container>)
}