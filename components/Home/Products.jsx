import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Typography } from "@material-ui/core";
import NextLink from "next/link";
import { useContext } from "react";

import Cards from "../Cards";
import { Context } from "../App";
import { StyledButton } from "../StyledComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(8),
    lineHeight: '1.25rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '2rem',
      lineHeight: '2.5rem',
    }
  },
  carousel: {
    width: '100%',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('lg')] : {
      maxWidth: 1200,
      marginBottom: theme.spacing(8),
    }
  },
  button: {
    marginBottom: theme.spacing(8),
    marginInline: theme.spacing(1),
    textAlign: 'center'
  },
}));

export default function Products({data}) {
  const classes = useStyles();
  const {dictionary} = useContext(Context);

  const showCards = {
    max: 4,
    lg: 4,
    md: 2.5,
    sm: 1.5
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography variant="h2" component="h3" className={classes.title}>{dictionary.home.productsTitle}</Typography>
      <Box className={classes.carousel}><Cards.Carousel type="fruit" data={data} show={showCards}/></Box>
      <NextLink href="/products" passHref><StyledButton className={classes.button} label={dictionary.general.showProducts}/></NextLink>
    </Container>
  );
}
