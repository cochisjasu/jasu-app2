import { useMutation } from "@apollo/client";
import { Avatar, Box, Checkbox, Dialog, DialogContentText, FormControl, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useContext } from "react";

import { Context } from "../App";
import { StyledButton, StyledTextField } from "../StyledComponents";
import {sendUserComment} from "../Queries/contact.graphql";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
    dialogBack: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    dialogPaper: {
        borderRadius: '24px',
        border: '1px solid #AFC4F1',
        width: '100%',
        maxWidth: '980px',
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')] : {
            padding: theme.spacing(4),
        },
    },
    closeDialogButtonDisplay: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    dialogContent: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            
        },
        alignItems: 'center',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
    },
    dialogForm: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
    },
    dialogTitle: {
        fontSize: 32,
        paddingBottom: theme.spacing(1.5),
    },
    dialogDescription: {
        color: theme.palette.gray.main
    },
    messageInput: {
        marginTop: '20px',
    },
    dialogImage: {
        flex: 2,
        position: 'relative',
    },
    dialogBackground: {
        maxWidth: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    dialogAvatar: {
        width: '60%',
        height: '60%',
        position: 'absolute',
        zIndex: 1,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -30%)',
    },
}));

export default function ContactDialog({form, onFormChange, open, onClose})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);
    const [terms, setTerms] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const [sendCommentMutation] = useMutation(sendUserComment)

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await sendCommentMutation({
                variables: {
                    input: form
                }
            })
            if(response.data?.sendUserComment) onClose()
        } catch (error) {
            enqueueSnackbar(error.message, {variant:"error"})
        }
    }

    const handleTermsAccepted = (event) => {
        setTerms(event.target.checked);
    };

    return(<Dialog
        open={open}
        onClose={onClose}
        classes={{root:classes.dialogBack, paper:classes.dialogPaper}}
    >
        <Box className={classes.closeDialogButtonDisplay}><IconButton onClick={onClose}><Close/></IconButton></Box>
        <Box className={classes.dialogContent}>
            <form className={classes.dialogForm} onSubmit={onSubmit}>
                <Typography variant="h2" component="h2" className={classes.dialogTitle}>{dictionary.productInfo.contactTitle}</Typography>
                <DialogContentText className={classes.dialogDescription}>{dictionary.productInfo.contactDescription}</DialogContentText>
                <StyledTextField value={form.topic} onChange={onFormChange} name='topic' autoFocus label={dictionary.productInfo.contactSubject} fullWidth required/>
                <StyledTextField value={form.message} onChange={onFormChange} name='message' label={dictionary.productInfo.contactMessage} fullWidth multiline rows={8} className={classes.messageInput} required/>
                <Typography><Checkbox value={terms} onChange={handleTermsAccepted}/>{dictionary.productInfo.acceptTerms}</Typography>
                <StyledButton label={dictionary.productInfo.contactSend} type='submit' disabled={!terms}/>
            </form>
            <Box className={classes.dialogImage}>
                <Avatar className={classes.dialogAvatar} src="/images/decorations/session/avatar.png"/>
                <img className={classes.dialogBackground} src="/images/decorations/session/contact-back.png"/>
            </Box>
        </Box>
    </Dialog>);
}