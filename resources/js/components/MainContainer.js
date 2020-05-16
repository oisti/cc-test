import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';


const useStyles = makeStyles((theme) => ({
  
}));

export default function MainContainer({ children }) {
    const classes = useStyles();
   
    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Header />
                    {children}
                </Grid>
            </Grid>
        </>
    )
};
