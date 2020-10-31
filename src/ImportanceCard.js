import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F9D9B9'
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
}));

export default function ImportanceCard(props) {
    const classes = useStyles();
    const {name, desc} = props;
  
    return (
    <Grid container xs={12} sm={8} md={5} component={Paper} elevation={8} className={classes.card} square>
        <Grid item/>
        <div className={classes.paper}>
            <Grid item xs={8}>
            <Typography variant="h2" className={classes.title} gutterBottom>
                {name}
            </Typography>
            <Typography variant="h5">
                {desc}
            </Typography>
            </Grid>
        </div>
    </Grid>
    );
  }