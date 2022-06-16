import React from 'react';
// import ReactGA from 'react-ga';
import ProgressRing from '../progress_ring/progress_ring_container';
import teal_logo from '../../images/logos/logo_teal.png';
import gradient from '../../icons/gradient.svg';
import vector from '../../icons/vector.svg';
// import rightArrow from '../../icons/right-arrow.png';
// import black_logo from '../../images/logos/d.svg';
// import survey from '../../icons/surveyor.png';
import { Redirect } from 'react-router-dom';
import Sidenav from '../sidenav/sidenav_container';
import UserProfile from '../user_profile/user_profile_container';
import { DASHBOARD, HEATMAP, DOWNLOAD } from '../../actions/component_actions';
import * as UTIL from '../../util/components/dashboard_component_util';
import { calcProgressRingRadius } from '../util/responsive_util';
import Heatmap from './subcomponents/heatmap';
import { Download } from './subcomponents/download';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.href = window.location.href;
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleInsights = this.handleInsights.bind(this);
        // this.sampleSet = [];
        this.sampleSurveyLength = 100;
        this.toggleInsights = UTIL.toggleInsights.bind(this);
        this.overlay = "";
        this.score = false;
        this.insight = false;
        this.redirect = false;
        this.scoreAnimationState = false;
        this.timeSinceToggle = 0;
        this.lastScrollTop = 0;
        this.responsiveObj = false;
        this.staticKeys = {
            "ML_READINESS": ["Overall", "Data Preparation", "Model Development", "Model Deployment", "Model Monitoring", "Business Value"],
            "STUDENT_SURVEY": ["Overall", "Data Preparation", "Modeling", "Career Trajectory", "ML Aptitude", "Business Value"]
        };
        this.survey_version = "";
        // this.produceSampleDataSet = this.produceSampleDataSet.bind(this);
    }

    async componentDidMount() {
        // this.produceSampleDataSet()
        // ReactGA.pageview("Dashboard");
        // ReactGA.event({
        //     category: "DASHBOARD",
        //     action: "OPEN_DASHBOARD",
        //     label: "UCI"
        // })
        if (!this.props.archivalScore && !this.props.currentScore && this.props.user) {
            await this.props.findScore(this.props.user);
        }
        if (localStorage.authentication) {
            this.props.authenticate(JSON.parse(localStorage.authentication))
        }

        console.log(this);
        let results = UTIL.getScores(this);

        this.score = results[0];

        let keys = Object.keys(this.score);

        if (keys.every(cat => this.staticKeys["ML_READINESS"].includes(cat))) {
            this.survey_version = "ML_READINESS";
        } else {
            this.survey_version = "STUDENT_SURVEY"
        }

        if (results.length > 1) this.insight = results[1];

        this.props.activateComponent(DASHBOARD);

        document.addEventListener('keypress', this.handleKeyPress);
        document.addEventListener('scroll', this.handleScroll);
    }

    handleKeyPress(e) {
        switch (e.key) {
            case "D":
                debugger
                break
            default:
                break
        }
    }

    handleScroll(e) {
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        let contact = document.querySelector('.contact-container');
        if (st > this.lastScrollTop) {
            // downscroll code
            let dashBoard = document.querySelector('.dashboard-container').getBoundingClientRect();
            let bool = dashBoard.height + dashBoard.y - 100 < window.innerHeight;
            if (contact && contact.classList.value.includes('offscreen-down') && bool) {
                contact.classList.remove('offscreen-down');
            }
        } else {
            // upscroll code
            if (contact && !contact.classList.value.includes('offscreen-down')) {
                contact.classList.add('offscreen-down');
            }
        }
        this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
        document.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        UTIL.setScoreAnimation(this);
        // this.score = this.props.currentScore ? this.props.currentScore : this.props.archivalScore;
    }

    shouldComponentUpdate(bool) {
        if (bool) return true;
    }

    organizeScores() {

    }

    handleInsights(e) {
        if (Date.now() - this.timeSinceToggle < 500) return;
        this.timeSinceToggle = Date.now();
        this.toggleInsights(e);
    }

    renderOverviewComponents(panelName, subscoreSection) {
        let classification = UTIL.setClassification(this);
        let score = Math.ceil(this.score["Overall"]);
        if (!this.responsiveObj) this.responsiveObj = calcProgressRingRadius({ classification, score, bool: true });
        // let { radius, orientation, ratio, height, width } = this.responsiveObj;

        if (subscoreSection === "date") return;
        if (subscoreSection === "Overall") return (
            <div className="overall-score-container" key="overall-progress-ring-container">
                <div className="mlr-score">Overall MLR Score</div>
                <ProgressRing props={{ progress: score, classification }} />
                {/* <div className="score-meaning">what does my score mean</div> */}
                <div className="classification-container">
                    <div className="classification">{classification}</div>
                    <div className="moniker">{UTIL.setMoniker(this)}</div>
                </div>
            </div>
        )

        let subscoreClass = subscoreSection.split(" ");
        return (
            <div
                className={`${panelName}-component-container`}
                onClick={this.handleInsights}
                data-subsection={subscoreSection.split(' ').join('-')}
                key={panelName + "-" + subscoreSection.split(' ').join('-') + (Math.floor(Math.random() * 1000)).toString()}
            >
                <div className={`${panelName}-subheader-container`} key={panelName + "-" + subscoreSection + "-sub-container"}>
                    <img src={UTIL.setIcons(subscoreSection)} alt="" className="subheader-img" />
                    <div className="subheader-container">
                        <div className={`${panelName}-subheader`}>{subscoreSection}</div>
                        <div className="subcat-description">{UTIL.setSubDefinitions(subscoreSection)}</div>
                    </div>
                    <div className={`${panelName}-score-container`}>
                        <div className="subscore-percent">{Math.ceil(this.score[subscoreSection])}%</div>
                        <img src={vector} alt="&caron;" className="subscore-cta" />
                    </div>
                </div>
                <div className="score-animation-bar-container">
                    <div className={`score-animation-bar ${subscoreClass[0]}${subscoreClass.length > 1 ? `-${subscoreClass[1]}` : ""}`}></div>
                </div>
            </div>
        )
    }

    renderOverviewPanel() {
        return (
            <div className="overview-panel-container wide-dash-element" key="overview">
                {/* <div className="dividers">
                    <div className="divider" />
                    <div className="divider" />
                </div> */}
                {this.staticKeys[this.survey_version].map(key => this.renderOverviewComponents("overview", key))}
            </div>
        )
        // return (
        //     <div className="overview-panel-container wide-dash-element">
        //         {staticKeys.map(key => UTIL.renderOverviewComponents("overview", key, this))}
        //     </div>
        // )
    }

    renderInsightComponents(panelName, subscoreSection) {
        console.log(this.insight)
        console.log(subscoreSection)
        if (subscoreSection === "date") return;
        if (subscoreSection === "Overall") return;
        if (!this.insight[subscoreSection]) return;
        if (this.insight[subscoreSection].length < 1) return;

        let key = `${panelName}-${subscoreSection.split(' ').join('-')}-key-` + Math.floor(Math.random() * 1000).toString()
        console.log(key)
        return (
            <div
                className={`${panelName}-component-container ${subscoreSection.split(' ').join('-')}-insights invisible offscreen`}
                key={key}
                data-key={key}
            >
                <div className="insight-name-container">
                    <img src={UTIL.setIcons(subscoreSection, true)} alt="" className="insight-img" />
                    <div className={`${panelName}-subheader`}>{subscoreSection}</div>
                </div>
                {this.insight[subscoreSection] && this.insight[subscoreSection].map((insight) => {
                    return (
                        <div className='insight-container'>
                            <div className="insight" key={(Math.floor(Math.random() * 1000)).toString() + "-insight"} data-key={insight}>{insight}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    renderInsightPanel() {
        return (
            <div className="insights-panel-container wide-dash-element" key='insights'>
                <div className="insights-header">Insights</div>
                <div className="insights-instructions">Click on a subsection above to view your insights</div>
                {this.staticKeys[this.survey_version].map(key => this.renderInsightComponents("insight", key))}
                <div className="empty-insight"></div>
                <div className="contact-container offscreen-down">
                    {/* <div className="contact-us">[Subtle CTA]</div> */}
                    {/* <img src={rightArrow} alt="" className="right-arrow" /> */}
                </div>
            </div>
        )
    }

    redirectTo(route) {
        this.redirect = route;
        this.setState(() => this.redirect);
    }

    render() {
        console.log("rendering")
        console.log(this.props.user)
        console.log(this.props.currentScore)
        console.log(this.props)
        if (!this.score) {
            this.componentDidMount();
            // setTimeout(() => this.render(this) , 1000);
            return <div className="empty">empty</div>
        }
        // if (!this.props.user || (!this.props.archivalScore || !this.props.currentScore)) return <div className="empty">empty</div>
        if (this.redirect) {
            return <Redirect to={this.redirect} />
        }
        return (
            <div id='dashboard-frame'>
                <Sidenav />
                <div id="dashboard-header">
                    <div className="logo-name-container">
                        <a href="/" className="home-link"><img src={teal_logo} alt="loxz digital" className="header-logo" /></a>
                        <img src={gradient} alt="" className="gradient" />
                    </div>
                    <div className="dashboard-user-profile-container">
                        <div className="dashboard-username">Hi {this.props.user.name}</div>
                        <div className="dashboard-user-profile">
                            <div className="dashboard-user-profile-char" onClick={() => document.querySelector('.expanded-user-profile-container').classList.toggle('hidden')}>
                                {this.props.user.name.slice(0, 1)}
                            </div>
                        </div>
                        <div className="expanded-user-profile-container hidden">
                            <UserProfile />
                        </div>
                    </div>
                    {/* <img src={survey} alt="" className="go-to-survey-icon" title='go to survey' onClick={() => this.redirectTo('/')}/> */}
                </div>
                <div className="dashboard-container">
                    {
                        this.props.activeComponent === DASHBOARD && [
                            this.renderOverviewPanel(),
                            <div className="divider"></div>,
                            this.renderInsightPanel()
                        ]
                    }
                    {
                        this.props.activeComponent === HEATMAP &&
                        <Heatmap />
                    }
                    {
                        this.props.activeComponent === DOWNLOAD &&
                        <Download user={this.props.user} score={this.props.currentScore}  />
                    }
                </div>
                {/* <div className="dashboard-footer"></div> */}
            </div>
        )
    }
}

export default Dashboard;