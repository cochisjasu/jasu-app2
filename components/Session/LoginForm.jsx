import {
    Box,
    Link,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import NextLink from "next/link";
import { useContext } from "react";

import { Context } from "../App";
import {StyledTextField, StyledButton} from "../StyledComponents";
import PasswordInput from "./PasswordInput";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingInline: theme.spacing(2),
        marginBlock: theme.spacing(10),
        alignItems: 'stretch',
        width: '100%',
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
    forgotLink: {
        color: '#595C5F',
        fontWeight: 500,
        width: 'fit-content',
        marginLeft: 'auto',
        cursor: 'pointer',
    },
    signUpLabel: {
        marginBlock: theme.spacing(3),
    },
    signUpLink: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    button: {
        width: 'fit-content',
        marginInline: 'auto',
    }
}));

export default function LoginForm({onLogin, handleInputChange, loading}) {
    const classes = useStyles();
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const {dictionary} = useContext(Context);

    return (<Box className={classes.root}>
        <Typography variant="h1" component="h1" className={classes.title}>{dictionary.session.loginTitle}</Typography>
        <Typography className={classes.subtitle}>{dictionary.session.required}</Typography>
        <form className={classes.form} onSubmit={onLogin} autoComplete="on">
            <StyledTextField className={classes.textField} required label={dictionary.session.email} name='email' onChange={handleInputChange} type='email' autoComplete='email'/>
            <PasswordInput className={classes.textField} onChange={handleInputChange} label={dictionary.session.password} required/>
            <NextLink href="/recover">
                <Link className={classes.forgotLink}>{dictionary.session.forgotPassword}</Link>
            </NextLink>
            <Typography className={classes.signUpLabel}>
                {dictionary.session.noMember} {' '}
                <NextLink href="/signup"><Link className={classes.signUpLink}>{dictionary.general.signUp}</Link></NextLink>
            </Typography>
            <StyledButton className={classes.button} loading={loading} label={dictionary.nav.login} type='submit' />
        </form>
    </Box>)
}