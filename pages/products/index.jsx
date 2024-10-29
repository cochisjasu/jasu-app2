import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { Box, Container, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import * as Scroll from "react-scroll";
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";

import Search, {PAGES} from '../../components/Search';
import { fruitVarieties, presentations, fruitCategories, presentationCategories } from '../../components/Queries/products.graphql';
import {Context} from '../../components/App';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "none",
    [theme.breakpoints.up("lg")]: {
      paddingTop: "64px",
    },
    backgroundColor: theme.palette.background.main,
  },
  container: {
    paddingBlock: "64px",
    maxWidth: theme.breakpoints.values.lg,
    marginInline: "auto",
  },
  productserror: {
    minHeight:"20vh",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "40px",
    lineHeight: "73px",
    color: theme.palette.green.dark,
    paddingBlock: theme.spacing(3),
  },
}));

export default function SearchView() {
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("A-Z");
  const [pageType, setPageType] = useState(PAGES.PRODUCTS);
  const [data, setData] = useState(new Array(10).fill({}));
  const [dataLength, setDataLength] = useState(data.length);
  const [filters, setFilters] = useState([]);

  const scroll = Scroll.scroller;
  const classes = useStyles();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const itemsPerPageOptions = [12, 24, 48];
  const {agent, dictionary, setLoading} = useContext(Context);

  const getFilters = useCallback(async () => {
    const submit = async () => {
      const {errors, data} = await apolloClient.query({
          query: pageType === PAGES.PRODUCTS ? fruitCategories : presentationCategories,
          fetchPolicy: "no-cache"
      });
      if (errors) if (errors.length > 0) throw new Error(errors[0].message);
      return data[pageType === PAGES.PRODUCTS ? "fruitCategories" : "presentationCategories"];
    };

    const response = await submit();
    const data = response.map(item => ({
      id: item.id,
      name: item.name,
      checked: true,
    }));
    setFilters(data);
  }, [pageType, agent])

  const getFruitsPresentations = useCallback(async (filter=[]) => {
    const submit = async () => {
      const {errors, data} = await apolloClient.query({
          query: pageType === PAGES.PRESENTATION ? presentations : fruitVarieties,
          variables: {
            pag: page - 1,
            num: itemsPerPageOptions[itemsPerPage],
            asc: sort == 'A-Z' ? true : false,
            ord: pageType === PAGES.PRESENTATION ? "name" : "fullName",
            filter: {
              category: filter
            }
          },
          fetchPolicy: "no-cache",
      });
      if (errors) if (errors.length > 0) throw new Error(errors[0].message);
      return data[pageType === PAGES.PRESENTATION ? "presentations" : "fruitVarieties"];
    };

    const response = await submit();
    const data = response.edges.map(item => ({
      ...item.node,
      name: pageType === PAGES.PRESENTATION ? item.node.name : item.node.fullName,
      picture: pageType === PAGES.PRESENTATION ? item.node.picture : (item.node.picture || item.node.fruit.picture),
      description: pageType === PAGES.PRESENTATION ? item.node.description : (item.node.description || item.node.fruit.description),
    }));
    setData(data);
    setDataLength(response.totalCount);
  }, [itemsPerPage, page, sort, pageType, filters, agent])

  const handleChangePageNumber = (event, newValue) => {
    scroll.scrollTo("scrollPagination", {
      duration: 1000,
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
    setSort(event.target.value);
    setPage(1);
  };

  const handleChangeFilters = (event, value=null) => {
    if (pageType == PAGES.PRODUCTS) {
      const name = event.target.name;
      const checked = event.target.checked;
      setFilters(state => (state.map(option => ({
        ...option,
        checked: (name == option.id) ? checked : option.checked
      }))));
    }
    else{
      let newValue = ""
      if(isLg) newValue = event.target.value;
      else newValue = value;
      setFilters(state => (state.map(option => ({
        ...option,
        checked: [option.id, "all"].includes(newValue)
      }))));
    }
    setPage(1);
  };

  const handleChange = (event, newValue) => {
    setPageType(newValue);
  };

  useEffect(() => {
    async function fetchData()
    {
      try {
        await getFilters();
      } catch (error) {
        enqueueSnackbar("Filters: " + error.toString(), {variant: 'error'});
      }
    }
    fetchData();
  }, [pageType, agent]);

  useEffect(() => {
    async function fetchData()
    {
      setDataLength(10);
      setData(new Array(10).fill({}));
      setLoading(true);
      try {
        const filter = filters.filter(option => option.checked).map(option => (option.id));
        await getFruitsPresentations(filter);
      } catch (error) {
        enqueueSnackbar("Search: " + error.toString(), {variant: 'error'});
      }
      setLoading(false);
    }
    if(filters.length === 0) return;
    fetchData();
  }, [itemsPerPage, page, sort, filters, agent]);

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
          <Search.OptionNavbar
            pageType={pageType}
            handleChange={handleChange}
          />
          <Search.FiltersBar
            pageType={pageType}
            page={page}
            dataLength={dataLength}
            labelShow={dictionary.formatString(dictionary.search.showResultsList, pageType === PAGES.PRODUCTS ? dictionary.search.fruits : dictionary.search.presentations)}
            itemsPerPage={itemsPerPage}
            itemsPerPageOptions={itemsPerPageOptions}
            handleChangeItemsPerPage={handleChangeItemsPerPage}
            sort={sort}
            handleChangeSort={handleChangeSort}
            showFilters
            filters={filters}
            handleChangeFilters={handleChangeFilters}
          />
          {(dataLength) ? 
            <Search.ResultsGrid pageType={pageType} data={data} /> :
            <Typography variant="h1" className={classes.productserror}>{dictionary.search.productsError}</Typography>
          }

          {Math.ceil(dataLength / itemsPerPageOptions[itemsPerPage]) > 1 && (
            <Search.PaginationBar
              count={Math.ceil(dataLength / itemsPerPageOptions[itemsPerPage])}
              page={page}
              handleChangePageNumber={handleChangePageNumber}
            />
          )}
        </Box>
      </Container>
    </Fragment>
  );
}