import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '160px'
  },
  center: {
    textAlign: 'center'
  }
}));

export default function ServicesColumns() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} alignItems="stretch" justify="space-evenly" >
        <Grid item xs={1}/>
        <Grid item xs={3} direction="column" alignItems="center" justify="space-evenly" container>
            <Grid item xs={3} className={classes.center} justify="center" alignItems="center" container>
                <VisibilityOutlinedIcon className={classes.icon}/>
            </Grid>
            <Grid item xs={3} className={classes.center} justify="center" alignItems="center" container>
                <Typography variant="h2" >View</Typography>
            </Grid>
            <Grid item xs={3} justify="center" alignItems="flex-start" container>
                <Typography variant="body1" >
                    Able to look at existing play profiles. Ability to search for specific players. 
                </Typography>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
        <Grid  item xs={3} direction="column" alignItems="center" justify="space-evenly" container>
            <Grid item xs={3} className={classes.center} justify="center" alignItems="center" container>
                <PersonAddOutlinedIcon className={classes.icon}/>
            </Grid>
            <Grid item xs={3} className={classes.center} justify="center" alignItems="center" container>
                <Typography variant="h2" >Add</Typography>
            </Grid>
            <Grid item xs={3} justify="center" alignItems="flex-start" container>
                <Typography variant="body1" >
                    Able to look at existing play profiles. Ability to search for specific players.
                </Typography>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
        <Grid item xs={3} direction="column" alignItems="center" justify="space-evenly" container>
            <Grid item xs={3} className={classes.center} justify="center" alignItems="center" container>
                <EditOutlinedIcon className={classes.icon}/>
            </Grid>
            <Grid item xs={3} className={classes.center} justify="center" alignItems="center" container>
                <Typography variant="h2" >Edit</Typography>
            </Grid>
            <Grid item xs={3} justify="center" alignItems="flex-start" container>
                <Typography variant="body1" >
                    Able to look at existing play profiles. Ability to search for specific players.
                </Typography>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
        <Grid item xs={1}/>
    </Grid>
  );
}