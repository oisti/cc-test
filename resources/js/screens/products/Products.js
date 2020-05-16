import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../components/MainContainer';

import ProductsBG from '../../assets/img/bg.jpg';

import PromocionalProduct from './PromocionalProduct';
 
const useStyles = makeStyles((theme) => ({
    mainItem:{
        maxWidth: 1440
    },
    mainGridContainer:{
        backgroundImage: "url(" + ProductsBG + ")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'contain'
    }
}));

export default function Products({ children }) {

    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.mainGridContainer}>
            <Grid item xs={12} className={classes.mainItem}>
                <MainContainer>
                   <PromocionalProduct />
                   <div style={{height: 1000}}>
                        alma
                    </div>
                </MainContainer>
            </Grid>
        </Grid>
    )
};