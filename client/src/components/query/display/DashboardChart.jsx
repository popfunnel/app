import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { SimpleBar } from './SimpleBar'
import { SimpleLine } from './SimpleLine'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {destroyChart, refreshDashboardInfo, updateDashboardChart} from '../../../actions/dashboard';
import { openSnackbarWithMessage } from '../../../actions/snackbar';

import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

import { EditableChartTitle } from '../input/EditableChartTitle'
    
const StyledMenuItem = withStyles((theme) => ({
    root: {
        fontSize: '15px',
    },
}))(MenuItem);

const initialState = {
    mouseX: null,
    mouseY: null,
};

const useStyles = makeStyles((theme) => ({
    chartTitle: {
        padding: '5px',
        paddingLeft: '20px',
        color: 'black'
    }
}));

const DashboardChart = ({ seriesType, chartId, name,
    config, currentDashboardId, refreshDashboardInfo,
    openSnackbarWithMessage, updateDashboardChart }) => {

    const classes = useStyles();
    const [mousePosition, setMousePosition] = React.useState(initialState);
    const [isHovering, setIsHovering] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false);
    const [chartName, setChartName] = React.useState(name);

    const inputRef = React.useRef(null)
    React.useEffect(() => {
        if (isEditing) inputRef.current.select()
    }, [isEditing])

    const handleContextMenu = (event) => {
        event.preventDefault();
        setMousePosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setMousePosition(initialState);
    };

    const handleDelete = async () => {
        destroyChart(chartId)
        .then(() => {
            refreshDashboardInfo(currentDashboardId)
            .then(() => {
                openSnackbarWithMessage('Chart deleted.');
            })
            .catch(error => {
                openSnackbarWithMessage(`${error}`);
            })
        })
        .catch(error => {
            openSnackbarWithMessage(`${error}`);
        })
    }

    // TODO: enter key should result in blur
    // TODO: double click should enable editable field
    const handleTitleUpdate = async (chartId, chartName) => {
        console.log('chartname to be updated is', chartName)
        console.log('chartname is currently', name)
        if (!chartName.length) {
            openSnackbarWithMessage('Chart title cannot be empty.');
            setChartName(name)
        } else if (chartName !== name) {
            updateDashboardChart(chartId, chartName)
            .then(() => {
                openSnackbarWithMessage('Chart title updated.');
            })
            .catch(error => {
                openSnackbarWithMessage(`${error}`);
            })
        }
    }

    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;

    const getChartTitle = () => (
        <div className={`${name ? classes.chartTitle : undefined}`}>
            {isEditing ?
            <EditableChartTitle
                inputRef={inputRef}
                handleChange={e => {
                    setChartName(e.target.value)
                }}
                error={false}
                value={chartName}
                handleClick={e => {
                }}
                handleBlur={() => {
                    setIsEditing(false)
                    handleTitleUpdate(chartId, chartName)
                }}
                size={"small"}
                handleKeyDown={e => {
                    if (e.keyCode === 13) {
                        inputRef.current.blur()
                    }
                }}
            /> : 
            <Typography style={{paddingLeft: '2px'}} variant="subtitle2" display="block">{chartName}</Typography>}
        </div>
    )

    const getContextMenu = () => (
        <Menu
            keepMounted
            open={mousePosition.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                mousePosition.mouseY !== null && mousePosition.mouseX !== null
                ? { top: mousePosition.mouseY, left: mousePosition.mouseX }
                : undefined
            }
        >
            <StyledMenuItem onClick={handleClose}>Edit</StyledMenuItem>
            <StyledMenuItem onClick={handleDelete}>Delete</StyledMenuItem>
        </Menu>
    )

    const getChartComponent = () => {
        if (seriesType === 'Bar') {
            return <SimpleBar config={config} colors={colors}/> ;
        } else if (seriesType === 'Line') {
            return <SimpleLine config={config} colors={colors}/>;
        }
    }

    const handleEditButton = () => {
        setIsEditing(true)
    };

    const getEditButton = () => {
        return (
            <>
                {isHovering &&
                <IconButton
                    style={{position: 'absolute', top: '3px', right: '10px'}}
                    onClick={handleEditButton}
                    size='small'
                    disableRipple>
                    <EditIcon fontSize='small' />
                </IconButton> }
            </>
        )
    }

    return (
        <Paper
            style={{height:'100%', width:'100%', position: 'relative' }}
            onContextMenu={handleContextMenu}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {getEditButton()}
            {getChartTitle()}
            {getChartComponent()}
            {getContextMenu()}
        </Paper>
    )
};

const mapStateToProps = (state) => {
    return {
        currentDashboardId: state.dashboard.currentDashboard.id
    };
}

const mapDispatchToProps = {
    refreshDashboardInfo,
    openSnackbarWithMessage,
    updateDashboardChart
};

export const ConnectedDashboardChart = connect(mapStateToProps, mapDispatchToProps)(DashboardChart);