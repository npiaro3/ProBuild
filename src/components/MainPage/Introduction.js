import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const useStyles = makeStyles((theme) => ({
    court: {
        backgroundImage: 'url("https://media.giphy.com/media/xT9DPDoWMicL4nU3NC/giphy.gif")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '84vh',
    },
    logo: {
        backgroundImage: 'url("/images/pb-logo.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 'inherit',
    },
    avatar: {
        width: '200px',
        height: '200px'
    }
}));

export default function Introduction() {
    const classes = useStyles();

    return (
        <Grid container className={classes.court} justify="center">
            <Grid item xs={12} />
            <Grid item xs={3} />
            <Grid container xs={6} justify="center" alignItems="center">
                <Grid item xs={3}>
                    <Avatar alt="ProBuild Logo" src="/images/pb-logo.png" variant="square" className={classes.avatar} />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h3" style={{ color: 'white', fontSize: "150px" }} noWrap>
                        ProBuild
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={3} />
            <Grid container xs={5} justify="center" alignItems="center">
                <Grid item xs={9}>
                    <Typography variant="h5" style={{ color: 'white', fontSize: "40px" }} noWrap>
                        Create The Ultimate Player
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} />
            <ExpandMoreOutlinedIcon style={{ color: 'white', fontSize: '70px' }} />
        </Grid>
    );
}