import { Fragment } from 'react';
import { useContext, useEffect, useState } from "react";
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";
import { useRouter } from 'next/router';

import Home from '../components/Home';
import Products from '../components/Products';
import { fruitVarieties, fruitCategories } from '../components/Queries/products.graphql';
import { Context } from '../components/App';

export default function Index() {
  const [data, setData] = useState(new Array(8).fill({}));
  const [contactForm, setContactForm] = useState({topic:"",message:""});
  const [contactInfo, setContactInfo] = useState({name: "Jasu",id: "2322"});
  const [viewDialog, setViewDialog] = useState(false);

  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const {agent, session, setLoading, dictionary} = useContext(Context)
  const router = useRouter()
  const loggedIn = session ? true : false;

  const getFruits = async () => {
    const submit = async () => {
      const {data: dataCategories} = await apolloClient.query({
        query: fruitCategories,
        fetchPolicy: "no-cache",
      })
      if (!dataCategories?.fruitCategories?.length) throw new Error('Apollo Error')
      const fruitFilter = dataCategories.fruitCategories.find(item => 
        item.name === dictionary.home.citrus
      )
      const {errors, data} = await apolloClient.query({
          query: fruitVarieties,
          variables: {
            num: 8,
            asc: false,
            ord: "fullName",
            filter: {
              category: fruitFilter?.id || ""
            }
          },
          fetchPolicy: "no-cache",
      });
      if (errors) if (errors.length > 0) throw new Error(errors[0].message);
      return data.fruitVarieties;
    };

    const response = await submit();
    const data = response.edges.filter(item => item.node?.image !== null).map(item => ({
      id: item.node.id,
      img: item.node.picture || item.node.fruit.picture,
      title: item.node.fullName,
      url: `/products/${item.node.id}`,
    }));
    setData(data);
  };

  const handleChangeContactForm = (event) => {
    setContactForm(state => ({
        ...state,
        [event.target.name] : event.target.value
      }))
  }

  const handleOpenDialog = (event) => {
      event.preventDefault()
      if(!loggedIn){
          router.push(`/contact?email=${contactForm.message}`, "/contact")
      }
      else{
          setViewDialog(true)
      }
  }
  const handleCloseDialog = () => {
    setViewDialog(false);
  }

  useEffect(() => {
    async function fetchData()
    {
      setData(new Array(10).fill({}));
      setLoading(true);
      try {
        await getFruits();
      } catch (error) {
        enqueueSnackbar(error.toString(), {variant: 'error'});
      }
      setLoading(false);
    }
    fetchData();
  }, [agent]);

  return (
    <Fragment>
      <Home.Banner/>
      <Home.Products data={data}/>
      <Home.Video/>
      <Home.Services/>
      <Products.Contact form={contactForm} onFormChange={handleChangeContactForm} loggedIn={loggedIn} contactName={contactInfo?.name} handleOpenDialog={handleOpenDialog}/>
      {loggedIn && <Products.ContactDialog form={contactForm} onFormChange={handleChangeContactForm} open={viewDialog} onClose={handleCloseDialog}/>}
    </Fragment>
  )
}
