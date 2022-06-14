import React, { useEffect, useState } from "react";
import Sidenav from "../sidenav/sidenav";
// import teal_logo from '../../images/logos/logo_teal';
import teal_logo from '../../images/logos/logo_teal.png';
import gradient from '../../icons/gradient.svg';
import UserProfile from '../user_profile/user_profile_container';
// import { DASHBOARD, HEATMAP, DOWNLOAD } from '../../actions/component_actions';
import { DASHBOARD, HEATMAP, DOWNLOAD } from '../../actions/component_actions';
// import Heatmap from './subcomponents/heatmap';
import Heatmap from "../dashboard/subcomponents/heatmap";
import { Download } from '../dashboard/subcomponents/download';
import * as UTIL from '../../util/components/dashboard_component_util';
import { calcProgressRingRadius } from '../util/responsive_util';
import ProgressRing from '../progress_ring/progress_ring_container';
import { useSelector } from 'react-redux'

import vector from '../../icons/vector.svg';
import { set } from "react-ga";


const Dashboard = (props) => {

    const [score, setScore] = useState();
    const [staticKeys, setStaticKeys] = useState({
        "ML_READINESS": ["Overall", "Data Preparation", "Model Development", "Model Deployment", "Model Monitoring", "Business Value"],
        "STUDENT_SURVEY": ["Overall", "Data Preparation", "Modeling", "Career Trajectory", "ML Aptitude", "Business Value"]
    })
    const [survey_version, setSurveyVersion] = useState("");
    const [insight, setInsight] = useState(false)
    const [responsiveObj, setResponsiveObj] = useState(false);

    const state = useSelector((state) => state)

    if (state.entities.user.score) {
        console.log(state.entities.user.score[0]);
        // setScore(state.entities.user.score[0]);
    }

    const componentDidMount = async () => {
        if (!props.archivalScore && !props.currentScore && props.user) {
            await props.findScore(props.user);
        }
        if (localStorage.authentication) {
            props.authenticate(JSON.parse(localStorage.authentication))
        }
    }



    const findScore =  async () => {
        let results = await UTIL.getScoresFunctionalComponent(props);

        // console.log(UTIL.getScores(props))
        console.log(results);
        // score = ;
        setScore(results[0])
        console.log("000000000000");
        console.log(results);
        console.log(state.entities.user)

        let keys = Object.keys(results[0]);

        if (keys.every(cat => staticKeys["ML_READINESS"].includes(cat))) {

            setSurveyVersion("ML_READINESS")
        } else {
            // survey_version = "STUDENT_SURVEY"
            setSurveyVersion("STUDENT_SURVEY")
        }

        if (results.length > 1) setInsight(results[1]);

        props.activateComponent(DASHBOARD);

        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('scroll', handleScroll);
    }

    useEffect(() => {
        componentDidMount()
        
    }, [])

    useEffect(() => {
        findScore()
    }, [])



    const handleKeyPress = (e) => {
        switch (e.key) {
            case "D":
                debugger
                break
            default:
                break
        }
    }

    const handleScroll = (e) => {
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


    const renderInsightPanel = () => {
        return (
            <div className="insights-panel-container wide-dash-element" key='insights'>
                <div className="insights-header">Insights</div>
                <div className="insights-instructions">Click on a subsection above to view your insights</div>
                {staticKeys[survey_version].map(key => renderInsightComponents("insight", key))}
                <div className="empty-insight"></div>
                <div className="contact-container offscreen-down">
                    {/* <div className="contact-us">[Subtle CTA]</div> */}
                    {/* <img src={rightArrow} alt="" className="right-arrow" /> */}
                </div>
            </div>
        )
    }

    const renderInsightComponents = (panelName, subscoreSection) => {
        if (subscoreSection === "date") return;
        if (subscoreSection === "Overall") return;
        if (!insight[subscoreSection]) return;
        if (insight[subscoreSection].length < 1) return;

        let key = `${panelName}-${subscoreSection.split(' ').join('-')}-key-` + Math.floor(Math.random() * 1000).toString()
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

    const renderOverviewComponents = (panelName, subscoreSection) => {
        let classification = UTIL.setClassification(props);
        let score = Math.ceil(score["Overall"]);
        if (!responsiveObj) responsiveObj = calcProgressRingRadius({ classification, score, bool: true });
        // let { radius, orientation, ratio, height, width } = this.responsiveObj;
        console.log("sssssssssssssss");
        console.log(score);

        if (subscoreSection === "date") return;
        if (subscoreSection === "Overall") return (
            <div className="overall-score-container" key="overall-progress-ring-container">
                <div className="mlr-score">Overall MLR Score</div>
                <ProgressRing props={{ progress: score, classification }} />
                {/* <div className="score-meaning">what does my score mean</div> */}
                <div className="classification-container">
                    <div className="classification">{classification}</div>
                    <div className="moniker">{UTIL.setMoniker(props)}</div>
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


    const renderOverviewPanel = () => {
        return (
            <div className="overview-panel-container wide-dash-element" key="overview">
                {/* <div className="dividers">
                    <div className="divider" />
                    <div className="divider" />
                </div> */}
                {staticKeys[survey_version].map(key => renderOverviewComponents("overview", key))}
            </div>
        )
        // return (
        //     <div className="overview-panel-container wide-dash-element">
        //         {staticKeys.map(key => UTIL.renderOverviewComponents("overview", key, this))}
        //     </div>
        // )
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
                    <div className="dashboard-username">Hi {props.user.name}</div>
                    <div className="dashboard-user-profile">
                        <div className="dashboard-user-profile-char" onClick={() => document.querySelector('.expanded-user-profile-container').classList.toggle('hidden')}>
                            {props.user.name.slice(0, 1)}
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
                    props.activeComponent === DASHBOARD && [
                        renderOverviewPanel(),
                        <div className="divider"></div>,
                        renderInsightPanel()
                    ]
                }
                {
                    props.activeComponent === HEATMAP &&
                    <Heatmap />
                }
                {
                    props.activeComponent === DOWNLOAD &&
                    <Download user={props.user} score={props.currentScore} />
                }
            </div>
            {/* <div className="dashboard-footer"></div> */}
        </div>
    )
}

export default Dashboard;