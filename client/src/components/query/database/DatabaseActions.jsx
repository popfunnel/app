import React from 'react';
import { connect } from 'react-redux'
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

import { setCurrentDbId, setDbConnections } from '../../../actions/database';
import { openSnackbarWithMessage } from '../../../actions/snackbar';

const useStyles = makeStyles((theme) => ({
    dbSelect: {
        width: '100%',
        fontSize: '12px'
    },
    dbMenuItem: {
        fontSize: '12px'
    }
}));

const DatabaseActions = ({currentDbId, setCurrentDbId, dbConnections, setDbConnections, openSnackbarWithMessage}) => {
    const classes = useStyles();

    React.useEffect(() => {
        setDbConnections().catch(error => {
            openSnackbarWithMessage(`${error}`);
        })
    }, [setDbConnections, openSnackbarWithMessage])

    return (
        <div style={{height: 'calc(100vh - 108px)'}}>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', paddingLeft: '15px', paddingRight: '15px'}}>
                <Typography variant="overline" display="block" gutterBottom>
                    Database Connection
                </Typography>
                <>
                    <Select
                        className={classes.dbSelect}
                        value={currentDbId}
                        onChange={e => setCurrentDbId(e.target.value)}
                    >
                        <MenuItem className={classes.dbMenuItem} value={'None'}>None Selected</MenuItem>
                        {dbConnections.map(connection => <MenuItem key={connection.id} className={classes.dbMenuItem} value={connection.id}>{connection.name}</MenuItem>)}
                    </Select>
                </>
            </div>  
        </div>
    )
}

const mapStateToProps = state => {
    
    return {
        currentDbId: state.database.currentDbId || 'None',
        dbConnections: state.database.dbConnections
    };
}

const mapDispatchToProps = {
    setCurrentDbId,
    setDbConnections,
    openSnackbarWithMessage
};

export const ConnectedDatabaseActions = connect(mapStateToProps, mapDispatchToProps)(DatabaseActions);
