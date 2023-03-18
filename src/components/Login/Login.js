import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//------------------------REDUCERS----------------------------
// This reducer handles the state of the email input field
// const emailReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return {value: action.val, isValid: action.val.includes('@')};
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return {value: state.value, isValid: state.value.includes('@')};

// checks if it's my email
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    const EmailIsValid = action.val === 'myemail@email.com';
    return { value: action.val, isValid: EmailIsValid };
  }
  if (action.type === 'INPUT_BLUR') {
    const EmailIsValid = state.value === 'myemail@email.com';
    return { value: state.value, isValid: EmailIsValid };
  }

  return {value: '', isValid: false};
};

// This reducer handles the state of the password input field
// const passwordReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return {value: action.val, isValid: action.val.trim().length > 6};
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return {value: state.value, isValid: state.value.trim().length > 6};
//   }
//   return {value: '', isValid: false};
// };

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    const PwIsValid = action.val === 'vab1t1t!';
    return { value: action.val, isValid: PwIsValid };
  }
  if (action.type === 'INPUT_BLUR') {
    const PwIsValid = state.value === 'vab1t1t!';
    return { value: state.value, isValid: PwIsValid };
  }
  return { value: '', isValid: false };
};


// -------------------------STATES-------------------------------
// This state variable stores whether the form is currently valid
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  // These state variables use the emailReducer and passwordReducer to manage the state of the email and password inputs, respectively
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });

  const[passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  });

// ------------------------USE EFFECT--------------------------------
// These variables use destructuring to extract the isValid property from the emailState and passwordState objects, respectively
const { isValid: emailIsValid } = emailState;
const { isValid: passwordIsValid} = passwordState;

// This useEffect hook runs whenever the emailIsValid or passwordIsValid variables change
// It sets a timeout to update the formIsValid state variable with the current validity of the form
// If the component unmounts before the timeout completes, the cleanup function cancels the timeout
useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity');
    setFormIsValid(emailIsValid && passwordIsValid);
  }, 500);

  return () => {
    console.log('CLEANUP');
    clearTimeout(identifier);
  };
}, [emailIsValid, passwordIsValid]);

// ---------------------------CHANGE HANDLER---------------------------
// These functions handle changes to the email and password input fields
// They dispatch actions to the emailReducer and passwordReducer, respectively, to update the state of the inputs
// They also update the formIsValid state variable based on the current validity of the inputs
  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@')
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  // ------------------------VALIDATE HANDLER------------------------------
  // These functions handle validation of the email and password inputs when they lose focus
// They dispatch actions to the emailReducer and passwordReducer, respectively, to update the state of the inputs
  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

    // ------------------------SUBMIT HANDLER--------------------------------
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };
  // ------------------------------FORM--------------------------------------
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
