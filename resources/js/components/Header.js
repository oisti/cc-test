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
import MiniCart from "./MiniCart";
import api from "./Api";


const useStyles = makeStyles((theme) => ({
    appBar:{
        marginTop: theme.spacing(2),
        borderRadius: 4,
        maxWidth: 1440,
        right:'auto',
        [theme.breakpoints.down('md')]: {
            right:0,
        },
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
        marginRight: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing()
        },
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
                                                 <Hidden smDown><Button variant="contained" color="primary" className={classes.searchInputAdornmentButton}>Search</Button></Hidden>
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
                                            <Typography>{product.brand} {product.model} {product.size}</Typography>
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

                    <MiniCart />
                    
                </Toolbar>
            </AppBar>
        </>
    )
};