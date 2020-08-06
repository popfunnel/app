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
            <div style={{height:'100vh', width:'100%'}}>
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
        <div style={{height:'50vh', width:'100%'}}>
            <TableContainer component={Paper}>
            <Table className={classes.table}  size="small" aria-label="query results">
                {tableBodyHeader}
                {tableBodyRows}
            </Table>
            </TableContainer>
        </div>
    )
});


//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];
  
// export default function SimpleTable() {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Dessert (100g serving)</TableCell>
    //         <TableCell align="right">Calories</TableCell>
    //         <TableCell align="right">Fat&nbsp;(g)</TableCell>
    //         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
    //         <TableCell align="right">Protein&nbsp;(g)</TableCell>
    //       </TableRow>
    //     </TableHead>
        // <TableBody>
        //   {rows.map((row) => (
        //     <TableRow key={row.name}>
        //       <TableCell component="th" scope="row">
        //         {row.name}
        //       </TableCell>
        //       <TableCell align="right">{row.calories}</TableCell>
        //       <TableCell align="right">{row.fat}</TableCell>
        //       <TableCell align="right">{row.carbs}</TableCell>
        //       <TableCell align="right">{row.protein}</TableCell>
        //     </TableRow>
        //   ))}
        // </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }