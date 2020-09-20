import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavStyles } from './NavStyles'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// import StorageIcon from '@material-ui/icons/Storage';
import { connect } from 'react-redux'
import { setDrawerOpenStatus } from '../../actions/nav';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import Collapse from '@material-ui/core/Collapse';
// import { SchemaTreeView } from './SchemaTreeView';
import { setSchemaDropdownStatus } from '../../actions/nav';
// import { setSchemaDropdownStatus } from '../../actions/nav';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import { getCurrentDashboardId } from '../../actions/dashboard';

const useStyles = makeStyles(NavStyles);

export const LeftDrawer = ({isDrawerOpen, setDrawerOpenStatus, isSchemaDropdownOpen, setSchemaDropdownStatus, currentDashboardId}) => {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();

    // TODO: add schema tree view in additional drawer expansion
    // TODO: add profile button with dropdown
    const getDashboardRoute = () => {
        history.push(`/dashboard/${currentDashboardId}`);
    };
    
    return (
        <>
            <CssBaseline />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isDrawerOpen,
                    [classes.drawerClose]: !isDrawerOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isDrawerOpen,
                        [classes.drawerClose]: !isDrawerOpen,
                    }),
                }}
            >
                <div className={classes.leftToolbar}>
                    <IconButton
                        onClick={() => {
                            setSchemaDropdownStatus(false);
                            setDrawerOpenStatus(false);
                        }}
                    >
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider/>
                <List >
                    <ListItem key={uuidv4()} button disableRipple  onClick={() => {history.push('/queryTool')}}>
                        <ListItemIcon><EqualizerIcon/></ListItemIcon>
                        <ListItemText classes={{primary: classes.listItemText}} primary={'Charts'} />
                    </ListItem>
                    {/* <ListItem
                        button
                        disableRipple
                        onClick={() => {
                            setDrawerOpenStatus(true);
                            setSchemaDropdownStatus(!isSchemaDropdownOpen);
                        }}
                    >
                        <ListItemIcon>
                            <StorageIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Schemas" />
                        {isSchemaDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isSchemaDropdownOpen} timeout="auto" unmountOnExit>
                        <SchemaTreeView/>
                    </Collapse> */}
                    <ListItem key={uuidv4()} button disableRipple onClick={() => {getDashboardRoute()}}>
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText classes={{primary: classes.listItemText}} primary={'Dashboards'} />
                    </ListItem>
                    <ListItem key={uuidv4()} button disableRipple onClick={() => {history.push('/info')}}>
                        <ListItemIcon><SlideshowIcon/></ListItemIcon>
                        <ListItemText classes={{primary: classes.listItemText}} primary={'Slides'} />
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem key={uuidv4()} button disableRipple onClick={() => {history.push('/info')}}>
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText classes={{primary: classes.listItemText}} primary={'Settings'} />
                    </ListItem>
                    <ListItem key={uuidv4()} button disableRipple onClick={() => {history.push('/info')}}>
                        <ListItemIcon><InfoIcon/></ListItemIcon>
                        <ListItemText classes={{primary: classes.listItemText}} primary={'Info'} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        currentDashboardId: getCurrentDashboardId(state),
        isDrawerOpen: state.nav.isDrawerOpen,
        isSchemaDropdownOpen: state.nav.isSchemaDropdownOpen
    }
};


const mapDispatchToProps = {
    setDrawerOpenStatus,
    setSchemaDropdownStatus
};

export const ConnectedLeftDrawer = connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);