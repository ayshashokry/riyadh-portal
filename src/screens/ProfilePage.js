import React, { Component } from "react";

//Packages
import SmallNavbar from "../containers/SmallNavbar";
import SmallFooter from "../containers/SmallFooter";
import Profile from "../components/user profile/Profile";
import ChangePassword from "../components/user profile/ChangePassword";
import EditProfile from "../components/user profile/EditProfile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class ProfilePage extends Component {
  componentDidMount() {
    this.setState({
      showProfile: true,
      showEditProfile: false,
      showChangePassword: false,
      showChangePassword2: false,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      showProfile: true,
      showEditProfile: false,
      showChangePassword: false,
      showChangePassword2: false,
    };
  }
  openProfile = (e) => {
    this.setState({
      showProfile: true,
      showEditProfile: false,
      showChangePassword: false,
      showChangePassword2: false,
    });
  };
  openEditProfile = (e) => {
    this.setState({
      showProfile: false,
      showEditProfile: true,
      showChangePassword: false,
      showChangePassword2: false,
    });
  };
  openChangePassword = (e) => {
    this.setState({
      showProfile: false,
      showEditProfile: false,
      showChangePassword: true,
      showChangePassword2: false,
    });
  };
  openChangePassword2 = (e) => {
    this.setState({
      showProfile: false,
      showEditProfile: false,
      showChangePassword: false,
      showChangePassword2: true,
    });
  };
  render() {
    return (
      <div style={{ height: "120vh" }} className="logP">
        <SmallNavbar />
        <div className="loginPage">
          {" "}
          <div className="layer">
            {this.props.location.pathname.substring(9) === "EditProfile" ? (
              <EditProfile
                user={this.props.user}
                openProfile={this.openProfile}
                openChangePassword={this.openChangePassword}
              />
            ) : this.props.location.pathname.substring(9) ===
              "ChangePassword" ? (
              <ChangePassword
                user={this.props.user}
                showChange={
                  this.state.showChangePassword
                    ? "firstPhase"
                    : this.state.showChangePassword2
                    ? "lastPhase"
                    : ""
                }
                openProfile={this.openProfile}
                openChangePassword2={this.openChangePassword2}
                openEditProfile={this.openEditProfile}
              />
            ) : (
              <Profile
                user={this.props.user}
                openEditProfile={this.openEditProfile}
                openChangePassword={this.openChangePassword}
              />
            )}
          </div>
          <SmallFooter />
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStatetoProps)(withRouter(ProfilePage));
