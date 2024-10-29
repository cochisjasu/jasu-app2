import { Fab, makeStyles } from "@material-ui/core";
import { WhatsApp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    whatsAppButton:{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 2,
        backgroundColor: '#F4F4F4',
        color: '#225D38'
    },
}));

export default function WhatsAppButton () {
    const classes = useStyles();

    return <Fab className={classes.whatsAppButton} href='https://wa.me/+13056992843' target="_blank"><WhatsApp fontSize='large'/></Fab>
}