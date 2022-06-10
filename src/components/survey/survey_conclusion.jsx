// import lock from '../../icons/login-padlock.svg';
import bars from '../../icons/bars.png';
import visible from '../../icons/eye.svg';
import checkmark from '../../icons/checkmark.png';
import conclusion from '../../icons/conclusion.svg';
import { PROXY_URL } from '../../config';
// import { ValidationAlert } from './validation_alert';

function focusInput(e) {
    let ele = e.currentTarget.parentElement.querySelector('input');
    ele.select();
}

function validatePassword(e) {
    let specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/;
    let value = e.currentTarget.value;
    let length = value.length;

    if (length < 7) {
        document.querySelector('.length').classList.remove('hidden-req')
    } else {
        document.querySelector('.length').classList.add('hidden-req')
    }
    
    let capitalized = value.split('').some(char => char === char.toUpperCase());
    if (!capitalized) {
        document.querySelector('.capital').classList.remove('hidden-req')
    } else {
        document.querySelector('.capital').classList.add('hidden-req')
    };
    
    let specialChar = specialChars.test(value);
    if (!specialChar) {
        document.querySelector('.special-char').classList.remove('hidden-req')
    } else {
        document.querySelector('.special-char').classList.add('hidden-req')
    };

    if (length && capitalized && specialChar) {
        document.querySelector('.password-req-container').classList.add('hidden');
        document.querySelector('.initial-password-checkmark').classList.remove('hidden');
        document.querySelector('.initial-password-checkmark').classList.add('verified');
    } else {
        document.querySelector('.password-req-container').classList.remove('hidden');
        document.querySelector('.initial-password-checkmark').classList.add('hidden');
        document.querySelector('.initial-password-checkmark').classList.remove('verified');
    }

    let secondPassCheckmark = document.querySelector('.confirm-password-checkmark');
    if (!secondPassCheckmark.classList.contains('hidden')) {
        if (e.currentTarget.value !== document.querySelector('.second-password').value) {
            console.log('first and second not the same')
            secondPassCheckmark.classList.add('hidden');
        }
    } else {
        if (e.currentTarget.value === document.querySelector('.second-password').value) {
            secondPassCheckmark.classList.remove('hidden');
        }
    }
}

function confirmPassword(e) {
    let firstPassword = document.querySelector('.first-password').value;
    if (firstPassword === "") return;
    if (firstPassword === e.currentTarget.value) {
        document.querySelector(".confirm-password-checkmark").classList.remove("hidden")
        document.querySelector(".confirm-password-checkmark").classList.add("verified")
    } else {
        document.querySelector(".confirm-password-checkmark").classList.add("hidden")
        document.querySelector(".confirm-password-checkmark").classList.remove("verified")
    }
}

function togglePasswords() {
    let passwords = document.querySelectorAll('input');
    passwords.forEach(pw => pw.type = pw.type === "text" ? "password" : "text")
}

function renderNewUser() {
    return (
        <>
            <div className="password-req-container">
                <div className="pass-req length">-At least 7 characters</div>
                <div className="pass-req capital">-One or more capital letters</div>
                <div className="pass-req special-char">-One or more special characters</div>
            </div>
            <div className="login-field-container conclusion-field-container">
                <div className="login-value-title password" onClick={focusInput}>Password</div>
                <input className="answer login-info first-password password-input" type="password" name="password" title="password" onChange={validatePassword} />
                <img src={visible} alt="" className="login-lock" onClick={() => togglePasswords()}/>
                <img src={checkmark} alt="" className="conclusion-checkmark initial-password-checkmark hidden" />
            </div>
            <div className="login-field-container conclusion-field-container">
                <div className="login-value-title password" onClick={focusInput}>Confirm Password</div>
                <input className="answer login-info second-password" type="password" name="password" title="password" onChange={confirmPassword} />
                <img src={visible} alt="" className="login-lock" onClick={() => togglePasswords()}/>
                <img src={checkmark} alt="" className="conclusion-checkmark confirm-password-checkmark hidden" />
            </div>
        </>
    )
}

function renderExistingUser() {
    return (
        <>
            <div className="login-field-container conclusion-field-container">
                <div className="login-value-title password" onClick={focusInput}>Password</div>
                <input className="answer login-info password-input" type="password" name="password" title="password" />
                <img src={visible} alt="" className="login-lock" onClick={() => togglePasswords()}/>
            </div>
        </>
    )
}

function validateBeforeNext(goesTo, newUserBool) {
    let verified = document.querySelectorAll('.verified');

    if (newUserBool && verified.length < 2) return alert("Fix password"); //validation for new user, existing user next line
    if (!newUserBool && document.querySelector('input').value.length < 4) return alert("Password too short");

    this.selectQuestion({ target: { id: "next" } }, false, { "dataset": { goesTo } })
}

function dataUseHelper(text) {
    try {
        let types = text.match(/(###)\w+/g)[0].split("###")[1];
        return this.renderInputData(null, null, types, text);
    } catch (e) {
        console.log(e);
        return text;
    };
}

export function renderConclusionPage(newUserBool) {
    console.log(this.survey);
    // let prompt = this.survey.prompts[this.activePrompt]
    this.renderNewUser = renderNewUser.bind(this);
    this.renderExistingUser = renderExistingUser.bind(this);
    this.validateBeforeNext = validateBeforeNext.bind(this);
    this.dataUseHelper = dataUseHelper.bind(this);
    let customer = this.survey.customer || "loxz";

    let prompt = this.survey.prompts[newUserBool ? "newUser" : "existingUser"]
    
    let header = prompt.header;
    header = this.dataUseHelper(header);
    
    let textBody = prompt.prompts;
    textBody = textBody.map(text => this.dataUseHelper(text));
    
    let goesTo = newUserBool ? "SIGNUP" : "LOGIN";
    let color = prompt.color;

    return (
        <div id="conclusion-container">
            <div id="conclusion-banner-container">
                <img src={PROXY_URL + `/api/assets/logos/logo/${customer}_logo-png`} alt="" className="customer-logo" />
            </div>
            <div id="conclusion-body-container">
                <div className="landing-split-container conclusion-split-container left">
                    <div className="conclusion-header">{header}</div>
                    <div id="landing-header-divider" />
                    {textBody && textBody.map((p, i) => <div className='landing-prompts' key={"prompt-message" + i.toString()}>{p}</div>)}
                    {newUserBool ? this.renderNewUser() : this.renderExistingUser()}
                    <div id="conclusion-submit-button" onMouseDown={() => this.validateBeforeNext(goesTo, newUserBool)} style={{"background-color": color}}>{prompt.button}</div>
                </div>
                <div className="landing-split-container conclusion-split-container right">
                    <div className="header-container">
                        <div className="conclusion-header">Get your MLR Score in Seconds</div>
                        <img id="conclusion-img" className="conclusion-bars" src={bars} alt="" />
                    </div>
                    <img src={conclusion} alt="" id="conclusion-circle-img" />
                    <div id="conclusion-bullets-container">
                        <div className="prompt-bullet-container">
                            <div className="bullet lime" />
                            <div className="conclusion-bullet-text">Discover ML Aptitude</div>
                        </div>
                        <div className="prompt-bullet-container">
                            <div className="bullet royalblue" />
                            <div className="conclusion-bullet-text">Map Career Trajectory</div>
                        </div>
                        <div className="prompt-bullet-container">
                            <div className="bullet teal" />
                            <div className="conclusion-bullet-text">Discover strengths in ML</div>
                        </div>
                        <div className="prompt-bullet-container">
                            <div className="bullet salmon" />
                            <div className="conclusion-bullet-text">Unlock Dashboard Insights</div>
                        </div>
                    </div>
                    {/* <img id="prompt-img" src={dashPrev} alt="" /> */}
                    {/* <div id="landing-submit-button" onMouseDown={() => this.selectQuestion({ target: { id: "next" } }, false, { "dataset": { goesTo } })}>{prompt.button}</div> */}
                </div>            
            </div>
            <div id="landing-footer-container"></div>
        </div>
    )
}