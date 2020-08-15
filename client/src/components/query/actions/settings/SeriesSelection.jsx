import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'row'
    },
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

export const SeriesSelection = ({queryResults}) => {
    const classes = useStyles();
    const [seriesSelections, setSeriesSelections] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setSeriesSelections(prevState => {
            return {
                ...prevState,
                [event.target.name] : event.target.checked
            }
        });
    };

    const { gilad, jason, antoine } = seriesSelections;

    return (
        <div>
            <FormControl required component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">Series</FormLabel></div>
                <FormGroup>
                    <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                    <Checkbox checked={jason} onChange={handleChange} name="jason" />
                    <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                </FormGroup>
            </FormControl>
        </div>
    );
};