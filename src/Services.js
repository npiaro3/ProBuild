import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60vh'
  },
  icon: {
    fontSize: '160px'
  },
  child : {
      height: '100%'
  },
  headtext: {
      align: 'center'
  },
  desc: {
    align: 'center'
  }
}));

export default function Services() {
  const classes = useStyles();

  return (
    <div>
        <Grid container xs={12} alignItems="center" justify="center">
            <Typography variant="h6">Services</Typography>
        </Grid>
        <Grid container xs={12} className={classes.root} alignItems="center" justify="center" >
            <Grid item xs={2} direction="column" alignItems="center" justify="center" className={classes.child} container>
                <Grid item xs={4}>
                    <VisibilityOutlinedIcon className={classes.icon}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2" className={classes.headtext}>View</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.desc}>
                        Able to look at existing play profiles. Ability to search for specific players.
                    </Typography>
                </Grid>
            </Grid>
            <Grid  item xs={2} direction="column" alignItems="center" justify="center" className={classes.child} container>
                <Grid item xs={4}>
                    <PersonAddOutlinedIcon className={classes.icon}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2" className={classes.headtext}>Add</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.desc}></Typography>
                </Grid>
            </Grid>
            <Grid item xs={2} direction="column" alignItems="center" justify="center" className={classes.child} container>
                <Grid item xs={4}>
                    <EditOutlinedIcon className={classes.icon}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2" className={classes.headtext}>Edit</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.desc}></Typography>
                </Grid>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    </div>
  );
}