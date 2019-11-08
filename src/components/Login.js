import React, { useState, useEffect } from 'react';
import useGlobal from '../store';
import Switch from "react-switch";
import TextField from '@material-ui/core/TextField';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Login.css';

import Header from './Header';

const Login = () => {
    const [globalState, globalActions] = useGlobal();
	const [state, setState] = useState({
		form: {
			login: '',
			password: ''
		}
	});
    
	const loginChangeLogin = (event) => {
		let aState = state.form;

		aState.login = event.target.value;

		setState({
			form: aState
		});
	}

    const loginChangePassword = (event) => {
      
		let aState = state.form;

		aState.password = event.target.value;

		setState({
			form: aState
		});
	}
    
    useEffect(() => {

		return () => {
		};
	}, []);



    const CssTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: '#aeb2b7',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ff7a28',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#f8f8f8',
            boxShadow: "inset 0px -60px 57px -57px rgba(173,173,173,0.1);"
          },
          '& .MuiInput-underline:hover': {
            borderBottomColor: '#ff7a28'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'ff7a28',
            },
            '&:hover fieldset': {
              borderColor: 'ff7a28',
              borderBottomColor: 'ff7a28'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'ff7a28',
            },
          },
        },
      })(TextField);
    
    return (
		<React.Fragment>
			<div className="main">
                <div className="main__form">
                    
                    <div className="main__inner">
                        <div className="main__logo">
                            <img style={{ float: "right" }} src="technoLogo.png" alt="logo"/>
                        </div>
                        <div className="main__inputs">
                            <div className="label">
                                <CssTextField style={{ width: "100%" }} label="Логин" value={state.form.login} onChange={loginChangeLogin}/>
                                <CssTextField style={{ width: "100%" }} type="password" label="Пароль" value={state.form.password} onChange={loginChangePassword}/>
                                <Button variant="contained" style={{ background: "black", color: "white", fontWeight: "bold", borderRadius: "0", marginTop: "25px"}}>
                                    Войти
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
		</React.Fragment>
	);
}

export default Login;