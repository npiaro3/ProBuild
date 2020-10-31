import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ServicesColumns from './ServicesColumns';

const useStyles = makeStyles((theme) => ({
  headertext: {
    height: '20vh',
    textAlign: 'center'
  },
  spacer: {
    height: '14vh'
  }
}));

export default function Services() {
  const classes = useStyles();

  return (
    <div id="services">
        <Grid container xs={12} direction="column" alignItems="stretch" justify="center" className={classes.headertext}>
            <Typography variant="h1">Services</Typography>
        </Grid>
        <ServicesColumns/>
        <Grid container className={classes.spacer}/>
    </div>
  );
}