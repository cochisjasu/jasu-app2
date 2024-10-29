import { makeStyles } from "@material-ui/styles";
import { Box, Button, Container, IconButton, List, Link, ListItem, Typography } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import { useContext } from "react";

import { Context } from "../App";
import Cards from "../Cards";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')] : {
            marginTop: theme.spacing(8),
        },
    },
    returnLink:{
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        color: theme.palette.gray.main,
        marginBlock: theme.spacing(4),
        [theme.breakpoints.up('md')] : {
            marginBlock: theme.spacing(8),
        },
    },
    infoDisplay:{
        display: 'flex',
        marginBottom: theme.spacing(8),
        flexDirection: 'column',
        width: '100%',
        [theme.breakpoints.up('md')] : {
            flexDirection: 'row',
            maxWidth: 940,
            marginInline: 'auto',
            alignItems: 'center',
        },
    },
    cardDisplay:{
        flex: 1,
        [theme.breakpoints.up('md')] : {
            height: 'fit-content',
        },
    },
    textInfoDisplay:{
        flex: 1,
        [theme.breakpoints.up('md')] : {
            marginInline: theme.spacing(5),
        },
    },
    title:{
        fontSize: '2.5rem',
        lineHeight: '3.75rem',
        color: theme.palette.primary.main,
        marginTop: theme.spacing(3),
        [theme.breakpoints.up('md')] : {
            marginTop: 0,
        },
    },
    subtitle:{
        fontSize: 24,
        marginBlock: theme.spacing(3),
    },
    downloadList:{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    downloadItem:{
        backgroundColor: theme.palette.white.main,
        border: '1px solid #EFEFEC',
        borderRadius: theme.spacing(1),
        marginBlock: theme.spacing(1),
        padding: theme.spacing(1.5),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    downloadItemName:{
        color: 'rgba(64, 64, 64, 0.8)'
    },
    blankSpace: {
        flex: 0,
        [theme.breakpoints.up('md')] : {
            flex: 1,
        },
    },
    contactDisplay:{
        backgroundColor: theme.palette.primary.main,
        borderRadius: '38px',
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        padding: '18px',
        marginInline: 'auto',
        marginBottom: '40px'
    },
    contactLabel:{
        color: theme.palette.white.main,
        marginRight: '8px'
    },
    contactButton:{
        borderRadius: '60px',
        backgroundColor: theme.palette.white.main,
        color: theme.palette.green.dark,
        '&:hover':{
            backgroundColor: theme.palette.white.main,
        }
    },
}));

export default function Information({loggedIn, productInfo, handleOpenDialog})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);
    const {back} = useRouter()

    const onBack = () => {
        router.back()
    }

    return (<Container className={classes.root}>
        <Link className={classes.returnLink} onClick={back}><ChevronLeftRounded/>{dictionary.general.goBack}</Link>
        <Box className={classes.infoDisplay}>
            <Cards.FruitCard img={productInfo?.img} className={classes.cardDisplay}/>
            <Box className={classes.textInfoDisplay}>
                <Typography component='h1' variant='h1' className={classes.title}>{productInfo?.title}</Typography>
                <Typography variant="h2" component="h3" className={classes.subtitle}>{productInfo?.description ? dictionary.productInfo.description : ''}</Typography>
                <Typography className={classes.infoDescription}>{productInfo?.description}</Typography>
                {productInfo?.files?.length > 0 && <>
                    <Typography variant='h2' component="h3" className={classes.subtitle}>{dictionary.productInfo.info}</Typography>
                    <List className={classes.downloadList}>
                        {productInfo.files.map(file => 
                            <ListItem className={classes.downloadItem}>
                                <Typography className={classes.downloadItemName}>{file.name}</Typography>
                                <IconButton href={file.url} target='_blank'><img src='/svg/download-icon.svg' alt='download'/></IconButton>
                            </ListItem>
                        )}
                    </List>
                </>}
            </Box>
        </Box>
        {loggedIn && <Box className={classes.contactDisplay}>
            <Typography className={classes.contactLabel}>{dictionary.productInfo.contactLabel}</Typography>
            <Button className={classes.contactButton} onClick={handleOpenDialog}>{dictionary.general.contactUs}</Button>
        </Box>}
    </Container>)
}