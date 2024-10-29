import { Box, FormLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: 14,
        lineHeight: '17px',
        color: '#110000',
        marginBottom: theme.spacing(1),
    },
    textField: {
        backgroundColor: theme.palette.white.main,
    }
}));

export default function StyledTextField({className='', label='', ...TextFieldProps})
{
    const classes = useStyles();

    return(<Box className={`${classes.root} ${className}`}>
        <FormLabel className={classes.label} required={TextFieldProps?.required ? TextFieldProps?.required : false}>{label}</FormLabel>
        <TextField variant="outlined" className={classes.textField} placeholder={label} {...TextFieldProps}/>
    </Box>)
}