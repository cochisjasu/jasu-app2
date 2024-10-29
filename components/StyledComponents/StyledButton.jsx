import { alpha, Button, CircularProgress, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 40,
        padding: theme.spacing(2, 3),
        '&:disabled': {
            backgroundColor: alpha('#404040', 0),
        },
        '&:hover':{
            backgroundColor: '#32754b',
        },
    },
    label: {
        color: theme.palette.white.main,
        fontWeight: 600,
    },
}))

export default function StyledButton({className= '', loading= false, label='', ...props})
{
    const classes = useStyles();

    return <Button
        className={`${classes.root} ${className}`}
        variant="contained"
        disableElevation
        disabled={loading}
        children={loading ? 
            <CircularProgress size={24}/> : 
            <Typography className={classes.label} variant="button">{label}</Typography>
        }
        {...props}
    />
}