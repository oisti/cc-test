import React from 'react';
import { fade, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';

const style = theme => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 2,
		position: 'relative',
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '13.5px 14px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.primary.main,
		},
	},
	inputError: {
		borderColor: theme.palette.error.main,
		'&:focus': {
			boxShadow: `${fade(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.error.main
		},
	}
})


function BootstrapTextField({ classes, InputLabelProps, inputProps, InputProps, error, ...rest }) {
	const inputPropsClasses = InputProps?{...InputProps.classes, root: {...InputProps.classes.root, ...classes.root}}:{root: classes.root}
console.log(error)
	return <TextField
				InputLabelProps={{ shrink: true,  ...InputLabelProps}}
				InputProps={{...InputProps, disableUnderline: true, classes: inputPropsClasses}}
				inputProps={{...inputProps, className: classNames(classes.input, (error && classes.inputError), inputProps.className)}}
				error={error}
				{...rest} 
			/>
}

export default withStyles(style)(BootstrapTextField);