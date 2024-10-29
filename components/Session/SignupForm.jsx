import { Box, Typography, Button, Link, TextField, FormLabel, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import NextLink from "next/link";
import { useContext } from "react";

import { Context } from "../App";
import PasswordInput from "./PasswordInput";
import { StyledButton, StyledTextField } from "../StyledComponents";
import baseConfig from "../../base.config";

const useStyles = makeStyles((theme) => ({
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
        fontSize: 40,
        lineHeight: '60px',
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBlock: theme.spacing(3),
    },
    textField: {
        marginBottom: theme.spacing(3),
    },
    loginLabel: {
        marginBlock: theme.spacing(3),
    },
    loginLink: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    button: {
        marginTop: theme.spacing(3),
        width: 'fit-content',
        marginInline: 'auto',
    },
}));

export default function SignupForm({onSubmit, handleInputChange, formData, loading})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return (<Box className={classes.root}>
        <Typography variant="h1" component="h1" className={classes.title}>{dictionary.session.signUpTitle}</Typography>
        <Typography className={classes.subtitle}>{dictionary.session.required}</Typography>
        <form className={classes.form} onSubmit={onSubmit} autoComplete="on">
            <StyledTextField className={classes.textField} required label={dictionary.session.firstName} name='firstName' onChange={handleInputChange} autoComplete='given-name'/>
            <StyledTextField className={classes.textField} required label={dictionary.session.lastName} name='lastName' onChange={handleInputChange} autoComplete='family-name'/>
            <StyledTextField className={classes.textField} required label={dictionary.session.email} name='email' onChange={handleInputChange} type='email' autoComplete='email'/>
            <PasswordInput className={classes.textField} onChange={handleInputChange} label={dictionary.session.password} required newPassword validPattern/>
            <PasswordInput name="confirmPassword" className={classes.textField} onChange={handleInputChange} label={dictionary.session.confirmPassword} required newPassword/>
            <StyledTextField className={classes.textField} required label={dictionary.session.companyName} name='companyName' onChange={handleInputChange} autoComplete='organization'/>
            <ReCAPTCHA ref={formData.recaptcha} size="normal" sitekey={baseConfig.recaptchaSiteKey} theme='light'/>
            <Typography className={classes.loginLabel}>
                {dictionary.session.alredySigned} {' '}
                <NextLink href="/login"><Link className={classes.loginLink}>{dictionary.nav.login}</Link></NextLink>
            </Typography>
            <StyledButton className={classes.button} loading={loading} label={dictionary.general.signUp} type='submit' />
        </form>
    </Box>);
};