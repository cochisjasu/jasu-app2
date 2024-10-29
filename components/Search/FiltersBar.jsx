import { Box, Checkbox, FormControlLabel, makeStyles, Radio, RadioGroup, Select, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useContext } from "react";

import {Context} from '../App';
import {PAGES} from ".";

const useStyles = makeStyles((theme) => ({
    tabShown: {
        lineHeight: '1.067rem',
        fontSize: "0.875rem",
        color: '#BDBEBF',
        minWidth: '0',
        paddingInline: theme.spacing(1)
    },
    selectedTabShown: {
        color: theme.palette.gray.main,
        fontWeight: '600',
    },
    boxPresentationFilters:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
    },
    presentationOptions:{
        backgroundColor: theme.palette.white.main,
        border: '1px solid #8A9C4C',
        borderRadius: '50px',
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap',
        padding: '6px 12px',
    },
    presentationOptionsSelected:{
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50px',
        color: theme.palette.primary.contrastText,
        whiteSpace: 'nowrap',
        padding: '6px 12px',
    },
    boxProductsFilter:{
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
    },
    filterProduct:{
        backgroundColor: theme.palette.white.main,
        border: '1px solid #8A9C4C',
        borderRadius: '50px',
        color: theme.palette.primary.main,
        paddingInline: '10px',
        marginBottom: theme.spacing(1),
    },
    filterProductChecked:{
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50px',
        color: theme.palette.primary.contrastText,
        paddingInline: '10px',
        marginBottom: theme.spacing(1),
    },
    productCheckbox:{
        color: theme.palette.primary.main,
    },
    productCheckboxSelected:{
        color: theme.palette.white.main,
    },
    boxcontainercheck: {
        display: "flex",
        alignItems: "stretch",
        marginBlock: "2rem",
        justifyContent: "space-between",
        flexDirection: 'column',
        [theme.breakpoints.up("lg")]: {
            flexDirection: 'row',
            alignItems: "center",
        },
    },
    shownText: {
        color: theme.palette.gray.main,
    },
    boxShownMobile:{
        display: 'flex',
        alignItems: 'center'
    },
    shownTextMobile:{
        color: theme.palette.gray.main,
        fontSize: '0.875rem',
        lineHeight: '1.067',
    },
    select:{
        color: theme.palette.gray.main,
        boxShadow:"none",
        backgroundColor: theme.palette.white.main,
        borderRadius: '40px',
        border: '1px solid #C0C2B7',
        minWidth: '180px',
        [theme.breakpoints.up("lg")]: {
            marginLeft: '16px',
        },
       "& .MuiSelect-select:focus":{
         borderRadius:"40px"
       } 
    },
    selectIcon:{
        color: theme.palette.primary.main,
    },
    containercheckbox: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up("lg")]: {
            flexDirection: 'row',
        },
    },
}));

export default function FiltersBar({
    pageType,
    page,
    dataLength,
    labelShow,
    itemsPerPage,
    itemsPerPageOptions,
    handleChangeItemsPerPage,
    sort,
    handleChangeSort,
    showFilters=false,
    filters=[],
    handleChangeFilters=null,
})
{
    const classes = useStyles();
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const {dictionary} = useContext(Context);

    const getPresentationValue = () => {
      let value = "";
      let notAll = false;
      for (const option of filters) {
        if (option.checked) {
          value = option.id;
        } else {
          notAll = true;
        }
      }
      if(notAll) return value;
      return "all";
    }
    const allPresentations = {id: "all", name:"Todo"};

    return (<Box className={classes.boxcontainercheck}>
        {isLg && <Typography className={classes.shownText}>
          {/*dictionary.formatString(
            dictionary.search.showResults,
            ((page - 1) * itemsPerPageOptions[itemsPerPage])+1,
            (page * itemsPerPageOptions[itemsPerPage]) >= dataLength ? dataLength : page * itemsPerPageOptions[itemsPerPage]
          )*/}
          {labelShow}
        </Typography>}
        
        {(pageType == PAGES.PRODUCTS && showFilters) && <ScrollMenu scrollContainerClassName={classes.boxProductsFilter}>
          {filters.map(option => <FormControlLabel
            key={option.id} className={!isLg ? (option.checked ? classes.filterProductChecked : classes.filterProduct) : '' }
            control={
              <Checkbox
                checked={option.checked}
                onChange={handleChangeFilters}
                color="default"
                inputProps={{ "aria-label": "checkbox with default color" }}
                name={option.id}
                className={!isLg ? (option.checked ? classes.productCheckboxSelected : classes.productCheckbox) : ''}
              />
            }
            label={option.name}
          />)}
        </ScrollMenu>}
        <Box id="scrollPagination" className={classes.containercheckbox}>
          {(pageType == PAGES.PRESENTATION && showFilters) && (isLg ? <Select
              onChange={handleChangeFilters}
              variant="outlined"
              value={getPresentationValue()}
              native
              inputProps={{
                name: "filterPresentation",
                id: "filterPresentation"
              }}
              IconComponent={ExpandMoreRounded}
              className={classes.select}
              classes={{icon:classes.selectIcon}}
            >
            {[allPresentations, ...filters].map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
          </Select> : <ScrollMenu><RadioGroup value={getPresentationValue()} name="filterPresentation" onChange={handleChangeFilters} className={classes.boxPresentationFilters}>
            {[allPresentations, ...filters].map(option => <FormControlLabel 
              key={option.id}
              value={option.id}
              control= {<Radio style={{display: 'none'}}/>}
              label={option.name}
              className={getPresentationValue() == option.id ? classes.presentationOptionsSelected : classes.presentationOptions}
            />)}
          </RadioGroup></ScrollMenu>)}
          <Box style={{display: 'flex'}}>
            {!isLg && <Box className={classes.boxShownMobile}>
              <Typography className={classes.shownTextMobile}>{dictionary.search.show}</Typography>
              <Tabs indicatorColor="secondary" value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                {itemsPerPageOptions.map(option => <Tab key={option} label={option} className={classes.tabShown} classes={{selected:classes.selectedTabShown}}/>)}
              </Tabs>
            </Box>}
            <Select
              onChange={handleChangeSort}
              variant="outlined"
              value={sort}
              native
              inputProps={{
                name: "sort",
                id: "sort"
              }}
              IconComponent={ExpandMoreRounded}
              className={classes.select}
              classes={{icon:classes.selectIcon}}
            >
              <option value="A-Z">{" "}{dictionary.search.az}{" "}</option>
              <option value="Z-A">{" "}{dictionary.search.za}{" "}</option>
            </Select>
          </Box>
        </Box>
      </Box>)
}