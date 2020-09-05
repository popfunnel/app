import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ConnectedLeftDrawer } from './LeftDrawer';
import { NavStyles } from './NavStyles';
import { connect } from 'react-redux'
import { setDrawerOpenStatus } from '../../actions/nav';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(NavStyles);

const NavBar = ({children, isDrawerOpen, setDrawerOpenStatus}) => {
    const classes = useStyles();
    let history = useHistory();
    
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
                        onClick={() => setDrawerOpenStatus(true)}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: isDrawerOpen,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        popfunnel
                    </Typography>
                    <div style={{flex:1}}/>
                    <Button
                        color='secondary'
                        disableRipple
                        onClick={() => history.push('/logout')}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <ConnectedLeftDrawer/>
            <div className={classes.content}>
                <div style={{minHeight:'64px'}}/>
                <div style={{flex:1}}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isDrawerOpen: state.nav.isDrawerOpen
    }
};


const mapDispatchToProps = {
    setDrawerOpenStatus
};

export const ConnectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
