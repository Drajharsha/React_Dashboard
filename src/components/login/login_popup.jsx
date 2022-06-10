import React from 'react';
import { Container } from 'react-bootstrap';
// import close from '../../icons/close.png';
import lock from '../../icons/login-padlock.svg';
import checkmark from '../../icons/login-checkmark.svg';
import logo_teal from '../../images/logos/logo_teal.png';
import ResetPassword from '../reset_password/reset_password_container';
import { PROXY_URL } from '../../config';
import { ValidationAlert } from '../survey/validation_alert'
// import GoogleLogin from 'react-google-login';

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);
        this.userCredentials = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.checkUncheck = this.checkUncheck.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.clear = this.clear.bind(this);
        this.flipLoginButton = this.flipLoginButton.bind(this);
        this.href = window.location.href;
        this.alreadyUser = true;
        this.inputFields = {};
        this.rememberMe = false;
        this.loginActive = false;
        this.validationError = false;
        this.validationErrorMessage = "";
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyUp)
    }

    componentDidMount() {
        // let emailInput = document.querySelector('.user').nextSibling;
        // emailInput.focus();
        // let passwordInput = document.querySelector('.password').nextSibling;
        // let email = localStorage.email;
        // if (email) {
        //     this.userCredentials["identifyier"] = email;
        //     emailInput.value = email;
        // }
        // let password = localStorage.pw;
        // if (password) {
        //     this.userCredentials["password"] = password;
        //     passwordInput.value = password;
        // }
        document.addEventListener("keyup", this.handleKeyUp);
        this.href = this.href.split('survey')[0];
        if (this.href.split("/#/")[1] === "login") {
            this.href = this.href.split('login')[0];
        }
        if (this.props.user) this.props.loggingIn(false);
        // setTimeout(() => this.removeInputStyling(), 100);
    }

    removeInputStyling() {
        let inputs = document.querySelectorAll('input');
        console.log('test')
        if (inputs.length < 2) return setTimeout(() => this.removeInputStyling(), 50);
        inputs.forEach(input => input.classList.add('reset-input'));
    }

    handleKeyUp(e) {
        let selectedField;
        let field;
        switch (e.key) {
            case "Enter":
                this.handleSubmit();
                break
            case "E":
                debugger
                break
            case "Backspace":
                selectedField = document.querySelector('.selected');
                if (!selectedField) return;
                field = selectedField.dataset.field;
                this.inputFields[field] = this.inputFields[field].slice(0, -1);
                break
            default:
                selectedField = document.querySelector('.selected');
                if (!selectedField) return;
                field = selectedField.dataset.field;
                this.inputFields[field] = this.inputFields[field] + e.key;
                // selectedField.querySelector('.input').innerText = this.inputFields[field] + e.key;
                break
        }
        this.setState(() => this.inputFields)
    }

    clear(e) {
        e.currentTarget.value = e.currentTarget.value === e.currentTarget.defaultValue ? "" : e.currentTarget.value;
    }

    updateInfo(e) {
        this.userCredentials[e.currentTarget.name] = e.currentTarget.value;
    }

    async handleSubmit(oAuthData) {
        let password = this.userCredentials.password;
        let phone = parseInt(this.userCredentials.identifyier);
        let email = this.userCredentials.identifyier;
        let creds
        if (typeof email == 'undefined' || typeof password == 'undefined') {
            this.validationError = true;
            this.validationErrorMessage = "Please enter a valid email and password";
            this.setState(() => this.validationError);
        } else {
            this.validationError = false;
            this.validationErrorMessage = "";
            this.setState(() => this.validationError);
            if (!oAuthData) {
                creds = phone ? { phone, password } : { email, password };
            } else {
                creds = { email: oAuthData.su.ev, oAuthData }
            }

            if (this.alreadyUser) {
                console.log(creds)
                let login = await this.props.login(creds)
                if (login) { 
                    this.validationError = false;
                    this.validationErrorMessage = "";
                    this.setState(() => this.validationError);
                    this.closeLogin(); 
                } else {
                    this.validationError = true;
                    this.validationErrorMessage = "The password or email is incorrect";
                    this.setState(() => this.validationError);
                }
            } else {
                let newUser = await this.props.signup(this.userCredentials)
                if (newUser) {
                    this.validationError = false;
                    this.validationErrorMessage = "";
                    this.setState(() => this.validationError);
                    this.closeLogin();
                }
                else {
                    this.validationError = true;
                    this.validationErrorMessage = "The password or email is incorrect";
                    this.setState(() => this.validationError);
                }
            }

            if (this.rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('pw', password);
            }
        }
    }

    closeLogin(returnToPublicBool) {
        // if (returnToPublicBool) {
        //     window.location.href.split("/#/")[0];
        // } else {
        //     window.location.href = this.href;
        // }
        console.log(this.href);
        if (window.location.href.split("/#/")[1] === "login") {
            let newLocation = window.location.href.split('/#/')[0] + "/#/";
            // newLocation = newLocation;
            if (!returnToPublicBool) newLocation = newLocation + 'dashboard';
            window.location.href = newLocation;
        }
        this.props.loggingIn(false);
    }

    flipLoginButton() {
        this.alreadyUser = !this.alreadyUser;
        this.setState(() => this.alreadyUser);
    }

    handleOAuthSuccess(data) {
        this.handleSubmit(data)
    }

    handleOAuthFail(err) {
        debugger
    }

    handleInput(e) {
        let field = e.currentTarget.dataset.field;
        e.currentTarget.classList.add('selected');
        if (!this.inputFields[field]) this.inputFields[field] = "";
    }

    checkUncheck(e) {
        e.currentTarget.firstChild.classList.toggle('hidden');
        this.rememberMe = !this.rememberMe;
    }

    handleClick(e) {
        if (e.target.classList.contains('login-popup-frame')) {
            this.closeLogin(true)
            this.props.resettingPassword(false);
        }
    }

    eventFire(el, etype) {
        let evt = new Event(etype, { bubbles: true, cancelable: true });
        // debugger
        el.dispatchEvent(evt);
    }

    focusInput(e) {
        let ele = e.currentTarget.parentElement.querySelector('input');
        ele.select();
        // ele.submit();
        // if (ele.title !== "email") return;
        // let email = localStorage.email;
        // if (email) ele.setAttribute("value", email);
        // debugger;
        // this.eventFire(ele, "click")
    }

    render() {
        let surveyBool = !!document.querySelector('.survey-frame');
        console.log(surveyBool)
        return (
            !this.props.user &&
            <Container className={surveyBool ? "login-popup-frame" : "login-popup-frame solo-login"} onClick={this.handleClick} >
                <form id="login-popup-container">
                    <div id="login-banner-container">
                        <img src={logo_teal} alt="" className="login-banner-logo" />
                        <img src={PROXY_URL + '/api/assets/images/image/bars-png'} className="login-banner-bars" alt="" />
                    </div>
                    <img src={PROXY_URL + "/api/assets/icons/icon/user_icon_teal-svg"} alt="" className="login-logo" />
                    <div className="login-field-container">
                        <div className="login-value-title user" onClick={this.focusInput}>Email</div>
                        <input className="login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="identifyier" title="email" />
                    </div>
                    {/* <div className="login-field-container">
                            <div className="login-value-title user" onClick={this.focusInput}>Email</div>
                            <input className="answer login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="identifyier" title="email" />
                        </div> */}
                    {this.alreadyUser ? null : <>
                        <div className="login-field-container-OLD">
                            <div className="login-value-title phone">phone</div>
                            <input className="answer login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="phone" />
                        </div>
                        <div className="login-field-container-OLD">
                            <div className="login-value-title company">company</div>
                            <input className="answer login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="company" />
                        </div>
                        <div className="login-field-container-OLD">
                            <div className="login-value-title role">role</div>
                            <input className="answer login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="role" />
                        </div>
                        <div className="login-field-container-OLD">
                            <div className="login-value-title website">website</div>
                            <input className="answer login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="website" />
                        </div> </>
                    }
                    <div className="login-field-container">
                        <div className="login-value-title password" onClick={this.focusInput}>Password</div>
                        <input className="login-info" onClick={this.clear} onChange={this.updateInfo} type="password" name="password" title="password" />
                        <img src={lock} alt="" className="login-lock" />
                    </div>
                    {/* <div className="login-field-container-OLD">
                            <div className="login-value-title password" onClick={this.focusInput}>Password</div>
                            <input className="answer login-info" onClick={this.clear} onChange={this.updateInfo} type="password" name="password" title="password"/>
                            <img src={lock} alt="" className="login-lock" />
                        </div> */}
                    <div id="login-button-container">
                        <div id="login-button" onClick={() => this.handleSubmit()}>{this.alreadyUser ? "login" : "sign up"}</div>
                    </div>
                    <div className="login-extras-container">
                        <div className="remember-me-container">
                            <div className='login-checkbox' onClick={this.checkUncheck}><img src={checkmark} alt="" className="checkmark hidden" /></div>
                            <div className="remember-me">Remember me?</div>
                        </div>
                        <div className="forgot-password-container">
                            <div className="forgot-password" onClick={() => this.props.resettingPassword(true)}>Forgot your password?</div>
                        </div>
                    </div>
                    <div className="signup-button" onClick={this.flipLoginButton}>{this.alreadyUser ? "Don't have an account?" : "Already have an account?"}</div>
                    {/* <GoogleLogin
                            clientId='801918584772-e4oml9vq2nqd0qn23ihrkbgv2tiv17g6.apps.googleusercontent.com'
                            buttonText='login with google'
                            onSuccess={res => this.handleOAuthSuccess(res)}
                            onFailure={err => this.handleOAuthFail(err)}
                            className="google-login"
                        /> */}
                        <ValidationAlert className="alert__login" ValidationValue={this.validationError} ValidationBody={this.validationErrorMessage} />
                </form>
                {this.props.requestingPwReset && !this.props.passwordReset && <ResetPassword />}
            </Container>
        )
    }
}

export default LoginPopup;