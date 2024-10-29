import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Box, Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import * as Scroll from "react-scroll";
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";

import Search, {PAGES} from '../../../components/Search';
import { products } from '../../../components/Queries/products.graphql';
import {Context} from '../../../components/App';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'none',
    minHeight:"20vh",
    [theme.breakpoints.up("lg")]: {
      paddingTop: "64px",
    },
    backgroundColor: theme.palette.background.main,
  },
  container: {
    paddingBlock: '32px',
    maxWidth: theme.breakpoints.values.lg,
    marginInline: 'auto',
  },
  emptyBox:{
    paddingBlock: theme.spacing(3)
  },
}));

export default function SearchView() {
  const [pageType, setPageType] = useState(PAGES.PRESENTATION);
  const [product, setProduct] = useState({
    title: "Fruta / Presentación",
    picture: "",
    description: "",
  });
  const [data, setData] = useState(new Array(10).fill({}));
  const [dataLength, setDataLength] = useState(data.length);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("A-Z");

  const scroll = Scroll.scroller;
  const classes = useStyles();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();
  const { productID } = router.query;
  const itemsPerPageOptions = [12, 24, 48];
  const {agent, dictionary, setLoading} = useContext(Context);

  const getProducts = useCallback(async () => {
    const submit = async () => {
        const {errors, data} = await apolloClient.query({
            query: products,
            variables: {
                pag: page - 1,
                num: itemsPerPageOptions[itemsPerPage],
                asc: sort == 'A-Z' ? true : false,
                filter: {
                  query: productID,
                }
            },
            fetchPolicy: "no-cache",
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.products;
    };
  
    const response = await submit();
    if(!response || response.totalCount === 0) {
      enqueueSnackbar(dictionary.search.productsError, {variant: 'info'});
      setData([])
      setDataLength(0)
    }
    else
    {
      const type = response.edges[0].node.fruitVariety.id == productID ? PAGES.PRESENTATION : PAGES.PRODUCTS;
      const productInfo = response.edges[0].node[type === PAGES.PRESENTATION ? 'fruitVariety' : 'presentation']
      setProduct({
        title: productInfo[type === PAGES.PRESENTATION ? 'fullName' : 'name'],
        picture: type === PAGES.PRESENTATION ? (productInfo.picture || productInfo.fruit.picture) : productInfo.picture,
        description: type === PAGES.PRESENTATION ? (productInfo.description || productInfo.fruit.description) : productInfo.description,
      })
      const data = response.edges
        .map(item => {
          const itemInfo = item.node[type === PAGES.PRESENTATION ? 'presentation' : 'fruitVariety']
          return {
            id: itemInfo.id,
            picture: type === PAGES.PRESENTATION ? itemInfo.picture :  (itemInfo.picture || itemInfo.fruit.picture),
            name: itemInfo[type === PAGES.PRESENTATION ? 'name' : 'fullName'],
            description: type === PAGES.PRESENTATION ? itemInfo.description : (itemInfo.description || itemInfo.fruit.description),
          }
        })
      setPageType(type);
      setDataLength(response.totalCount);
      setData(data);
    }
  }, [productID, itemsPerPage, page, sort, agent]);

  const handleChangePageNumber = (event, newValue) => {
    scroll.scrollTo("scrollPagination", {
      duration: 1500,
      delay: 0,
      smooth: true,
      offset: -64,
    });
    setPage(newValue);
  }

  const handleChangeItemsPerPage = (event, newValue) => {
    setItemsPerPage(newValue);
  }

  const handleChangeSort = (event) => {
    setPage(1);
    setSort(event.target.value);
  };

  useEffect(() => {
    async function fetchData()
    {
      setData(new Array(10).fill({}));
      setLoading(true);
      try {
        await getProducts();
      } catch (error) {
        enqueueSnackbar(error.toString(), {variant: 'error'});
      }
      setLoading(false);
    }
    fetchData();
  }, [itemsPerPage, page, sort, agent]);

  useEffect(() => {
    if (isLg) {
      setItemsPerPage(2);
      setPage(1);
    } else {
      setItemsPerPage(0);
      setPage(1);
    }
  }, [isLg])

  return (
    <Fragment>
    <Container className={classes.root}>
      <Box className={classes.container}>
        <Search.ProductTitle {...product}/>
        <Search.FiltersBar
          pageType={pageType}
          page={page}
          dataLength={dataLength}
          labelShow={dictionary.formatString(dictionary.search.showResultsFruits, pageType === PAGES.PRODUCTS ? dictionary.search.fruits : dictionary.search.presentations)}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          handleChangeItemsPerPage={handleChangeItemsPerPage}
          sort={sort}
          handleChangeSort={handleChangeSort}
        />
        <Search.ResultsGrid
          pageType={pageType}
          data={data}
          productID={productID}
        />
        
        {Math.ceil(dataLength/itemsPerPageOptions[itemsPerPage]) > 1 ? 
        <Search.PaginationBar
          count={Math.ceil(dataLength/itemsPerPageOptions[itemsPerPage])}
          page={page}
          handleChangePageNumber={handleChangePageNumber}
        />:
        <Box className={classes.emptyBox}></Box>}
      </Box>
    </Container>
    </Fragment>
  )
}