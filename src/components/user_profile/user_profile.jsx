import React from 'react';
import LoginPopupContainer from '../login/login_popup_container';
// import billing from '../../icons/billing.svg';
import settings from '../../icons/settings.svg';
import dashboard from '../../icons/loxz-dashboard.SVG';

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.handleSession = this.handleSession.bind(this);
    }

    componentDidMount() {
        if (localStorage.authentication) {
            this.props.authenticate(JSON.parse(localStorage.authentication))
        }
    }

    async handleSession() {
        if (this.props.isAuthenticated) return this.props.logout();
        this.props.loggingIn(true);
    }

    render() {
        return (
            <>
                {this.props.isAuthenticating ? <LoginPopupContainer /> : null}
                <div className="user-profile-frame" onClick={() => {}}>
                    <div id="user-profile-container" className="user-profile-container">
                        <div className="topnav-session-container">
                            <div className="logout-button" onClick={this.handleSession}>{(this.props.isAuthenticated ? "SIGN OUT" : "LOGIN")}</div>
                        </div>
                        {this.props.user ? 
                        <div id="user-profile">
                            {/* <div className="dash-component-header"></div> */}
                            <div className="user-data-container">
                                <div id="name" className="user-field user-field-value">{this.props.user.name + " " + (this.props.user.surname || "")}</div>
                                <div id="email" className="user-field user-field-value">{this.props.user.email || ""}</div>
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
}

export default UserProfile;