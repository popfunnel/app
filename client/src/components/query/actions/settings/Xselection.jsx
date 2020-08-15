import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
    },
    formLabelHeader: {
        fontSize: '12px',
        minHeight:'30px'
    },
    formLabel: {
        display: 'flex',
        justifyContent: 'flexStart',
        alignItems:'center',
        fontSize: '12px',
        minHeight:'42px'
    }
}));



export const Xselection = ({queryResults}) => {
    const classes = useStyles();
    const [xSelection, setXSelection] = React.useState('bear');

    const handleChange = (event) => {
        setXSelection(event.target.value)
    };

    return (
        <div>
            <FormControl required component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">X Axis</FormLabel></div>
                <RadioGroup aria-label="gender" name="gender1" value={xSelection} onChange={handleChange}>
                    <Radio value="cat" />
                    <Radio value="dog" />
                    <Radio value="bear" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};