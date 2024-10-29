import {
    AppBar,
    Toolbar,
    useMediaQuery,
    useScrollTrigger,
    Slide,
    Drawer,
    List,
    ListItem,
    Typography,
    Avatar,
    Box,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Close, KeyboardArrowDown, KeyboardArrowRight, Search } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { Fragment, useEffect, useState, useContext, useCallback, useRef } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useApolloClient } from "@apollo/client";
import { useSnackbar } from "notistack";

import { Context } from '.';
import { logout, locales, setLocale } from '../Queries/session.graphql';
import { products } from '../Queries/products.graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.white,
        boxShadow: '0px 0px 20px rgba(0,0,0,0.25)'
    },
    container: {
        width: '100%',
        maxWidth: 1180,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
    },
    error: {
        backgroundColor: '#E35F5F',
        color: theme.palette.white.main,
        textAlign: 'center',
        paddingBlock: theme.spacing(1),
    },
    menuBtn:{
        color: theme.palette.green.dark,
    },
    searchIcon:{
        color: theme.palette.primary.main,
    },
    logo:{
        color: theme.palette.logo.main,
        cursor: 'pointer',
    },
    searchInput: {
        borderRadius: 20,
        backgroundColor: 'rgba(199,199,199,.2)',
        padding: theme.spacing(2, 3),
        height: 40,
        [theme.breakpoints.up('lg')] : {
            width: 248,
        },
    },
    buttonsList: {
        padding: 0,
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            alignItems: 'center'
        },
    },
    buttonsItem: {
        color: 'rgb(64, 64, 64, 0.9)',
        borderBottom:'1px solid #EDECE9',
        height: 48,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        [theme.breakpoints.up('lg')]: {
            borderBottom: 0,
            whiteSpace: 'nowrap',
            '&:hover': {
                backgroundColor: '#FFF',
            },
        },
    },
    drawer: {
        width: '100%',
        paddingTop: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(8),
        },
    },
    paper: {
        width: '100%',
        paddingTop: theme.spacing(8),
    },
    modal: {
        position: 'fixed',
        zIndex: 3,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loginButton:{
        backgroundColor: '#E3EEDC',
        borderRadius: 30,
        color: '#225D38',
        padding: theme.spacing(1.8, 2.8),
        textTransform: 'none',
        '&:hover':{
            backgroundColor: '#E3EEDC',
        },
        height: 'fit-content',
        alignSelf: 'center',
        marginLeft: theme.spacing(2),
    },
    userButton:{
        display: 'flex',
        borderRadius: 20,
        textTransform: 'none',
        '&:hover':{
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        height: 'fit-content',
        alignSelf: 'center',
    },
    userDisplay:{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },
    userAvatar:{
        width: 20,
        height: 20,
        color: theme.palette.gray.main,
    },
    userName:{
        marginLeft: '5px',
        flex: 1,
        whiteSpace: 'nowrap'
    },
    languageDisplay:{
        border: '1.4px solid #71A850',
        backgroundColor: theme.palette.white.main,
        borderRadius: 30,
        color: '#71A850',
        padding: theme.spacing(0, 2),
        marginLeft: theme.spacing(2),
    },
    languageLabel:{
        flex: 1,
        textAlign:'left',
        textTransform: 'uppercase',
    },
    languageMobile:{
        textTransform: 'none',
        flex: 1,
        justifyContent: 'left',
    },
    upper: {
        textTransform: 'uppercase',
    },

}));

const MOBILEMENUS = {
    NONE: 0,
    OPTIONS: 1,
    USER: 2,
    LANGUAGE: 3,
}

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ButtonAppBar(props) {
    const classes = useStyles(),
        theme = useTheme(),
        isLg = useMediaQuery(theme.breakpoints.up('lg')),
        isMd = useMediaQuery(theme.breakpoints.up('md')),
        [openMenu, setOpenMenu] = useState(MOBILEMENUS.NONE),
        [searchField, setSearchField] = useState(false),
        [searchQuery, setSearchQuery] = useState(''),
        [searchResults, setSearchResults] = useState([]),
        [languages, setLanguages] = useState([]),
        {session, agent, dictionary} = useContext(Context),
        router = useRouter(),
        apolloClient = useApolloClient(),
        {enqueueSnackbar} = useSnackbar(),
        error = props?.error?.networkError?.statusCode == 502 ? true : false,
        path = router.pathname,
        loggedIn = (session ? true : false);

    const [anchorEl, setAnchorEl] = useState(null);
    const divRef = useRef();

    const submitSetLanguage = async (localeId) => {
        const submit = async () => {
            const {errors, data} = await apolloClient.mutate({
                mutation: setLocale,
                variables: {
                    locale: localeId
                }
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.setLocale;
        };

        const response = await submit();
    };

    const submitLogout = async () => {
        const submit = async () => {
            const {errors, data} = await apolloClient.mutate({
                mutation: logout,
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.logout;
        };

        const response = await submit();
        if (!response) enqueueSnackbar(dictionary.nav.logoutError, {variant: 'error'});
        else {
            router.push("/");
        }
    };

    const getLocales = async () => {
        const submit = async () => {
            const {errors, data} = await apolloClient.query({
                query: locales,
                fetchPolicy: "no-cache",
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.locales;
        }
        const response = await submit();
        if(!response || response.totalCount === 0) return enqueueSnackbar(dictionary.nav.localesError, {variant: 'info'});
        setLanguages(response)
    }

    const getSearchResults = useCallback(async (value) => {
        const submit = async () => {
            const {errors, data} = await apolloClient.query({
                query: products,
                variables: {
                    num: 5,
                    filter: {
                      search: value,
                    }
                },
                fetchPolicy: "no-cache",
            });
            if (errors) if (errors.length > 0) throw new Error(errors[0].message);
            return data.products;
        };

        try {
            const response = await submit();
            const data = response.edges.map(item => (item.node))
            setSearchResults(data);
        } catch (error) {
            enqueueSnackbar(error.toString(), {variant: 'error'});
        }
    }, [searchQuery])

    const handleOpenCloseMenu = () => {
        if(searchField)
        {
            setSearchField(false);
        }
        else
        {
            setOpenMenu(status => (status !== MOBILEMENUS.NONE ? MOBILEMENUS.NONE : MOBILEMENUS.OPTIONS));
        }
    }

    const handleStartSearch = () => {
        setSearchField(status => {
            if(!status && openMenu)
            {
                setOpenMenu(MOBILEMENUS.NONE);
            }
            return !status;
        });
    }

    const handleSearch = async (event, value) => {
        setSearchQuery(value)
        if(value) await getSearchResults(value);
        else setSearchResults([]);
    }

    const handleClearSearch = async () => {
        setSearchQuery('');
        setSearchResults([]);
    }

    const handleLoginButton = async () => {
        if(loggedIn){
            if(window.confirm(dictionary.nav.logoutMessage))
            {
                await submitLogout();
            }
            /*if(isLg){
                //Show menú
            }
            else{
                //Show mobile
            }*/
        }
        else{
            setOpenMenu(MOBILEMENUS.NONE);
            router.push("/login");
        }
    }

    const handleLanguajeButton = () => {
        if(isLg){
            setAnchorEl(divRef.current);
        }
        else{
            setOpenMenu(MOBILEMENUS.LANGUAGE);
        }
    }

    const handleSelectLanguage = async (language) => {
        try {
            await submitSetLanguage(language);
            if(isLg) setAnchorEl(null);
            else setOpenMenu(MOBILEMENUS.NONE);
        } catch (error) {
            enqueueSnackbar(error.toString(), {variant: 'error'});
        }
    }
 
    const handleCloseLanguageDesktop = () => {
        setAnchorEl(null);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                await getLocales();
            } catch (error) {
                enqueueSnackbar(error.toString(), {variant: 'error'});
            }
            
        }
        fetchData();
    }, []);

    useEffect(() => {
        setOpenMenu(MOBILEMENUS.NONE);
        setSearchField(isLg);
    }, [isLg]);

    const navButtons = (
        <List className={classes.buttonsList}>
            {(isLg || openMenu === MOBILEMENUS.OPTIONS) && <>
                <NextLink passHref href="/"><ListItem onClick={() => setOpenMenu(MOBILEMENUS.NONE)} className={classes.buttonsItem}><Typography variant={(path == '/') ? 'body2' : 'body1'}>{dictionary.nav.home}</Typography></ListItem></NextLink>
                <NextLink passHref href="/products"><ListItem onClick={() => setOpenMenu(MOBILEMENUS.NONE)} className={classes.buttonsItem}><Typography variant={(path.substring(0,9) == '/products') ? 'body2' : 'body1'}>{dictionary.nav.products}</Typography></ListItem></NextLink>
                <NextLink passHref href="/contact"><ListItem onClick={() => setOpenMenu(MOBILEMENUS.NONE)} className={classes.buttonsItem}><Typography variant={(path == '/contact') ? 'body2' : 'body1'}>{dictionary.nav.contact}</Typography></ListItem></NextLink>
                <ListItem button onClick={handleLoginButton} className={`${classes.buttonsItem} ${isLg ? loggedIn ? classes.userButton : classes.loginButton : ''}`}>
                        {loggedIn ? <Box className={classes.userDisplay}>
                            <Avatar className={classes.userAvatar}/>
                            <Typography className={classes.userName}>{session.user.firstName} {session.user.lastName[0]}.</Typography>
                            {isLg ? <KeyboardArrowDown/> : <KeyboardArrowRight/>}
                        </Box> : <Typography variant={(path == '/login') ? 'body2' : 'body1'} style={{whiteSpace: 'nowrap'}}>{dictionary.nav.login}</Typography>}
                </ListItem>
                
                <ListItem ref={divRef} button onClick={handleLanguajeButton} className={`${classes.buttonsItem} ${isLg ? classes.languageDisplay : classes.languageMobile}`}>
                    <Typography className={classes.languageLabel}>{agent?.locale?.id || 'es'}</Typography>
                    {isLg ? <KeyboardArrowDown/> : <KeyboardArrowRight/>}
                </ListItem>
                {isLg && <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseLanguageDesktop}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    {languages.map(language => <MenuItem className={classes.upper} key={language.id} onClick={() => handleSelectLanguage(language.id)}>{language.id}</MenuItem>)}
                </Menu>}
            </>}
            {openMenu === MOBILEMENUS.LANGUAGE && <>
                {languages.map(language => <ListItem key={language.id} onClick={() => handleSelectLanguage(language.id)} className={classes.buttonsItem}><Typography className={classes.upper} variant={(agent.locale.id === language.id) ? 'body2' : 'body1'}>{language.id}</Typography></ListItem>)}
            </>}
        </List>
    )

    const appBar= (
        <AppBar className={classes.root} style={openMenu ? {boxShadow: '0'} : {}} color='inherit' elevation={0}>
            <Box className={classes.error} style={{display: error ? "block" : "none"}}>{dictionary.nav.serverError}</Box>
            <Toolbar className={classes.container} style={{zIndex: '3'}}>
                {!isLg &&
                    <IconButton onClick={handleOpenCloseMenu} className={classes.menuBtn}>
                        {openMenu ? <Close/> : 
                        searchField ? <Close/> : 
                        <MenuIcon/>}
                    </IconButton>
                }
                {(isLg || !searchField) && 
                    <NextLink passHref href="/">
                        <img src="/svg/jasu-logo.svg" alt="Jasu" width='88px' height='31px' className={classes.logo}/>
                    </NextLink>
                }
                {(!isLg && !searchField) &&
                <IconButton onClick={handleStartSearch} className={classes.menuBtn}>
                    <Search/>
                </IconButton>
                }
                {(isLg || searchField) &&
                <Autocomplete
                    inputValue={searchQuery}
                    onInputChange={handleSearch}
                    freeSolo
                    options={searchResults}
                    getOptionLabel={item => (`${item.presentation.name} - ${item.fruitVariety.fullName}`)}
                    fullWidth={!isLg}
                    renderInput={(params) => {
                        const {InputLabelProps,InputProps,...rest} = params;
                        return <InputBase
                            {...params.InputProps}
                            {...rest}
                            placeholder={dictionary.nav.search}
                            className={classes.searchInput}
                            endAdornment={searchQuery.length ? 
                                <IconButton onClick={handleClearSearch} size='small'><Close className={classes.searchIcon}/></IconButton> : 
                                <Search className={classes.searchIcon}/>}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.stopPropagation();
                                }
                            }}
                        />
                    }}
                    renderOption={option => <NextLink passHref href={`/products/${option.fruitVariety.id}/${option.presentation.id}`}>
                        <span onClick={handleClearSearch} children={`${option.presentation.name} - ${option.fruitVariety.fullName}`} />
                    </NextLink>}
                />
                }
                {isLg && navButtons}
                
            </Toolbar>
        </AppBar>
    );

    return <Fragment>
        <div className={classes.modal} onClick={handleOpenCloseMenu} style={{display:openMenu ? 'block' : 'none'}}></div>
        {
            !isMd &&
                <HideOnScroll {...props}>
                    {appBar}
                </HideOnScroll>
        }
        {
            isMd && appBar
        }
        {!isLg &&
            <Drawer
                open={openMenu !== MOBILEMENUS.NONE}
                onClose={() => setOpenMenu(MOBILEMENUS.NONE)}
                className={classes.drawer}
                classes={{
                    paper: classes.paper
                }}
                anchor='top'
                variant='persistent'
            >
                {navButtons}
            </Drawer>}
    </Fragment>
}