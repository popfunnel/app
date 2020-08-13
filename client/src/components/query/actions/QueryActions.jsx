import React from 'react';
import { SeriesSettings } from './settings/SeriesSettings'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HistoryIcon from '@material-ui/icons/History';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tabContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100vh'
    },
    tabs: {
        borderLeft: `1px solid ${theme.palette.divider}`,
        width: 50
    }
}));

export const QueryActions = ({seriesType, setSeriesType}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const getTabContent = () => {
        if (value === 0) {
            return (
                <div style={{width:'100%', paddingLeft: '15px', paddingRight: '15px'}}> 
                    <SeriesSettings seriesType={seriesType} setSeriesType={setSeriesType}/>
                </div>
            );
        } else if (value === 1) {
            return (
                <div> 
                    settings component
                </div>
            );
        } else if (value === 2) {
            return (
                <div> 
                    history component
                </div>
            );
        }
  };

  const StyledTab = withStyles((theme) => ({
    root: {
        maxWidth: 60,
        [theme.breakpoints.up('sm')]: {
            minWidth: 40,
        },
    }
  }))(Tab);
  
  return (
    <div>
        <div className={classes.tabContainer}>
            {getTabContent()}
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}
                aria-label="Query Actions"
                className={classes.tabs}
            >
                <StyledTab icon={<BarChartIcon/>}/>
                <StyledTab icon={<SettingsIcon/>}/>
                <StyledTab icon={<HistoryIcon/>}/>
            </Tabs>
        </div>
    </div>
  );
}