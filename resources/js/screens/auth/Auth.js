import React, { useState } from 'react';
import { Grid, Card, Typography, Link} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CCLogo from '../../assets/img/cc_logo_medium.png';

import AuthEmail from './AuthEmail.js'
import AuthPassword from './AuthPassword'
import AuthNamePassword from './AuthNamePassword'

const style = theme => ({
    authContaner:{
        minHeight: '100vh',
        backgroundColor: '#f5f6f8'
    },
    card:{
        padding: theme.spacing(6),
        width: 460,
        [theme.breakpoints.down('xs')]: {
            width: 'auto'
        },
    },
    helpText:{
        color: '#18218c',
    },
    helpTextItem:{
        textAlign: 'center',
        paddingTop: theme.spacing(2),
    }
});

function Auth({ classes }){
    const [step, setStep] = useState(2);
    const [email, setEmail] = useState('istvan.olah@magicsolutions.ro');

    const step0 = values => {
        setStep(1)
        setEmail(values.email)
    }

    const step1 = values => {
        setStep(1)
    }

    const step2 = values => {
        setStep(1)
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
                            {step === 0 && <AuthEmail onSubmit={step0} /> }
                            {step === 1 && <AuthPassword email={email} onSubmit={step1} /> }
                            {step === 2 && <AuthNamePassword email={email} onSubmit={step2} /> }
                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.helpTextItem}>
                        <Link href="#" className={classes.helpText}>
                            Need help?
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item style={{height: 130}} />
        </Grid>
)};

export default withStyles(style)(Auth);