import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	text: 'blue',
	white: '#fff',
	bg1: '#F5F5F6',
	bg2: '#E1E2E1',
	palette: {
		background: {
			default: '#fff'
		},
		primary: {
			light: '#80b4ff',
			main: '#4285f4',
			dark: '#0059c1',
			contrastText: '#fff'
		}
	},
	typography: {
		color: '#161d25',
	},
	overrides: {
		MuiButton:{
			root:{
				borderRadius: 2
			},
			contained:{
				boxShadow: 'none',
				padding: '12px 16px',
				'&:hover': {
                    boxShadow: 'none'
                }
			}
		},
		MuiFormLabel:{
			root:{
				fontSize: '1.3rem'
			}
		},
		MuiAppBar:{
			colorPrimary:{
				backgroundColor: '#fcfcfc'
			}
		}
		
	}
});

export default theme;