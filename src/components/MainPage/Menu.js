import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        background: "#2b2b2b",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        background: "#2b2b2b",
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));

export default function Menu() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar alt="ProBuild Logo" src="/images/pb-logo.png" variant="square" />
                    <Typography variant="h3" noWrap>
                        ProBuild
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/database" className={classes.link}>
                        <ListItem button key='View Player Database'>
                            <ListItemIcon>
                                <PageviewOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='View Player Database' />
                        </ListItem>
                    </Link>

                    <ScrollLink
                        activeClass="active"
                        to="services"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <ListItem button key='Services'>
                            <ListItemIcon>
                                <ListAltOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Services' />
                        </ListItem>
                    </ScrollLink>

                    <ScrollLink
                        activeClass="active"
                        to="importances"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <ListItem button key='Why Choose Us?'>
                            <ListItemIcon>
                                <HelpOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Why Choose Us?' />
                        </ListItem>
                    </ScrollLink>

                    <ScrollLink
                        activeClass="active"
                        to="get-started"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <ListItem button key='Get Started'>
                            <ListItemIcon>
                                <KeyboardArrowRightOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Get Started' />
                        </ListItem>
                    </ScrollLink>
                </List>
                <Divider />
                <List>
                    <ScrollLink
                        activeClass="active"
                        to="contact info"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <ListItem button key='Contact Info'>
                            <ListItemIcon>
                                <PhoneOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Contact Info' />
                        </ListItem>
                    </ScrollLink>
                </List>
            </Drawer>
        </div>
    );
}