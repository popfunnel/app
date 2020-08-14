import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chartSelect: {
        width: '100%',
        fontSize: '12px'
    },
    chartSelectItem: {
        fontSize: '12px'
    }
}));

export const SeriesSettings = ({seriesType, setSeriesType}) => {
    // const [chartType, setChartType] = React.useState('table')
    const classes = useStyles();

    // TODO: Extract each section here into subcomponents?
    // TODO: add formcontrol for everything applicable...
    // TODO: use mui makestyles function for all inline styles

    return (
        <div styles={{display:'flex', flexDirection: 'column', width:'100%'}}>
            <Typography variant="overline" display="block" gutterBottom>
                Series Settings
            </Typography>
            <>
                <Select
                    className={classes.chartSelect}
                    value={seriesType}
                    onChange={(e) => {
                        setSeriesType(e.target.value)}}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem className={classes.chartSelectItem} value={'Table'}>Table</MenuItem>
                    <MenuItem className={classes.chartSelectItem} value={'Bar'}>Bar</MenuItem>
                    <MenuItem className={classes.chartSelectItem} value={'line'}>Line</MenuItem>
                </Select>
            </>
            <div style={{display:'flex', height: '100px', alignItems: 'center'}}>
                <div>This will be where the options live.</div>
            </div>
            <div>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Theme
                    </AccordionSummary>
                    <AccordionDetails>blah</AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Series
                    </AccordionSummary>
                    <AccordionDetails>Series options</AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        blah
                    </AccordionSummary>
                    <AccordionDetails>Series options</AccordionDetails>
                </Accordion>
            </div>

        </div>
    );
}