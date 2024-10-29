import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
        },
        position: 'relative',
        justifyContent: 'center',
    },
    leftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 100,
        [theme.breakpoints.up('md')]: {
            height: 350,
        },
    },
    rightCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 100,
        [theme.breakpoints.up('md')]: {
            height: 300,
        },
    },
}));

export default function SessionPanel({children}) {
    const classes = useStyles();

    return (<Container maxWidth={false} className={classes.root}>
        <img src="/images/decorations/session/left-corner.png" className={classes.leftCorner}/>
        <img src="/images/decorations/session/right-corner.png" className={classes.rightCorner}/>
        {children}
    </Container>)
}