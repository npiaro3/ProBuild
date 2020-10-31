import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url("/images/basketball-court.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '84vh',
  }
}));

export default function Introduction() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.image}>
      <CssBaseline />
    </Grid>
  );
}