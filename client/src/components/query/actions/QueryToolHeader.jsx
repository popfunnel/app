import React from 'react';
import { connect } from 'react-redux'

import { openSnackbarWithMessage } from '../../../actions/snackbar';
import { saveChart } from '../../../actions/queryTool';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     button: {
//         marginRight: '24px'
//     }
// }));

export const QueryToolHeader = ({saveChart, openSnackbarWithMessage, rawResults, seriesType}) => {
    // const classes = useStyles();
    let history = useHistory();
    const [chartName, setChartName] = React.useState('');
    const [chartNameHasError, setChartNameHasError] = React.useState(false);
    const validateChartName = () => {
        // TODO: ensure a chart has been created
        // TODO: support multiple snackbars
            // Reference: https://material-ui.com/components/snackbars/
        if (!chartName.length) {
            setChartNameHasError(true);
            openSnackbarWithMessage(`Chart Name cannot be empty.`);
            return false;
        } else if (!rawResults.length || seriesType === 'Table') {
            setChartNameHasError(true);
            openSnackbarWithMessage('Please create a chart before saving.');
        } else {
            return true;
        }
    }

    return (
        <div style={{height: '60px', boxShadow: '0 4px 5px -2px black', fontSize: '12px'}}>
            <div style={{height: '100%', display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display:'flex', flexDirection: 'column', margin: '10px'}}>
                    <div>[popfunnel demo] / Query Editor</div>
                    <InputBase
                        id='chart-name'
                        label='Chart Name'
                        value={chartName}
                        placeholder='Untitled Chart'
                        onChange={e => {
                            setChartNameHasError(false);
                            setChartName(e.target.value)
                        }}
                        error={chartNameHasError}
                        inputProps={{
                            style: {
                                fontSize: '20px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }
                        }}
                    />  
                </div>
                <div style={{marginRight: '24px'}}>
                    {/* TODO: cancel button */}
                    <Button
                        color='secondary'
                        disabled
                        onClick={() => {
                            // TODO: reset query tool
                        }}
                        disableRipple
                    >
                        Cancel
                    </Button>
                    <Button
                        color='secondary'
                        onClick={() => {
                            if (validateChartName()) {
                                saveChart(chartName)
                                .then(() => {
                                    history.push('/dashboard');
                                })
                                .catch(error => {
                                    openSnackbarWithMessage(`${error}`);
                                });
                            }
                        }}
                        disableRipple
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        rawResults: state.query.rawResults,
        seriesType: state.chart.seriesType
    };
};

const mapDispatchToProps = {
    openSnackbarWithMessage,
    saveChart
};


export const ConnectedQueryToolHeader = connect(mapStateToProps, mapDispatchToProps)(QueryToolHeader);