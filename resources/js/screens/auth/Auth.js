import React, { useState } from 'react';
import { Grid, Card, Typography, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CCLogo from '../../assets/img/cc_logo_medium.png';

import { api } from '../../components'

import AuthEmail from './AuthEmail.js'
import AuthPassword from './AuthPassword'
import AuthNamePassword from './AuthNamePassword'

const style = theme => ({
    authContaner: {
        minHeight: '100vh',
        backgroundColor: '#f5f6f8'
    },
    card: {
        padding: theme.spacing(6),
        width: 460,
        [theme.breakpoints.down('xs')]: {
            width: 'auto'
        },
    },
    helpText: {
        color: '#18218c',
    },
    helpTextItem: {
        textAlign: 'center',
        paddingTop: theme.spacing(2),
    }
});

function Auth({ classes }) {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState();

    const checkUser = values => {
        setEmail(values.email)
        api.post('checkuser', {
            email: values.email
        }).then(response => {
            if (response.data) {
                setStep(1)
            } else {
                setStep(2)
            }
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <Grid container direction="column" justify="space-around" alignItems="center" className={classes.authContaner}>
            <Grid item>
                <img src={CCLogo} height={130} alt="COGNITIVE CREATORS" />
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Card variant="outlined" className={classes.card}>
                            {step === 0 && <AuthEmail onSubmit={checkUser} />}
                            {step === 1 && <AuthPassword email={email} />}
                            {step === 2 && <AuthNamePassword email={email} />}
                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.helpTextItem}>
                        <Link href="#" className={classes.helpText}>
                            Need help?
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item style={{ height: 130 }} />
        </Grid>
    )
};

export default withStyles(style)(Auth);