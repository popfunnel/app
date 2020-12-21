import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mediumInputBase: {
        height: '25px',
    },
    smallInputBase: {
        height: '23px',
    }
}));

export const EditableChartTitle = ({handleChange, error = false, value, handleBlur, size = 'medium'}) => {
    const classes = useStyles();

    return (
        <InputBase
            id='chart-name'
            className={size === 'small' ? classes.smallInputBase : classes.mediumInputBase}
            label='Chart Name'
            value={value}
            placeholder='Untitled Chart'
            onChange={handleChange}
            error={error}
            inputProps={{
                style: {
                    fontSize: size === 'small' ? '15px' : '17px',
                    padding: '0px'
                }
            }}
            onBlur={handleBlur}
        />  
    )
}