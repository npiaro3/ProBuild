import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from "./InfoCard";
import ImageButton from "./ImageButton"


const useStyles = makeStyles((theme) => ({
    root: {
        height: '70vh',
    }
}));

export default function GetStarted() {
    const classes = useStyles();

    return (
        <div id="get-started">
            <Grid container component="main" className={classes.root}>
                <InfoCard
                    name='Ready to Start?'
                    desc="Get ready to view the player database, edit player attributes, and take part of an application destined for greatness!"
                    isIcon={true}
                />
                <Grid item xs={false} sm={4} md={7}>
                    <ImageButton
                        url='/images/coaching.jpg'
                        title='View Player Database' />
                </Grid>
            </Grid>
        </div>
    );
}