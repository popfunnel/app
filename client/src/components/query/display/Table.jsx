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
        minWidth: 650,
    },
    cell: {
        fontSize: '12px'
    }
}));

const ResultsTable = ({queryResults}) => {
    const classes = useStyles();

    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];

    let TableBodyHeader = () => {
        return(
            <TableHead>
                <TableRow>
                    {attributes.map(header => (
                        <TableCell className={classes.cell} key={uuidv4()}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    let TableBodyRows = () => {
        return(
            <TableBody>
                {queryResults.map((row) => (
                    <TableRow key={uuidv4()}>
                        {attributes.map(col => <TableCell className={classes.cell} key={uuidv4()}>{row[col]}</TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
        );
    };

    return(
        <TableContainer component={Paper}>
            <Table className={classes.table}  size="small" aria-label="query results">
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