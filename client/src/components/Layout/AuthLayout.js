import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import bgImg from '../../images/bg-img.png';
import bubble from '../../images/bubble.svg';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
    },
    sidebar: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(180deg, #3A8DFF95 0%, #86B9FF 100%), url(${bgImg})`,
        position: 'relative',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flex: 1,
        },
    },
    sidebarImage: {
        [theme.breakpoints.down('sm')]: {
            width: '3rem',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '1rem'
        },
    },
    tagline: {
        color: 'white',
        textAlign: 'center',
        marginTop: '35px',
        width: '67%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.7rem',
            marginTop: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.2rem',
            marginBottom: '1rem',
            width: '90%',
        },
    },
    content: {
        position: 'relative',
        display: 'flex',
        padding: '2rem 7rem',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem 3rem',
            flex: 3,
            flexDirection: 'column-reverse',
            justifyContent: 'flex-end',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '1.2rem 1.5rem'
        },
    },
}));

const Layout = (props) => {
    const classes = useStyles();
    const { user } = props;

    if (user.id) {
        return <Redirect to="/home" />;
    }

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <Grid item xs={false} md={5} className={classes.sidebar}>
                <img src={bubble} alt="bubble" className={classes.sidebarImage} />
                <h1 className={classes.tagline}>Converse with anyone with any language</h1>
            </Grid>
            <Grid item xs={12} md={7} className={classes.content}>
                {props.children}
            </Grid>
        </Grid>
    );
};


const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(Layout);
