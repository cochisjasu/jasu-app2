import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";

import { Context } from "../App";
import { StyledButton } from "../StyledComponents";
import PasswordInput from "./PasswordInput";

const useStyles = makeStyles(theme => ({
    root:{
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
    button: {
        marginTop: theme.spacing(3),
        width: 'fit-content',
        marginInline: 'auto',
    },
}));

export default function NewPasswordForm({onSubmit, handleInputChange, loading})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return(<Box className={classes.root}>
        <Typography variant="h1" component="h1" className={classes.title}>{dictionary.session.newPasswordTitle}</Typography>
        <Typography className={classes.subtitle}>{dictionary.session.newPasswordSubtitle}</Typography>
        <form className={classes.form} onSubmit={onSubmit}>
            <PasswordInput className={classes.textField} onChange={handleInputChange} label={dictionary.session.password} required newPassword validPattern/>
            <PasswordInput name="confirmPassword" className={classes.textField} onChange={handleInputChange} label={dictionary.session.confirmPassword} required newPassword/>
            <StyledButton className={classes.button} loading={loading} label={dictionary.session.resetPassword} type='submit' />
        </form>
    </Box>)
}