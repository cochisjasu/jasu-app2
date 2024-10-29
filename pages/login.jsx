import { useRouter } from 'next/router';
import { Fragment, useState, useContext, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";
import sha256 from "sha256";

import App from "../components/App";
import Session from '../components/Session';
import {getNonce, login} from "../components/Queries/session.graphql";

export default function LoginView() {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({});

  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const { session, agent, dictionary } = useContext(App.Context);
  const router = useRouter();

  if(session)
    router.push("/");

  const submitLogin = useCallback(async () => {

    const fetchNonce = async () => {
        const {errors, data} = await apolloClient.mutate({
            mutation: getNonce
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.nonce;
    };

    const submit = async (password, nonce) => {
        const {errors, data} = await apolloClient.mutate({
            mutation: login,
            variables: {
                email: loginData.email,
                password: password,
                nonce
            }
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.login;
    };

    const nonce = await fetchNonce();
    const hashedPassword = sha256(loginData.password);
    const passwordData = sha256(`${agent.id}${hashedPassword}${nonce.data}`);
    const response = await submit(passwordData, nonce.id);
    if (!response) return enqueueSnackbar(dictionary.session.loginError, {variant: 'warning'});
    if (window.history.length > 1 && document.referrer.indexOf(window.location.host) !== -1) {
      router.back();
    } else {
      router.push('/products');
    }
  }, [loginData]);

  const onLogin = async (event) => {
    setLoading(true);
    event.preventDefault();

    try{
      await submitLogin();
    }
    catch (error)
    {
      enqueueSnackbar(error.toString(), {variant: 'error'})
    }
    setLoading(false);
  }

  const handleInputChange = (event) => {

    setLoginData(state => ({
      ...state,
      [event.target.name] : event.target.value
    }))
  }

  return (
    <Fragment>
      <Session.SessionPanel>
        <Session.LoginForm onLogin={onLogin} handleInputChange={handleInputChange} loading={loading}/>
      </Session.SessionPanel>
    </Fragment>
  )
}
