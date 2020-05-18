import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, MenuList, MenuItem, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link, useRouteMatch } from "react-router-dom";
import ProductsBG from '../../assets/img/bg.jpg';

import { MainContainer, Footer, api} from "../../components";
import CategoryIcons from '../../assets/svg/CategoryIcons';
import PromocionalProduct from './PromocionalProduct';
import ProductItem from './ProductItem';


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
    categoryGridContainer:{
        paddingTop: 130
    },
    categoryPaper:{
        padding: theme.spacing(),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        color: '#939aa1',
        fill: '#939aa1',
        height: '100%',
    },
    categoryPaperActive:{
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fill: '#fff'
    },
    categoryName:{
        fontSize: '0.8rem',
        fontWeight: 800
    },
    categoryPaperGridContainer:{
        height: '100%',
        textAlign: 'center'
    },
    categoryLink:{
        textDecoration: 'none'
    },
    productGridContainer:{
        marginTop: 60,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            marginTop: 40,
        },
    },
    brandsPaper:{
        backgroundColor: '#dee1e3',
        paddingBottom: theme.spacing(4),
    },
    brandMenuItem:{
        color: '#161d25',
        fontSize: '0.8rem',
        fontWeight: 800,
        padding: 16,
    },
    brandMenuItemActive:{
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            color: '#fff',
            backgroundColor: theme.palette.primary.main,
        }
    },
    producListBrand:{
        fontSize: '1.2rem',
        textTransform: 'uppercase',
        fontWeight: 800,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.primary.main,
        marginBottom: theme.spacing(3),
    },
    productItemContainer:{
        maxWidth: '20%',
        flexBasis: '20%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '50%',
            flexBasis: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            flexBasis: '100%',
        },
    }

})});

export default function Products({ children }) {
    const classes = useStyles();
    const match = useRouteMatch();

    const [categories, setCategories] = useState(null);
    const [activeCategory, setActiveCategory] = useState({});
    const [products, setProducts] = useState(null);
    const [activeBrand, setActiveBrand] = useState(null);

    

    useEffect(() => {
        if (!categories){
            api.get('categories').then(response =>{
                setCategories(response.data);
                if (!match.params.category){
                    setActiveCategory(response.data[0])
                }
            })
        }
    },[])

    useEffect(() => {
        if (categories && match.params.category){
            const newCategory = categories.filter(cat => cat.url_friendly === match.params.category)[0]
            setActiveCategory(newCategory);
        }
    },[categories, match.params.category])

    useEffect(() => {
        if (activeCategory.id){
            api.post('products', {category: activeCategory.id}).then(result =>{
                setProducts(result.data)
            })
        }
    }, [activeCategory.id])


    let productBrands = [];
    if (products){
        products.forEach(prod =>{
            if (!productBrands.includes(prod.brand)){
                productBrands.push(prod.brand)
            }
        })
    }
    productBrands.sort();
   
    return (
        <>
        <Grid container justify="center" className={classes.mainGridContainer}>
            <Grid item xs={12} className={classes.mainItem}>
                <MainContainer>
                    <PromocionalProduct />
                    <Hidden smDown>
                        <Grid container spacing={3} alignItems="stretch" className={classes.categoryGridContainer}>
                            {categories && categories.map(category =>{
                                return (
                                    <Grid key={category.id} item xs={2}>
                                        <Link to={"/"+category.url_friendly} className={classes.categoryLink} >
                                            <Paper className={classNames(classes.categoryPaper, (activeCategory.id === category.id?classes.categoryPaperActive: null))}>
                                                <Grid container direction="row" justify="center" alignItems="center" className={classes.categoryPaperGridContainer}>
                                                    <Grid item xs={12}>
                                                        <CategoryIcons category={category}/>
                                                        <Typography className={classes.categoryName}>{category.name}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Hidden>
                    <Grid container spacing={3} className={classes.productGridContainer}>
                        <Hidden xsDown>
                            <Grid item sm={3} md={2}>
                                <Paper className={classes.brandsPaper}>
                                    <MenuList>
                                        <MenuItem onClick={()=>setActiveBrand(null)} className={classes.brandMenuItem}>{activeCategory.name}</MenuItem>
                                        {productBrands.map(brand =>
                                            <MenuItem key={brand} onClick={()=>setActiveBrand(brand)} className={classNames(classes.brandMenuItem, brand === activeBrand? classes.brandMenuItemActive:null)}>{brand}</MenuItem>
                                        )}
                                    </MenuList>
                                </Paper>
                            </Grid>
                        </Hidden>
                        
                        <Grid item xs={12} sm={9} md={10}>
                            <Grid container spacing={3}>
                                {productBrands.filter(brand => activeBrand?brand === activeBrand: true).map(brand =>(
                                    <React.Fragment key={brand}>
                                        <Grid item xs={12}>
                                            <Typography component='h3' className={classes.producListBrand}>{brand}</Typography>
                                        </Grid>
                                        {products.filter(product => product.brand === brand).map(product =>(
                                            <Grid key={product.id} item xs={6} md={3} className={classes.productItemContainer}>
                                                <ProductItem product={product} />
                                            </Grid>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                   </Grid>


                </MainContainer>
            </Grid>
        </Grid>
        <Footer />
        </>
    )
};