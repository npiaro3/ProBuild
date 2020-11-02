import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DataTable from './DataTable';

// const { TblContainer } = UseTable();
const styles = makeStyles((theme) => ({
    root: {
        height: '90vh',
    },
    test: {
        background: 'blue'
    },
    header: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
        textAlign: 'center'
    },
    table: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(10),
    }
}));

export default function DatabasePageLayout() {
    const classes = styles();
    return (
        <React.Fragment>
            <Grid xs={12} container direction="row" justify="center" alignItems="stretch" className={classes.root}>
                <Grid container xs={7} alignItems="stretch" justify="flex-start">
                    <Grid container xs={12} elevation={7} alignItems="flex-start">
                        <Grid item xs={12} style={{ height: '500px' }}>
                            <Typography variant="h2" className={classes.header}>
                                Player Database
                            </Typography>


                            {/*Put use Data Table Component Here!*/}
                            <DataTable />



                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>

            </div>
        </React.Fragment>
    );

}