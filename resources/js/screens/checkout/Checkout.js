import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, MenuList, MenuItem, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductsBG from '../../assets/img/bg.jpg';

import { MainContainer, Footer, api} from "../../components";


const useStyles = makeStyles((theme) => {
   // console.log(theme);
return({
    mainItem:{
        maxWidth: 1440,
        minHeight: 1000,
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    },
    mainGridContainer:{
        backgroundImage: "url(" + ProductsBG + ")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
    },
    h1:{
        fontSize: 68,
        color: '#fff',
        fontWeight: 800,
        lineHeight: 1,
        paddingTop: 100,
        textAlign: 'center'
    },
})});

export default function Checkout() {
    const classes = useStyles();

    return (
        <>
        <Grid container justify="center" className={classes.mainGridContainer}>
            <Grid item xs={12} className={classes.mainItem}>
                <MainContainer>
                    <Typography className={classes.h1}>TODO</Typography>

                </MainContainer>
            </Grid>
        </Grid>
        <Footer />
        </>
    )
};