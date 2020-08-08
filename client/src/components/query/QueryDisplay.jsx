import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { v4 as uuidv4 } from 'uuid';

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
    table: {
        minWidth: 650,
    },
  }));

export const QueryDisplay = React.memo(({queryResults}) => {
    const classes = useStyles();
    if (!Array.isArray(queryResults)) {
        return (
            <div style={{height:'100%', width:'100%'}}>
                <Paper className={classes.paper}>
                    Your query results will be shown here.
                </Paper>
            </div>
        );
    }
    let attributes = Object.keys(queryResults[0]);

    let tableBodyHeader = (
        <TableHead>
            <TableRow>
                {attributes.map(header => (
                    <TableCell key={uuidv4()}>{header}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );

    let tableBodyRows = (
        <TableBody>
        {queryResults.map((row) => (
            <TableRow key={uuidv4()}>
                {attributes.map(col => <TableCell key={uuidv4()}>{row[col]}</TableCell>)}
            </TableRow>
        ))}
        </TableBody>
    );

    return (
        <div style={{height:'100%', width:'100%'}}>
            <TableContainer component={Paper}>
                <Table className={classes.table}  size="small" aria-label="query results">
                    {tableBodyHeader}
                    {tableBodyRows}
                </Table>
            </TableContainer>
        </div>
    )
});
