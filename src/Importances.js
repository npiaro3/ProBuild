import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ImportanceCard from "./ImportanceCard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
  },
  frank: {
    backgroundImage: 'url(/images/frank-vogel.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  aws: {
    backgroundImage: 'url(/images/aws-logo.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  jest: {
    backgroundImage: 'url(/images/jest-logo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function Importances() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.frank} />
        <ImportanceCard 
          name='Trusted'
          desc="ProBuild is used by professional coaches all around the world. 
                The application is also featured in the National Basketball 
                Association, American Basketball Association, NCAA, and EuroLeague."
        />
      </Grid>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <ImportanceCard 
          name='Scalable'
          desc="Player database is backed by Amazon Web Services
                using the DynamoDB NoSQL database. Allowing for scalability in
                player creation. The limits are endless."
        />
        <Grid item xs={false} sm={4} md={7} className={classes.aws} />
      </Grid>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.jest} />
        <ImportanceCard 
          name='Verified'
          desc="Our Application is tested using Jest for full code coverage."
        />
      </Grid>
    </React.Fragment>
  );
}