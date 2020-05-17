import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { api } from "../../components";
import { create, all } from 'mathjs'

import { Winter } from '../../assets/svg/TypeIcons';


const math = create(all, {})

const useStyles = makeStyles((theme) => ({
    mainContainer:{
        paddingTop: 200
    },
    h1:{
        fontSize: 68,
        color: '#fff',
        fontWeight: 800,
        lineHeight: 1
    },
    h4:{
        fontSize: 23,
        color: '#fff',
    },
    productContainer:{
        paddingTop: 170,
        width: 450
    },
    brand:{
        fontSize: 48,
        color: '#fff',
        fontWeight: 800,
        lineHeight: 1
    },
    typeGridItem:{
        textAlign: 'center'
    },
    type:{
        color: '#fff'
    },
    model:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 400,
    },
    normalPrice:{
        fontSize: 48,
        color: '#fff',
        fontWeight: 800,
        fontStyle: 'italic'
    },
    discountPrice:{
        fontSize: 60,
        color: '#418ef6',
        fontWeight: 800,
    }
}));

export default function PromocionalProduct({ children }) {
    const classes = useStyles();
    const [product, setProduct] = React.useState({});

    useEffect(() => {
        if (!product.id){
            api.get('promoproduct').then(result =>{
                setProduct(result.data)
            })
        }
    })

    return (
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" className={classes.mainContainer}>
            <Grid item>
                <Typography component="h1" className={classes.h1}>Best Offers on Winter Tires</Typography>
            </Grid>
            <Grid item>
                <Typography component="h4" className={classes.h4}>Tires for cars, trucks, vans and agricultural vehicles</Typography>
            </Grid>
            {product.id && <Grid item>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.productContainer}>
                    <Grid item xs={9}>
                        <Typography component="h2" className={classes.brand}>{product.brand}</Typography>
                        <Typography component="h3" className={classes.model}>{product.model}</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.typeGridItem}>
                        <Winter height={40} fill='#fff'/>
                        <Typography component="h3" className={classes.type}>WINTER</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.normalPrice}><del>{product.price} Lei</del></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.discountPrice}>{math.round(math.subtract(Number(product.price), math.multiply(Number(product.price), math.divide(Number(product.discount_percent), 100))),2)} Lei</Typography>
                    </Grid>
                    <Grid item xs={12}>
                       <Button variant="contained" color="primary">Find out more</Button>
                    </Grid>
                </Grid>
            </Grid>}
        </Grid>
    )
};