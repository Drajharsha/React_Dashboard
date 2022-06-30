import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
// import { Link } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import close from '../../icons/close.png';
// import survey from '../../icons/survey.png';
// import dashboard from '../../icons/dashboard.png';
// import settings from '../../icons/loxz-settings.SVG';
// import chat from '../../icons/loxz-chat-bubble.SVG';
// import assistance from '../../icons/loxz-microphone.SVG';
// import user from '../../icons/user.png';
// import LoginPopupContainer from '../login/login_popup_container';
import { SURVEY, DASHBOARD, HEATMAP, LEADERBOARD, SCATTER, COMPARE, REPORTS, SHARE, QR_CODE, DOWNLOAD, FEEDBACK } from '../../actions/component_actions';
// import * as SIDENAVUtil from './sidenav_util';
import dashboard from '../../icons/dashboard.svg';
import dashboard_green from '../../icons/dashboard_green.svg'
import survey from '../../icons/survey.svg'
import survey_green from '../../icons/survey_green.svg'
import heatmap from '../../icons/heatmap.svg';
import heatmap_green from '../../icons/heatmap_green.svg';
import scatter from '../../icons/scatter.svg';
import scatter_green from '../../icons/scatter_green.svg';
import compare from '../../icons/compare.svg';
import compare_green from '../../icons/compare_green.svg';
import feedback from '../../icons/feedback.svg';
import feedback_green from '../../icons/feedback_green.svg';
import leaderboard from '../../icons/leaderboard.svg';
import leaderboard_green from '../../icons/leaderboard_green.svg';
import reports from '../../icons/reports_new.svg';
import reports_green from '../../icons/reports_green_new.svg';
import share from '../../icons/share.svg';
import share_green from '../../icons/share_green.svg';
import qr from '../../icons/qrcode.svg';
import qr_green from '../../icons/qrcode_green.svg';
import download from '../../icons/download_report.svg';
import Dlogo from '../../icons/Dlogo.svg';
import download_green from '../../icons/download_report_green.svg';
import profile_pic from '../../icons/profile_pic.png'
import main_logo from '../../icons/main_logo.png'
import Left from '../../icons/left.svg';

import { useSelector, useDispatch } from 'react-redux'
import { activeComponent } from '../../actions/component_actions';
import { userScore } from '../../actions/user_actions';
import { authenticate } from '../../actions/session_actions';
import { connect } from 'react-redux'
import { set } from "react-ga";
import { activateComparativeAnalysis, closeComparativeAnalysis, activateSentimentAnalysis, closeSentimentAnalysis, activateReccomendations, closeReccomendations } from '../../actions/dashboard_actions';

const Sidenav = (props) => {

    console.log(props);

    const state = useSelector(state => state);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [navItem, setNavItem] = useState(DASHBOARD);

    console.log(user)

    useEffect(() => {

    }, [])


    const navItemSelect = (navItem) => {
        setNavItem(navItem)
        let list = document.querySelectorAll('.list');
        for (let i = 0; i < list.length; i++) {
            list[i].onclick = function () {
                let j = 0;
                while (j < list.length) {
                    list[j++].className = 'list';
                }
                list[i].className = 'list active';
            }
        }
    }

    const closeDrawer = () => {
        props.updateDrawerStatus(!props.isOpened)
    }

    const navigateTo = (destination) => {
        switch (destination) {
            case SURVEY:
                destination = "";
                props.activateSurvey();
                break
            case DASHBOARD:
                destination = "dashboard";
                props.activateDashboard();
                break
            default:
                return
        }

        window.location.href = this.href + "/#/" + destination;
        // this.props.closeSubDropdown();
        this.props.activateComponent(destination);
        if (window.innerWidth <= 500) this.closeSidenav();
    }


    return (
        <>
            {/* {this.props.isAuthenticating ? <LoginPopupContainer /> : null} */}
            <div className={`sidenav-frame ${props.isOpened ? 'open-side-nav' : 'close-sidenav'}`}>
                {/* <img src={close} alt="X" className="close-sidenav" onClick={this.closeSidenav} /> */}
                <div className="sidenav-container bg-dark-blue-2">
                    {/* <div className="sidenav-user-profile-container">
                        <div className="sidenav-user-profile">{this.props.user.name.slice(0, 1)}</div>
                        <div className="sidenav-username">Welcome back {this.props.user.name}</div>
                    </div> */}
                    {/* <div className="sidenav-links-new"> */}



                    <div class="navigation">

                        <ul className="bg-dark-blue-2">
                            <div className='mainlogo'>
                                <div className="enable-mobile-logo" style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={Left} style={{ width: 25, height: 25 }} onClick={closeDrawer} />
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 20 }}>
                                        <div className='profilelogo'>
                                            <label style={{ fontWeight: 100, fontSize: '1.7rem', color: '#25B8BF', lineHeight: 0 }}>
                                                {user.name.slice(0, 1)}
                                            </label>
                                        </div>

                                        <div className='divusername'>
                                            <div className='welcome'>Welcome</div>
                                            <div className='username'>{user.name}</div>
                                        </div>
                                    </div>
                                </div>

                                <img className="disable-logo" src={main_logo} />
                            </div>
                            {/* className='divusername'  */}
                            <div className="disable-logo" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '30px', marginLeft: '20px' }}>
                                <div className='profilelogo'>
                                    <label style={{ fontWeight: 100, fontSize: '1.7rem', color: '#25B8BF', lineHeight: 0 }}>
                                        {user.name.slice(0, 1)}
                                    </label>

                                </div>

                                <div className='divusername'>
                                    <div className='welcome'>Welcome</div>
                                    <div className='username'>{user.name}</div>
                                </div>
                            </div>
                            <div className="sidenav-header">MRL Overview</div>
                            <li class="list active" onClick={() => navItemSelect(DASHBOARD)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === DASHBOARD ? dashboard_green : dashboard} alt="" className="sidenav-logo" />
                                    <span class="title">Dashboard</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(SURVEY)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === SURVEY ? survey_green : survey} alt="" className="sidenav-logo" />
                                    <span class="title">Survey</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(HEATMAP)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === HEATMAP ? heatmap_green : heatmap} alt="" className="sidenav-logo" />
                                    <span class="title">Heatmap</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(SCATTER)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === SCATTER ? scatter_green : scatter} alt="" className="sidenav-logo" />
                                    <span class="title">Scatter</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(COMPARE)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === COMPARE ? compare_green : compare} alt="" className="sidenav-logo" />
                                    <span class="title">Compare</span>
                                </a>
                            </li>
                            <div className="sidenav-header-res">Resources</div>
                            <li class="list" onClick={() => navItemSelect(LEADERBOARD)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === LEADERBOARD ? leaderboard_green : leaderboard} alt="" className="sidenav-logo" />
                                    <span class="title">Leaderboard</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(REPORTS)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === REPORTS ? reports_green : reports} alt="" className="sidenav-logo" />
                                    <span class="title">Reports</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(SHARE)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === SHARE ? share_green : share} alt="" className="sidenav-logo" />
                                    <span class="title">Share</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(QR_CODE)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === QR_CODE ? qr_green : qr} alt="" className="sidenav-logo" />
                                    <span class="title">QR Code</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(DOWNLOAD)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === DOWNLOAD ? download_green : download} alt="" className="sidenav-logo" />
                                    <span class="title">Download Report</span>
                                </a>
                            </li>
                            <li class="list" onClick={() => navItemSelect(FEEDBACK)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <img src={navItem === FEEDBACK ? feedback_green : feedback} alt="" className="sidenav-logo" />
                                    <span class="title">Feedback</span>
                                </a>
                            </li>

                            <div
                                className="pre-footer-link-container"
                                data-component={FEEDBACK}
                            >
                                <div className="prefooter-link" onClick={() => this.activate(FEEDBACK)}>
                                    loxz.com
                                </div>
                                <div className="prefooter-link" onClick={() => this.activate(FEEDBACK)}>
                                    Resources
                                </div>
                                <div className="prefooter-link" onClick={() => this.activate(FEEDBACK)}>
                                    Privacy Policy
                                </div>
                            </div>

                            <div className='sidenav-footer-container'>
                                <span className="sidenav-footer-link-span">© 2022, Loxz Digital Group, Inc</span>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidenav;



