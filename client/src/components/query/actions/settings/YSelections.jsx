import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'

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

const YSelections = ({queryResults}) => {
    const classes = useStyles();
    const [ySelections, setYSelections] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setYSelections(prevState => {
            return {
                ...prevState,
                [event.target.name] : event.target.checked
            }
        });
    };

    const { gilad, jason, antoine } = ySelections;

    return (
        <div>
            <FormControl required component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">Y Axis</FormLabel></div>
                <FormGroup>
                    <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                    <Checkbox checked={jason} onChange={handleChange} name="jason" />
                    <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                </FormGroup>
            </FormControl>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        queryResults: state.query.rawResults,
        columnNames: state.chart.columnNames
    }
}

const mapDispatchToProps = {};

export const ConnectedYSelections = connect(mapStateToProps, mapDispatchToProps)(YSelections);