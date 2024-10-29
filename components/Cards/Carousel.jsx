import { makeStyles, useTheme } from "@material-ui/styles";
import { alpha, Box, IconButton, Typography, useMediaQuery } from "@material-ui/core";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import FruitCard from "./FruitCard";
import CardPresentation from "./CardPresentation";
/* Dot
    aspect-ratio: 1;
    border-radius: 50%;
    margin-right: 8px;
    border: 0;
    background-color: black;
*/
const useStyles = makeStyles(theme => ({
    carousel: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
        }
    },
    slider: {
        flex: 1,
        width: '100%',
    },
    multipleSliders: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    slide: {
        '& .carousel__inner-slide': {
            width: 'calc(100% - 20px)',
            height: 'calc(100% - 20px)',
            left: 10,
            top: 10,
        },
    },
    slideMultiple: {
        '& .carousel__inner-slide': {
            width: 'calc(100% - 20px)',
            left: 10,
        },
    },
    button: {
        border: 0,
        backgroundColor: theme.palette.gray.main,
        color: '#FFF',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        aspectRatio: 1,
        '&:first-child':{
            marginRight: theme.spacing(3),
        },
        '&:last-child':{
            marginLeft: theme.spacing(3),
        },
    },
    dots: {
        '& .carousel__dot':{
            aspectRatio: 1,
            borderRadius: '50%',
            marginRight: theme.spacing(1),
            border: 0,
            backgroundColor: alpha(theme.palette.gray.main, .3),
        },
        '& .carousel__dot--selected':{
            backgroundColor: theme.palette.gray.main,
        },
    },
}));

export default function Carousel({type, data, show, arrows=true}) {
    const classes = useStyles();
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const getSlidesToShow = () => {
        if(isLg) return show.max;
        if(isMd) return show.lg;
        if(isSm) return show.md;
        return show.sm;
    }

    const dataLength = type === 'fruit' ? data.length : Math.ceil(data.length / 2);

    return (
        <CarouselProvider
            naturalSlideHeight={type === 'fruit' ? 100 : 140}
            naturalSlideWidth={type === 'fruit' ? 100 : 380}
            totalSlides={dataLength}
            visibleSlides={getSlidesToShow()}
            step={1}
            infinite
            className={classes.carousel}
            isPlaying
        >
            {(isLg && arrows) && <ButtonBack className={classes.button}><ChevronLeftRounded fontSize="large"/></ButtonBack>}
            {type === 'fruit' ? 
                <Slider className={classes.slider}>
                    {data.map((card, index) => <Slide key={index} index={index} className={classes.slide}><FruitCard {...card}/></Slide>)}
                </Slider>
            : <Box className={classes.multipleSliders}>
                <Slider className={classes.slider}>
                    {data.slice(0, dataLength).map((card, index) => <Slide key={index} index={index} className={classes.slideMultiple}><CardPresentation {...card}/></Slide>  )}
                </Slider>
                <Slider className={classes.slider}>
                    {data.slice(-dataLength).map((card, index) => <Slide key={index} index={index} className={classes.slideMultiple}><CardPresentation {...card}/></Slide>)}
                </Slider>
            </Box>}
            {(isLg && arrows) && <ButtonNext className={classes.button}><ChevronRightRounded fontSize="large"/></ButtonNext>}
            {!isLg && <DotGroup className={classes.dots}/>}
        </CarouselProvider>
    )
}