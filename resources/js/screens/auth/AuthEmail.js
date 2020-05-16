import React from 'react';
import { Grid, Typography, Button} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { BootstrapTextField } from "../../components";

const style = theme => ({
    welcomeText:{
        color: '#a6a6a6',
        fontWeight: 400,
        paddingBottom: theme.spacing(1),
        textAlign: 'center'
    },
    generalText:{
        textAlign: 'center'
    },
    continueBtn:{
        textTransform: 'none'
    },
    inputLabel:{
        transformOrigin: '85%'
    }
});

function AuthEmail({ classes, onSubmit }){
    const { handleSubmit, register, errors } = useForm();

    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4" className={classes.welcomeText}>
                    Welcome!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <BootstrapTextField 
                                name="email" 
                                label="Please fill in your email address"
                                InputLabelProps={{className:classes.inputLabel}}
                                fullWidth 
                                error={!!errors.email}
                                helperText={errors.email?errors.email.message:null}
                                inputProps={{ref: register({
                                    required: "Required field",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid email address"
                                    }
                                    })}}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.continueBtn}>Continue</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.generalText}>
                    Don't have an account yet?<br />
                    You can create one in the next step.
                </Typography>
            </Grid>
        </Grid>
       
)};

export default withStyles(style)(AuthEmail);