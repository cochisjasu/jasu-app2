import { useRouter } from 'next/router';
import { Fragment, useState, useContext, useRef, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";
import sha256 from "sha256";

import App from "../components/App";
import Session from '../components/Session';
import {signUp} from "../components/Queries/session.graphql"

export default function SignupView() {
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    recaptcha: useRef(null),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyWebsite: "",
  });
  const [shownMessage, setShownMessage] = useState(false);
  const router = useRouter();

  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const { session, dictionary } = useContext(App.Context);

  if(session)
    router.push("/");

  const submitSignupRequest = useCallback(async (greValue) => {

    const submit = async (input) => {
        const {errors, data} = await apolloClient.mutate({
            mutation: signUp,
            variables: {
                input
            }
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.signUp;
    };

    const input = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: sha256(signupData.password),
      companyName: signupData.companyName,
      companyWebsite: signupData.companyWebsite,
      gre: greValue
    }
    const response = await submit(input);
    if (!response) enqueueSnackbar(dictionary.session.signUpError, {variant: 'error'});
    else {
      switch (response.status) {
        case 1:
          enqueueSnackbar(dictionary.session.mailUnavailable, {variant: 'warning'});
          break;
        case 2:
          enqueueSnackbar(dictionary.session.captchaError, {variant: 'error'});
          break;
        case 3:
          setShownMessage(true);
          break;
        default:
          break;
      } 
    }
  }, [signupData]);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const greValue = signupData.recaptcha.current.getValue();
    const matchPasswords = signupData.password === signupData.confirmPassword;
    if(!greValue)
      enqueueSnackbar(dictionary.session.emptyCaptcha, {variant:"error"});
    else if(!matchPasswords)
      enqueueSnackbar(dictionary.session.passMismatch, {variant:"error"});
    else
    {
      try{
        await submitSignupRequest(greValue)
      }
      catch (error) {
        enqueueSnackbar(error.toString(), {variant: 'error'})
      }
    }
    signupData.recaptcha?.current?.reset();
    setLoading(false);
  }

  const handleInputChange = (event) => {

    setSignupData(state => ({
      ...state,
      [event.target.name] : event.target.value
    }))
  }

  return (
    <Fragment>
      <Session.SessionPanel>
        {shownMessage ? 
          <Session.Message message={dictionary.session.signUpMessage} /> : 
          <Session.SignupForm
            onSubmit={onSubmit}
            handleInputChange={handleInputChange}
            formData={signupData}
            loading={loading}
          />
        }
      </Session.SessionPanel>
    </Fragment>
  )
}