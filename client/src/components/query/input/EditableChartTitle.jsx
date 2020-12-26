import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     mediumInputBase: {
//         height: '25px'
//     },
//     smallInputBase: {
//         width: '175px'
//     }
// }));

export const EditableChartTitle = ({className, handleChange, error = false, value, handleClick, handleBlur, size = 'medium', inputRef}) => {

    return (
        <InputBase
            id='chart-name'
            className={className}
            label='Chart Name'
            value={value}
            placeholder='Untitled Chart'
            onChange={handleChange}
            error={error}
            inputProps={{
                style: {
                    fontSize: size === 'small' ? '0.875rem' : '17px',
                    lineHeight: '1.57',
                    height: '21px',
                    padding: '0px'
                }
            }}
            inputRef={inputRef}
            onClick={handleClick}
            onBlur={handleBlur}
        />  
    )
}