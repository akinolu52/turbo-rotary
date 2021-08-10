import React from 'react';
import { Grid, TextField, FormControl, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
        padding: '0 3px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    floatingLabelFocusStyle: {
        fontWeight: 'bold',
    },
    root: {
        'input, label': {
            paddingLeft: '.3rem',paddingRight: '.3rem'
        },
    },
}));

const Input = ({ type, ...args }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <FormControl margin="normal" className={classes.input}>
                <TextField
                    {...args}
                    type={type || 'text'}
                    required
                    className={classes.textfield}
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </FormControl>
        </Grid>
    );
}

export default Input;
