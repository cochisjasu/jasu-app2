import { Box, Button, RadioGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import App from '../App';

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#FFF",
        borderRadius: theme.spacing(1),
        border: '1px solid #EFEFEC',
        padding: theme.spacing(2),
    },
    title:{
        fontSize: 24,
        marginTop: theme.spacing(2),
    },
    buttonList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(.8),
        borderRadius: 8,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.card,
        '&:disabled': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        '&:hover.Mui-disabled': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },
}))

export default function HarvestChart({data, variety, varieties, handleVarietyChange, className=''}) {
    const {agent, dictionary} = useContext(App.Context);
    const classes = useStyles();

    const options = {
        chart: {
            type: 'rangeBar',
            defaultLocale: agent?.locale?.id || "es",
            locales: [
                {
                    name: 'es',
                    options: {
                        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                        shortDays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                        toolbar: {
                            download: 'Descargar SVG',
                            selection: 'Selección',
                            selectionZoom: 'Selección Zoom',
                            zoomIn: 'Aumentar',
                            zoomOut: 'Alejar',
                            pan: 'Mover gráfica',
                            reset: 'Reiniciar Vista',
                        }
                    }
                },
                {
                    name: 'en',
                    options: {
                        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        toolbar: {
                            download: 'Download SVG',
                            selection: 'Selection',
                            selectionZoom: 'Selection Zoom',
                            zoomIn: 'Zoom In',
                            zoomOut: 'Zoom Out',
                            pan: 'Panning',
                            reset: 'Reset Zoom',
                        }
                    }
                }
            ],
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 8,
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                    year: 'MMM',
                    month: 'MMM',
                },
            },
        },
        tooltip: {
            x: {
                format: 'MMMMM',
            }
        },
        fill: {
            colors: ["#F7BE00"]
        }
    };
    const series = [{data}];
    const style = {}

    return (
        <Box className={`${classes.root} ${className}`}>
            <Typography variant="subtitle1" component="h3" className={classes.title}>{dictionary.productInfo.harvest}</Typography>
            <Chart options={options} series={series} type="rangeBar" style={style}/>
            <RadioGroup className={classes.buttonList} value={variety}>
                {varieties.map(key => <Button className={classes.button} key={key} disabled={variety === key} children={key === 'all' ? dictionary.productInfo.all : key} onClick={() => handleVarietyChange(key)}/>)}
            </RadioGroup>
        </Box>
        
    )
}