import {useEffect, useContext, useState} from 'react';
import { makeStyles } from "@material-ui/styles";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import NextLink from "next/link";

import { Context } from "../App";
import {StyledButton} from "../StyledComponents";
import { formatMoney } from 'accounting';

const useStyles = props => makeStyles(theme => ({
    root:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '40px',
    },
    title:{
        fontSize: 24,
        marginBottom: '32px',
    },
    chartFrame: {
        position: 'relative',
        backgroundColor: theme.palette.white.mpacain,
        border: '1px solid #EFEFEC',
        borderRadius: '20px',
    },
    blockBox: {
        display: props.loggedIn ? 'none' : 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockButton: {
        marginTop: theme.spacing(2),
    },
    container:{
        paddingBlock: 16,
        paddingInline: 8,
        [theme.breakpoints.up('md')]: {
            paddingInline: 90,
            paddingBlock: 40,
        },
        filter: props.loggedIn ? 0 : 'blur(5px)',
    },
    yearButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    button: {
        borderRadius: 8,
        padding: '10px 12px',
        color: theme.palette.primary.main,
        backgroundColor: '#EFEFEC',
        marginRight: 12,
        '&:last-child': {
            marginRight: 0,
        },
    },
    buttonSelected: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:disabled' : {
            color: theme.palette.primary.contrastText,
        }
    },
    chart: {
        minWidth: '0',
        height: 500,
    },
    tooltip: {
        backgroundColor: theme.palette.white.main,
        border: '1px solid #225D38',
        boxShadow: '0px 4px 17px rgba(97, 121, 174, 0.15)',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    tooltipTitle: {
        color: theme.palette.gray.main,
        fontSize: 14,
        fontWeight: 400,
    },
    tooltipSubtitle: {
        color: theme.palette.primary.main,
        fontSize: 18,
        fontWeight: 700,
    },
    tickLabel: {
        padding: theme.spacing(1.25, 1.75),
        border: '1px solid #E3E3E3',
        borderRadius: theme.spacing(1),
        fontFamily: 'Montserrat',
        fill: theme.palette.primary.main,
    }
}));

export default function PriceCharts({loggedIn, priceTendenciesData})
{
    const [year, setYear] = useState('');
    const classes = useStyles({loggedIn})();
    const {dictionary} = useContext(Context);

    const getYearData = () => {
        for (const item of priceTendenciesData) {
            if(item.id === year) return [item];
        }
        return [];
    }

    const handleChangeYear = (event) => {
        setYear(event.target.innerText);
    }

    useEffect(() => {
        setYear(priceTendenciesData.length > 0 ? priceTendenciesData.at(-1).id : '');
    }, [priceTendenciesData])

    return (<Container className={classes.root}>
        
        <Box className={classes.chartFrame}>
            <Box className={classes.blockBox}>
                <Typography variant='h2'>{dictionary.productInfo.signUpPrices}</Typography>
                <NextLink href={`/signup`} passHref><StyledButton className={classes.blockButton} label={dictionary.productInfo.signUpPricesButton}/></NextLink>
            </Box>
            <Box className={classes.container}>
                <Typography className={classes.title} variant='h2' component='h2'>{dictionary.productInfo.prices}</Typography>
                <Box className={classes.yearButtons}>
                    {priceTendenciesData.map(item => <Button key={item.id} onClick={handleChangeYear} disabled={year === item.id} children={item.id} className={`${classes.button} ${year === item.id ? classes.buttonSelected : ''}`}/>)}
                </Box>
                <Box className={classes.chart}>
                    <ResponsiveLine
                        data={getYearData()}
                        margin={{ top: 50, right: 30, bottom: 50, left: 50 }}
                        xScale={{ format: "%Y-%m-%d", type: "time", useUTC: false, precision: 'day', }}
                        yScale={{
                            type: 'linear',
                            min: 0,
                            max: 'auto',
                            stacked: true,
                            reverse: false
                        }}
                        xFormat='time:%Y-%m-%d'
                        yFormat=" >-$.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            format: (value) => <tspan className={classes.tickLabel}>{dictionary.date.shortMonth[value.getMonth()]}</tspan>,
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 9,
                            tickRotation: 0,
                            legendOffset: 36,
                            legendPosition: 'middle',
                            tickValues: 'every month'
                        }}
                        axisLeft={{
                            format: (value) => <tspan className={classes.tickLabel}>{formatMoney(value)}</tspan>,
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        enableGridX={false}
                        colors={['#225D38']}
                        colorBy="index"
                        pointSize={5}
                        pointColor={{ from: 'color', modifiers: [] }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        enableArea={true}
                        crosshairType="x"
                        useMesh={true}
                        legends={[]}
                        tooltip={(input) => <Box className={classes.tooltip}>
                            <Typography className={classes.tooltipTitle}>{input.point.data.xFormatted}, {year}</Typography>
                            <Typography className={classes.tooltipSubtitle}>{input.point.data.yFormatted}</Typography>
                        </Box>}
                    />
                </Box>
            </Box>
        </Box>
        
    </Container>)
}