import React from 'react';
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import Button from './Button';

const useStyles = makeStyles((theme) => ({
    rightHeaderContent: {
        position: "absolute",
        right: '4rem',
        top: '2rem',
        [theme.breakpoints.down('sm')]: {
            top: 'unset',
            right: 'unset',
            bottom: '10px',
            textAlign: 'center',
            position: 'unset',
            marginTop: '3rem',
        },
    },
    rightHeader: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            flexDirection: 'column',
        },
    },
    topActionText: {
        marginRight: '1.5rem',
        color: 'gray',
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            marginBottom: '1rem'
        },
    },
    button: {
        color: '#3A8DFF',
    },
    title: {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.9rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.4rem',
            marginBottom: '0.7rem',
        },
    },
}));

const TopAction = ({ title, buttonText, buttonAction }) => {
    const classes = useStyles();

    return (
        <Box className={classes.rightHeaderContent}>
            <Grid container item className={classes.rightHeader}>
                <Typography className={classes.topActionText}>{title}</Typography>

                <Button onClick={buttonAction} className={classes.button} title={buttonText} />
            </Grid>
        </Box>
    );
}

export default TopAction;
