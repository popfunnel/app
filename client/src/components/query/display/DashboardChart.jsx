import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { SimpleBar } from './SimpleBar'
import { SimpleLine } from './SimpleLine'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {destroyChart, refreshDashboardInfo} from '../../../actions/dashboard';
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
    },
    chartTitlePlaceholder: {
        padding: '10px',
        paddingLeft: '20px',
        color: '#C0C0C0'
    }
}));

const DashboardChart = ({ seriesType, chartId, name,
    config, currentDashboardId, refreshDashboardInfo,
    openSnackbarWithMessage }) => {

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
    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;

    const getChartTitle = () => (
        <div className={`${name ? classes.chartTitle : 'blah'} notDraggable`}>
            {/* {isEditing ?
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
                    //save chart
                }}
                size={"small"}
            /> : <Typography variant="subtitle2" display="block">{name}</Typography>} */}
            <Typography variant="subtitle2" display="block">{name}</Typography>
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

    // TODO: make this edit button functional
    // TODO: add fade in and out animations
    // TODO: think about edit button functionality 
    // TODO: use clsx to add dynamic styles (border around edit input)
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
    openSnackbarWithMessage
};

export const ConnectedDashboardChart = connect(mapStateToProps, mapDispatchToProps)(DashboardChart);