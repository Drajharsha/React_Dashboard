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
import dashboard from '../../icons/loxz-dashboard.SVG';
import heatmap from '../../icons/loxz-heatmap.SVG';
import scatter from '../../icons/loxz-scatter.SVG';
import compare from '../../icons/loxz-compare.SVG';
import feedback from '../../icons/loxz-feedback.SVG';
import leaderboard from '../../icons/loxz-leaderboard.SVG';
import reports from '../../icons/loxz-reports.SVG';
import share from '../../icons/loxz-share.SVG';
import qr from '../../icons/loxz-qr-code.SVG';
import download from '../../icons/loxz-download.SVG';
import padlock from '../../icons/padlock.png';
import dashboard_new from '../../icons/dashboard_new.png'
import group_new from '../../icons/group_new.png'
import heatmap_new from '../../icons/heatmap_new.png'
import scatter_new from '../../icons/scatter_new.png'
import compare_new from '../../icons/compare_new.png'
import reports_new from '../../icons/reports_new.png'
import share_new from '../../icons/share_new.png'
import qr_code_new from '../../icons/qr_code_new.png'
import download_report_new from '../../icons/download_report_new.png'
import feedback_new from '../../icons/feedback_new.png'
import profile_pic from '../../icons/profile_pic.png'
import main_logo from '../../icons/main_logo.png'

import { useSelector, useDispatch } from 'react-redux'
import { activeComponent } from '../../actions/component_actions';
import { userScore } from '../../actions/user_actions';
import { authenticate } from '../../actions/session_actions';
import {connect} from 'react-redux'
import { set } from "react-ga";
import { activateComparativeAnalysis, closeComparativeAnalysis, activateSentimentAnalysis, closeSentimentAnalysis, activateReccomendations, closeReccomendations } from '../../actions/dashboard_actions';

const Sidenav = (props) => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    

    useEffect(() => {
        
    }, [])


    const navItemSelect = (navItem) => {
        // var header = document.getElementById("cont");
        // var btns = header.getElementsByClassName("containerblue");
        // for (var i = 0; i < btns.length; i++) {
        // btns[i].addEventListener("click", function() {
        // var current = document.getElementsByClassName("active");
        // current[0].className = current[0].className.replace(" active", "");
        // this.className += " active";
        // });
        // }

        let list = document.querySelectorAll('.list');
                        for (let i=0; i<list.length; i++){
                            list[i].onclick = function(){
                                let j = 0;
                                while(j < list.length){
                                    list[j++].className = 'list';
                                }
                                list[i].className = 'list active';
                            }
                        }
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
            <div className="sidenav-frame">
                {/* <img src={close} alt="X" className="close-sidenav" onClick={this.closeSidenav} /> */}
                <div className="sidenav-container">
                    {/* <div className="sidenav-user-profile-container">
                        <div className="sidenav-user-profile">{this.props.user.name.slice(0, 1)}</div>
                        <div className="sidenav-username">Welcome back {this.props.user.name}</div>
                    </div> */}
                    {/* <div className="sidenav-links-new"> */}

                    

                        <div class="navigation">
                        
                            <ul>
                            <div className='mainlogo'>
                                <img src={main_logo} />
                            </div>
                            {/* className='divusername'  */}
                            <div style={{display: 'flex', flexDirection: 'row', alignItems:'center', marginTop:'30px',marginLeft:'20px'}}>
                                    <div className='profilelogo'>
                                        <img src={profile_pic} />
                                    </div>
                                    
                                    <div className='divusername'>
                                        <div className='welcome'>Welcome</div>
                                        <div className='username'>Tony Danza</div>
                                    </div>
                            </div>
                            <div className="sidenav-header">MRL Overview</div>
                                <li class="list active" onClick={() => navItemSelect(DASHBOARD)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={dashboard_new} alt="" className="sidenav-logo" />
                                        <span class="title">Dashboard</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(SURVEY)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={group_new} alt="" className="sidenav-logo" />
                                        <span class="title">Survey</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(HEATMAP)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={heatmap_new} alt="" className="sidenav-logo" />
                                        <span class="title">Heatmap</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(SCATTER)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={scatter_new} alt="" className="sidenav-logo" />
                                        <span class="title">Scatter</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(COMPARE)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={compare_new} alt="" className="sidenav-logo" />
                                        <span class="title">Compare</span>
                                    </a>
                                </li>
                                <div className="sidenav-header-res">Resources</div>
                                <li class="list" onClick={() => navItemSelect(LEADERBOARD)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={compare_new} alt="" className="sidenav-logo" />
                                        <span class="title">Leaderboard</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(REPORTS)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={reports_new} alt="" className="sidenav-logo" />
                                        <span class="title">Reports</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(SHARE)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={share_new} alt="" className="sidenav-logo" />
                                        <span class="title">Share</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(QR_CODE)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={qr_code_new} alt="" className="sidenav-logo" />
                                        <span class="title">QR Code</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(DOWNLOAD)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={download_report_new} alt="" className="sidenav-logo" />
                                        <span class="title">Download Report</span>
                                    </a>
                                </li>
                                <li class="list" onClick={() => navItemSelect(FEEDBACK)}>
                                    <b></b>
                                    <b></b>
                                    <a>
                                        <img src={feedback_new} alt="" className="sidenav-logo" />
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



