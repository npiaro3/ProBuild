import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '70vh',
        width: '50%',
        background: '#F9D9B9'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginBottom: theme.spacing(5),
        width: '100%',
        height: '100%'
    }
}));

export default function InfoCard(props) {
    const classes = useStyles();
    const { name, desc, isIcon } = props;

    return (
        <Grid
            container
            component={Paper}
            elevation={8}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
            square
        >
            <Grid container style={{ width: '50%', height: '20%' }}>
                <Typography variant="h2" className={classes.title} gutterBottom>
                    {name}
                </Typography>
            </Grid>
            <Grid container style={{ width: '70%' }}>
                <Typography variant="h5" style={{ width: '100%', height: '100%' }}>
                    {desc}
                </Typography>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{ height: '20%' }}>
                {isIcon ? <ArrowForwardIosOutlinedIcon /> : null}
            </Grid>
        </Grid>
    );
}