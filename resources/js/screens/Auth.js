import React from 'react';
import { Grid, Card, Typography, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


import CCLogo from "../../../public/img/cc_logo_medium.png";


const style = theme => ({
    authContaner:{
        minHeight: '100vh',
        backgroundColor: '#f5f6f8'
    },
    welcomeText:{
        color: '#a6a6a6',
        fontWeight: 400,
        paddingBottom: theme.spacing(1)
    },
    card:{
        padding: theme.spacing(4)
    },
    generalText:{
        textAlign: 'center'
    },
    continueBtn:{
        textTransform: 'none'
    }
});

function Auth({ classes }){
    return (
        <Grid container direction="column" justify="space-around" alignItems="center" className={classes.authContaner}>
            <Grid item>
                <img src={CCLogo} height={130} alt="COGNITIVE CREATORS" />
            </Grid>
            <Grid item>
                <Card variant="outlined" className={classes.card}>
                    <Grid container direction="column" justify="space-around" alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography variant="h4" className={classes.welcomeText}>
                                Welcome!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Please fill in your email address
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.continueBtn}>Continue</Button>
                        </Grid>
                        
                        <Grid item>
                            <Typography className={classes.generalText}>
                                Don't have an account yet?<br />
                                You can create one in the next step.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item>
                
            </Grid>
        </Grid>
)};

export default withStyles(style)(Auth);