import React from 'react';
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

class SideNav extends React.Component {
    constructor(props) {
        super(props)
        this.navigateTo = this.navigateTo.bind(this);
        this.closeSidenav = this.closeSidenav.bind(this);
        this.activateNavComponent = this.activateNavComponent.bind(this);
        this.login_popup = 1;
        this.href = window.location.href;
        this.activate = component => this.props.activateComponent(component);
    }

    componentDidMount() {
        this.href = this.href.split('/#/')[0]
        // console.log(this.props.sidenav)
        // this.navigateTo(DASHBOARD)
    }

    componentDidUpdate() {
        this.activateNavComponent()
    }

    navigateTo(destination) {
        switch (destination) {
            case SURVEY: 
                destination = "";
                this.props.activateSurvey();
                break
            case DASHBOARD: 
                destination = "dashboard";
                this.props.activateDashboard();
                break
            default:
                return
        }

        window.location.href = this.href + "/#/" + destination;
        // this.props.closeSubDropdown();
        this.props.activateComponent(destination);
        if (window.innerWidth <= 500) this.closeSidenav();
    }

    closeSidenav() {
        let sidenav = document.querySelector('.sidenav-frame');
        sidenav.style.display = "none";
        this.props.closeSidenav();
    }

    selectNav(location) {
        if (this.props.component === location) return true;
        return false;
    }

    navItemSelect(navItem) {
        var header = document.getElementById("cont");
        var btns = header.getElementsByClassName("containerblue");
        for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        });
        }
    }

    renderDropdown(items) {
        setTimeout(() => {
            let dropdown = document.querySelector('.dropdown-container')
            if (dropdown) dropdown.classList.add('activated')
        }, 50)
        // debugger
        return (
            <div className="dropdown-container">
                {items.map((item, idx) => (
                    // <React.Fragment key={"fragment-" + idx.toString()}>
                    <div key={item.item + idx.toString()} className="dropdown-item-container" onClick={item.onClick}>
                            <img src={item.src} alt="icon" className="dropdown-icon" />
                            <div className="dropdown-item">{item.item}</div>
                    </div>
                    // {this.props.sidenav.subDropDown === item.action && (
                    //     this.renderSubDropDown(item.action)
                    // )}
                    // </React.Fragment>
                ))}
            </div>
        )
    }

    renderSubDropDown(action) {
        // switch (action) {
        //     case COMPARATIVE_ANALYSIS: 
        //         return SIDENAVUtil.renderComparativeAnalysisSubDropDown()
        //     case DASHBOARD_SENTIMENT_ANALYSIS:
        //         break
        //     case RECCOMENDATIONS:
        //         break
        //     case NEW_PROJECT:
        //         return SIDENAVUtil.renderNewProjectSubDropDown()
        //     default:
        //         return <div className="default-sub-drop">default sub dropdown</div>
        // }
    }

    dropdownClose() {
        
    }

    activateNavComponent() {
        if (!this.props.activeComponent) return;
        let navCompToDeactivate = document.querySelector('.active-component');
        if (navCompToDeactivate) navCompToDeactivate.classList.remove('active-component');
        let navCompToActivate = document.querySelector(`[data-component='${this.props.activeComponent}']`)
        if (navCompToActivate) navCompToActivate.classList.add('active-component');
    }

    render() {
        if (this.props.activeComponent) this.activateNavComponent();
        return (
            <>
                {/* {this.props.isAuthenticating ? <LoginPopupContainer /> : null} */}
                <div className="sidenav-frame">
                    <img src={close} alt="X" className="close-sidenav" onClick={this.closeSidenav} />
                    <div className="sidenav-container">
                        {/* <div className="sidenav-user-profile-container">
                            <div className="sidenav-user-profile">{this.props.user.name.slice(0, 1)}</div>
                            <div className="sidenav-username">Welcome back {this.props.user.name}</div>
                        </div> */}
                        <div className="sidenav-links-new">

                        

                            <div className="sidenav-header">MLR Overview</div>

                            <div class="container" id="cont">
                            {/* <div class="containerblue active" onClick={() => this.navItemSelect(DASHBOARD)}>
                                <div class="btn top"></div>
                                <div class="btn middle">Search</div>
                                <div class="btn bottom"></div>
                            </div> */}
                            <div class="containerblue active" onClick={() => this.navItemSelect(DASHBOARD)}>
                            
                                <div class="btn topp"></div>
                                <div class="btn top"></div>
                                <div class="btn middle">
                                <div className='row-item'>
                                    <img src={dashboard} alt="" className="sidenav-logo" />
                                    <div className='btn-nav'>Dashboard</div>
                                </div>
                                </div>
                                <div class="btn bottom"></div>   
                                <div class="btn bottomp"></div>
                            </div>

                            <div class="containerblue" onClick={() => this.navItemSelect(DASHBOARD)}>
                                <div class="btn topp"></div>
                                <div class="btn top"></div>    
                                <div class="btn middle">
                                <div className='row-item'>
                                    <img src={dashboard} alt="" className="sidenav-logo" />
                                    <div className='btn-nav'>Survey</div>
                                </div>
                                </div>  
                                <div class="btn bottom"></div>
                                <div class="btn bottomp"></div>
                            </div>

                            <div class="containerblue" onClick={() => this.navItemSelect(DASHBOARD)}>
                                <div class="btn topp"></div>
                                <div class="btn top"></div> 
                                <div class="btn middle">
                                <div className='row-item'>
                                    <img src={dashboard} alt="" className="sidenav-logo" />
                                    <div className='btn-nav'>Heatmap</div>
                                </div>
                                </div>  
                                <div class="btn bottom"></div>
                                <div class="btn bottomp"></div>
                            </div>

                            <div class="containerblue" onClick={() => this.navItemSelect(DASHBOARD)}>
                                <div class="btn topp"></div>
                                <div class="btn top"></div>     
                                <div class="btn middle">
                                <div className='row-item'>
                                    <img src={dashboard} alt="" className="sidenav-logo" />
                                    <div className='btn-nav'>Scatter</div>
                                </div>
                                </div>  
                                <div class="btn bottom"></div>
                                <div class="btn bottomp"></div>
                            </div>

                            <div class="containerblue" onClick={() => this.navItemSelect(DASHBOARD)}>
                                <div class="btn topp"></div>
                                <div class="btn top"></div>    
                                <div class="btn middle">
                                <div className='row-item'>
                                    <img src={dashboard} alt="" className="sidenav-logo" />
                                    <div className='btn-nav'>Compare</div>
                                </div>
                                </div>  
                                <div class="btn bottom"></div>
                                <div class="btn bottomp"></div>
                            </div>

                        </div>
{/* 
                            <div 
                                className="sidenav-link-container"
                                data-component={DASHBOARD}    
                            >
                                <img src={dashboard} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(DASHBOARD)}>
                                    Dashboard
                                </div>
                            </div>
                            <div 
                                className="sidenav-link-container" 
                                date-component={SURVEY}
                            >
                                <img src={reports} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.navigateTo(SURVEY)}>
                                    Survey
                                </div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={HEATMAP}        
                            >
                                <img src={heatmap} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(HEATMAP)}>
                                    Heatmap
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                            <div 
                                className="sidenav-link-container" 
                                data-component={SCATTER}    
                            >
                                <img src={scatter} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(SCATTER)}>
                                    Scatter
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={COMPARE}    
                            >
                                <img src={compare} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(COMPARE)}>
                                    Compare
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div> */}
                            {/* <div 
                                className="sidenav-link-container"
                                data-component={STATS}    
                            >
                                <img src={compare} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(STATS)}>
                                    Aggregate Stats
                                </div>
                            </div> */}
                            <div className="sidenav-header">Resources</div>
                            <div 
                                className="sidenav-link-container"
                                data-component={LEADERBOARD}
                            >
                                <img src={leaderboard} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(LEADERBOARD)}>
                                    Leaderboard
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={REPORTS}    
                            >
                                <img src={reports} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.navigateTo("REPORTS")}>
                                    Reports
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={SHARE}    
                            >
                                <img src={share} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(SHARE)}>
                                    Share
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={QR_CODE}    
                            >
                                <img src={qr} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(QR_CODE)}>
                                    QR Code
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={DOWNLOAD}    
                            >
                                <img src={download} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(DOWNLOAD)}>
                                    Download Report
                                </div>
                            </div>
                            <div 
                                className="sidenav-link-container"
                                data-component={FEEDBACK}    
                            >
                                <img src={feedback} alt="" className="sidenav-logo" />
                                <div className="sidenav-link" onClick={() => this.activate(FEEDBACK)}>
                                    Feedback
                                </div>
                                <div className="construction-container" title="under construction"><img src={padlock} alt="" className="under-construction" /></div>
                            </div>
                        </div>
                        <div className="pre-footer-cta-container">
                            <div 
                                className="pre-footer-link-container"
                                data-component={FEEDBACK}    
                            >
                                <img src={feedback} alt="" className="sidenav-logo" />
                                <div className="prefooter-link" onClick={() => this.activate(FEEDBACK)}>
                                    loxz.com
                                </div>
                            </div>
                            <div 
                                className="pre-footer-link-container"
                                data-component={FEEDBACK}    
                            >
                                <img src={feedback} alt="" className="sidenav-logo" />
                                <div className="prefooter-link" onClick={() => this.activate(FEEDBACK)}>
                                    Resources
                                </div>
                            </div>
                            <div 
                                className="pre-footer-link-container"
                                data-component={FEEDBACK}    
                            >
                                <img src={feedback} alt="" className="sidenav-logo" />
                                <div className="prefooter-link" onClick={() => this.activate(FEEDBACK)}>
                                    Privacy Policy
                                </div>
                            </div>
                        </div>
                        <div className="sidenav-footer-container">
                            <div className="sidenav-footer-links-container">
                                {/* <div className="sidenav-footer-link-container">
                                    <span className="sidenav-footer-link-span">loxz.com</span>
                                </div>
                                <div className="sidenav-footer-link-container">
                                    <span className="sidenav-footer-link-span">Resources</span>
                               </div>
                                <div className="sidenav-footer-link-container">
                                    <span className="sidenav-footer-link-span">Privacy Policy</span>
                                </div> */}
                            </div>
                                <div className="sidenav-footer-link-container">
                                    <span className="sidenav-footer-link-span">© 2022, Loxz Digital Group, Inc</span>
                                </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SideNav;