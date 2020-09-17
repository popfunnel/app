import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    table: {
        width: 'auto',
        margin:'20px',
       
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    head: {
        fontSize: '12px',
        fontWeight: 'bold',
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    cell: {
        fontSize: '12px',
        border: '1px solid rgba(224, 224, 224, 1)'
    }
}));

const ResultsTable = ({queryResults}) => {
    const classes = useStyles();

    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];

    let TableBodyHeader = () => {
        return(
            <TableHead>
                <TableRow>
                    <TableCell key={uuidv4()} className={classes.head}/>
                    {attributes.map(header => (
                        <TableCell key={uuidv4()} className={classes.head} >{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    let TableBodyRows = () => {
        return(
            <TableBody>
                {queryResults.map((row, index) => (
                    <TableRow key={uuidv4()} className={classes.row}>
                        <TableCell className={classes.cell} key={uuidv4()}>{index+1}</TableCell>
                        {attributes.map(col => <TableCell key={uuidv4()} className={classes.cell} >{row[col]}</TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
        );
    };

    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="query results">
                <TableBodyHeader/>
                <TableBodyRows/>
            </Table>
        </TableContainer>
    );
};


const mapStateToProps = (state) => {
    return {
        queryResults: state.query.rawResults
    };
}

const mapDispatchToProps = {};

export const ConnectedResultsTable = connect(mapStateToProps, mapDispatchToProps)(ResultsTable);