import React, { useState } from 'react';
import { Grid, Typography, Button, Paper, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import classNames from 'classnames';
import { useDispatch } from 'react-redux'

import { SET_CART } from '../../store/cartStore';
import { api } from "../../components";
import { create, all } from 'mathjs'
import { Winter, Summer, AllSeason } from '../../assets/svg/TypeIcons';
import { FuelEfficiencyClass, WetGripClass, NoiseEmission } from '../../assets/svg/TireClassIcond';

const math = create(all, {})

const useStyles = makeStyles((theme) => ({
    mainPaper:{
        padding: theme.spacing(2),
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '60%',
        backgroundPosition: 'right bottom',
    },
    brand:{
        fontSize: '1.2rem',
        fontWeight: 800,
    },
    model:{
        fontSize: '0.9rem',
    },
    productTypeGridItem:{
        textAlign: 'center',
    },
    typeText:{
        textTransform: 'uppercase',
        fontSize: 10
    },
    size:{
        paddingTop: 4,
        fontWeight: 500,
    },
    tireClassIcond:{
        padding: 4,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        fontSize: 12
    },
    fuelEfficiencyClass:{
        backgroundColor: '#418ef6',
    },
    wetGripClass:{
        backgroundColor: '#f69100',
    },
    noiseEmission:{
        backgroundColor: '#020202',
    },
    price:{
        textDecoration: 'line-through',
        fontSize: '0.9rem',
        fontWeight: 500,
        fontStyle: 'italic',
        paddingTop: 8
    },
    newPrice:{
        color: theme.palette.primary.main,
        fontWeight: 800,
        fontSize: '1.3rem',
    },
    available:{
        color: '#018d08',
        fontSize: '0.9rem',
        fontWeight: 500,
    },
    addToCartPaper:{
        backgroundColor: theme.palette.primary.main,
    },
    quantitySelect:{
        backgroundColor: 'white',
        borderRadius: 4
    },
    quantitySelectInputProps:{
        padding: 4,
    },
    addToCartText:{
        fontSize: '0.8rem',
        textTransform: 'none'
    },
    shoppingCartIcon:{
        height: 20,
        paddingTop: 4
    }
}));



export default function ProductItem({ product }) {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(4);
    const dispatch = useDispatch();

    const addToCart = ()=>{
        api.post('cart', {quantity, productId: product.id}).then(()=>{
            dispatch({type: SET_CART, payload: null})
        })
    }


    let quantityItems = []
    for (let step = 1; step <= 10; step++) {
        quantityItems.push(<MenuItem key={step} value={step}>{step}</MenuItem>)
    }

    return (
        <Paper variant="outlined" className={classes.mainPaper} style={{backgroundImage: 'url(/images/'+product.image_url+')'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="space-between">
                        <Grid item xs={8}>
                            <Typography component='h4' className={classes.brand}>{product.brand}</Typography>
                            <Typography className={classes.model}>{product.model}</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.productTypeGridItem}>
                            {product.type === 'winter' && <><Winter height={20} fill='#000'/><Typography className={classes.typeText}>{product.type}</Typography></>}
                            {product.type === 'summer' && <><Summer height={20} fill='#000'/><Typography className={classes.typeText}>{product.type}</Typography></>}
                            {product.type === 'all_season' && <><AllSeason height={20} fill='#000'/><Typography className={classes.typeText}>all season</Typography></>}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="space-between">
                        <Grid item xs={6}>
                            <Typography className={classes.size}>{product.size}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.size}>82</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.size}>T</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <InfoIcon className={classes.size} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item sm={2} md={3} >
                            <Paper className={classNames(classes.tireClassIcond, classes.fuelEfficiencyClass)}>
                                <FuelEfficiencyClass fill='#fff' height={15} style={{paddingRight:4}}/>{product.fuel_efficiency_class}
                            </Paper>
                        </Grid>
                        <Grid item sm={2} md={3}>
                            <Paper className={classNames(classes.tireClassIcond, classes.wetGripClass)}>
                                <WetGripClass fill='#fff' height={15} style={{paddingRight:4}}/>{product.wet_grip_class}
                            </Paper>
                        </Grid>
                        <Grid item sm={2} md={3}>
                            <Paper className={classNames(classes.tireClassIcond, classes.noiseEmission)}>
                                <NoiseEmission fill='#fff' height={15} style={{paddingRight:4}}/>{product.noise_emission}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.price}>{product.price} Lei</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.newPrice}>{math.round(math.subtract(Number(product.price), math.multiply(Number(product.price), math.divide(Number(product.discount_percent), 100))),2)} Lei</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.available}>Available</Typography>
                </Grid>
                <Grid item sm={8} md={6} lg={10}>
                    <Paper variant="outlined" className={classes.addToCartPaper}>
                        <Button variant="contained" color="primary" fullWidth style={{padding: 4}}>
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={4}>
                                    <Select
                                        className={classes.quantitySelect}
                                        value={quantity}
                                        onChange={(e)=>{setQuantity(e.target.value)}}
                                        disableUnderline
                                        classes={{
                                            selectMenu: classes.quantitySelectInputProps
                                        }}
                                    >
                                        {quantityItems}
                                    </Select>
                                </Grid>
                                <Grid item xs={2} onClick={addToCart}>
                                    <ShoppingCartIcon className={classes.shoppingCartIcon}/>
                                </Grid>
                                <Grid item xs={6} onClick={addToCart} className={classes.addToCartText}>Add to cart</Grid>
                            </Grid>
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
};