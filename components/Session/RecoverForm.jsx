import {Box, Button, CircularProgress, FormLabel, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ReCAPTCHA from "react-google-recaptcha";
import { useContext } from "react";

import { Context } from "../App";
import baseConfig from "../../base.config";
import { StyledButton, StyledTextField } from "../StyledComponents";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingInline: theme.spacing(2),
        marginBlock: theme.spacing(10),
        alignItems: 'stretch',
        [theme.breakpoints.up('md')]: {
            maxWidth: 400,
        }
    },
    title: {
        color: theme.palette.secondary.main,
        textAlign: 'center',
        marginBottom: theme.spacing(3),
        fontSize: 28,
        lineHeight: '60px',
        [theme.breakpoints.up('md')]: {
            fontSize: 36,
        },
    },
    subtitle: {
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(4),
    },
    textField: {
        marginBlock: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
        alignSelf: 'center',
    },
}));

export default function RecoverForm({formData, onSubmit, handleInputChange, loading}) {
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return (<Box className={classes.root}>
        <Typography className={classes.title} variant="h1" component="h1">{dictionary.session.recoverTitle}</Typography>
        <Typography className={classes.subtitle}>{dictionary.session.recoverSubtitle}</Typography>
        <form className={classes.form} onSubmit={onSubmit}>
            <StyledTextField className={classes.textField} required label={dictionary.session.email} name='email' onChange={handleInputChange} type='email' autoComplete='email'/>
            <ReCAPTCHA ref={formData.recaptcha} size="normal" sitekey={baseConfig.recaptchaSiteKey} theme='light'/>
            <StyledButton className={classes.button} loading={loading} label={dictionary.session.resetPassword} type='submit' />
        </form>
    </Box>)
}