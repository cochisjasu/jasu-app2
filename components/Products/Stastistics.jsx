import { makeStyles } from "@material-ui/styles";
import { Box, Container, Typography } from "@material-ui/core";
import { useContext, useState } from "react";

import { Context } from "../App";
import PriceTable from "./PriceTable";
import WorldMap from "./WorldMap";
import HarvestChart from "./HarvestChart";

const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(5),
    },
    mapTitle:{
        fontSize: 28,
        lineHeight: '48px',
        marginBottom: theme.spacing(2),
    },
    horizontalBox: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')] : {
            flexDirection: 'row',
        },
    },
    mapDisplay:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(5),
        maxHeight: 400,
        position: "relative",
        [theme.breakpoints.up('md')] : {
            marginBottom: 0,
            maxHeight: 'none',
            marginRight: theme.spacing(3),
        },
    },
    stastisticsDisplay:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    chartDisplay:{
        marginBottom: theme.spacing(4),
    },
    tableDisplay:{
    },
}));

export default function Stastistics({varietyData, pricesTableData})
{
    const [variety, setVariety] = useState('all');
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    const handleVarietyChange = (option) => {
        setVariety(option);
    }

    return (<Container className={classes.root}>
        <Typography variant="subtitle1" component="h3" className={classes.mapTitle}>{dictionary.productInfo.map}</Typography>
        <Box className={classes.horizontalBox}>
            <Box className={classes.mapDisplay}>
                <WorldMap markers={varietyData[variety].map}/>
            </Box>
            <Box className={classes.stastisticsDisplay}>
            <HarvestChart className={classes.chartDisplay} data={varietyData[variety].harvest} variety={variety} varieties={Object.keys(varietyData)} handleVarietyChange={handleVarietyChange}/>
            <PriceTable className={classes.tableDisplay} {...pricesTableData} rowId='country'/>
                <Box className={classes.tableDisplay}>
                </Box>
            </Box>
        </Box>
        
    </Container>)
}