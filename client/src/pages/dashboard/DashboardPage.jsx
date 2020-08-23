import React from 'react';
import { ConnectedDashboard } from  '../../components/dashboard/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


export const DashboardPage = () => {
    // TODO: add this to redux
    const [currentDashboard, setCurrentDashboard] = React.useState('example-dashboard')
    
    const StyledSelect = withStyles((theme) => ({
        root: {
            fontSize: '12px',
            // height:'10px'
        },
        selectMenu: {
            minHeight: '10px'
        },
        outlined: {
            padding: '5px'
        }
    }))(Select);

    let history = useHistory();
    const handleAddChart = () => {
        history.push('/queryTool');
    }
    

    return (
        <div style={{height:'100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%', padding:'10px'}}>
                <StyledSelect
                    id="dashboard-select"
                    value={currentDashboard}
                    onChange={e => {setCurrentDashboard(e.target.value)}}
                    // label="Age"
                    variant='outlined'
                >
                    <MenuItem value={'example-dashboard'}>Example Dashboard</MenuItem>
                </StyledSelect>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {handleAddChart()}}
                    endIcon={<AddIcon />}
                    disableRipple
                >
                    Add chart
                </Button>
            </div>
            <ConnectedDashboard/>
        </div>
    )
}