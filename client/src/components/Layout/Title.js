import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

const Title = ({ title }) => {
    const classes = useStyles();

    return (
        <Typography className={classes.title}>{title}</Typography>
    );
}

export default Title;
