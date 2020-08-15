import React from 'react';
import Paper from '@material-ui/core/Paper';
// TODO create index.js file to import all these guys
import { ResultsTable } from './Table'
import { Chart } from './Chart'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


// TODO: fix height 
const useStyles = makeStyles((theme) => ({
    paper: {
      height: '100%',
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
            <div style={{marginLeft: '10px'}}>
                <Typography variant="h6" display="block">{seriesType}</Typography>
            </div>
        );
    }

    const NoResults = () => {
        return (
            <div style={{height:'80%', width:'100%'}}>
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
        } else {
            return <Chart queryResults={queryResults} seriesType={seriesType}/>
        }
    }

    return (
        <div style={{height:'100%', width:'100%'}}>
            <SeriesTitle/>
            {getDisplay()}
        </div>
    )
});
