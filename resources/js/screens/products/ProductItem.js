import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { api } from "../../components";
import { create, all } from 'mathjs'

const math = create(all, {})

const useStyles = makeStyles((theme) => ({
    brand:{
        fontSize: '1.2rem',
        fontWeight: 800,
    },
    model:{
        fontSize: '0.9rem',
    }
}));

// 82 T &#9432;

export default function ProductItem({ product }) {
    const classes = useStyles();
   
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="space-between">
                    <Grid item xs={8}>
                        <Typography component='h4' className={classes.brand}>{product.brand}</Typography>
                        <Typography className={classes.model}>{product.model}</Typography>
                    </Grid>
                    <Grid item xs={4}>
O
                    </Grid>
                   
                </Grid>
                
            </Grid>
          
        </Grid>
    )
};