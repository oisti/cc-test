import React, { useState } from 'react';
import { Grid, Typography, Button, Link } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { BootstrapTextField, api} from "../../components";
import { AUTH_LOGIN } from '../../store/authStore';

const style = theme => ({
    welcomeText:{
        color: '#000',
        fontWeight: 400,
        textAlign: 'center'
    },
    generalText:{
        textAlign: 'center'
    },
    emailText:{
        textAlign: 'center',
        color: '#a6a6a6'
    },
    continueBtn:{
        textTransform: 'none'
    },
    generalForgot:{
        color: '#18218c'
    },
});

function AuthNamePassword({ classes, email }){
    const { handleSubmit, register, errors, setError  } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const registerUser = values => {
        api.post('register', {
            email,
            ...values
        }).then(response => {
           dispatch({type: AUTH_LOGIN, payload: response.data.data})
           history.push("/");  
        }).catch(error => {
            if (error.data && error.data.errors){
                if (error.data.errors.password){
                    setError("password_confirmation", "notMatch", error.data.errors.password[0]);
                }
            }
        });
    }

    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6" className={classes.welcomeText}>
                    Looks like you don't have a CC account
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.emailText}>
                    {email}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.generalText}>
                    
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(registerUser)}>
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <BootstrapTextField 
                                name="name" 
                                label="Enter your Name" 
                                fullWidth 
                                error={!!errors.name}
                                helperText={errors.name?errors.name.message:null}
                                inputProps={{
                                    ref: register({
                                        required: "Required field",
                                    }),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <BootstrapTextField 
                                name="password" 
                                label="Password" 
                                fullWidth 
                                error={!!errors.password}
                                helperText={errors.password?errors.password.message:null}
                                inputProps={{
                                    ref: register({
                                        required: "Required field",
                                    }),
                                type:'password'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <BootstrapTextField 
                                name="password_confirmation" 
                                label="Password again"
                                fullWidth 
                                error={!!errors.password_confirmation}
                                helperText={errors.password_confirmation?errors.password_confirmation.message:null}
                                inputProps={{
                                    ref: register({
                                        required: "Required field",
                                    }),
                                type:'password'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.continueBtn}>Continue</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="#" className={classes.generalForgot}>Forgot password?</Link>
                        </Grid>
                        
                    </Grid>
                </form>
            </Grid>
        </Grid>
       
)};

export default withStyles(style)(AuthNamePassword);