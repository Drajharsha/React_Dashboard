import React from 'react';
import { validatePassword, togglePasswords, confirmPassword } from '../util/user_util';
import visible from '../../icons/eye.svg';
import checkmark from '../../icons/checkmark.png';
import { PROXY_URL } from '../../config';
// import lock from '../../icons/login-padlock.svg';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.verificationToken = "";
        this.email = "";
        this.phone = 0;
        this.newPassword = "";
        this.nextInput = this.nextInput.bind(this);
        this.validateBeforeNext = this.validateBeforeNext.bind(this);
    }

    componentDidMount() {
        let first = document.querySelector('.verification-token');
        if (!!first) first.focus();
    }

    focusInput(e) {
        let ele = e.currentTarget.parentElement.querySelector('input');
        ele.select();
    }

    nextInput(e) {
        if (e.currentTarget.value.length > 0) {
            e.preventDefault();
            this.verificationToken = this.verificationToken + e.currentTarget.value;
            !!e.currentTarget.nextSibling ? e.currentTarget.nextSibling.focus() : this.authorizeToken();
        } else {
            e.currentTarget.previousSibling.focus()
        }
    }

    authorizeToken() {
        let inputs = document.querySelectorAll('.verification-token');
        let token = "";
        inputs.forEach(input => token = token + input.value);
        console.log(token);
        let authObj = { email: this.email, phone: this.phone, token: this.verificationToken }
        this.props.verifyResetToken(authObj);
    }

    sendToken() {
        let emailORphone = document.querySelector('#input-for-reset').value;
        let email;
        let phone;
        if (parseInt(emailORphone)) {
            phone = parseInt(emailORphone);
            if (phone.length === 11 & phone[0] === "1") phone = phone.slice(1);
            this.phone = phone
        } else {
            email = emailORphone;
        };
        if (email) {
            this.email = email;
            this.props.requestPwReset({ contact: email, contactType: "EMAIL" });
        } else if (phone) {
            this.phone = phone;
            this.props.requestPwReset({ contact: phone, contactType: "PHONE" });
        };
    }

    validateBeforeNext() {
        let verified = document.querySelectorAll('.verified');
        if (verified.length < 2) return alert("Fix password");
        let newPassword = document.querySelector('.first-password').value
        let authObj = { email: this.email, phone: this.phone, token: this.verificationToken, newPassword }
        this.props.resetPassword(authObj)
    }

    render() {
        return (
            <div id="password-reset-container">
                <div id="login-banner-container">
                    <img src={PROXY_URL + '/api/assets/logos/logo/logo_teal-png'} alt="" className="login-banner-logo" />
                    <img src={PROXY_URL + '/api/assets/images/image/bars-png'} className="login-banner-bars" alt="" />
                </div>
                {!this.props.awaitingNewPassword &&
                    <>
                        <div id="password-reset-header">Please enter the email address or phone number associated with Loxz Digital</div>
                        <div className="login-field-container">
                            <div className="login-value-title user" onClick={this.focusInput}>Email or Phone</div>
                            <input id="input-for-reset" className="login-info" onClick={this.clear} onChange={this.updateInfo} type="text" name="identifyier" title="email" />
                        </div>
                        <div id="pw-reset-button-container">
                            <div id="pw-reset-button" onClick={() => this.sendToken()}>send verification code</div>
                        </div>
                        {this.props.awaitingResetToken &&
                            <div id="token-verification-inputs-container">
                                <div id="token-verification-header">Check your email and input your verification code</div>
                                <div id="inputs-container">
                                    <input className="verification-token" type="text" onChange={this.nextInput} />
                                    <input className="verification-token" type="text" onChange={this.nextInput} />
                                    <input className="verification-token" type="text" onChange={this.nextInput} />
                                    <input className="verification-token" type="text" onChange={this.nextInput} />
                                    <input className="verification-token" type="text" onChange={this.nextInput} />
                                    <input className="verification-token" type="text" onChange={this.nextInput} />
                                </div>
                            </div>
                        }
                    </>
                }
                {
                    this.props.awaitingNewPassword &&
                    <div id="new-password-container" className="new-passwords-for-reset">
                        <div className="login-field-container conclusion-field-container">
                            <div className="login-value-title password" onClick={this.focusInput}>New Password</div>
                            <input className="login-info first-password password-input" type="password" name="password" title="password" onChange={validatePassword} />
                            <img src={visible} alt="" className="login-lock" onClick={() => togglePasswords()} />
                            <img src={checkmark} alt="" className="conclusion-checkmark initial-password-checkmark hidden" />
                        </div>
                        <div className="password-req-container">
                            <div className="pass-req length">-At least 7 characters</div>
                            <div className="pass-req capital">-One or more capital letters</div>
                            <div className="pass-req special-char">-One or more special characters</div>
                        </div>
                        <div className="login-field-container conclusion-field-container">
                            <div className="login-value-title password" onClick={this.focusInput}>Confirm Password</div>
                            <input className="login-info second-password" type="password" name="password" title="password" onChange={confirmPassword} />
                            <img src={visible} alt="" className="login-lock" onClick={() => togglePasswords()} />
                            <img src={checkmark} alt="" className="conclusion-checkmark confirm-password-checkmark hidden" />
                        </div>
                        <div id="pw-reset-button-container">
                            <div id="pw-reset-button" onMouseDown={this.validateBeforeNext}>submit</div>
                        </div>
                        {/* <div id="pw-reset-submit-button" onMouseDown={this.validateBeforeNext}>submit</div> */}
                    </div>
                }
            </div>
        )
    }
}

export default ResetPassword;