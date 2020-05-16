import React from 'react';
import { 
    Grid, 
    AppBar, 
    Toolbar, 
    IconButton,  
    Button, 
    InputAdornment, 
    MenuItem, 
    Menu, 
    Popover, 
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
import { useSelector } from 'react-redux'

import CCLogo from '../assets/svg/CCLogo';
import BootstrapTextField from "./BootstrapTextField";
import api from "./Api";


const useStyles = makeStyles((theme) => ({
    appBar:{
        marginTop: theme.spacing(2),
        borderRadius: 4,
        maxWidth: 1440,
        right:'auto'
    },
    toolbar:{
        minHeight: 50
    },
    leftContainer:{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    ccLogo:{
        height: 40,
        width: 40,
    },
    ccIconButton:{
        padding: theme.spacing(),
        marginRight: theme.spacing(4)
    },
    searchBootstrapTextField:{
        width: '100%',
        maxWidth: 550
    },
    searchInput:{
        padding: theme.spacing(),
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    searchInputAdornment:{
        marginLeft: 0
    },
    searchInputAdornmentButton:{
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        padding: '6.5px 16px'
    },
    popover:{
        padding: theme.spacing(2)
    },
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
        marginTop: theme.spacing(2)
    },
    checkOutGridItem:{
        textAlign: 'center'
    }
}));

export default function Header({ children }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cartAnchorEl, setCartAnchorEl] = React.useState(null);
    const [products, setProducts] = React.useState(null);
    const cartItems = useSelector(state => state.Cart)
    const history = useHistory();
        
    const handleClose = () => {
        if (anchorEl){
            anchorEl.blur();
        }
        setAnchorEl(null);
    };

    const searchOnChange = (event) =>{
        api.post('products', {searchTerm: event.target.value, maxResults: 5}).then(result =>{
            setProducts(result.data)
        })
    }
    
    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.leftContainer}>
                        <IconButton
                            className={classes.ccIconButton}
                            edge="start"
                            onClick={() => history.push('/')}
                        >
                            <CCLogo className={classes.ccLogo}/>
                        </IconButton>
                
                        <BootstrapTextField 
                            name="search" 
                            id="search" 
                            placeholder="Search products"
                            autoComplete="off"
                            className={classes.searchBootstrapTextField}
                            inputProps={{className: classes.searchInput}}
                            onClick={(e) =>{setAnchorEl(e.currentTarget)}}
                            onChange={searchOnChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" className={classes.searchInputAdornment}>
                                                <Button variant="contained" color="primary" className={classes.searchInputAdornmentButton}>Search</Button>
                                            </InputAdornment>,
                            }}
                            aria-controls="products-menu" 
                            aria-haspopup="true"

                        />
                        <Popover 
                            id="products-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl) && !!products}
                            onClose={handleClose}
                            disableEnforceFocus={true}
                            disableAutoFocus={true}
                            disableRestoreFocus={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            PaperProps={{
                                className: classes.popover
                            }}
                            
                        >
                            <Grid container direction='column' spacing={2}>
                                {products && products.map(product =>{
                                    return (
                                        <Grid key={product.id} item xs={12}>
                                            <Typography>{product.name}</Typography>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Popover>
                    </div>
                    <Hidden smDown>
                        <Button className={classes.menuBtn} endIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}>
                            My account
                        </Button>

                        <Button className={classes.menuBtn} endIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}>
                            Favourites
                        </Button>
                    </Hidden>

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
                                                        <b>{row.product.brand}</b> {row.product.name}
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
                            <Typography>Empty</Typography>
                        }
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
};