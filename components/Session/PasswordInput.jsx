import { Box, FormLabel, IconButton, makeStyles, TextField } from "@material-ui/core";
import {VisibilityOffOutlined, VisibilityOutlined} from "@material-ui/icons";
import {useState} from "react";

import baseConfig from "../../base.config";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    label:{
        fontSize: 14,
        lineHeight: '17px',
        color: '#110000',
        marginBottom: theme.spacing(1),
    },
    textField: {
        backgroundColor: theme.palette.white.main,
    },
}));

export default function PasswordInput({
    onChange,
    className = '',
    label = '',
    name = "password",
    disabled = false,
    required = false,
    validPattern = false,
    newPassword = false,
})
{
    const classes = useStyles();
    const [showPassword, SetShowPassword] = useState(false);
    return <Box className={`${classes.root} ${className}`}>
        <FormLabel className={classes.label} required={required}>{label}</FormLabel>
        <TextField
            required={required}
            id={name}
            placeholder={label}
            disabled={disabled}
            name={name}
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}
            autoComplete={newPassword ? 'new-password' : 'current-password'}
            variant='outlined'
            onChange={onChange}
            InputProps={{
                endAdornment: <IconButton disabled={disabled} size={"small"}
                                        aria-label="toggle password visibility"
                                        onClick={() => SetShowPassword(!showPassword)}
                                        onMouseDown={event => event.preventDefault()}
                                        edge="end">
                    {showPassword ? <VisibilityOutlined style={{color: '#909294'}}/> :
                        <VisibilityOffOutlined style={{color: '#909294'}}/>}

                </IconButton>,
            }}
            inputProps={validPattern ? {
                pattern: `.{${baseConfig.passwordMinLength},}`,
                onChange: (event) => {event.target.setCustomValidity('')},
                onInvalid: (event) => {
                    event.target.setCustomValidity('Favor de colocar una contraseña mayor a 8 caracteres.')
                }
            } : {}}
        />
    </Box>
}
