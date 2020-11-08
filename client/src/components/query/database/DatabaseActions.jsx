import React from 'react';
import { connect } from 'react-redux'
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

import { setCurrentDbId } from '../../../actions/database';

const useStyles = makeStyles((theme) => ({
    dbSelect: {
        width: '100%',
        fontSize: '12px'
    },
    dbMenuItem: {
        fontSize: '12px'
    }
}));

const DatabaseActions = ({currentDbId, setCurrentDbId}) => {
    const classes = useStyles();

    // TODO: should dbConnections be in global state?
    // const [currentDbConnection, setCurrentDbConnection] = React.useState('');
    const [dbConnections, setDbConnections] = React.useState([]);

    React.useEffect(() => {
        const getDbConnections = () => fetch('/database/list-options')
            .then(response => response.json())
            .then(data => {
                setDbConnections(data);
            })
        getDbConnections();
    }, [])

    return (
        <div style={{height: 'calc(100vh - 108px)'}}>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', paddingLeft: '15px', paddingRight: '15px'}}>
                <Typography variant="overline" display="block" gutterBottom>
                    Database Connection
                </Typography>
                <>
                    <Select
                        className={classes.dbSelect}
                        value={dbConnections.length ? currentDbId : 'None'}
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
        currentDbId: state.database.currentDbId || 'None'
    };
}

const mapDispatchToProps = {
    setCurrentDbId
};

export const ConnectedDatabaseActions = connect(mapStateToProps, mapDispatchToProps)(DatabaseActions);
