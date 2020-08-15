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
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles(NavStyles);

export const LeftDrawer = ({handleDrawerClose, isDrawerOpen}) => {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();

    return (
        <div className={classes.root}>
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
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem button key={uuidv4()} onClick={() => {history.push('/')}}>
                    <ListItemIcon><EqualizerIcon/></ListItemIcon>
                    <ListItemText primary={'Query Tools'} />
                </ListItem>
                <ListItem button key={uuidv4()} onClick={() => {history.push('/')}}>
                    <ListItemIcon><StorageIcon/></ListItemIcon>
                    <ListItemText primary={'Schemas'} />
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button key={uuidv4()} onClick={() => {history.push('/about')}}>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText primary={'About'} />
                </ListItem>
            </List>
        </Drawer>
        </div>
    );
}