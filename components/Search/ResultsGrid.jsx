import { Grid, makeStyles } from "@material-ui/core";

import Cards from "../Cards";
import {PAGES} from ".";

const useStyles = makeStyles((theme) => ({
    boxFruit: {
      display: "flex",
      flexWrap: "wrap",
    },
}));

export default function ResultsGrid({
    pageType,
    data,
    productID = "",
})
{
    const classes = useStyles();

    return(<Grid className={classes.boxFruit} spacing={2} container>
        {data
          ? data.map(card => (
                <Grid key={card.id} item xs={pageType == PAGES.PRESENTATION ? 12 : 6} sm={6} md={4} lg={pageType == PAGES.PRESENTATION ? 4 : 2}>
                  {pageType == PAGES.PRODUCTS ? <Cards.FruitCard
                    img={card.picture}
                    title={card.name}
                    url={`/products/${productID ? `${card.id}/${productID}` : card.id}`}
                  />: 
                  <Cards.CardPresentation
                      className={classes.fruit}
                      img={card.picture}
                      name={card.name}
                      description={card.description}
                      url={`/products/${productID ? `${productID}/${card.id}` : card.id}`}
                  />}
                  
                </Grid>
              ))
          : null}
      </Grid>)
}