import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginPopupContainer from '../login/login_popup_container';
import settings from '../../icons/settings.svg';
import dashboard from '../../icons/loxz-dashboard.SVG';
import { authenticate, login, logout, loggingIn } from '../../actions/session_actions';


const UserProfilePopUp = (props) => {

    const session = useSelector(state => state.session)
    const dispatch = useDispatch();

    const handleSession = () => {
        if (session.isAuthenticated) return dispatch(logout());
        dispatch(loggingIn(true))
    }


    return (
        <>
                {session.isAuthenticating ? <LoginPopupContainer /> : null}
                <div  onClick={() => {}}>
                    <div className="user-profile-container">
                        <div className="topnav-session-container-new">
                            <div className="logout-button-new" onClick={handleSession}>{(session.isAuthenticated ? "SIGN OUT" : "LOGIN")}</div>
                        </div>
                        {session.user ? 
                        <div id="user-profile-new">
                            {/* <div className="dash-component-header"></div> */}
                            <div className="user-data-container">
                                <div id="name" className="user-field user-field-value">{session.user.name + " " + (session.user.surname || "")}</div>
                                <div id="email" className="user-field user-field-value">{session.user.email || ""}</div>
                            </div>
                            {/* <div className="user-profile-item-container">
                                <img src={billing} alt="" className="user-profile-item-logo" />
                                <div className="user-profile-item">Billing</div>
                            </div> */}
                            <div className="user-profile-item-container">
                                <img src={settings} alt="" className="user-profile-item-logo" />
                                <div className="user-profile-item">Settings</div>
                            </div>
                            <div className="user-profile-item-container active-user-profile-item-container"
                                onClick={() => window.location.assign(window.location.href + "dashboard")}
                            >
                                <img src={dashboard} alt="" className="user-profile-item-logo" />
                                <div className="user-profile-item">Dashboard</div>
                            </div>
                        </div>
                        :
                        null
                        }
                    </div>
                </div>
            </>
    )
}

export default UserProfilePopUp;