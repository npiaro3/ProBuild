import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    alignItems: 'center',
    background: "#2b2b2b",
    textTransform: 'uppercase'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
        <Typography variant="h3">
            ProBuild
        </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}