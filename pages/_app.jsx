//Bibliotecas
import React from 'react';
import App from 'next/app';
import Head from "next/head";
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {SnackbarProvider} from "notistack";
import cryptoRandomString from "crypto-random-string";

//Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import {Context, Theme, Nav, Footer} from '../components/App';
import baseConfig from '../base.config';
import {getAgent, loggedIn, loggedOut, changedLocale} from "../components/Queries/session.graphql";
import { dictionary } from '../components/Locale/Dictionary';
import {WhatsAppButton} from '../components/Home';

import ReactGA from 'react-ga';
 
  import 'bootstrap/dist/css/bootstrap.min.css';
const TRACKING_ID = "UA-109673698-1";
ReactGA.initialize(TRACKING_ID);

const httpLink = new HttpLink({
    fetch,
    uri: baseConfig.httpsUri,
    credentials: "include",
    withCredentials: true,
});

const errorLink = onError(({networkError, graphQLErrors}) => {
    if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

/**
 * Crea clientes apollo
 * 
 * @param {String|null} agentId ID de agente
 * @returns Apollo Client
 */
const getApolloClient = (agentId = null) => {
    if (!agentId?.length) {
        return new ApolloClient({
            ssrMode: true,
            link: ApolloLink.from([errorLink, httpLink]),
            cache: new InMemoryCache(),
        })
    }

    const wsLink = new WebSocketLink(
        new SubscriptionClient(
            baseConfig.wssUri,
            {
                reconnect: true,
                connectionParams: {
                    authToken: agentId,
                },
            },
            //W3CWebSocket
        )
    )

    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                authorization: agentId
            }
        })
        return forward(operation)
    })

    const apolloLink = ApolloLink.from([
        errorLink,
        authMiddleware,
        split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsLink,
            httpLink
        )
    ])

    return new ApolloClient({
        link: apolloLink,
        ssrMode: false,
        cache: new InMemoryCache(),
    })
}

class JasuApp extends App {

    lastUrl = '';

    constructor(props) {
        super(props);
        dictionary.setLanguage(props?.agent?.locale?.id || 'es');
        this.state = {
            agent: props.agent,
            timezone: props.timezone,
            session: props.session,
            dictionary: dictionary,
            loading: false,
            setLoading: (loading = false) => this.setState({loading}),
            setSession: session => this.setState({session, agent: {...this.state.agent, session}})
        }
    }

    componentDidMount() {

        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
        this.apolloClient = getApolloClient(this.props?.agent?.id);

        //Inicializar subscripciones para actualizar sesión en caso de login o logout
        this.setState({
            loggedIn: this.apolloClient.subscribe({
                query: loggedIn,
                shouldResubscribe: true,
            }).subscribe(({data}) => {
                if (!data) return;
                const loggedIn = data.loggedIn;
                if (!loggedIn) return;
                const session = loggedIn;
                this.setState({
                    agent: {
                        ...this.state.agent,
                        session,
                    },
                    session,
                });
            }),
            loggedOut: this.apolloClient.subscribe({
                query: loggedOut,
                shouldResubscribe: true,
            }).subscribe(({data}) => {
                if (!data) return;
                const loggedOut = data.loggedOut;
                if (!loggedOut.logout) return;
                const session = null;
                this.setState({
                    agent: {
                        ...this.state.agent,
                        session,
                    },
                    session,
                });
            }),
            changedLocale: this.apolloClient.subscribe({
                query: changedLocale,
                shouldResubscribe: true,
            }).subscribe(({data}) => {
                if (!data) return;
                const locale = data.changedLocale;
                if (!locale) return;
                this.setState({
                    agent: {
                        ...this.state.agent,
                        locale,
                    }
                })
                this.state.dictionary.setLanguage(locale.id)
            }),
        });

        this.storeAnalytics();
    }  

    componentDidUpdate() {
        this.storeAnalytics();
    }

    storeAnalytics() {
        const url = window.location.pathname + window.location.search;
        if(url !== this.lastUrl) {
            ReactGA.pageview(url);
            console.log('stored');
            console.log(url);
        }
        this.lastUrl = url;
    }

    render() {
        const {Component, pageProps} = this.props;
        const error = ("error" in this.props) ? this.props.error : null;

        return <React.Fragment>
            <Head>
                <title>{baseConfig.defaultTitle}</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <meta name="msapplication-TileColor" content="#859E3D"/>
                <meta name="theme-color" content="#FBFAF8"/>
                <link rel="manifest" href="/head/site.webmanifest"/>
                <link rel="shortcut icon" href="/head/icon.svg" type="image/svg"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/head/180x180.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/head/32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/head/16x16.png"/>
                <link rel="mask-icon" href="/head/icon.svg" color="#ffffff"/>    
               
            </Head>
            {this.apolloClient && <ApolloProvider client={this.apolloClient}>
                <Context.Provider value={this.state}>
                    <ThemeProvider theme={{
                        ...Theme
                    }}>
                        <SnackbarProvider maxSnack={4} anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}>
                            <CssBaseline/>
                            <Nav error={error}/>
                            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                <Component {...pageProps} />
                                <WhatsAppButton/>
                            </div>
                            <Footer/>
                        </SnackbarProvider>
                    </ThemeProvider>
                </Context.Provider>
            </ApolloProvider>}
        </React.Fragment>;
    }

    static getInitialProps = async ({Component, ctx}) => {
        try
        {
            let headers = {};
            let cookies = {};
            let agentId = "";
            if (ctx?.req?.cookies) //Get session cookies
            {
                cookies = ctx.req.cookies;
                agentId = cookies.agent || cryptoRandomString({length: 32, type: 'url-safe'});
                headers = {
                    'authorization': agentId
                }
            }

            //Fetch session data with agentId
            let agent = null
            const apolloClient = getApolloClient()
            const { data } = await apolloClient.query({
                query: getAgent,
                fetchPolicy: "no-cache",
                context: { headers },
            });
            agent = data.agent

            //Save cookie if not created
            if(ctx.req && !cookies.agent) ctx.res.setHeader('Set-Cookie', `agent=${agent.id}; Domain=.${baseConfig.rootDomain}; Path=/; Secure; Max-Age: 2147483647;`);

            let pageProps = {};
            if (Component)
                if (Component.getInitialProps)
                    pageProps = await Component.getInitialProps({
                        ...ctx,
                        agent,
                        session: agent.session,
                    });
            return {
                agent,
                session: agent.session,
                pageProps,
            };
        }
        catch (error)
        {
            console.error(error);
            return {error}
        }
    };

}

export default JasuApp;