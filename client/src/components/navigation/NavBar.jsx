import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LeftDrawer } from './LeftDrawer';
import { NavStyles } from './NavStyles';

const useStyles = makeStyles(NavStyles);
  
export const NavBar = (props) => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(
                    classes.appBar,
                    {
                        [classes.appBarShift]: isDrawerOpen,
                    }
                )}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: isDrawerOpen,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        db-visuals
                    </Typography>
                </Toolbar>
            </AppBar>
            <LeftDrawer
                isDrawerOpen= {isDrawerOpen}
                handleDrawerClose={handleDrawerClose}
            />
            <div className={classes.content}>
                <div style={{minHeight:'64px'}}/>
                <div style={{flexGrow:1}}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
