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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavStyles } from './NavStyles'
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(NavStyles);

export const LeftDrawer = ({handleDrawerClose, isDrawerOpen}) => {
    const classes = useStyles();
    const theme = useTheme();

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
            <Divider />
            <List>
                {['Dashboard', 'Query Tool', 'Dashboards', 'Preferences'].map((text, index) => (
                    <ListItem button key={uuidv4()}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Placeholder', 'Placeholder', 'Placeholder'].map((text, index) => (
                    <ListItem button key={uuidv4()}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
        </div>
    );
}