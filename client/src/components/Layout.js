import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import bgImg from '../images/bg-img.png';
import bubble from '../images/bubble.svg';

const useStyles = makeStyles(() => ({
    container: {
        minHeight: '100vh',
    },
    left: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:
            `linear-gradient(to bottom,  #3A8DFF85, #86B9FF85),
      url(${bgImg})`,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    tagline: {
        color: 'white',
        textAlign: 'center',
        marginTop: '20px',
    },
    right: {
        position: 'relative',
        display: 'flex',
        padding: '2rem 6rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightHeader: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightHeaderContent: {
        position: "absolute",
        right: '4rem',
        top: '2rem'
    },
    button1: {
        padding: '.9rem 4rem 1rem',
        color: '#3A8DFF',
        boxShadow: '1px 2px 8px 2px rgba(0, 0, 0, 0.1)'
    },
    button2: {
        padding: '.9rem 4rem 1rem',
        color: '#FFF',
        backgroundColor: "#3A8DFF",
        boxShadow: '1px 2px 8px 2px rgba(0, 0, 0, 0.1)',
        marginTop: '2.2rem'
    },
    mr: {
        marginRight: '1.5rem'
    },
    title: {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
    },
    input: {
        width: '90%',
    },
    floatingLabelFocusStyle: {
        fontWeight: 'bold',
    }
}));

const Layout = (props) => {
    const classes = useStyles();
    const { user } = props;

    if (user.id) {
        return <Redirect to="/home" />;
    }

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <Grid item xs={false} md={5} className={classes.left}>
                <img src={bubble} alt="bubble" className={classes.leftImage} />
                <h1 className={classes.tagline}>Converse with anyone with any language</h1>
            </Grid>
            <Grid item xs={12} md={7} className={classes.right}>
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
