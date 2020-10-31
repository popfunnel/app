import React from 'react';
import { connect } from 'react-redux'
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dbSelect: {
        width: '100%',
        fontSize: '12px'
    },
    dbMenuItem: {
        fontSize: '12px'
    }
}));

const DatabaseActions = () => {
    const classes = useStyles();

    return (
        <div style={{height: 'calc(100vh - 108px)'}}>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', paddingLeft: '15px', paddingRight: '15px'}}>
                <Typography variant="overline" display="block" gutterBottom>
                    Database Connection
                </Typography>
                <>
                    <Select
                        className={classes.dbSelect}
                        // value={seriesType}
                        // onChange={(e) => {
                        //     setSeriesType(e.target.value)}}
                    >
                        <MenuItem className={classes.dbMenuItem} value={'Table'}>Table</MenuItem>
                    </Select>
                </>
            </div>  
        </div>
    )
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = {
};

export const ConnectedDatabaseActions = connect(mapStateToProps, mapDispatchToProps)(DatabaseActions);
