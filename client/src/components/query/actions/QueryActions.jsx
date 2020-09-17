import React from 'react';
import { ConnectedSeriesSettings } from './settings/SeriesSettings'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HistoryIcon from '@material-ui/icons/History';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tabContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%'
    },
    tabs: {
        borderLeft: `1px solid ${theme.palette.divider}`,
        width: 50
    }
}));

export const QueryActions = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const getTabContent = () => {
        if (value === 0) {
            return (
                <div style={{width:'100%', paddingLeft: '15px', paddingRight: '15px'}}> 
                    <ConnectedSeriesSettings/>
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
        width: 45,
        [theme.breakpoints.up('sm')]: {
            minWidth: 40,
        },
    }
  }))(Tab);
  
  return (
    <div style={{height: 'calc(100vh - 98px)'}}>
        <div className={classes.tabContainer}>
            {getTabContent()}
            <div style={{height: '100%'}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    aria-label="Query Actions"
                    className={classes.tabs}
                >
                    <StyledTab icon={<BarChartIcon/>}/>
                    <StyledTab icon={<SettingsIcon/>}/>
                    <StyledTab icon={<HistoryIcon/>}/>
                </Tabs>
            </div>
        </div>
    </div>
  );
}