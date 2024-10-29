import { Fragment, useState, useCallback, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";
import { formatMoney } from "accounting";

import { Context } from "../../../components/App";
import Products from "../../../components/Products";
import { product, products } from '../../../components/Queries/products.graphql';
import { prices, harvests } from '../../../components/Queries/prices.graphql';

const tableTitles = [
    {
        key: 'presentation',
        label: 'Presentación'
    },
    {
        key: 'country',
        label: 'País'
    },
    {
        key: 'drums',
        label: 'Drums'
    },
    {
        key: 'volume',
        label: 'Súma de volumen (MT)'
    },
    {
        key: 'price',
        label: 'Precio'
    },
]

const TEST_DATA_CONTACT = {
    name: "Jasu",
    id: "2322",
}

const PRICE_DATA_TEMPLATE = [
    {id: '2019', data: [{x: '2022-01-01', y: '83'}]},
    {id: '2020', data: [{x: '2022-01-01', y: '83'}]},
    {id: '2021', data: [{x: '2022-01-01', y: '83'}]},
    {
        id: '2022',
        data: [
            {x: '2022-01-01', y: '83'},
            {x: '2022-02-01', y: '70'},
            {x: '2022-03-01', y: '62'},
            {x: '2022-04-01', y: '50'},
            {x: '2022-05-01', y: '44'},
            {x: '2022-06-01', y: '44'},
            {x: '2022-07-01', y: '55'},
            {x: '2022-08-01', y: '72'},
        ]
}];

export default function ProductDetails()
{
    const {agent, session, dictionary, setLoading} = useContext(Context);

    const [viewDialog, setViewDialog] = useState(false);
    const [productInfo, setProductInfo] = useState({title: dictionary.productInfo.loading});
    const [relatedProducts, setRelatedProducts] = useState(new Array(4).fill({}));
    const [varietyData, setVarietyData] = useState({all: {map: [], harvest: []}})
    const [priceTableData, setPriceTableData] = useState({titles:tableTitles, data:[]});
    const [priceTendenciesData, setPriceTendenciesData] = useState(PRICE_DATA_TEMPLATE);
    const [contactInfo, setContactInfo] = useState({});
    const [contactForm, setContactForm] = useState({topic:"",message:""});
    const [relatedProcesses, setRelatedProcesses] = useState(new Array(6).fill({}));
    const [productKey, setProductKey] = useState(null);
    const [fruitID, setFruitID] = useState('');

    const router = useRouter();
    const apolloClient = useApolloClient();
    const {enqueueSnackbar} = useSnackbar();
    const {productID, processID} = router.query;
    const loggedIn = session ? true : false;

    const getProductInfo = useCallback(async () => {
        const submit = async () => {
            const {errors, data} = await apolloClient.query({
                query: product,
                variables: {
                    input: {
                        fruitVariety: productID,
                        presentation: processID,
                    }
                },
                fetchPolicy: "no-cache",
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.product;
        };
      
        const response = await submit();
        if(!response) return enqueueSnackbar(dictionary.productInfo.productError, {variant: 'warning'});
        setProductInfo(state => ({
            ...state,
            title: `${response.presentation.name} - ${response.fruitVariety.fullName}`,
            description: response.description,
            img: response.picture,
            files: response?.productFiles ? response.productFiles : [], 
        }));
        setProductKey(response.id);
        setFruitID(response.fruitVariety.fruit.id);
    }, [productID, processID, agent]);

    const getRelated = async (type) => {
        const submit = async () => {
            const {errors, data} = await apolloClient.query({
                query: products,
                variables: {
                    num: type == "fruitVariety" ? 7 : 5,
                    asc: true,
                    filter: {
                        [type]: type == "fruitVariety" ? productID : processID,
                    },
                },
                fetchPolicy: "no-cache",
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.products;
        };
      
        const response = await submit();
        if(!response) return enqueueSnackbar(dictionary.formatString(dictionary.productInfo.fruitError, type == 'fruitVariety' ? "frutas" : "presentaciones"), {variant: 'warning'});
        if(type == "fruitVariety")
        {
            const newProcess = response.edges.filter(item => (!(item.node.presentation.id == processID))).map(item => ({
                id: item.node.presentation.id,
                img: item.node.presentation.picture,
                name: item.node.presentation.name,
                url: `/products/${productID}/${item.node.presentation.id}`,
                description: item.node.presentation.description,
            }));
            if(newProcess.length > 6) newProcess.pop();
            setRelatedProcesses(newProcess);
        }
        else{
            const newFruits = response.edges.filter(item => (!(item.node.fruitVariety.id == productID))).map(item => ({
                id: item.node.fruitVariety.id,
                img: item.node.fruitVariety.picture || item.node.fruitVariety.fruit.picture,
                title: item.node.fruitVariety.fullName,
                url: `/products/${item.node.fruitVariety.id}/${processID}`,
            }));
            if(newFruits.length > 4) newFruits.pop();
            setRelatedProducts(newFruits);
        }
    };

    const getHarvestData = useCallback(async () => {
        const submit = async () => {
            const {errors, data} = await apolloClient.query({
                query: harvests,
                variables: {
                    num: -1,
                    ord: 'countryId',
                    asc: true,
                    filter: {
                        fruit: [fruitID],
                    },
                },
                fetchPolicy: "no-cache",
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.harvests;
        };

        const getVarietyData = (data, initial = false) => {
            const countries = [];
            const newData = [];
            const varieties = [];
            let tmp = {};
            let lastMonth = -1;
            let newCountry = false;
            for (const item of data) {
                if(initial && (item.month === lastMonth)) continue;
                const country = item.country.id;
                if(!countries.includes(country)){
                    countries.push(country);
                    newCountry = true;
                }
                const variety = item.fruitVariety.name;
                if(!varieties.includes(variety)) varieties.push(variety);
                if((item.month - 1) !== lastMonth || newCountry)
                {
                    if(Object.keys(tmp).length > 0)
                    {
                        tmp.y.push(new Date(lastMonth === 12 ? 2023 : 2022, lastMonth === 12 ? 0 : lastMonth, 0).getTime());
                        newData.push(tmp);
                        tmp = {};
                    }
                    tmp.x = item.country.name;
                    tmp.y = [new Date(2022, item.month-1, 1).getTime()];
                }
                lastMonth = item.month;
                newCountry = false;
            }
            if(Object.keys(tmp).length > 0)
            {
                tmp.y.push(new Date(lastMonth === 12 ? 2023 : 2022, lastMonth === 12 ? 1 : lastMonth, 0).getTime());
                newData.push(tmp);
            }
            if(initial === true) return [countries, varieties, newData];
            return [countries, newData];
        }

        const response = await submit();
        if(!response) return enqueueSnackbar(dictionary.productInfo.harvestError, {variant: 'warning'});
        const data = response.edges.map(item => item.node);
        const [countries, varieties, allData] = getVarietyData(data, true);
        const newHarvestState = {all: {harvest: allData, map: countries}};
        varieties.forEach(variety => {
            const [varCountries, varHarvest] = getVarietyData(data.filter(item => item.fruitVariety.name === variety));
            newHarvestState[variety] = {harvest: varHarvest, map: varCountries};
        });
        setVarietyData(newHarvestState);
    }, [fruitID, agent]);

    const getPriceData = useCallback(async () => {
        const submit = async () => {
            const {errors, data} = await apolloClient.query({
                query: prices,
                variables: {
                    ord: "date",
                    asc: false,
                    num: -1,
                    filter: {
                        query: productID,
                    }
                },
                fetchPolicy: "no-cache",
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.prices;
        }
        const response = await submit();
        if(!response) return enqueueSnackbar(dictionary.productInfo.priceError, {variant: 'warning'});
        //Obtener datos de tabla
        const data = response.edges.map(item => item.node);
        const presentations = [];
        const newTableData = data.filter(item => {
            const presentation = item.product.presentation.id;
            if(presentations.includes(presentation)) return false;
            presentations.push(presentation);
            return true;
        }).map(item => ({
            ...item,
            country: item.country.name,
            countryCode: item.country.id,
            presentation: item.product.presentation.name,
            price: item.price ? formatMoney(item.price) : null,
        }))
        setPriceTableData(state => ({
            ...state,
            data: newTableData,
        }))

        if(!loggedIn) return;
        const productPrices = data.filter(item => (item.product.presentation.id === processID)).reverse();
        let newTendenciesData = [];
        let years = [];
        for (const item of productPrices) {
            const year = item.date.slice(0, 4);
            if(!years.includes(year))
            {
                years.push(year);
                newTendenciesData.push({id:year,data:[]});
            }
            const index = years.indexOf(year);
            newTendenciesData[index].data.push({x:item.date,y:item.price})
        }
        setPriceTendenciesData(newTendenciesData);
    }, [productKey, loggedIn, agent]);

    useEffect(() => {
        setLoading(true);
        async function fetchData()
        {
            await Promise.all([
                getProductInfo(),
                getRelated("fruitVariety"),
                getRelated("presentation"),
            ]);
        }
        fetchData();
        //TODO: Eliminar al implementar
        if(loggedIn)
        {
            setContactInfo(TEST_DATA_CONTACT);
        }
        setLoading(false);
    }, [loggedIn, productID, processID, agent]);

    useEffect(() => {
        async function fetchData()
        {
            await getPriceData();
        }
        if(productKey) fetchData();
    }, [productKey, loggedIn, agent])

    useEffect(() => {
        async function fetchData()
        {
            await getHarvestData();
        }
        if(fruitID) fetchData();
    }, [agent, fruitID])

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

    return (
        <Fragment>
            <Products.Information loggedIn={loggedIn} productInfo={productInfo} handleOpenDialog={handleOpenDialog}/>
            <Products.OtherProducts process={processID} relatedProducts={relatedProducts}/>
            <Products.Stastistics varietyData={varietyData} pricesTableData={priceTableData}/>
            <Products.PriceCharts loggedIn={loggedIn} priceTendenciesData={priceTendenciesData}/>
            <Products.OtherProcess product={productID} relatedProcesses={relatedProcesses}/>
            <Products.Contact form={contactForm} onFormChange={handleChangeContactForm} loggedIn={loggedIn} contactName={contactInfo?.name} handleOpenDialog={handleOpenDialog}/>
            {loggedIn && <Products.ContactDialog form={contactForm} onFormChange={handleChangeContactForm} open={viewDialog} onClose={handleCloseDialog}/>}
        </Fragment>
    )
}