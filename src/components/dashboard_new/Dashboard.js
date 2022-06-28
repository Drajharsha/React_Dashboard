import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import Sidenav from "../sidenav/sidenav";
import SideNav from "../sidenav_new/Sidenav";
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
import { useSelector, useDispatch } from 'react-redux'
import { activeComponent } from '../../actions/component_actions';
import { userScore, userScores } from '../../actions/user_actions';
import { authenticate } from '../../actions/session_actions';
import { activateComparativeAnalysis, closeComparativeAnalysis, activateSentimentAnalysis, closeSentimentAnalysis, activateReccomendations, closeReccomendations } from '../../actions/dashboard_actions';
// import * as APIUtil from '../util/api/user_api_util';
// import * as APIUtil from '../../'
import OverallMLRScore from "./OverallMLRScore";
import vector from '../../icons/vector.svg';
import { set } from "react-ga";
import LoginPopup from "../login/login_popup";
import { connect } from 'react-redux'
import ScoreListComponent from "./ScoreListComponent";
import { Container, Row } from "react-bootstrap";
import BusinessValue from '../../icons/Business Value.svg'
import CareerTrajectory from '../../icons/Career Trajectory.svg';
import DataPreparation from '../../icons/Data-Preparation.svg';
import MLAptitude from '../../icons/ML Aptitude.svg';
import Modeling from '../../icons/Modeling.svg';
import DashBoardCardSections from "./DashBoardCardSctions";
// import ProgressRing from "../progress_ring/progress_ring";


const Dashboard = (props) => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [score, setScore] = useState();
    const [survey_version, setSurveyVersion] = useState();
    const [insight, setInsight] = useState(false);
    const [currentScore, setCurrentScore] = useState()
    const [staticKeys, setStaticKeys] = useState({
        "ML_READINESS": [{ type: "Overall", key: 1, icon: BusinessValue }, { type: "Data Preparation", key: 2, icon: DataPreparation, startColor: '#2B73B7', endColor:  '#682FB1'}, { type: "Model Development", key: 3, icon: Modeling, startColor: '#9E34AF', endColor:  '#B53141' }, { type: "Model Monitoring", key: 4, icon: Modeling, startColor: '#9E34AF', endColor:  '#B53141' }, { type: "Business Value", key: 5, icon: BusinessValue, startColor: '#8F39A5', endColor:  '#3475A5' }],
        "STUDENT_SURVEY": [{ type: "Overall", key: 1, icon: BusinessValue }, { type: "Data Preparation", key: 2, icon: DataPreparation, startColor: '#2B73B7', endColor:  '#682FB1' }, { type: "Modeling", key: 3, icon: Modeling, startColor: '#9E34AF', endColor:  '#B53141' }, { type: "Career Trajectory", key: 4, icon: CareerTrajectory,  startColor: '#BC592D', endColor:  '#B28C29'}, { type: "ML Aptitude", key: 5, icon: MLAptitude, startColor: '#62A936', endColor:  '#35A98D' }, { type: "Business Value", key: 6, icon: BusinessValue, startColor: '#8F39A5', endColor:  '#3475A5' }]
    })
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [responsiveObj, setResponsiveObj] = useState(false);
    const [timeSinceToggle, setTimeSinceToggle] = useState(0);

    const componentDidMount = async () => {
        // this.produceSampleDataSet()
        // ReactGA.pageview("Dashboard");
        // ReactGA.event({
        //     category: "DASHBOARD",
        //     action: "OPEN_DASHBOARD",
        //     label: "UCI"
        // })
        if (!state.entities.user.score && !state.entities.surveys.score && state.session.user) {
            // await props.findScore(props.user);
            dispatch(userScore(state.session.user))
        }
        if (localStorage.authentication) {
            // props.authenticate(JSON.parse(localStorage.authentication))
            dispatch(authenticate(JSON.parse(localStorage.authentication)));
        }


    }

    const findScoreChanges = () => {
        
        const prps = { archivalScore: state.entities.user.score, currentScore: state.entities.surveys.score }
        let results = UTIL.getScoresFunctionalComponent(prps);

        setScore(results[0]);

        let keys = Object.keys(results[0]);

        if (keys.every(cat => staticKeys["ML_READINESS"].includes(cat))) {
            // survey_version = "ML_READINESS";
            setSurveyVersion("ML_READINESS")
        } else {
            // survey_version = "STUDENT_SURVEY"
            setSurveyVersion("STUDENT_SURVEY")
        }

        if (results.length > 1) setInsight(results[1]);

        dispatch(activeComponent(DASHBOARD));

        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('scroll', handleScroll);
    }

    const handleInsights = (e) => {
        if (Date.now() - timeSinceToggle < 500) return;
        // this.timeSinceToggle = Date.now();
        setTimeSinceToggle(Date.now())
        // toggleInsights(e);
        UTIL.toggleInsights(e)
    }


    const renderOverviewPanel = () => {
        return (
            <div className="overview-panel-container grid" key="overview" style={{ width: '95%', height: '100%', marginTop: 24, justifyContent: 'space-evenly' }}>
                {/* <div className="dividers">
                    <div className="divider" />
                    <div className="divider" />
                </div> */}
                {/* {staticKeys[survey_version].map(key => renderOverviewComponents("overview", key))} */}


                <Container fluid>
                    <Row>
                        {
                            staticKeys[survey_version].map((item) => {
                                if (item.type === "Overall") {
                                    return
                                }

                                return <DashBoardCardSections item={item} state={state}/>
                            })
                        }
                    </Row>
                </Container>
                {/* {



                    staticKeys[survey_version].map((item) => {
                        

                        return <div className="container">
                            <Container fluid>
                                <Row>
                                    <Col>Column 1</Col>
                                </Row>
                            </Container>
                        </div>
                    })

                } */}
            </div>
        )
        // return (
        //     <div className="overview-panel-container wide-dash-element">
        //         {staticKeys.map(key => UTIL.renderOverviewComponents("overview", key, this))}
        //     </div>
        // )
    }

    const renderInsightComponents = (panelName, subscoreSection) => {

        if (subscoreSection === "date") return;
        if (subscoreSection === "Overall") return;
        if (!insight.subscoreSection) return;
        if (insight.subscoreSection.length < 1) return;


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
        if (st > lastScrollTop) {
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

        setLastScrollTop(st <= 0 ? 0 : st)
        // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }

    const renderOverviewComponents = (panelName, subscoreSection) => {
        const prps = { survey_version: survey_version, score: score }
        let classification = UTIL.setClassificationForFunctional(prps);

        let scr = Math.ceil(score["Overall"]);
        if (!responsiveObj) setResponsiveObj(calcProgressRingRadius({ classification, scr, bool: true }));
        // let { radius, orientation, ratio, height, width } = this.responsiveObj;

        if (subscoreSection === "date") return;
        if (subscoreSection === "Overall") return (
            <div className="overall-score-container bg-dark-blue rounder-corner" key="overall-progress-ring-container">
                <div className="mlr-score">Overall MLR Score</div>
                <ProgressRing props={{ progress: scr, classification }} />
                {/* <div className="score-meaning">what does my score mean</div> */}
                <div className="classification-container">
                    <div className="classification">{classification}</div>
                    <div className="moniker">{UTIL.setMoniker(score)}</div>
                </div>
            </div>
        )

        let subscoreClass = subscoreSection.split(" ");

        return (
            <div
                className={`${panelName}-component-container`}
                onClick={handleInsights}
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
                        <div className="subscore-percent">{Math.ceil(score[subscoreSection])}%</div>
                        <img src={vector} alt="&caron;" className="subscore-cta" />
                    </div>
                </div>
                <div className="score-animation-bar-container">
                    {/* style={{width: Math.ceil(score[subscoreSection])}} */}
                    <div className={`score-animation-bar ${subscoreClass[0]}${subscoreClass.length > 1 ? `-${subscoreClass[1]}` : ""}`}></div>
                </div>
            </div>
        )
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

    useEffect(() => {
        componentDidMount()
    }, [])



    useEffect(() => {
        if (state.entities.surveys.score || state.entities.user.score) {
            findScoreChanges()
        }
    }, [state.entities.surveys.score, state.entities.user.score])

    return (
        <div id='dashboard-frame' className="bg-dark-blue-2">
            {/* <Sidenav /> */}

            <SideNav />

            {/*

                <div id="dashboard-header">
                    <div className="logo-name-container">
                        <a href="/" className="home-link"><img src={teal_logo} alt="loxz digital" className="header-logo" /></a>
                        <img src={gradient} alt="" className="gradient" />
                    </div>
                    <div className="dashboard-user-profile-container">
                        <div className="dashboard-username">Hi {state.session.user.name}</div>
                        <div className="dashboard-user-profile">
                            <div className="dashboard-user-profile-char" onClick={() => document.querySelector('.expanded-user-profile-container').classList.toggle('hidden')}>
                                {state.session.user.name.slice(0, 1)}
                            </div>
                        </div>
                        <div className="expanded-user-profile-container hidden">
                            <UserProfile />
                        </div>
                    </div>

                     comment 280 
                     <img src={survey} alt="" className="go-to-survey-icon" title='go to survey' onClick={() => this.redirectTo('/')}/> 
    </div>*/ }
            {/* header part ends here. */}


            <div className="dashboard-container">
                {
                    state.entities.activeComponent.component === DASHBOARD && [
                        <OverallMLRScore survey_version={survey_version} score={score} />,
                        // <ScoreListComponent user={state.entities.user} />,
                        renderOverviewPanel()
                        // <div className="divider"></div>,
                        // renderInsightPanel()
                    ]
                }
                {
                    state.entities.activeComponent === HEATMAP &&
                    <Heatmap />
                }
                {
                    state.entities.activeComponent === DOWNLOAD &&
                    <Download user={props.user} score={props.currentScore} />
                }
            </div>
            {/* <div className="dashboard-footer"></div> */}
        </div>
    )
}

const mapsToProps = state => {
    return {
        user: state.session.user,
        sidenav: state.entities.sidenav,
        currentScore: state.entities.surveys.score,
        archivalScore: state.entities.user.score,
        activeComponent: state.entities.activeComponent.component
    }
}

const mDTP = dispatch => {
    return {
        authenticate: (authData) => dispatch(authenticate(authData)),
        activateComponent: component => dispatch(activeComponent(component)),
        activateComparativeAnalysis: () => dispatch(activateComparativeAnalysis()),
        closeComparativeAnalysis: () => dispatch(closeComparativeAnalysis()),
        activateSentimentAnalysis: () => dispatch(activateSentimentAnalysis()),
        closeSentimentAnalysis: () => dispatch(closeSentimentAnalysis()),
        activateReccomendations: () => dispatch(activateReccomendations()),
        closeReccomendations: () => dispatch(closeReccomendations()),
        findScore: email => dispatch(userScore(email)),
    };
};
export default Dashboard;