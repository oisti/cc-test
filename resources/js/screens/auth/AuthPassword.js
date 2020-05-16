import React from 'react';
import { Grid, Typography, Button, Link } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { BootstrapTextField, api } from "../../components";
import { useDispatch } from 'react-redux'
import { AUTH_LOGIN } from '../../store/authStore';

const style = theme => ({
    welcomeText:{
        color: '#000',
        fontWeight: 400,
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
    inputLabel:{
        transformOrigin: '85%'
    }
});

function AuthPassword({ classes, email }){
    const { handleSubmit, register, errors, setError } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const loginUser = values => {
        api.post('login', {
            email,
            password: values.password
        }).then(response => {
            dispatch({type: AUTH_LOGIN, payload: response.data.data})
            history.push("/");  
        }).catch(error => {
            if (error.data && error.data.error){
                 setError("password", "notMatch", error.data.error);
            }
        });

    }

    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4" className={classes.welcomeText}>
                    Hello
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.emailText}>
                    {email}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(loginUser)}>
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <BootstrapTextField 
                                name="password" 
                                label=" Enter your CC account password"
                                InputLabelProps={{className:classes.inputLabel}}
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

export default withStyles(style)(AuthPassword);