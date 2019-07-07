import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import Spinner from '../../components/Ui/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/Auth';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: ' Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }
    omponentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }
  

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updatedContrils = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedContrils });
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = <Spinner />
        if (!this.props.loading) {
            form = (

                formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidation={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))
            );
        }
        let errormessage = null;
        if (this.props.error) {
            errormessage = (
                <p style={{ color: 'red' }}>
                    {this.props.error}
                </p>
            )
        };
        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = (<Redirect to={this.props.authRedirectPath} />)
        }


        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {authRedirect}
                    {errormessage}
                    {form}
                    <Button btnType='Success'>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>
                    Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath:state.auth.authRedirectPath,
        buildingBurger:state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);