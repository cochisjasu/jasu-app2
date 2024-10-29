import { Fragment, useState, useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";
import sha256 from 'sha256';

import App from "../components/App";
import Session from '../components/Session';
import {redeemRecovery} from "../components/Queries/session.graphql";


export default function newPassword() {
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({});
  const [shownMessage, setShownMessage] = useState(false);

  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();
  const { recoverId } = router.query;
  const { session, dictionary } = useContext(App.Context);

  const submitRedeemRecoveryRequest = useCallback(async () => {

    const submit = async () => {
        const {errors, data} = await apolloClient.mutate({
            mutation: redeemRecovery,
            variables: {
                password: sha256(passwords.password),
                recovery: recoverId ? recoverId : '',
            }
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.redeemRecovery;
    };

    if (passwords.password != passwords.confirmPassword) return enqueueSnackbar(dictionary.session.passMismatch, {variant: 'warning'});
    const response = await submit();
    if (!response) return enqueueSnackbar(dictionary.session.newPasswordError, {variant: 'warning'});
    switch (response.status) {
      case 0:
        return setShownMessage(true);
      case 1:
        return enqueueSnackbar(dictionary.session.invalidToken, {variant: 'error'});
      case 2:
        return enqueueSnackbar(dictionary.session.expiredToken, {variant: 'error'});
      default:
          break;
    }
  }, [passwords]);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await submitRedeemRecoveryRequest()
    } catch (error) {
      enqueueSnackbar(error.toString(), {variant: 'error'})
    }
    setLoading(false);
  }

  const handleInputChange = (event) => {
    setPasswords(state => ({
      ...state,
      [event.target.name] : event.target.value
    }))
  }

  useEffect(() => {
    if(session)
      router.push("/");
  }, [])

  const cover = {
    desktop: "images/images_login/Rectangle 159.png",
    mobile: "images/images_login/Rectangle 159.png",
  }

  const message = {
    picture: "/images/images_login/group 44571.jpeg",
    message: "Su contraseña ha sido guardada exitosamente",
  }

  return (
    <Fragment>
      <Session.SessionPanel>
        {shownMessage ? 
          <Session.Message message={dictionary.session.newPasswordMessage} /> : 
          <Session.NewPasswordForm
            onSubmit={onSubmit}
            handleInputChange={handleInputChange}
            loading={loading}
          />
        }
      </Session.SessionPanel>
    </Fragment>
  )
}