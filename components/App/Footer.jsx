import {useContext} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { alpha, Box, Typography } from "@material-ui/core";
import {useMediaQuery, Link} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import Image from 'next/image';

import Context from "./Context";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 0,
    },
    sectionContact:{
        backgroundColor: '#F4F4F4',
        background: 'url(/svg/leaf.svg)',
        
    },
    contactContent: {
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: theme.spacing(5, 0),
        [theme.breakpoints.up('lg')] : {
            flexDirection: 'row-reverse',
            maxWidth: 1180,
            margin: '0 auto',
            padding: theme.spacing(10, 0),
        },
    },
    sectionCopyright:{
        background: '#71A850',
    },
    logoJasu:{
        width: 161,
        height: 56,
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            height: 100,
        }
    },
    description:{
        color: '#585B59',
        fontWeight: 400,
        fontSize: 14
    },
    cardsDisplay:{
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')] : {
            flexDirection: 'row',
        },
    },
    contactCard:{
        alignSelf: 'center',
        maxWidth: 340,
        marginBottom: 40,
        [theme.breakpoints.up('lg')] : {
            marginRight: theme.spacing(2),
        },
    },
    contactData:{
        display: 'flex',
        paddingBottom: theme.spacing(2),
        fontWeight: '600',
        letterSpacing: '0.05em',
    },
    whiteText: {
        color: theme.palette.white.main,
        letterSpacing: '0.05em',
    },
    logo:{
        marginLeft: theme.spacing(2),
    },
    logosDisplay:{
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            textAlign: 'right',
        }
    },
    copyContent:{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            maxWidth: 1180,
            margin: '0 auto',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    },
    text:{
        color: alpha(theme.palette.white.main, .8),
        letterSpacing: '0.05em',
        padding: theme.spacing(.5, 0),
        [theme.breakpoints.up('lg')]: {
            padding: 0,
        }
    }
}));

export default function Footer() {
    const classes = useStyles(),
        theme = useTheme(),
        isMd = useMediaQuery(theme.breakpoints.up('md'));
    const {dictionary} = useContext(Context);

    const ContactCard = ({name, phone, address}) => {
        return(
            <Box className={classes.contactCard}>
                <Typography variant="subtitle1" className={`${classes.contactData}`}>{name}</Typography>
                <Box className={classes.contactData}>
                    <img src="/svg/phone-icon.svg" alt="Teléfono" width="20" height="20"/>
                    <Typography variant="body1" style={{paddingLeft:'10px', fontWeight: 400}}>{phone}</Typography>
                </Box>
                <Box className={classes.contactData}>
                    <img src="/svg/address-icon.svg" alt="Dirección" width="20" height="20"/>
                    <Typography variant="body1" style={{paddingLeft:'10px', fontWeight: 400}}>{address}</Typography>
                </Box>
            </Box>
        )
    };

    return (
        <Container maxWidth={false} component='footer' className={classes.root}>
            <Box className={classes.sectionContact}>
                <Box className={classes.contactContent}>
                    <Box className={classes.cardsDisplay}>
                        <ContactCard name={dictionary.footer.USOffice} phone="+1 305-699-4113" address="2665 S. Bayshore Dr. Suite 220 Miami, FL 33133"/>
                        <ContactCard name={dictionary.footer.EUROffice} phone="+34 91 076 2755" address="Paseo de la Castellana 77 Madrid, España 28046"/>
                        <ContactCard name={dictionary.footer.MXOffice} phone="+52 55 8526-6118" address="Avenida Oaxaca 86-205 CDMX, México 06700"/>
                    </Box>
                    <Box className={classes.contactCard}>
                        <img src="/svg/jasu-logo.svg" alt="Jasu" className={classes.logoJasu}/>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.sectionCopyright}>
                <Box className={classes.copyContent}>
                    <Typography className={classes.text}>{dictionary.footer.emailUs}</Typography>
                    <Typography className={classes.text}>{dictionary.footer.copyright}</Typography>
                </Box>
            </Box>
        </Container>
    );
}
