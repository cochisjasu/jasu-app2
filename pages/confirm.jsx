import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";

import { Context } from "../components/App";
import Session from "../components/Session";
import {validateUser} from "../components/Queries/user.graphql";

export default function ConfirmUser()
{
    const {dictionary} = useContext(Context);

    const [message, setMessage] = useState(dictionary.session.confirmLoading);
    const [disableButton, setDisableButton] = useState(true);

    const apolloClient = useApolloClient();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const {userId, email, locale} = router.query;

    const logError = (msg) => {
        setMessage(msg);
        enqueueSnackbar(msg, {variant: "error"});
    }

    const submitValidateUser = useCallback(async () => {

        const submit = async () => {
            const {errors, data} = await apolloClient.mutate({
                mutation: validateUser,
                variables: {
                    id: userId ? userId : '',
                    email: email ? email : '',
                    locale: locale || 'en'
                }
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.validateUser;
        };
        const response = await submit();
        if (!response) logError(dictionary.session.confirmError);
        else {
            switch (response.status) {
                case 1:
                    logError(dictionary.session.userNotFound);
                    break;
                case 2:
                    logError(dictionary.session.userNotFound);
                    break;
                case 3:
                    setMessage(dictionary.formatString(dictionary.session.userAlreadyConfirmed, response.user.email));
                    break;
                case 4:
                    setMessage(dictionary.formatString(dictionary.session.confirmMessage, response.user.email));
                    break;
                default:
                    break;
          } 
        }
    }, [userId]);

    useEffect(()=>{
        async function validateUser() {
            try{
                const response = await submitValidateUser();
            }
            catch (error)
            {
                logError(error.toString());
            }
        }

        validateUser();
        setDisableButton(false);
    }, [userId])



    return(
        <Session.SessionPanel>
            <Session.Message message={message} loading={disableButton}/>
        </Session.SessionPanel>
    )
}