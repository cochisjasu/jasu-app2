import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import { useContext } from "react";

import { Context } from "../App";

const useStyles = makeStyles((theme) => ({
  boxcontainer: {
    cursor: 'pointer',
    width: "100%",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    border: '1px solid #EFEFEC',
    padding: "0.75rem",
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
      textAlign:"start",
    },
  },
  boxcontainerSelectedFruit: {
    cursor: 'pointer',
    width: "100%",
    height: "6.5625rem",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    boxShadow: "5px 5px 8px 0px #B8B8B8",
    padding: "0.75rem",
    ["@media (max-width:960px)"]: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "fit-content",
    },
  },
  containerTextSelectedFruit: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    ["@media (max-width:960px)"]: {
      margin: "0",
      textAlign: "center",
    },
  },
  containerText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    ["@media (max-width:960px)"]: {
      textAlign: "start",
    },
  },
  conteinerimg: {
    backgroundColor: "#EFEFEC",
    height: 56,
    minWidth: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5rem",
    padding: 5,
    ["@media (max-width:960px)"]: {
      marginBottom: "0.5rem",
    },
    "& img": {
      height: '100%',
    },
  },
  imgSkeleton: {
    width: 56,
    height: 56,
    padding: 10,
    borderRadius: "0.5rem",
    ["@media (max-width:960px)"]: {
      marginBottom: "0.5rem",
    },
  },
  name: {
    fontSize: "1rem",
    color: "#404040",
    fontWeight: "bold",
    marginBottom: "0.25rem",
    ["@media (max-width:960px)"]: {
      marginBottom: "0.5rem",
    },
  },
  description: {
    fontSize: "1rem",
    color: "rgba(64, 64, 64, 0.8)",
    overflow: "hidden",
    ["@media (max-width:960px)"]: {
      marginBottom: theme.spacing(2),
      width: "100%",
      overflow: "hidden",
    },
  },
}));
const CardPresentation = ({ name, url="#", img="", description="", type }) => {
  const classes = useStyles();
  const {loading} = useContext(Context);

  const truncate = (text) => {
    return text.length > 45 ? `${text.substring(0, 45)}...` : text;
  }

  return (
    <Link href={url} >
      <Box className={ type === "selectedFruit" ? classes.boxcontainerSelectedFruit : classes.boxcontainer}>
        {loading || img == null ?
          <Skeleton variant="square" className={classes.imgSkeleton}/> :
          <Box className={classes.conteinerimg}>
            <img src={img} alt={name} />
          </Box>
        }
        <Box className={type === "selectedFruit" ? classes.containerTextSelectedFruit : classes.containerText}>
          {loading || img == null ?
            <>
              <Skeleton/>
              <Skeleton style={{flex: 1}}/>
            </> :
            <>
              <Typography className={classes.name}>
                {name}
              </Typography>
              <Typography className={classes.description}>
                {truncate(description)}
              </Typography>
            </>
          }
        </Box>
      </Box>
    </Link>
  );
};

export default CardPresentation;
