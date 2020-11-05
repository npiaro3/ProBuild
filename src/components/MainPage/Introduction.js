import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';


const useStyles = makeStyles((theme) => ({
    court: {
        backgroundImage: 'url("https://media.giphy.com/media/xT9DPDoWMicL4nU3NC/giphy.gif")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        width: '100vw',
        display: 'flex'
    },
    logo: {
        backgroundImage: 'url("/images/pb-logo.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 'inherit',
    },
    resizeByParent: {
        width: '100%',
        height: '100%',
    }
}));

let myTheme = createMuiTheme();
myTheme = responsiveFontSizes(myTheme);

export default function Introduction() {
    const classes = useStyles();

    return (
        <Grid container className={classes.court} direction="column" alignItems="center" justify="flex-start">
            <Grid container alignItems="center" justify="center" style={{ width: '50%', height: '30%' }}>
                <Grid container style={{ width: '25%' }}>
                    <Avatar alt="ProBuild Logo" src="/images/pb-logo.png" variant="square" className={classes.resizeByParent} />
                </Grid>
                <Grid container style={{ width: '75%' }}>
                    <ThemeProvider theme={myTheme}>
                        <Typography variant="h1" style={{ color: 'white' }} noWrap>
                            ProBuild
                    </Typography>
                    </ThemeProvider>
                </Grid>
            </Grid>
            {/*-------------------------------------------------------------------------------------------------------------*/}
            <Grid container justify="center" alignItems="center" style={{ width: '41%', height: '20%' }}>
                <Typography variant="h5" style={{ color: 'white', fontSize: "40px" }} noWrap>
                    Create The Ultimate Player
                </Typography>
            </Grid>
            {/*-------------------------------------------------------------------------------------------------------------*/}
            <Grid container style={{ width: '100%', height: '40%' }} />
            {/*-------------------------------------------------------------------------------------------------------------*/}
            <Grid container style={{ width: '10%', height: '10%' }}>
                <ExpandMoreOutlinedIcon style={{ color: 'white', fontSize: '70px', width: '100%', height: '100%' }} />
            </Grid>
        </Grid>
    );
}