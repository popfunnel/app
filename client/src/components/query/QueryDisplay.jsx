import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 400,
      width: '100%',
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export const QueryDisplay = () => {
    const classes = useStyles();

    return (
        <div style={{height:'50vh', width:'100%'}}>
            <Paper className={classes.paper}>
                Query table here
            </Paper>
        </div>
    )
}