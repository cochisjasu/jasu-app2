import { Table, TableBody, TableHead, TableRow, TableCell, Link, TableContainer, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";

import { Context } from "../App";

//TODO: Checar diseño responsivo

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#FFF",
        borderRadius: theme.spacing(1),
        border: '1px solid #EFEFEC',
        padding: theme.spacing(2),
    },
    title:{
        fontSize: 24,
        marginBottom: theme.spacing(2),
    },
    evenRow:{
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.card,
        },
    },
    headerCell:{
        backgroundColor: theme.palette.white.main,
        borderTop: '1px solid #EFEFEC',
        fontWeight: 600,
        color: theme.palette.gray.main,
        fontSize: '1rem',
    },
    bodyCell:{
        fontWeight: '500',
        color: '#404040CC',
        fontSize: '1rem',
        lineHeight: '1.219rem',
    },
    priceLabel:{
        color: theme.palette.primary.main,
        fontWeight: '600'
    },
    priceLink:{
        textDecoration: 'underline'
    }
}));

export default function PriceTable({titles, data, className=''})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return(<Box className={`${classes.root} ${className}`}>
        <Typography variant="subtitle1" component="h3" className={classes.title}>{dictionary.productInfo.presentations}</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow key='header'>
                        {titles.map(title => <TableCell key={title.key} align="center" className={classes.headerCell}>{title.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => <TableRow className={classes.evenRow} key={row.presentation}>
                        {titles.map(title => {
                            if(title.key != 'price')
                                return <TableCell key={title.key} className={classes.bodyCell} align="center">{row[title.key]}</TableCell>
                            else{
                                if(row['price'] !== null)
                                    return <TableCell key={title.key} className={classes.bodyCell} align="center"><span className={classes.priceLabel}>{row[title.key]}</span></TableCell>
                                else
                                    return <TableCell key={title.key} className={classes.bodyCell} align="center"><Link href="/signup" className={classes.priceLink}>{dictionary.productInfo.requestPrice}</Link></TableCell>
                            }
                        })}
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>)
}