import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from "./InfoCard";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '70vh',
        width: '100vw'
    },
    frank: {
        backgroundImage: 'url(/images/frank-vogel.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '50%',
        height: '100%'
    },
    aws: {
        backgroundImage: 'url(/images/aws-logo.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '50%',
        height: '100%'
    },
    jest: {
        backgroundImage: 'url(/images/jest-logo.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '50%',
        height: '100%'
    },
}));

export default function Importances() {
    const classes = useStyles();

    return (
        <div id="importances">
            <Grid container component="main" className={classes.root}>
                <Grid container className={classes.frank} />
                <InfoCard
                    name='Trusted'
                    desc="ProBuild is used by professional coaches all around the world. 
                            The application is also featured in the National Basketball 
                            Association, American Basketball Association, NCAA, and EuroLeague."
                />
            </Grid>
            <Grid container component="main" className={classes.root}>
                <InfoCard
                    name='Scalable'
                    desc="Player database is backed by Amazon Web Services
                            using the DynamoDB NoSQL database. Allowing for scalability in
                            player creation. The limits are endless."
                />
                <Grid container className={classes.aws} />
            </Grid>
            <Grid container component="main" className={classes.root}>
                <Grid container className={classes.jest} />
                <InfoCard
                    name='Verified'
                    desc="Our Application is tested using Jest for full code coverage."
                />
            </Grid>
        </div>
    );
}