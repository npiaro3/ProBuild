import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    headertext: {
        height: '20vh',
        textAlign: 'center'
    },
    spacer: {
        height: '14vh'
    },
    map: {
        backgroundImage: 'url(/images/map.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    root: {
        height: '40vh',
        width: '100vw'
    }
}));

export default function ContactInfo() {
    const classes = useStyles();

    return (
        <div id="contact info">
            <Grid container xs={12} direction="column" alignItems="stretch" justify="center" className={classes.headertext}>
                <Typography variant="h1">Contact Info</Typography>
            </Grid>
            <Grid container xs={12} className={classes.root} justify="center">
                <Grid container xs={4} className={classes.map} />
                <Grid container xs={4} component={Paper} elevation={7}>

                </Grid>
            </Grid>
            <Grid container className={classes.spacer} />
        </div>
    );
}