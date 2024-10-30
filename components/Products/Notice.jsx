import { makeStyles, useTheme } from "@material-ui/styles";
import { Avatar, Box, Button, Container, TextField, Typography, useMediaQuery } from "@material-ui/core";
import { useContext } from "react";

import { Context } from "../App";
import { StyledButton } from "../StyledComponents";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(11),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
    },
    imageLayer:{
        paddingInline: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingInline: theme.spacing(10),
        },
    },
    formLayer:{
        paddingTop: 200,
        paddingBottom: theme.spacing(3.5),
        paddingInline: theme.spacing(3),
        borderRadius: 16,
        background: 'url(/svg/decorations/home/contact-back.svg)',
        backgroundColor: '#95BE7C',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(3.5),
            paddingInline: theme.spacing(10),
            flexDirection: 'row',
            borderRadius: 120,
        },
        position: 'absolute',
        left: 24,
        right: 24,
    },
    imageBox: {
        flex: 1,
        position: 'relative',
        zIndex: 1,
    },
    imageEmpty: {
        flex: 2,
        minHeight: 200,
        [theme.breakpoints.up('md')]: {
            minHeight: 0,
        },
    },
    imageBackground: {
        maxWidth: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    avatar: {
        width: '55%',
        height: '55%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -25%)',
    },
    formBox: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(10),
        },
    },
    formTitle: {
        paddingBottom: theme.spacing(1),
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '140%',
        color: theme.palette.white.main,
        letterSpacing: '0.05em',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    },
    form: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    input: {
        flex: 1,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginRight: 15,
            marginBottom: 0,
        },
        
        "& .MuiOutlinedInput-root":{
            backgroundColor: theme.palette.white.main,
            borderRadius: 8,
        },
    },
    submit: {

    },
}));

export default function Contact({form, onFormChange, loggedIn, contactName="", handleOpenDialog})
{
    const classes = useStyles();
    const theme = useTheme();
    const {dictionary} = useContext(Context);

    return <Container className={classes.root}>
        <Box className={classes.imageLayer}>
            <Box className={classes.imageBox}>
                {loggedIn && <Avatar className={classes.avatar} src="/images/decorations/session/avatar.png"/>}
                <img className={classes.imageBackground} src="/images/decorations/session/contact-back.png"/>
            </Box>
            <Box className={classes.imageEmpty}/>
        </Box>
        <Box className={classes.formLayer}>
            <Box flex={1}/>
            <Box className={classes.formBox}>
            <Typography className={classes.formTitle} variant="h3" component="h3">{loggedIn ? dictionary.formatString(dictionary.productInfo.contactBarUserTitle, contactName)  : dictionary.productInfo.contactBarGuestTitle}</Typography>
            <form className={classes.form} onSubmit={handleOpenDialog}>
                <TextField
                    value={form.message}
                    onChange={onFormChange}
                    name="message"
                    variant="outlined"
                    className={classes.input}
                    placeholder={loggedIn ? dictionary.productInfo.contactBarUserDescription : dictionary.productInfo.contactBarGuestDescription}
                    multiline={loggedIn}
                    minRows={loggedIn ? 2: undefined}
                    maxRows={loggedIn ? 2: undefined}
                    type={loggedIn ? 'text': 'email'}
                    required
                    />
                <StyledButton type='submit' className={classes.submit} label={loggedIn ? dictionary.productInfo.contactBarUserButton : dictionary.productInfo.contactBarGuestButton}/>
            </form>
        </Box>
        </Box>
    </Container>
}