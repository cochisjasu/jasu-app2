import { Fragment, useState, useContext, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";

import App from "../components/App";
import Session from '../components/Session';
import {generateRecovery} from "../components/Queries/session.graphql";

export default function recoverPassword() {
  const [loading, setLoading] = useState(false);
  const [shownMessage, setShownMessage] = useState(false);
  const [formData, setFormData] = useState({
    recaptcha: useRef(null),
    email: "",
  });

  const router = useRouter();
  const { session, dictionary } = useContext(App.Context);
  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();

  if(session)
    router.push("/");

  const submitRecoveryRequest = useCallback(async (greValue) => {

    const submit = async () => {
        const {errors, data} = await apolloClient.mutate({
            mutation: generateRecovery,
            variables: {
                email: formData.email,
                gre: greValue,
            }
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.generateRecovery;
    };

    const response = await submit();
    if (!response) return enqueueSnackbar(dictionary.session.recoverError, {variant: 'warning'});
    setShownMessage(true);
  }, [formData]);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const greValue = formData.recaptcha.current.getValue();
    if(!greValue)
      enqueueSnackbar(dictionary.session.emptyCaptcha, {variant:"error"});
    else
    {
      try{
        await submitRecoveryRequest(greValue);
      }
      catch (error) {
        enqueueSnackbar(error.toString(), {variant: 'error'})
      }
    }
    formData.recaptcha?.current?.reset();
    setLoading(false);
  }

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(state => ({
      ...state,
      [name] : value
    }));
  }

  return (
    <Fragment>
      <Session.SessionPanel>
        {shownMessage ? 
          <Session.Message message={dictionary.session.recoverMessage} /> : 
          <Session.RecoverForm
              formData={formData}
              onSubmit={onSubmit}
              handleInputChange={handleInputChange}
              loading={loading}
          />
        }
      </Session.SessionPanel>
    </Fragment>
  )
}