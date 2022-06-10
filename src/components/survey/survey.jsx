import React from 'react';
// import ReactGA from 'react-ga';
import question from '../../icons/question.png';
import autosize from 'autosize';
import arrowDown from '../../icons/arrow-down.png';
import circle from '../../icons/circle.png';
import checkmark from '../../icons/checkmark.png';
import lightbulb from '../../icons/info.png';
import next from '../../icons/nextSection.png';
import NumberFormat from 'react-number-format';
import { SurveySelectorModal } from './survey_selector_modal';
import LoginPopup from '../login/login_popup_container';
import UserProfile from '../user_profile/user_profile_container';
import { renderLandingPage } from './survey_landing';
import { renderConclusionPage } from './survey_conclusion';
import { ValidationAlert } from './validation_alert';
import { PROXY_URL, __CLIENT, __client } from '../../config';

const ANSWER_NOT_FOUND = "ANSWER_NOT_FOUND";
const ANSWERS_NOT_FOUND = "ANSWERS_NOT_FOUND";
const ANSWER_FOUND = "ANSWER_FOUND";
const ANSWER_IS_0 = "ANSWER_IS_0";
const I_DONT_KNOW = "I_DONT_KNOW";

class Survey extends React.Component {
    constructor(props) {
        super(props);
        window.Intercom('boot', {
            app_id: "wfrwqepf"
        })
        this.survey = false;
        this.updateUserData = this.updateUserData.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.clear = this.clear.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
        this.selectAnswer = this.selectAnswer.bind(this);
        this.extractData = this.extractData.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.verifyContent = this.verifyContent.bind(this);
        this.submit = this.submit.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.otherPrompt = this.otherPrompt.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragging = this.dragging.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.handleSwipeStart = this.handleSwipeStart.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
        this.renderSurveyInstructions = this.renderSurveyInstructions.bind(this);
        this.handleSurveyChange = this.handleSurveyChange.bind(this);
        this.renderLandingPage = renderLandingPage.bind(this);
        this.renderConclusionPage = renderConclusionPage.bind(this);
        this.diffX = 0;
        this.diffY = 0;
        this.draggingBool = false;
        this.styles = {};
        this.dragKnob = 0;
        this.dragSection = 0;
        this.submitted = false;
        this.newUser = true;
        this.backendUserData = {};
        this.newUserData = { "ENTITY": __CLIENT }
        // this.newUserData = {"NAME": "student", "EMAIL": "student-test@test.edu"}
        this.activeQuestion = -1;
        this.activePrompt = "welcome";
        // this.activePrompt = "submit";
        this.promptState = true;
        this.htmlSurvey = {};
        this.next = true;
        this.href = window.location.href;
        this.existingUser = false;
        this.finished = false;
        this.startTime = Date.now();
        this.previousElapsedTime = 0;
        this.otherInput = false;
        this.otherInputted = false;
        this.dropdown = false;
        this.answerIds = [];
        this.dragStartPOS = false;
        this.tableColumnFirstRowAnswers = false;
        this.tableColumnAnswerState = false;
        this.branchingPath = [];
        this.branchingPathPlaceholder = [];
        this.activeSection = 0;
        this.toolTipIconState = false;
        this.renderedInstructions = false;
        this.currentSectionAnswerCount = 0;
        this.answerCount = 0;
        this.wentBack = false;
        this.displayingUserInfo = false;
        this.swipeStartTime = 0;
        this.swipeEndTime = 0;
        this.swipeStartPOS = 0;
        this.swipeEndPOS = 0;
        this.swipped = false;
        this.showUserProfile = false;
        this.validationError = false;
        this.validationErrorMessage = "No Error";
        this.wentBackAnimation = false;
    }

    componentDidCatch(e) {
        debugger
    }

    componentDidUpdate() {
        // console.log(this.promptState)
        if (!this.survey) {
            this.survey = this.props.surveys.survey;
            if (this.survey && !this.survey.answers) this.survey["answers"] = {};
            this.setState(() => this.survey)
        }
        let open = document.querySelectorAll(".open");
        if (open) autosize(open);
        if (this.activeQuestion < 0) this.promptState = true;
    }

    async componentDidMount() {
        console.log("UPDATE 5/12/22")
        // ReactGA.pageview("Survey");
        if (localStorage.authentication && !this.props.loggedIn) {
            console.log("authenticating automatically from componentDidMount")
            this.props.authenticate(JSON.parse(localStorage.authentication))
        }
        if (this.props.user) {
            this.newUserData = {
                "NAME": this.props.user.name,
                "EMAIL": this.props.user.email,
                "PHONE": this.props.user.phone,
                "ROLE": this.props.user.role,
                "SURNAME": this.props.user.surname,
                "ORGNAME": this.props.user.company,
                "ORGWEB": this.props.user.website,
                "ENTITY": __CLIENT
            }
        }

        setTimeout(() => {
            if (!this.props.archivalScore && !this.props.currentScore && this.props.user) {
                let identifier = {};
                identifier["email"] = this.props.user.email;
                identifier["phone"] = this.props.user.phone;
                this.props.findScore(identifier);
            }
        }, 3000)

        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keypress', this.handleKeyPress);
        document.addEventListener('click', () => this.handleClick());
        document.addEventListener('mousemove', this.dragging);
        document.addEventListener('mouseup', this.dragEnd);
        document.addEventListener('touchstart', this.handleSwipeStart);
        document.addEventListener('touchmove', this.handleSwipe);
        document.addEventListener('touchend', this.handleSwipeEnd);
        this.href = this.href.split('/#/')[0];
        this.setState(() => this.survey);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keypress', this.handleKeyPress);
        document.removeEventListener('keyup', this.handleKeyUp);
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('mousedown', this.dragStart);
        document.removeEventListener('mousemove', this.dragging);
        document.removeEventListener('mouseup', this.dragEnd);
        document.removeEventListener('touchstart', this.handleSwipeStart);
        document.removeEventListener('touchmove', this.handleSwipe);
        document.removeEventListener('touchend', this.handleSwipeEnd);
    }

    clear(e) {
        e.currentTarget.value = e.currentTarget.value === e.currentTarget.defaultValue ? "" : e.currentTarget.value;
    }

    handleSurveyChange(event) {
        document.title = event.target.innerText
        if (!this.props.surveys.survey) {
            // "ML_READINESS", "STUDENT_SURVEY_UCI", "STUDENT_SURVEY_SBC"
            this.props.getSurvey(event.target.value);
        } else {
            this.survey = this.props.surveys.survey;
            if (this.props.dashboard.dashboard === "MY_TEAM") this.survey = this.props.surveys.helpRequest;
            if (this.survey && !this.survey.answers) this.survey["answers"] = {};
        }
    }

    updateUserData(action, content) {
        
        if (!action || action === "false") return;
        if ((action === "NAME" || action === "SURNAME") && content) content = content[0].toUpperCase() + content.slice(1);
        if (action === "PHONE") content = this.phoneNumber(content);
        this.newUserData[action] = content;
    }

    userDataForBackend() {
        let password = document.querySelector(".password-input").value;
        let userData = {
            name: this.newUserData["NAME"],
            surname: this.newUserData["SURNAME"],
            email: this.newUserData["EMAIL"].toLowerCase(),
            phone: this.newUserData["PHONE"],
            role: this.newUserData["ROLE"],
            company: this.newUserData["ORGNAME"],
            website: this.newUserData["ORGWEB"],
            surveys: this.props.takenSurveyId ? [this.props.takenSurveyId] : [],
            ml_score: this.newUserData["ML_SCORE"],
            client: false,
            password
        };
        return userData;
    }

    async redirectToDashboard() {
        if (!this.props.loggedIn) {
            let userData = this.userDataForBackend();
            let loggedIn = await this.props.login(userData);
            if (loggedIn) window.location.href = this.href + '/#/dashboard';
            this.finished = true;
        } else {
            window.location.href = this.href + "/#/dashboard";
        }
    }

    async addNewUser() {
        let userData = this.userDataForBackend();
        let user = await this.props.newUser(userData);
        if (user) {
            let loggedIn = await this.props.login(userData);
            if (loggedIn) this.redirectToDashboard();
        }
    }

    async submit() {
        this.survey["elapsedTime"] = Math.floor((Date.now() - this.startTime) / 1000);
        let score;

        score = await this.props.scoreSurvey({
            survey: this.survey,
            user: this.newUserData,
        });

        this.newUserData["ML_SCORE"] = score || {};
        this.existingUser = await this.props.userCheck(this.newUserData["EMAIL"]);
        this.props.submitSurvey({
            survey: this.survey,
            user: this.newUserData,
        });
        this.submitted = true;

        // ReactGA.event({
        //     category: "SURVEY",
        //     action: "SUBMIT_SURVEY",
        //     label: "SBC"
        // })
    }

    async verifyContent(text, alertBoolean) {
        
        try {
            let question = this.survey.questions[this.activeQuestion];
            let next = document.querySelector("#next");
            if (question.type === "open") {
                if (!next.classList.value.includes("greyed-out")) next.classList.add("greyed-out")
                switch (question.error.test) {
                    case "string":
                        if (text.length > 1) {
                            next.classList.remove("greyed-out")
                            this.validationError = false;
                            this.validationErrorMessage = "";
                            this.setState(() => this.validationError);
                            return true;
                        }
                        if (alertBoolean) {
                            this.validationError = true;
                            this.validationErrorMessage = question.error.msg;
                            this.setState(() => this.validationError);
                        }
                        return false;
                    case "email":
                        let arr = text.split(/@[a-z]*./gi);
                        if (arr[0].length > 0 && arr[1] && arr[1].length > 1) {
                            this.validationError = false;
                            this.validationErrorMessage = "";
                            this.setState(() => this.validationError);
                            next.classList.remove("greyed-out");
                            return true;
                        }
                        if (alertBoolean) {
                            this.validationError = true;
                            this.validationErrorMessage = question.error.msg;
                            this.setState(() => this.validationError);
                        }
                        return false;
                    case "number":
                        let number = parseInt(text);
                        if (number || number === 0) {
                            this.validationError = false;
                            this.validationErrorMessage = "";
                            this.setState(() => this.validationError);
                            return true;
                        }
                        if (alertBoolean) {
                            this.validationError = true;
                            this.validationErrorMessage = question.error.msg;
                            this.setState(() => this.validationError);
                        }
                        return false
                    default:
                }
            } else if (question.type === "single") {
                if (!next.classList.value.includes("greyed-out")) next.classList.add("greyed-out");
                let anySelected = document.querySelector('.selected');
                if (anySelected) next.classList.add("greyed-out")
            } else {
                console.log('not open')
            }
        } catch (e) {
            console.log(e)
        }

    }

    phoneNumber(unparsed) {
        let parsed;
        parsed = unparsed.slice(1, 4) + unparsed.slice(6, 9) + unparsed.slice(10, 14)
        return parseInt(parsed);
    }

    handleKeyDown(e) {
        e.stopPropagation();
        let ignoreArrows = e.path ? e.path[0].type === "textarea" : false;
        switch (e.key) {
            case "Enter":
                if (!window.innerWidth < 1000) e.preventDefault()
                if (this.otherInput) return this.otherInputted = true;
                this.selectQuestion({ target: { id: "next" } }, this.survey.answers[this.activeQuestion])
                break
            case "ArrowDown":
                if (ignoreArrows) return;
                e.preventDefault()
                this.selectQuestion({ target: { id: "next" } }, this.survey.answers[this.activeQuestion])
                break
            case "ArrowUp":
                if (ignoreArrows) return;
                e.preventDefault()
                this.selectQuestion({ target: { id: "previous" } })
                break
            case "D":
                debugger
                break
            default:
                if (!e.target.value) return
                break
        }
    }

    handleSwipeStart(e) {
        this.swipeStartPOS = e.touches[0].clientY;
        this.swipeStartTime =  new Date();
    }

    handleSwipe(e) {
        this.swipped = true;
        this.swipeEndPOS = e.touches[0].clientY;
    }

    handleSwipeEnd(e) {
        let delta = this.swipeStartPOS - this.swipeEndPOS;
        this.swipeEndTime = new Date();
        console.log((this.swipeEndTime-this.swipeStartTime)*delta);
        //console.log(delta);
        if (!this.swipped) return;
        if (((this.swipeEndTime-this.swipeStartTime)*delta) > 8000) {
            this.selectQuestion({ target: { id: "next" } }, this.survey.answers[this.activeQuestion])
        } else if (((this.swipeEndTime-this.swipeStartTime)*delta) < -8000) {
            this.selectQuestion({ target: { id: "previous" } })
        };
        this.swipped = false;
    }

    handleClick(e) {
        if (this.dropdown) this.toggleDropdown();
        return
    }

    handleKeyPress(e) {
        autosize(document.querySelectorAll('.open'))
    }

    handleKeyUp(e) {
        switch (e.key) {
            case "Backspace":
                if (!e.target.value) return
                this.verifyContent(e.target.value.slice(0, -1), false)
                break
            default:
                if (!e.target.value) return
                console.log(e.target.value)
                this.verifyContent((e.target.value ? e.target.value : ""), false);
                break

        }
    }

    dragStart(e) {
        this.draggingBool = true;
        let knob = e.target;
        let origin = parseInt(knob.style.left.split('px')[0]);
        origin = !origin ? 0 : origin;
        this.diffX = e.screenX - origin;
        this.dragKnob = knob.dataset.dragNum;
        this.dragSection = knob.dataset.dragSection;
    }

    dragging(e) {
        if (!this.draggingBool) return;
        var left = e.screenX - this.diffX;
        let section = document.querySelectorAll('.hub-section-container')[this.dragSection];
        let knobs = section.querySelectorAll('.hub-section-slider-knob');
        let knob = knobs[this.dragKnob];
        let slider = knob.parentElement;
        let sliderPercentage = knob.parentElement.nextSibling.children[0];
        if (!knob) return;

        knobs = Array.from(knobs)
        let leftValues = knobs.map(knob => knob.style.left)
        console.log(Math.ceil(((parseInt(leftValues[0]) + knob.offsetWidth) / slider.offsetWidth) * 100))

        if (left + knob.offsetWidth > slider.offsetWidth || left < 0) {
            return;
        }

        knob.style.left = left.toString() + 'px';
        let percentage = Math.ceil((left + knob.offsetWidth) / slider.offsetWidth * 100);
        sliderPercentage.innerText = percentage.toString() + "%";
    }

    dragEnd(e) {
        if (!this.draggingBool) return;
        
        let section = document.querySelectorAll('.hub-section-container')[this.dragSection];
        let knobs = section.querySelectorAll('.hub-section-slider-knob');
        let knob = knobs[this.dragKnob];
        let sliderPercentage = knob.parentElement.nextSibling.children[0];

        this.selectAnswer({
            currentTarget: { dataset: { type: "hub" } },
            hubAnswer: sliderPercentage
        });
        this.draggingBool = false;
        this.setState(() => this.draggingBool);
        console.log('dragging event ended')
    }

    elapsedTime() {
        let elapsedTime = (Date.now() - this.startTime) / 1000 - this.previousElapsedTime;
        this.previousElapsedTime = this.previousElapsedTime + elapsedTime;
        elapsedTime = Math.floor(elapsedTime);
        return elapsedTime;
    }

    async awaitOtherInput(e) {
        this.otherInput = true; //this state tells handleKeyDown to bypass normal function and instead set otherInputted to true
        if (!this.otherInputted) { //by adding a "listener" to this.handleKeyDown case: "Enter" we can bypass normal process and instead switch this.otherInputted state to true
            setTimeout(() => this.awaitOtherInput(e), 1000) //recursive call of function passing event object each time
            console.log(Date.now())
        } else {
            this.selectAnswer(e);
            this.otherInput = false;
            this.otherInputted = false;
        }
    }

    otherPrompt(e) {
        if (e.currentTarget.classList.contains('selected')) return this.selectAnswer(e);
        let other = document.querySelector(".other");
        if (!other && process.env.NODE_ENV === "development") alert('DEV NOTE no div with classname ".other" found, this function should only be called when "Other" option is a valid answer and this option should also always have ".other" included in its classlist');
        if (document.querySelector('.other-input')) {
            other.classList.toggle('selected');
            return;
        }

        let enterIcon = document.createElement('kbd');
        enterIcon.classList = "other-input-icon";
        enterIcon.innerText = 'Enter';

        let expandedOther = document.createElement('input');
        expandedOther.classList = "other-input";
        other.appendChild(expandedOther);
        other.append(enterIcon)
        expandedOther.focus();
        this.awaitOtherInput(e)
    }

    handleLogin(boolean) {
        if (!this.props.user) {
            this.props.loggingInState(boolean)
        } else {
            document.querySelector('.expanded-user-profile-container').classList.toggle('hidden');
        }
    }

    toggleToolTip(toolTip) {
        let toolTipDiv = document.querySelectorAll('.tooltip-text');
        toolTipDiv = toolTip.number ? toolTipDiv[toolTip.number] : toolTipDiv[0];
        let currentStyle = window.getComputedStyle(toolTipDiv).visibility;
        let yOffset;
        let newStyle;
        if (currentStyle === "visible") {
            newStyle = "hidden";
            yOffset = "0px";
            toolTipDiv.style.visibility = newStyle;
            toolTipDiv.style.transform = `translateY(${yOffset})`;
            setTimeout(() => {
                toolTipDiv.style.display = "none";
            }, 1000)
        } else {
            toolTipDiv.style.display = "flex";
            newStyle = "visible";
            yOffset = "-100px";
            setTimeout(() => {
                toolTipDiv.style.visibility = newStyle;
                toolTipDiv.style.transform = `translateY(${yOffset})`;
            }, 10)
        }
    }

    toolTip(toolTip) {
        return (
            <div className={toolTip.answerTip ? "tooltip-container answer-tooltip" : "tooltip-container"} onMouseEnter={() => this.toggleToolTip(toolTip)} onMouseLeave={() => this.toggleToolTip(toolTip)}>
                <img src={question} alt="?" className="tooltip-logo" />
            </div>
        )
    }

    clearTooltips() {
        let container = document.querySelector('.tooltips-container');
        try {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        } catch (e) {
            // console.log(e)
        }

    }

    populateTooltip(tooltip) {
        console.log('populating tooltip [if msg repeats caught in loop, see populateToolTips()]')
        let container = document.querySelector('.tooltips-container');
        if (!container) {
            return setTimeout(() => this.populateTooltip(tooltip), 500)
        }
        let newTooltip = document.createElement('div');
        newTooltip.innerText = tooltip.text;
        newTooltip.className = `tooltip ${tooltip.id}`;
        if (!this.toolTipIconState) {
            this.toolTipIconState = true;
            let toolTipIcon = document.createElement('img');
            toolTipIcon.src = lightbulb;
            toolTipIcon.classList.add('tooltip-lightbulb');
            toolTipIcon.title = "Hover over specific questions or answers for tooltips"
            container.appendChild(toolTipIcon);
        }
        container.appendChild(newTooltip);
    }

    checkSectionChange() {
        if (window.innerWidth < 1000) return
        this.survey.manifest.sections.sectionIds.forEach((id, idx) => {
            if (id === this.activeQuestion) {
                this.activeSection = idx + 1;
                document.querySelectorAll('.survey-section')[idx].classList.remove('incomplete')
                this.currentSectionAnswerCount = 0;
            }
        })
    }

    updateProgressTracker() {
        if (window.screen.width < 1000) {
            let totalQuestions = Object.keys( this.props.surveys.survey.questions ).length; 
            this.setState(() => this.props.surveys.survey.answers);
            this.answerCount = this.answerCount + 1;
            console.log(this.answerCount)
            let percentFinished = (this.answerCount/totalQuestions) * 100
            console.log(percentFinished)
            return document.querySelector('#header-progress-bar').style.width = percentFinished + 'vw';
        }
        if (this.survey.answers[this.activeQuestion]) return;
        this.currentSectionAnswerCount = this.currentSectionAnswerCount + 1;
        let sectionManifest = this.survey.manifest.sections
        let totalAnswerCount = sectionManifest.questionCounts[this.activeSection - 1]
        let width = document.querySelector('#header-footer').offsetWidth;
        let sectionDots = document.querySelectorAll('.section-dot')
        let currentSectionPos;
        let nextSectionPos;

        try {
            currentSectionPos = sectionDots[this.activeSection - 1].getBoundingClientRect()['x'];
            nextSectionPos = sectionDots[this.activeSection].getBoundingClientRect()['x'];
        } catch {
            try {
                currentSectionPos = sectionDots[this.activeSection].getBoundingClientRect()['x'];
                nextSectionPos = sectionDots[this.activeSection + 1].getBoundingClientRect()['x'];
            } catch {
                debugger
                return
            }
        }

        let offsetWidth;
        if (this.activeSection === 0) {
            offsetWidth = Math.floor(this.currentSectionAnswerCount / sectionManifest.questionCounts[0] * currentSectionPos)
        } else if (nextSectionPos === "LAST") {
            offsetWidth = Math.floor(this.currentSectionAnswerCount / totalAnswerCount * (width - currentSectionPos) + currentSectionPos)
        } else {
            offsetWidth = Math.floor(this.currentSectionAnswerCount / totalAnswerCount * (nextSectionPos - currentSectionPos) + currentSectionPos)
        }

        document.querySelector('#header-progress-bar').style.width = offsetWidth.toString() + 'px';
        console.log("active section:", this.activeSection)
        console.log("answer count:", this.currentSectionAnswerCount)
    }

    goToSectionHelper(sectionNum, id) { //id is the id of the first question of each section
        if (this.activeSection > sectionNum) { //i.e. we are jumping backwards and must remove id's from branching path
            // if (sectionNum === 1) return;
            while (this.branchingPath.slice(-1)[0] !== id) {
                this.branchingPathPlaceholder.unshift(this.branchingPath.pop());
            }
        } else { //i.e. we are jumping forward and must add the correct branching path id's to get the survey navigation in sync
            while (this.branchingPath.slice(-1)[0] !== id) {
                this.branchingPath.push(this.branchingPathPlaceholder.shift())
            }
        }
    }

    goToSection(sectionNum) {
        let sectionHeaders = document.querySelectorAll('.survey-section');
        if (sectionHeaders[sectionNum - 1].classList.value.includes('incomplete')) return;
        let id = this.survey.manifest.sections.sectionIds[sectionNum - 1]
        this.goToSectionHelper(sectionNum, id);
        this.activeQuestion = id;
        this.setState(() => this.activeQuestion);
        setTimeout(() => this.adjustCurrentQuestion(), 100);
    }

    staggeredPromptHTML(promptText) {
        let newPrompt = document.createElement('div');
        newPrompt.classList.add('prompt', 'staggered-prompt');
        newPrompt.innerText = promptText;
        return newPrompt;
    }

    insertStaggeredPrompts(prompt) {
        let staggeredPrompts = document.querySelectorAll('.staggered-prompt')
        staggeredPrompts.forEach(p => {
            console.log(p.innerText === prompt.prompt)
            if (p.innerText.slice(0, 50) === prompt.prompt.slice(0, 50)) setTimeout(() => p.classList.add('fade-in'), prompt.delay);
        })
    }

    linkAnswerWithTooltip(id, boolean) {
        let toolTip = document.querySelector(`.${id}`)
        if (!toolTip) return;
        if (boolean) {
            toolTip.style.display = 'flex';
        } else {
            toolTip.style.display = '';
        }
    }

    addTooltip(id) {
        let toolTip = document.querySelector(`.${id}`)
        if (!toolTip) return;
        toolTip.style.display = 'flex';
    }

    toggleDropdown(e) {
        if (this.otherInput) return;
        this.dropdown = !this.dropdown;
        this.setState(() => this.dropdown);
    }

    answersList() {
        let arr = Object.values(this.survey.answers);
        let answers = [];
        arr.forEach(subarr => {
            subarr.forEach(answer => {
                answers.push(answer.answerId)
            })
        })
        return answers;
    }

    alternateLogic(logicArr) {
        if (logicArr.some(logic => {
            let [answerId, answerIds, questionId, row] = [logic.answerId, logic.answerIds, logic.questionId, logic.row];
            let targetQuestionAnswers = this.survey.answers[questionId]
            if (!targetQuestionAnswers && logic.type !== I_DONT_KNOW) return true;
            let boolean;
            switch (logic.type) {
                case ANSWER_NOT_FOUND:
                    if (row || row === 0) {
                        boolean = !(targetQuestionAnswers[row].answerId === answerId);
                    } else {
                        boolean = !(targetQuestionAnswers.some(targetObj => targetObj.answerId === answerId));
                    }
                    return boolean;
                case ANSWERS_NOT_FOUND:
                    if (row || row === 0) {
                        boolean = !(answerIds.some(answerId => answerId === targetQuestionAnswers[row].answerId));
                    } else {
                        boolean = !(answerIds.some(answerId => targetQuestionAnswers.some((targetAnsObj) => targetAnsObj.answerId === answerId)));
                    }
                    return boolean;
                case ANSWER_FOUND:
                    if (row || row === 0) {
                        boolean = targetQuestionAnswers[row].answerId === answerId;
                    } else {
                        boolean = targetQuestionAnswers.some(targetObj => targetObj.answerId === answerId);
                    }
                    return boolean
                case ANSWER_IS_0:
                    let answer = parseInt(targetQuestionAnswers[0].answer)
                    if (answer) return false; //since 0 is false in js if parseInt succeeded in generating an integer we know it is a number which is not zero
                    try {
                        boolean = answer === 0;
                    } catch {
                        boolean = true //parseInt failed to convert the answer into a number meaning invalid input for switch question, so we skip...
                    }
                    return boolean
                case I_DONT_KNOW:
                    let count = Object.values(this.survey.answers).flat().map(ans => ans.answer).filter(ans => ans === "I do not know").length;
                    return count < logic.threshold;
                default:
                    if (process.env.NODE_ENV === "development") alert('default alternate logic function')
            }
            console.log(`running alternate logic ${logic.type} returns ${boolean}`)
            return false;
        })) return true;
        return false;
    }

    alternateRender(question) {
        if (!question.alternateLogic) return question.dataUse ? question : question.question;
        let boolean = this.alternateLogic(question.alternateLogic);
        if (!boolean) return question.dataUse ? question : question.question;
        let questionText;
        questionText = question.alternateQuestion;

        if (question.dataUse) question["question"] = questionText;
        return question.dataUse ? question : questionText;
    }

    rejectQuestion(question) {
        let boolean = this.alternateLogic(question.skipQuestion);
        return boolean;
    }

    rejectSection(section) {
        let boolean = this.alternateLogic(section.skipSection);
        return boolean;
    }

    rejectRow(row) {
        let boolean = this.alternateLogic(row.skipRow);
        return boolean;
    }

    renderInputData(question, prompt, types, text) {
        if (question || prompt) {
            types = question ? question.dataUse : prompt.dataUse;
            text = question ? question.question : prompt.prompt;
        }

        if (typeof types === "string") {
            text = text.replace(`###${types}`, this.newUserData[types]);
        } else {
            types.forEach(type => text = text.replace(`###${type}`, this.newUserData[type]))
        }
        return text;
    }

    multipleRenderHelper(clientAnswers, answer) {
        let otherAnswer = clientAnswers.filter(ans => ans.otherSelection)[0];
        if (!otherAnswer) return false;
        if (otherAnswer.answerId === answer.answerId) return true;
        return false
    }

    hubRenderHelper(clientAnswers, answer, returnBoolean) {
        let percent = "0%";
        if (!clientAnswers) return percent;
        clientAnswers.forEach(clientAnswer => {
            if (clientAnswer.answerId === answer.answerId) {
                percent = clientAnswer.answer;
                return;
            }
        })

        if (returnBoolean) return percent === "0%" ? false : true;
        return percent;
    }

    goBack() {
        this.wentBackAnimation = true;
        this.validationError = false; //remove any error alert when goback
        this.validationErrorMessage = "";
        this.setState(() => this.validationError);
        // ReactGA.event({
        //     category: 'SURVEY',
        //     action: 'GO_BACK',
        //     label: 'DEV',
        // })
        if (this.branchingPath.length === 0) return;
        this.branchingPathPlaceholder.unshift(this.branchingPath.pop()); //must pop off the current activeQuestion in this.branchingPath to access the previous question
        let previousQuestion = this.branchingPath.pop();
        this.wentBack = true;
        return previousQuestion;
    }

    handleBranchingPath(questionNum) {
        if (questionNum === -1) return;
        let previousNum = this.branchingPath.slice(-1)[0];
        if (questionNum === previousNum) return;
        this.branchingPath.push(questionNum);
        // ReactGA.event({
        //     category: 'SURVEY',
        //     action: 'NEXT_QUESTION',
        //     label: 'DEV',
        // })
    }

    selectPrompt(question) {
        this.promptState = true;
        let goesTo = question.dataset.goesToPrompt;
        goesTo = goesTo.includes("###") ? goesTo.split("###") : goesTo; //unnecessary functionality as there is only one instance where a prompt needs to split currently (6/2021) and that is hardcoded in selectQuestions
        this.activePrompt = goesTo;
        this.setState(() => this.promptState)
        this.setState(() => this.activePrompt)
    }

    async selectQuestion(e, extracted, prompt) {

        if (this.otherInput) return this.otherInputted = true;
        if (this.branchingPath.length < 1 && e.target.id === "previous") return;
        let previousAnswer = this.survey.answers[this.activeQuestion];
        extracted = extracted || previousAnswer;
        if (this.finished) return;
        let question = document.querySelector(".question-container");
        prompt = prompt || document.querySelector("#prompt");
        let action = e.target.id;
        let delay = 0;
        let submitBool = question ? question.dataset.submit : prompt ? prompt.dataset.submit : false;

        if (submitBool === "true") { //submit survey to backend if we are on the submit prompt
            await this.submit()
            if (this.props.loggedIn) return this.redirectToDashboard();
            if (this.existingUser) {
                this.activePrompt = "existingUser";
            } else {
                this.activePrompt = "newUser"
            }
            return this.setState(() => this.activeQuestion);
        }

        if (question && question.dataset.goesToPrompt) { //if the current question goes to a prompt
            this.activePrompt = question.dataset.goesToPrompt;
        }

        this.handleBranchingPath(this.activeQuestion); //this is crucial for proper back-navigation
        //if we are on a prompt, we should move all this logic over to selectPrompt() eventually
        if (prompt) {
            if (prompt.dataset.goesTo === "LOGIN") return this.redirectToDashboard();
            if (prompt.dataset.goesTo === "SIGNUP") return this.addNewUser();
            // if (prompt.dataset.submit === "true") { //submit survey to backend if we are on the submit prompt
            //     await this.submit()
            //     if (this.props.loggedIn) return this.redirectToDashboard();
            //     if (this.existingUser) {
            //         this.activePrompt = "existingUser";
            //     } else {
            //         this.activePrompt = "newUser"
            //     }
            //     return this.setState(() => this.activeQuestion);
            // }
            if (prompt.dataset.goesToPrompt) return this.selectPrompt(prompt);
            if (!prompt.goesToPrompt) this.promptState = false;
            this.activeQuestion = prompt.dataset.goesTo;
            if (!prompt.skipProgress) {
                this.updateProgressTracker();
            } else {
                this.activePrompt = "";
            }
            this.renderNextQuestion(0);
            return;
        }

        
        switch (question.dataset.type) {
            case "single":
                let answer = document.querySelector('.selected');
                if (!answer && action !== "previous") return;
                if (!answer && !extracted && !this.survey.answers[this.activeQuestion] && action !== "previous") return;
                if (question.dataset.goesToPrompt && e.target.id !== "previous") return this.selectPrompt(question);
                let goesTo = answer && answer.goesTo ? answer.dataset.goesTo : question.dataset.goesTo;
                this.activeQuestion = e.target.id === "previous" ? this.goBack() : goesTo;
                //delay = e.target.id ? 0 : 500;
                delay = 0
                break
            case "multiple":
                extracted = await this.extractData();
                if (!extracted && action !== "previous") return;
                if (question.dataset.goesToPrompt && e.target.id !== "previous") return this.selectPrompt(question);
                this.activeQuestion = e.target.id === "previous" ? this.goBack() : question.dataset.goesTo;
                break
            case "open":
                extracted = await this.extractData();
                if (!extracted && action !== "previous") return;
                if (question.dataset.goesToPrompt && e.target.id !== "previous") return this.selectPrompt(question);
                this.activeQuestion = e.target.id === "previous" ? this.goBack() : question.dataset.goesTo;
                break
            case "rating":
                if (!extracted && !this.survey.answers[this.activeQuestion] && action !== "previous") return;
                if (question.dataset.goesToPrompt && e.target.id !== "previous") return this.selectPrompt(question);
                let selection = document.querySelector('.selected');
                this.activeQuestion = e.target.id === "previous" ? this.goBack() : selection.dataset.goesTo;
                delay = e.target.id ? 0 : 500;
                break
            case "table":
                extracted = await this.extractData();
                if (!extracted && action !== "previous") return;
                if (question.dataset.goesToPrompt && e.target.id !== "previous") return this.selectPrompt(question);
                this.activeQuestion = e.target.id === "previous" ? this.goBack() : question.dataset.goesTo;
                break
            case "dropdown-single":
                if (!extracted && !previousAnswer) extracted = await this.extractData();
                if (!extracted && action !== "previous") return;
                if (question.dataset.goesToPrompt && e.target.id !== "previous") return this.selectPrompt(question);
                this.activeQuestion = e.target.id === "previous" ? this.goBack() : question.dataset.goesTo;
                this.dropdown = false;
                this.setState(() => this.dropdown);
                break
            // case "hub":
            //     console.log('about to try and extract data from slider')
            //     extracted = await this.extractData();
            //     if (!extracted && action !== "previous") {
            //         console.log('failed to extract data')
            //         return;
            //     }
            //     console.log('succeeded in extracting data')
            //     console.log("answers: ", this.survey.answers)

            //     this.activeQuestion = e.target.id === "previous" ? this.goBack() : parseInt(question.dataset.goesTo);
            //     break
            default: 
                return;
        }
        this.generateAnsweredQuestion();
        this.updateProgressTracker();
        this.renderNextQuestion(delay);
    }

    generateAnsweredQuestion() {
        /*
        
        this.detectChange = this.answer
            this.setState(() => this.props.surveys.survey.answers);
            this.answerCount = this.answerCount + 1;
            console.log(this.answerCount)
            let percentFinished = (this.answerCount/totalQuestions) * 100
        
            */
        let previousAnswer = document.querySelector('#answered-question-container'); //we will make the current question the previous question in dom        
        let questionContainer = document.querySelector('.question-container');
        if (questionContainer && (document.getElementById("answered-question-container") == null)) {
            let answeredQuestionContainer = document.createElement('div');
            answeredQuestionContainer.id = 'answered-question-container';
            let surveyContainer = document.querySelector('#survey-container');
            let answeredQuestion = questionContainer.cloneNode(true);
            answeredQuestion.id = 'answered-question';
            answeredQuestion.classList.remove('question-container');
            console.log(answeredQuestion)
            setTimeout(() => {
                if (previousAnswer)
                    previousAnswer.parentElement.removeChild(previousAnswer);
                if (!questionContainer)
                    debugger;
                try {
                    let questionContainer = document.querySelector('.question-container');
                    surveyContainer.insertBefore(answeredQuestionContainer, questionContainer);
                } catch {
                    console.log("couldn't insert answered question, likely because it has already been inserted");
                };
                answeredQuestionContainer.appendChild(answeredQuestion);
                this.setState(() => this.activeQuestion);
            });
        } else {
            if (previousAnswer)
                previousAnswer.parentElement.removeChild(previousAnswer);
            this.setState(() => this.activeQuestion);
            this.adjustCurrentQuestion(true);
        } 
    }

    renderNextQuestion(delay) {
        let previousAnswer = document.querySelector('#answered-question-container'); //we will make the current question the previous question in dom        
        let questionContainer = document.querySelector('.question-container');
        if (questionContainer) {
            setTimeout(() => {
                if (previousAnswer) previousAnswer.remove();
                if (!questionContainer) debugger
                this.setState(() => this.activeQuestion);
                console.log('sending to adjust question w/ FALSE')
                this.adjustCurrentQuestion();
            }, delay);
        } else {
            if (previousAnswer) previousAnswer.parentElement.removeChild(previousAnswer);
            this.setState(() => this.activeQuestion);
            this.adjustCurrentQuestion(true);
        }
    }   

    adjustCurrentQuestion(fromPromptBoolean) {
        let currentQuestionContainer = document.querySelector('.question-container');
        if (!currentQuestionContainer) return setTimeout(() => {
            this.adjustCurrentQuestion(true)
        }, 100); //SINCE when we use the "lets go" button on prompts the next question is not in the dom during this functions first call WE recursively call this function waiting for the questionContainer to populate before moving on 
        if (fromPromptBoolean) return currentQuestionContainer.classList.add("slideInUp");
        let answeredQuestionContainer = document.querySelector('#answered-question');
        setTimeout(() => document.querySelector('#answered-question-container').remove(), 1000);
        this.wentBackAnimation ? answeredQuestionContainer.classList.add("slideOutDown") : answeredQuestionContainer.classList.add("slideOutUp")
        this.wentBackAnimation ? currentQuestionContainer.classList.add("slideInDown") : currentQuestionContainer.classList.add("slideInUp")
        this.wentBackAnimation = false;
    }

    async extractData(e) {
        //event only when question type is set to "single"
        let container = document.querySelector(".question-container")
        if (!container) return false;
        let question = container.querySelector(".question");
        let answers = container.querySelectorAll(".answer");
        let selected = container.querySelectorAll(".selected");
        let type = question.dataset.questionType;
        let num = question.dataset.questionNumber;

        if (question.dataset.questionType === "dropdown-single" && selected.length === 0) return false;

        if ((type === "single" && e) || type === "rating") {
            let htmlAnswer = e.currentTarget || e.target;
            if (htmlAnswer.classList.value.includes('answer-checkbox')) htmlAnswer = e.currentTarget.parentElement || e.target.parentElement;
            let answer = JSON.parse(htmlAnswer.dataset.answerObj)
            this.answerIds[answer.answerId] = answer.answer;
            selected = [{
                questionNum: parseInt(num),
                questionId: question.dataset.questionId,
                answerNum: parseInt(htmlAnswer.dataset.answer),
                answer: answer.other ? htmlAnswer.querySelector(".other-input").value : htmlAnswer.innerText, //in the case of "Other" we must grab the text user has input which is found in the child of the div we would normally extract inner text from
                answerId: htmlAnswer.dataset.answerId,
                otherSelection: !!answer.other,
                elapsedTime: this.elapsedTime()
            }]
        } else if (type === "single" && !e) {
            let answer = JSON.parse(e.target.dataset.answerObj)
            this.answerIds[answer.answerId] = answer.answer;
            selected = [{
                questionNum: parseInt(num),
                questionId: question.dataset.questionId,
                answerNum: parseInt(selected[0].dataset.answer),
                answer: selected[0].textContent,
                answerId: selected[0].dataset.answerId,
                otherSelection: !!answer.other,
                elapsedTime: this.elapsedTime()
            }]
        } else if (type === "multiple") {
            selected = Array.from(selected).map(answer => {
                let answerObj = JSON.parse(answer.dataset.answerObj)
                this.answerIds[answer.answerIds] = answer.answer;
                let answerText = answerObj.answer;
                if (!!answerObj.other) {
                    let otherInputField = document.querySelector('.other-input');
                    // if (this.activeQuestion === "YVQI4xHytSjT") debugger
                    if (!!otherInputField) {
                        answerText = otherInputField.value;
                    } else {
                        answerText = this.survey.answers[this.activeQuestion].filter(answer => !!answer.otherSelection)[0].answer; //previously given answer
                    }
                }
                return {
                    questionNum: parseInt(num),
                    questionId: question.dataset.questionId,
                    answerNum: parseInt(answerObj.number),
                    answer: answerText,
                    answerId: answerObj.answerId,
                    otherSelection: !!answerObj.other,
                    elapsedTime: this.elapsedTime()
                }
            });
        } else if (type === "open") {
            let verified = await this.verifyContent(answers[0].value, true);
            if (!verified) return false;
            this.answerIds[answers[0].dataset.answerId] = answers[0].dataset.answer;
            selected = [{
                questionNum: parseInt(num),
                questionId: question.dataset.questionId,
                answerNum: -1,
                answer: question.dataset.dataCapture === "PHONE" ? this.phoneNumber(answers[0].value) : answers[0].value,
                answerId: answers[0].dataset.answerId,
                elapsedTime: this.elapsedTime()
            }];
        } else if (type === "table") {
            let rowCount = container.querySelectorAll('.table-row-container').length;
            if (selected.length !== rowCount) {
                alert('please answer all rows');
                return;
            };

            selected = Array.from(selected).map(answer => {
                this.answerIds[answer.dataset.answerId] = answer.answer;
                return {
                    questionNum: parseInt(num),
                    questionId: question.dataset.questionId,
                    answerNum: parseInt(answer.dataset.answerNum),
                    answer: answer.dataset.answer,
                    answerId: answer.dataset.answerId,
                    row: parseInt(answer.dataset.row),
                    elapsedTime: this.elapsedTime()
                }
            })
        } else if (type === "dropdown-single") {
            let previousAnswer = this.survey.answers[this.activeQuestion];
            let answerObj = JSON.parse(e.target.dataset.answerObj);
            if (previousAnswer && selected.length === 0) {
                selected = previousAnswer;
            } else {
                this.answerIds[selected[0].dataset.answerId] = selected[0].dataset.answer;
                selected = [{
                    questionNum: parseInt(num),
                    questionId: question.dataset.questionId,
                    answerNum: parseInt(selected[0].dataset.answer),
                    answer: answerObj.other ? e.target.children[0].value : e.target.innerText, //in the case of "Other" we must grab the text user has input which is found in the child of the div we would normally extract inner text from
                    answerId: selected[0].dataset.answerId,
                    otherSelection: !!answerObj.other,
                    elapsedTime: this.elapsedTime()
                }]
            }
        } else if (type === "hub") {
            let questionObj = JSON.parse(question.dataset.questionObj);
            let sectionIds = questionObj.sections.map(section => {
                return (
                    section.answers.map(ans => ans.answerId)
                )
            })
            let selectedIds = Array.from(selected).map(ans => JSON.parse(ans.dataset.answerObj).answerId);
            let boolean = sectionIds.every(idList => idList.some(id => selectedIds.includes(id)))
            if (!boolean) {
                alert('please provide at least one answer for each section');
                return;
            };
            selected = Array.from(selected).map(answer => {
                let sectionObj = JSON.parse(answer.dataset.sectionObj);
                let answerObj = JSON.parse(answer.dataset.answerObj);
                return {
                    questionNum: parseInt(num),
                    questionId: question.dataset.questionId,
                    sectionNum: sectionObj.number,
                    answerId: answerObj.answerId,
                    answerNum: answerObj.number,
                    answer: answer.innerText,
                    elapsedTime: this.elapsedTime()
                }
            })
        } else {
            selected = false;
        }
        if (!selected[0] || !selected[0].answer) {
            console.log('false')
            debugger
            return false;
        }

        this.survey.answers[question.dataset.questionId] = selected;
        this.setState(() => this.survey);
        // ReactGA.event({
        //     category: 'SURVEY',
        //     action: 'SUBMIT_ANSWER',
        //     label: 'DEV',
        // })

        if (question.dataset.dataCapture && type === "open" ? answers[0].value : selected[0]) {
            this.updateUserData(question.dataset.dataCapture, type === "open" ? answers[0].value : selected[0].answer);
        }
        return true;
    }

    async selectAnswer(e) {
        let question = document.querySelector('.question-container');
        const checkNoneOfTheAbove = (div) => {
            let ansObj = JSON.parse(div.dataset.answerObj);
            return ansObj.noneOfTheAbove ? true : false
        }
        let answer = e.currentTarget || e.target;
        if (answer.classList.value.includes('answer-checkbox')) answer = e.currentTarget.parentElement || e.target.parentElement;

        let next = document.querySelector('.greyed-out');
        switch (answer.dataset.type) {
            case "open":
                answer.classList.toggle("selected");
                break
            case "single":
                answer.classList.toggle("selected");
                if (next) next.classList.toggle('greyed-out');
                break
            case "multiple":
                if (next) next.classList.toggle('greyed-out');
                let selected = question.querySelectorAll('.selected');
                if (checkNoneOfTheAbove(answer)) {
                    selected.forEach(div => {
                        if (!checkNoneOfTheAbove(div)) div.classList.remove('selected')
                    });
                } else {
                    selected.forEach(div => checkNoneOfTheAbove(div) ? div.classList.remove('selected') : null)
                }
                answer.classList.toggle("selected");
                if (answer.classList.contains("answer")) return;
                break
            case "rating":
                // answer.classList.toggle("selected");
                break
            case "dropdown-single":
                let previousSelection = question.querySelector('.selected');
                if (previousSelection) previousSelection.classList.toggle('selected');
                answer.classList.toggle("selected");
                if (next) next.classList.toggle('greyed-out');
                break
            case "dropdown-multiple":
                answer.classList.toggle("selected");
                break
            case "table":
                let htmlAnswers = answer.parentElement.children;
                let answersArray = Array.from(htmlAnswers);
                answersArray.forEach(answer => {
                    if (answer.classList.value.includes('selected')) answer.classList.toggle("selected")
                })
                answer.classList.toggle("selected");
                if (answer.classList.contains("answer")) return;
                debugger
                break
            case "hub":
                console.log('attempting to change css property of slider')
                e.hubAnswer.classList.toggle('selected');
                console.log('slider answer should now be highlighted')
                return;
            default:
                console.log('selectAnswer() default case')
        }
        let extracted = await this.extractData(e);
        this.selectQuestion(e, extracted);
    }

    renderAnswers(question) {
        
        let [answers, type, questionNumber, questionId, autoSelect, dataCapture, rows] = [question.answers, question.type, question.number, question.id, question.autoSelect, question.dataCapture, question.rose] //questions.rose because of json.stringify circular argument
        let answerNums = [];
        let value = "";
        let answersToSelect = this.survey.answers[this.activeQuestion];
        let priorAnswersToSelect;
        if (autoSelect && this.props.user) {
            priorAnswersToSelect = answers.filter(ans => ans.answer === this.props.user[autoSelect])
        };
        if (answersToSelect) {
            answerNums = answersToSelect.map(answer => answer.answerNum);
            if (answersToSelect.length > 0) value = answersToSelect[0].answer;
        }

        if (!answersToSelect && priorAnswersToSelect) answerNums = priorAnswersToSelect.map(answer => answer.number)
        let clientAnswers = this.survey.answers[this.activeQuestion];
        switch (type) {
            case "single":
                return answers.map((answer, idx) => (
                    <div
                        className={(answerNums.some(ans => ans === answer.number) ? "answer single selected" : "answer single") + (answer.other ? " other" : "") + (idx % 2 === 0 ? " even" : "")}
                        key={questionNumber + "-" + answer.number}
                        data-answer-id={answer.answerId}
                        onClick={answer.other ? this.otherPrompt : this.selectAnswer}
                        data-answer-obj={JSON.stringify(answer)}
                        data-goes-to={answer.goesTo}
                        data-question={questionNumber}
                        data-answer={answer.number}
                        data-type="single">
                        {answer.other && clientAnswers && clientAnswers[0].otherSelection ? answer.answer + ": " + clientAnswers[0].answer : "" + answer.answer} {/*if the current answer in this render loop is the "Other" option, and we have already received a previous answer for it we render the previous answer as part of the "Other" answer text, otherwise we just render the answer  */}
                        <div className="answer-checkbox"/>
                    </div>))
            case "multiple":
                return answers.map((answer, idx) => {
                    return (
                        <div
                            className={(answerNums.some(ans => ans === answer.number) ? "answer multiple selected" : "answer multiple") + (answer.other ? " other" : "") + (idx % 2 === 0 ? " even" : "")}
                            key={questionNumber + "-" + answer.number}
                            data-answer-id={answer.answerId}
                            onClick={answer.other ? this.otherPrompt : this.selectAnswer}
                            data-answer-obj={JSON.stringify(answer)}
                            data-goes-to={answer.goesTo}
                            data-question={questionNumber}
                            data-answer={answer.number}
                            data-type="multiple"
                            onMouseEnter={answer.toolTip ? () => this.linkAnswerWithTooltip(answer.toolTip.id, true) : null}
                            onMouseLeave={answer.toolTip ? () => this.linkAnswerWithTooltip(answer.toolTip.id, false) : null}
                        >
                            {answer.other && clientAnswers && this.multipleRenderHelper(clientAnswers, answer) ? answer.answer + ": " + clientAnswers.filter(ans => ans.otherSelection)[0].answer : "" + answer.answer} {/*if the current answer in this render loop is the "Other" option, and we have already received a previous answer for it we render the previous answer as part of the "Other" answer text, otherwise we just render the answer  */}
                            <div className="answer-checkbox"></div>
                            {answer.toolTip ? this.populateTooltip(answer.toolTip) : null}
                        </div>)
                }
                )
            case "open":
                let autoFill = answers[0].autoFill
                if (autoFill && this.props.user && !answersToSelect) value = this.props.user[autoFill] || "";
                if (dataCapture === "PHONE") return <NumberFormat className="answer open" format="(###)-###-####" placeholder="(555)555-5555" defaultValue={value} onKeyUp={this.handleKeyUp} />
                if (answers[0].toolTip) console.log('TOOLTIP');
                return <textarea autoFocus className="answer open" data-type="open" data-answer-id={answers[0].answerId} defaultValue={value} onKeyUp={this.handleKeyUp}></textarea>
            case "rating":
                let startNum = 1;
                let endNum = answers[0].scaleTo + 1;
                let scaleArr = [...Array(endNum).keys()].slice(startNum, endNum);
                let labels = answers[0].labels;
                return <div className="opinion-scale-container">
                    <div className="opinion-scale">{scaleArr.map(num =>
                        <li
                            className={answerNums.some(ans => ans + 1 === num) ? "answer rating selected" : "answer rating"}
                            key={questionNumber.toString() + "-" + num.toString()}
                            onClick={this.selectAnswer}
                            data-goes-to={answers[0].goesTo}
                            data-question={questionNumber}
                            data-answer-id={answers[0].answerId}
                            data-answer={num - 1}
                            data-type="rating"
                        >
                            {String(num)}
                        </li>
                    )}
                    </div>
                    <div className="label-container">{labels.map((label, i) => <div key={questionNumber.toString() + "label" + i.toString()} className="label">{label}</div>)}</div>
                </div>
            case "table":
                let rowCounter = -1;
                return <div className="table-answers-container">
                    <div className="table-rows-container">
                        {rows.map((row, i) => {
                            if (this.tableColumnFirstRowAnswers) this.tableColumnAnswerState = true;
                            let boolean = false;
                            if (row.skipRow) {
                                boolean = this.rejectRow(row);
                            }
                            if (boolean) {
                                return null
                            } else {
                                rowCounter = rowCounter + 1;
                                return (
                                    <div
                                        key={questionNumber.toString() + "-" + row.row.toString() + i.toString()}
                                        className={"table-row-container" + (i % 2 === 0 ? " even" : "")}>
                                        {/* (((window.innerWidth > 1000)  && row.toolTip ) ? this.populateTooltip(row.toolTip) : null)*/}
                                        <div className="table-row-header">{row.header ? row.header + ")" : ""}</div>
                                        <div className="table-row-text"
                                            onMouseEnter={row.toolTip ? () => this.linkAnswerWithTooltip(row.toolTip.id, true) : null}
                                            onMouseLeave={row.toolTip ? () => this.linkAnswerWithTooltip(row.toolTip.id, false) : null}
                                        >
                                           {row.text}
                                        </div>
                                        {answers.map((answer, idx) => {
                                            let tableColumnAnswer = <div className="column-answer-container"><div className="column-answer">{answer.answer}</div></div>;
                                            if (idx + 1 === answers.length) {
                                                this.tableColumnFirstRowAnswers = true;
                                            }
                                            return (
                                                <div
                                                    className={answerNums[rowCounter] === answer.number ? "answer table-answer selected" : "answer table-answer"}
                                                    key={questionId + "-" + row.row.toString() + "-" + answer.number.toString()}
                                                    data-answer-id={answer.answerId}
                                                    onClick={this.selectAnswer}
                                                    data-goes-to={answer.goesTo}
                                                    data-question={questionNumber}
                                                    data-answer-num={answer.number}
                                                    data-answer={answer.answer}
                                                    data-type="table"
                                                    data-row={row.row}
                                                >
                                                    {!this.tableColumnAnswerState ? tableColumnAnswer : null}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            case "dropdown-single" || "dropdown-multiple":
                let previousAnswer = this.survey.answers[this.activeQuestion];

                return <div className="survey-dropdown-container">
                    {this.dropdown ?
                        <div className="dropdown-answers-container">
                            {answers.map((answer, idx) => {
                                return (
                                    <div
                                        className={(answerNums.includes(idx) ? "answer dropdown-answer selected" : "answer dropdown-answer") + (answer.other ? " other" : "") + (idx === 0 ? " first-dropdown" : "")}
                                        key={questionNumber + "-" + answer.number}
                                        data-answer-id={answer.answerId}
                                        data-goes-to={answer.goesTo}
                                        data-question={questionNumber}
                                        data-answer={answer.number}
                                        data-answer-obj={JSON.stringify(answer)}
                                        data-type={type}
                                        onClick={answer.other ? this.otherPrompt : this.selectAnswer}
                                    >
                                        {answer.other && clientAnswers && clientAnswers[0].otherSelection ? answer.answer + ": " + clientAnswers[0].answer : answer.answer}
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className="dropdown-preview-container" onClick={() => setTimeout(this.toggleDropdown, 100)}>
                            <div className="dropdown-preview-answer" >{previousAnswer ? previousAnswer[0].answer : answers[0].answer}</div>
                            <img src={arrowDown} alt="v" className="dropdown-img" />
                        </div>
                    }
                </div>
            case "hub":
                let sectionIdx = -1;
                return (
                    <div className="hub-container">
                        {question.sections.map((section) => {
                            if (section.skipSection) {
                                let boolean = this.rejectSection(section);
                                if (boolean) return <div></div>;
                            }
                            sectionIdx = sectionIdx + 1;
                            return (
                                <div className="hub-section-container"
                                    key={`${question.id} - ${section.number}`}
                                >
                                    {section.section}
                                    <div className="hub-section-answers-container" >
                                        {section.answers.map((answer, idx) => {
                                            return (
                                                <div className="hub-section-answer-container"
                                                    key={answer.answerId}
                                                >
                                                    <div className="hub-section-answer">{answer.answer}</div>
                                                    <div className="hub-section-slider-container" >
                                                        <div className="hub-section-slider" onMouseDown={this.dragStart} data-type="hub">
                                                            <img data-drag-section={sectionIdx} data-drag-num={idx} src={circle} alt="" className="hub-section-slider-knob" draggable={false} style={this.styles} />
                                                        </div>
                                                        <div className="hub-section-slider-number-container">
                                                            <div className={"hub-section-slider-percent" + (this.hubRenderHelper(clientAnswers, answer, true) ? " selected" : "")} data-section-obj={JSON.stringify(section)} data-answer-obj={JSON.stringify(answer)}>
                                                                {this.hubRenderHelper(clientAnswers, answer)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            default: return <div>default case</div>
        }
    }

    displayNextInstruction(e, next) {
        if (next === "DONE") {
            this.renderedInstructions = true;
            this.setState(() => this.renderedInstructions);
            return;
        }
        let nextDiv = document.querySelector(`.${next}`);
        nextDiv.classList.toggle('hidden');
        e.target.classList.toggle('hidden');
    }

    renderSurveyInstructions() {
        return (
            <div className="survey-instructions-container" onClick={() => { }}>
                <div className="survey-instructions input" onClick={(e) => this.displayNextInstruction(e, 'save')}>Answer questions in this area<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
                <div className="survey-instructions save hidden" onClick={(e) => this.displayNextInstruction(e, 'go-back')}>Click here to move forward... you can also use the enter or DOWN arrow keys!<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
                <div className="survey-instructions go-back hidden" onClick={(e) => this.displayNextInstruction(e, 'tooltips')}>Click here to go back... you can also use the UP arrow key!<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
                <div className="survey-instructions tooltips hidden" onClick={(e) => this.displayNextInstruction(e, 'header-instruction')}>This area will display additional information when you hover over specific questions or answers<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
                <div className="survey-instructions header-instruction hidden" onClick={(e) => this.displayNextInstruction(e, 'DONE')}>Check your progress and jump between sections up here<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
            </div>)
    }

    renderMobileInstructions() {
        return (
            <div className="survey-instructions-container" onClick={() => { }}>
                <div className="survey-instructions input" onClick={(e) => this.displayNextInstruction(e, 'mobile-save')}>Answer questions in this area<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
                <div className="survey-instructions mobile-save hidden" onClick={(e) => this.displayNextInstruction(e, 'mobile-go-back')}>Swipe UP to go to next question<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
                <div className="survey-instructions mobile-go-back hidden" onClick={(e) => this.displayNextInstruction(e, 'DONE')}>Swipe DOWN to go back<img className="instruction-checkmark" src={checkmark} alt="/" /></div >
            </div>)
    }

    renderQuestions(question) {
        this.clearTooltips();
        if (!!this.activePrompt) {
            this.checkSectionChange(); //we do not want to do this after the landing page 
        } else {
            this.activePrompt = true;
        }
        this.tableColumnAnswerState = false;
        this.tableColumnFirstRowAnswers = false;
        this.toolTipIconState = false;
        this.wentBack = false;

        switch (this.activeQuestion) {
            // case "newUser":
            //     return this.addNewUser();
            case "SIGNUP":
                return this.addNewUser();
            case "login":
                return this.redirectToDashboard();
            default:
                break
        }

        if ((this.activeQuestion !== -1) && (this.activeQuestion !== "login") && (!question)) {
            debugger
            return <div>check renderQuestions()</div>;
        }

        if (question.skipQuestion) {
            let boolean = this.rejectQuestion(question);
            if (boolean) {
                if (question.goesToPrompt) {
                    this.activePrompt = question.goesToPrompt;
                    this.promptState = true;
                    this.setState(() => this.promptState);
                    this.setState(() => this.activePrompt);
                } else {
                    this.currentSectionAnswerCount = this.currentSectionAnswerCount + 1
                    this.activeQuestion = question.goesTo;
                    this.setState(() => this.activeQuestion);
                }
            }
        }

        if (this.activeQuestion < 0 || question.prompt) return;

        let text = ""
        switch (question.type) {
            case "single":
                text = "Choose one";
                break
            case "multiple":
                text = "Choose many";
                break
            case "dropdown-single":
                text = "Choose one";
                break
            case "dropdown-multiple":
                text = "Choose many";
                break
            default:
                break
        }
// + (this.wentBackAnimation ? "question-reverse" : "question-forward")
        return (
            <>
                <div className={"question-container"} key={"container" + question.number}
                    data-submit={question.submit || false}
                    data-type={question.type}
                    data-goes-to={question.goesTo}
                    data-comes-from={question.comesFrom}
                    data-goes-to-prompt={question.goesToPrompt}
                >
                    <div className="question-text-container">
                        <div className="question" key="1"
                            data-data-capture={question.dataCapture ? question.dataCapture : false}
                            data-question-number={question.number}
                            data-question-type={question.type}
                            data-question-id={question.id}
                            data-question-obj={JSON.stringify(question)}
                            onMouseEnter={question.toolTip ? () => this.linkAnswerWithTooltip(question.toolTip.id, true) : null}
                            onMouseLeave={question.toolTip ? () => this.linkAnswerWithTooltip(question.toolTip.id, false) : null}
                        >
                            {question.dataUse ? this.renderInputData(this.alternateRender(question)) : this.alternateRender(question)}
                        </div>
                        {/*(((window.innerWidth > 1000)  && question.toolTip) ? this.populateTooltip(question.toolTip) : null)*/}
                    </div>
                    {
                        question.additionalInfo ?
                            <div className="question-additional-info-container">
                                <div className="question-additional-info">{question.additionalInfo}</div>
                            </div>
                            : null
                    }
                    <div className="choose-banner"><span className="asterisk-choice">{text && "*"}</span>{text}</div>
                    <div className="answers">
                        {this.renderAnswers(question)}
                    </div>
                </div>
            </>
        )
    }

    renderPrompts(prompt) {
        let button = prompt.button
        let promptText = prompt.dataUse ? this.renderInputData(null, prompt) : prompt.prompt;
        promptText = promptText.split('/n');
        let goesTo = prompt.goesTo;
        let goesToPrompt = prompt.goesToPrompt

        if (prompt.toolTip) this.populateTooltip(prompt.toolTip);
        // if (prompt.type === "staggered") setTimeout(() => prompt.prompts.forEach(p => this.insertStaggeredPrompts(p)), 1000)

        return (
            <div id="prompt" className={this.activePrompt === "welcome" ? "welcome-prompt" : ""}
                data-submit={prompt.submit || false}
                data-goes-to={goesTo}
                data-goes-to-prompt={goesToPrompt}
                data-type="prompt">
                {promptText.length === 1 ?
                    <div className="prompt"
                        onMouseEnter={prompt.toolTip ? () => this.linkAnswerWithTooltip(prompt.toolTip.id, true) : null}
                        onMouseLeave={prompt.toolTip ? () => this.linkAnswerWithTooltip(prompt.toolTip.id, false) : null}
                    >
                        {promptText[0]}
                    </div>
                    :
                    promptText.map((msg, i) => <div key={"prompt-message" + i.toString()} className="prompt">{msg}</div>)
                }
                {prompt.prompts && prompt.prompts.map((p, i) => <div className='staggered-prompt' key={"prompt-message" + i.toString()}>{p.prompt}</div>)}
                {prompt.type === "input" ? <input type="password" className="answer open password-entry"></input> : null}
                {prompt.image && <img id="prompt-img" src={`https://api.loxz.com/api/assets/images/${prompt.image}`} alt="" />}
                <div className="lets-go">
                    <div id="lets-go-button" onMouseDown={() => this.selectQuestion({ target: { id: "next" } }, this.survey.answers[this.activeQuestion])}>{button}</div>
                </div>
            </div>
        );
    }

    render() {
        console.log("RENDER")
        if (!this.props.surveys) return <SurveySelectorModal handleInput={this.handleSurveyChange} />
        if (!this.survey) return <SurveySelectorModal handleInput={this.handleSurveyChange} />
        /*
        if (!this.props.surveys || !this.survey) {
            this.handleSurveyChange();
            return <div className="survey-error">no survey in state or props. check render</div>
        }
        */
        if (this.activePrompt === "welcome") return this.renderLandingPage();
        if (this.activePrompt === "existingUser") return this.renderConclusionPage(false);
        if (this.activePrompt === "newUser") return this.renderConclusionPage(true);
        try { //the following try catch sequence was created for error handling. If the survey crashes for some reason we retry with a new value for activeQuestion => setState(()=>activeQuestion), if that fails we render react.error 
            return (
                <>
                    {
                        this.props.loggingIn ?
                            <LoginPopup />
                            :
                            null
                    }
                    {
                        window.innerWidth > 1000 && this.activePrompt !== "welcome" ?
                            <div id="header-container">
                                <div id="header">
                                    <a href="/" className="home-link"><img src={PROXY_URL + `/api/assets/images/customer-logo/${__client}`} alt="loxz digital" className="header-logo" /></a>
                                    {this.survey.manifest && this.survey.manifest.sections ? this.survey.manifest.sections.sectionNames.map((section, i) => {
                                        return (
                                            <div onClick={() => this.goToSection(i + 1)} className={`survey-section incomplete`}>{section.split(" ").map(string => <span>{string}</span>)}<div className={`section-dot ${section} ${"dot-" + (i + 1).toString()}`} /></div>
                                        )
                                    })
                                        :
                                        null
                                    }
                                    <div className="dashboard-user-profile-container">
                                        <div className="dashboard-user-profile" onClick={() => this.handleLogin(true)}>
                                            <div className="dashboard-user-profile-char">
                                                {this.props.user ? this.props.user.name.slice(0, 1) : "?"}
                                            </div>
                                            <div className="expanded-user-profile-container hidden">
                                                <UserProfile />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="header-footer">
                                    <div id="header-progress-bar" />
                                </div>
                            </div>
                            :
                            null
                    }
                    {
                        window.innerWidth < 1000 && this.activePrompt !== "welcome" ?
                            <div id="header-container">
                                <div id="header-footer">
                                    <div id="header-progress-bar" />
                                </div>
                            </div>
                            :
                            null
                    }
                    <div className="survey-frame">
                        <div id="survey-container">

                            {this.promptState ?
                                this.renderPrompts(this.survey.prompts[this.activePrompt])
                                :
                                this.renderQuestions(this.survey.questions[this.activeQuestion])
                            }
                            <ValidationAlert className="alert_survey" ValidationValue={this.validationError} ValidationBody={this.validationErrorMessage} />
                        </div>
                    </div>
                    <div id={this.promptState || window.innerWidth < 1000 ? 'hidden-panel' : "survey-right-panel-container"}>
                        {/* <div className="tooltips-container">
                        <img src={lightbulb} alt="" className="lightbulb" />
                    </div> */}
                    </div>
                    {
                        this.promptState || window.innerWidth < 1000 ? null :
                            <>
                                <div id="survey-footer-container">
                                    <div id="survey-footer">
                                        <div className="go-back-button" onClick={this.selectQuestion} id="previous"><img src={PROXY_URL + `/api/assets/icons/icon/survey_arrow_grey-svg`} alt="->" />go back</div>
                                        <div className="continue-button" onClick={this.selectQuestion} id="next">save & continue<img src={PROXY_URL + `/api/assets/icons/icon/survey_arrow_white-svg`} alt="->" /></div>
                                    </div>
                                </div>
                            </>
                    }
                    {
                        (window.innerWidth < 1000) && (this.promptState === false) ? (
                            <div className="mobile-survey-controls-container">
                                <div className="go-back-button" onClick={this.selectQuestion} id="previous"><img src={PROXY_URL + `/api/assets/icons/icon/survey_arrow_grey-svg`} alt="->" />go back</div>
                                <div className="continue-button" onClick={this.selectQuestion} id="next">save & continue<img src={PROXY_URL + `/api/assets/icons/icon/survey_arrow_white-svg`} alt="->" /></div>
                            </div>
                        ) : null
                    }
                </>
            )
        } catch (e) {
            try {
                console.log('survey error in render()')
                console.log(e);
                return (<div className="SURVEY-ERROR survey-error">Survey ERROR</div>)
            } catch {
                console.log('React ERROR')
                return (
                    <div className="REACT-ERROR survey-error">React ERROR</div>
                )
            }
        }
    }
};

export default Survey;