import React from 'react';
import Paper from '@material-ui/core/Paper';
// TODO create index.js file to import all these guys
import { ResultsTable } from './display/Table'
import { BarChart } from './display/Bar'
import { PieChart } from './display/Pie'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


// TODO: fix height 
const useStyles = makeStyles((theme) => ({
    paper: {
      height: 300,
      width: '100%',
    },
    control: {
      padding: theme.spacing(2),
    }
}));

export const QueryDisplay = React.memo(({queryResults, seriesType}) => {

    const classes = useStyles();
    
    const SeriesTitle = () => {
        return (
            <Typography variant="h6" display="block" gutterBottom>{seriesType}</Typography>
        );
    }

    const NoResults = () => {
        return (
            <div style={{height:'100%', width:'100%'}}>
                <Paper className={classes.paper}>
                    Your query results will be shown here.
                </Paper>
            </div>
        );
    }

    const getDisplay = () => {
        if (!Array.isArray(queryResults)) {
            return <NoResults/>
        } else if (seriesType === 'Table') {
            return <ResultsTable queryResults={queryResults}/>
        } else if (seriesType === 'Bar') {
            return <BarChart queryResults={queryResults}/>
        } else if (seriesType === 'Pie') {
            return <PieChart queryResults={queryResults}/>
        }
        else {
            return <NoResults/>
        }
    }

    return (
        <div style={{height:'100%', width:'100%'}}>
            <SeriesTitle/>
            {getDisplay()}
        </div>
    )
});
