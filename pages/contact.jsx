import { Fragment, useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";
import { useContext } from 'react';

import { Context } from '../components/App';
import Session from '../components/Session';
import ContactForm from "../components/Contact/ContactForm";
import {sendComment} from "../components/Queries/contact.graphql";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });
  const [shownMessage, setShownMessage] = useState(false);

  const apolloClient = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();
  const {dictionary} = useContext(Context);
  const router = useRouter()

  const submitMessage = useCallback(async () => {

    const submit = async () => {
        const {errors, data} = await apolloClient.mutate({
            mutation: sendComment,
            variables: {
                input: contactData
            }
        });
        if (errors) if (errors.length > 0) throw new Error(errors[0].message);
        return data.sendComment;
    };
    const response = await submit();
    if (!response) return enqueueSnackbar(dictionary.session.contactError, {variant: 'error'});
    setShownMessage(true);

  }, [contactData]);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await submitMessage();
    } catch (error) {
      enqueueSnackbar(error.toString(), {variant: 'error'});
    }
    setLoading(false);
  }

  const handleInputChange = (event) => {

    setContactData(state => ({
      ...state,
      [event.target.name] : event.target.value
    }))
  }

  useEffect(() => {
    if (router.query.email) {
      setContactData(state => ({
        ...state,
        email : router.query.email
      }))
    }
  }, [])

  return (
    <Fragment>
      <Session.SessionPanel>
        {shownMessage ? 
          <Session.Message message={dictionary.session.signUpMessage} /> : 
          <ContactForm
            onSubmit={onSubmit}
            contactData={contactData}
            handleInputChange={handleInputChange}
            loading={loading}
          />
        }
      </Session.SessionPanel>
    </Fragment>
  );
}
