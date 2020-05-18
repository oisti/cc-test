import React, { useEffect, useState } from 'react';
import { 
    Grid, 
    Button, 
    Menu, 
    Typography, 
    Hidden,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch} from 'react-redux'
import { SET_CART } from '../store/cartStore';
import { create, all } from 'mathjs'

import api from "./Api";

const math = create(all, {})

const useStyles = makeStyles((theme) => ({
    expandMoreIcon:{
        color: '#418ef6'
    },
    shoppingCartIcon:{
        height: 16,
        marginRight: -4
    },
    menuBtn:{
        textTransform: 'none'
    },
    cartPaper:{
        marginTop: theme.spacing(2),
        padding: theme.spacing()
    },
    checkOutGridItem:{
        textAlign: 'center'
    }
}));

export default function MiniCart({ children }) {
    const classes = useStyles();
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const cartItems = useSelector(state => state.Cart)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
       if (!cartItems){
           api.get('cart').then(response =>{
               dispatch({type: SET_CART, payload: response.data})
           })
       }
    })
    

    let totalValue = 0;
    return (
        <>
            <Button 
                onClick={(e)=>setCartAnchorEl(e.currentTarget)}
                className={classes.menuBtn}
                startIcon={<ShoppingCartIcon className={classes.shoppingCartIcon}/>}
                endIcon={Boolean(cartAnchorEl)?<ExpandLessIcon className={classes.expandMoreIcon} />:<ExpandMoreIcon className={classes.expandMoreIcon} />}
                aria-controls="cart-menu"
                aria-haspopup="true"
                >
                <Hidden smDown>Cart</Hidden>
            </Button>
            <Menu
                id="cart-menu"
                anchorEl={cartAnchorEl}
                keepMounted
                open={Boolean(cartAnchorEl)}
                onClose={()=>setCartAnchorEl(null)}
                getContentAnchorEl={null}
                elevation={1}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    className: classes.cartPaper,
                }}
            >
                
                {cartItems &&
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table className={classes.table} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {cartItems.map((row) => {
                                        const rowValue = math.multiply(math.round(math.subtract(Number(row.price), math.multiply(Number(row.price), math.divide(Number(row.discount_percent), 100))),2), Number(row.quantity))
                                        totalValue = math.add(rowValue, totalValue)
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    <b>{row.brand}</b> {row.model}
                                                </TableCell>
                                                <TableCell align="center">{row.quantity}</TableCell>
                                                <TableCell align="right">
                                                    {rowValue} Lei</TableCell>
                                            </TableRow>
                                        )})}
                                        <TableRow>
                                            <TableCell component="th" scope="row">Total</TableCell>
                                            <TableCell align="right" colSpan={2}>{math.round(totalValue, 2)} Lei</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} className={classes.checkOutGridItem}>
                            <Button variant="contained" color="primary" onClick={()=>{history.push('/checkout'); setCartAnchorEl(null);}}>check out</Button>
                        </Grid>
                    </Grid>
                }
                {!cartItems &&
                    <Typography>Your cart is empty</Typography>
                }
            </Menu>
        </>
    )
};