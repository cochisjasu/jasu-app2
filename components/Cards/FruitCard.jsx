import { makeStyles } from "@material-ui/styles";
import { Card, Typography } from "@material-ui/core";
import Link from "next/link";
import { Skeleton } from "@material-ui/lab";
import { useContext } from "react";

import { Context } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #EFEFEC',
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
    background: 'linear-gradient(#EFF0EF 50%, #FFFFFF 50%)',
    position: 'relative',
    aspectRatio: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decoration:{
    position: 'absolute',
    top: '50%',
    width: '100%',
    transform: 'translateY(-95%)',
  },
  img: {
    maxHeight: "50%",
    marginInline: "auto",
    zIndex: 1,
  },
  imgSkeleton: {
    height: "100%",
    maxHeight: "50%",
    marginInline: "auto",
    aspectRatio: 1,
    zIndex: 1,
  },
  title:{
    textAlign: "center",
    marginTop: "10%",
    zIndex: 1,
    color: theme.palette.gray.main,
  },
  titleSkeleton:{
    textAlign: "center",
    marginTop: "10%",
    zIndex: 1,
    width: "70%",
  },
}));

export default function FruitCard({ img="", title="", url="#", className=''}) {
  const classes = useStyles();
  const {loading} = useContext(Context);

  return (
    <Link href={url}>
      <Card className={`${classes.root} ${className}`} elevation={0}>
        <img src="/svg/decoration-light.svg" className={classes.decoration}/>
        {loading ? 
          <Skeleton variant="circle" className={classes.imgSkeleton}/> :
          <img src={img} alt={title} className={classes.img} style={title.length > 0 ? {} : {maxHeight: '70%', maxWidth: '70%'}}/>
        }
        {loading ?
          <Skeleton variant="text" className={classes.titleSkeleton}/> :
          (title.length > 0 && <Typography variant="h2" className={classes.title}>{title}</Typography>)
        }
        
      </Card>
    </Link>
  );
}
