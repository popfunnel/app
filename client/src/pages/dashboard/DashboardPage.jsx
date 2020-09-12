import React from 'react';
import { ConnectedDashboard } from  '../../components/dashboard/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';


export const DashboardPage = () => {
    // TODO: add this to redux
    let history = useHistory();
    const [currentDashboard, setCurrentDashboard] = React.useState('example-dashboard1')
    
    // TODO: read about MUI component customization
    // https://material-ui.com/customization/components/
    const StyledSelect = withStyles((theme) => ({
        root: {
            fontSize: '15px',
        },
        outlined: {
            padding: '10px'
        }
    }))(Select);
    
    
    const handleAddChart = () => {
        history.push('/queryTool');
    }
    
    
    return (
        <div style={{height:'100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%', padding:'10px'}}>
                <ButtonGroup>
                    <StyledSelect
                        id="dashboard-select"
                        value={currentDashboard}
                        onChange={e => {setCurrentDashboard(e.target.value)}}
                        variant='outlined'
                        >
                        <MenuItem value={'example-dashboard1'}>very-long-dashboard-name</MenuItem>
                        <MenuItem value={'example-dashboard2'}>shorter-dashboard-name</MenuItem>
                    </StyledSelect>
                    {/* TODO: https://material-ui.com/components/dialogs/ */}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {handleAddChart()}}
                        endIcon={<AddIcon />}
                        disableRipple
                        />
                </ButtonGroup>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {handleAddChart()}}
                    endIcon={<AddIcon/>}
                    disableRipple
                >
                    Add chart
                </Button>
            </div>
            <ConnectedDashboard/>
        </div>
    )
};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {

};

export const ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps);