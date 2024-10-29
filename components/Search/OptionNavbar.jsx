import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import { useContext } from "react";

import {Context} from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.main,
      boxShadow: "none",
    },
    tab: {
      maxWidth: "50%",
      textTransform: "capitalize",
      color: theme.palette.gray.main,
      fontWeight: '500',
      lineHeight: '1.25rem',
      fontSize: "1.25rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "2.5rem",
        lineHeight: '3.75rem',
      },
    },
    selectedTab: {
      color: theme.palette.green.dark,
      fontWeight: '700',
    },
  }));

export default function OptionNavbar({pageType, handleChange})
{
    const classes = useStyles();
    const {dictionary} = useContext(Context);

    return (<AppBar position="static" className={classes.root}>
    <Tabs
      indicatorColor='secondary'
      value={pageType}
      onChange={handleChange}
      aria-label="simple tabs example"
    >
      <Tab label={dictionary.search.products} key="products" className={classes.tab} classes={{selected:classes.selectedTab}} />
      <Tab label={dictionary.search.presentation} key="presentation" className={classes.tab} classes={{selected:classes.selectedTab}} />
    </Tabs>
  </AppBar>)
}