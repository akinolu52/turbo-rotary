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
    }
}));

const Input = ({ type, ...args }) => {
    const classes = useStyles();

    return (
        <Grid>
            <FormControl margin="normal" className={classes.input}>
                <TextField
                    {...args}
                    type={type || 'text'}
                    required
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </FormControl>
        </Grid>
    );
}

export default Input;
