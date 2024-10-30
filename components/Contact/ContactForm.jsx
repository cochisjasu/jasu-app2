import {Box, Typography, Button, TextField, FormLabel,Checkbox, makeStyles, CircularProgress} from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";

import { Context } from "../App";
import { StyledButton, StyledTextField } from "../StyledComponents";
import { useRouter } from 'next/router'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingInline: theme.spacing(2),
        marginBlock: theme.spacing(10),
        alignItems: 'stretch',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            maxWidth: 600,
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
    inputBox: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')] : {
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    },
    textField: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')] : {
            width: '50%',
            '&:nth-of-type(odd)':{
                paddingRight: theme.spacing(1.5),
            },
            '&:nth-of-type(even)':{
                paddingLeft: theme.spacing(1.5),
            },
            '&:last-child' : {
                paddingInline: 0,
            }
        }
    },
    multiline: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(3),
        width: 'fit-content',
        marginInline: 'auto',
    },
}));

export default function ContactForm({onSubmit, contactData, handleInputChange, loading})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);
    const [form, setForm] = useState(false)
    const [txt, setTxt] = useState(false)
    const handleTxtAccepted = (event) => {
        setTxt(event.target.checked);
    };
    const handleFormAccepted = (event) => {
        setForm(event.target.checked);
    };
    const router = useRouter()
    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h1" className={classes.title}>{dictionary.session.contactTitle}</Typography>
            <Typography className={classes.subtitle}>{dictionary.session.required}</Typography>
            <form className={classes.form} onSubmit={onSubmit} autoComplete='on'>
                <Box className={classes.inputBox}>
                    <StyledTextField value={contactData.name} className={classes.textField} required label={dictionary.session.name} name='name' onChange={handleInputChange} autoComplete='name'/>
                    <StyledTextField value={contactData.email} className={classes.textField} required label={dictionary.session.email} name='email' onChange={handleInputChange} type='email' autoComplete='email'/>
                    <StyledTextField value={contactData.phone} className={classes.textField} required label={dictionary.session.phone} name='phone' onChange={handleInputChange} type='tel' autoComplete='tel'/>
                    <StyledTextField value={contactData.companyName} className={classes.textField} required label={dictionary.session.companyName} name='companyName' onChange={handleInputChange} autoComplete='organization'/>
                    <StyledTextField value={contactData.message} className={classes.multiline} required label={dictionary.session.message} name='message' onChange={handleInputChange} multiline minRows={5}/>

                    <Typography><Checkbox value={txt} onChange={handleTxtAccepted}/>
                    <span onClick={() => router.push('/notice')} style={{cursor: "pointer"}}>

                    {dictionary.session.acceptTxt}
                    </span>
                    </Typography>
                    <Typography><Checkbox value={form} onChange={handleFormAccepted}/>
                    <span onClick={() => router.push('/notice')} style={{cursor: "pointer"}}>

                    {dictionary.session.acceptForm}
                    </span>
                    </Typography>
                </Box>
                <StyledButton className={classes.button} loading={loading} label={dictionary.session.sendMessage} type='submit' />
            </form>
        </Box>
    );
};