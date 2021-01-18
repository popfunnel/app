import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    largeTitle: {
        height: '25px'
    },
    smallTitle: inputWidth => ({
        width: `calc(${inputWidth}px + 12px)`,
        height: '21px',
        maxWidth: '375px',
        minWidth: '5px',
        border: '2px solid #1a73e8',
        borderRadius: '4px'
    })
});

export const EditableChartTitle = ({handleChange, placeholder, error = false, value, handleClick, handleBlur, handleKeyDown, size = 'large', inputRef}) => {
    const [inputWidth, setInputWidth] = React.useState(getTextWidth(value, `500 0.875rem/1.57 "Roboto", "Helvetica", "Arial", sans-serif`));
    const classes = useStyles(inputWidth);

    return (
        <InputBase
            id='chart-name'
            className={`${size === 'small' ? classes.smallTitle : classes.largeTitle} notDraggable`}
            label='Chart Name'
            value={value}
            placeholder={placeholder}
            onChange={e => {
                handleChange(e)
                setInputWidth(getTextWidth(e.target.value, `500 0.875rem/1.57 "Roboto", "Helvetica", "Arial", sans-serif`))
            }}
            onKeyDown={handleKeyDown}
            error={error}
            inputProps={{
                style: {
                    fontSize: size === 'small' ? '0.875rem' : '17px',
                    lineHeight: '1.57',
                    height: '21px',
                    padding: '0px',
                }
            }}
            inputRef={inputRef}
            onClick={handleClick}
            onBlur={handleBlur}
        />  
    )
}

function getTextWidth(text, font) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const textMetrics = context.measureText(text);
    return textMetrics.width;
}