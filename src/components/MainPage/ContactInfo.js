import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    headertext: {
        height: '20vh',
        textAlign: 'center'
    },
    spacer: {
        height: '14vh'
    },
    map: {
        backgroundImage: 'url(/images/map.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    root: {
        height: '50vh',
        width: '100vw'
    },
    subheader: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
    },
    subheader2: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(1),
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(.5),
            width: 270,
        },
    },
}));

export default function ContactInfo() {
    const classes = useStyles();

    return (
        <div id="contact info">
            <Grid container xs={12} direction="column" alignItems="stretch" justify="center" className={classes.headertext}>
                <Typography variant="h1">Contact Info</Typography>
            </Grid>
            <Grid container xs={12} className={classes.root} justify="center">
                <Grid container xs={4} className={classes.map} />
                <Grid container xs={4} component={Paper} elevation={7} alignItems="stretch" justify="flex-start">
                    <Grid container xs={6} alignItems="stretch" justify="flex-start"> {/*left hand side of paper comp */}
                        <Grid item xs={1} />
                        <Grid item xs={10} alignItems="flex-start" justify="center">
                            <Typography variant="h6" className={classes.subheader}>
                                Head Office
                            </Typography>
                            <Typography variant="body1">
                                903 N La Cienega Blvd, West Hollywood, CA 90069-4709
                            </Typography>
                            <Typography variant="body1">
                                {"---------------------------------------------"}
                            </Typography>
                            <Typography variant="body1">
                                npiaro3@gatech.edu
                            </Typography>
                            <Typography variant="body1">
                                Tel: 123-456-7890
                            </Typography>
                            <Typography variant="h6" className={classes.subheader}>
                                Inquiries
                            </Typography>
                            <Typography variant="body1">
                                For any inquiries, questions or commendations, please call our
                                head office at 123-456-7890 or fill out the form to the right.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container xs={6} alignItems="stretch" justify="flex-start"> {/*right hand side of paper comp */}
                        <Grid item xs={10} alignItems="flex-start" justify="center">
                            <Typography variant="h6" className={classes.subheader2}>
                                Contact Us
                            </Typography>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField title="First Name" label="First Name" variant="outlined" />
                                <TextField title="Last Name" label="Last Name" variant="outlined" />
                                <TextField title="Email" label="Email" variant="outlined" />
                                <TextField
                                    title="Message"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    placeholder="Write inquiry here"
                                    variant="outlined"
                                />
                                <Button title="button" variant="contained" style={{ color: "#B30025" }} >Submit</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.spacer} />
        </div>
    );
}