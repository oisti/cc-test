import React from 'react';
import { 
    Grid, 
    Typography, 
    Paper, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles((theme) => ({
    footerContainer:{
        backgroundColor: '#000'
    },
    footerContainerItem:{
        maxWidth: 1440,
    },
    copy:{
        color: '#fff',
        fontSize: '0.8rem',
        padding: 12,
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem',
        },
    },
    chatPaperGridItem:{
        justifyContent: 'flex-end',
        display: 'flex',
    },
    chatPaper:{
        backgroundColor: '#f91621',
        color: '#fff',
        width: 200,
        padding: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    }
   
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <Grid container className={classes.footerContainer} justify="center">
            <Grid item xs={12} className={classes.footerContainerItem}>
                <Grid container 
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end">
                    <Grid item xs={6}>
                        <Typography className={classes.copy}>© 2020 <b>COGNITIVE CREATORS</b></Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.chatPaperGridItem}>
                        <Paper className={classes.chatPaper}>
                           <ChatBubbleOutlineIcon style={{height:12}}/> Online - Can I help you?
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};