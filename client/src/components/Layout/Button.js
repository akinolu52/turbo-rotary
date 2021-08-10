import React from 'react';
import { Button as Btn, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        padding: '.9rem 4rem 1rem',
        color: '#3A8DFF',
        boxShadow: '1px 2px 8px 2px rgba(0, 0, 0, 0.1)',
    },
}));


 const Button = ({ title, className, onClick, ...args }) => {
    const classes = useStyles();

    return (
        <Btn onClick={onClick} className={[classes.button, className]} {...args}>
            {title}
        </Btn>
    );
}

export default Button;
