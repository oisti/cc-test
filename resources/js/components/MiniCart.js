import React, { useEffect } from 'react';
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

import api from "./Api";


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
    const [cartAnchorEl, setCartAnchorEl] = React.useState(null);
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
                Cart
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
                    className: classes.cartPaper
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
                                    {cartItems.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                <b>{row.product.brand}</b> {row.product.model}
                                            </TableCell>
                                            <TableCell align="center">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.product.price * row.quantity} Lei</TableCell>
                                        </TableRow>
                                    ))}
                                        <TableRow>
                                            <TableCell component="th" scope="row">Total</TableCell>
                                            <TableCell align="right" colSpan={2}>TODO Lei</TableCell>
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