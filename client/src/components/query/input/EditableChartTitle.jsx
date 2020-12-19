import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputBase: {
        height: '25px'
    }
}));

export const EditableChartTitle = ({handleChange, error = false, value, handleBlur}) => {
    const classes = useStyles();

    return (
        <InputBase
            id='chart-name'
            className={classes.inputBase}
            label='Chart Name'
            value={value}
            placeholder='Untitled Chart'
            onChange={handleChange}
            error={error}
            inputProps={{
                style: {
                    fontSize: '17px',
                    padding: '0px'
                }
            }}
            onBlur={handleBlur}
        />  
    )
}