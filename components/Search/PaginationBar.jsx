import { alpha, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    boxPagination: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBlock: '70px',  
    },
    list: {
        '& li button':{
            backgroundColor: alpha(theme.palette.gray.main, .1),
            marginInline: 6,
        },
        '& li:first-child button':{
            backgroundColor: theme.palette.gray.main,
            color: theme.palette.white.main,
        },
        '& li:last-child button':{
            backgroundColor: theme.palette.gray.main,
            color: theme.palette.white.main,
        },
        [theme.breakpoints.up('md')]: {
            '& li:last-child':{
                marginLeft: theme.spacing(4),
            },
            '& li:first-child':{
                marginRight: theme.spacing(4),
            }
        },
    },
}));

export default function PaginationBar({
    count,
    page,
    handleChangePageNumber,
})
{
    const classes = useStyles();

    return(<Pagination
        count={count}
        page={page} 
        onChange={handleChangePageNumber}
        color="primary"
        className={classes.boxPagination}
        classes={{ul:classes.list}}
    />)
}