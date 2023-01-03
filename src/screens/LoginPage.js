import React, { Component } from "react";

//Packages
import SmallNavbar from "../containers/SmallNavbar";
import SmallFooter from "../containers/SmallFooter";
import LoginForm from "../components/loginPage sections/LoginForm";
import ActivateForm from "../components/loginPage sections/ActivateForm";
import CreateNewAccountTypes from "../components/loginPage sections/CreateNewAccountTypes";
import ForgetPasswordForm from "../components/loginPage sections/ForgetPasswordForm";
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: true,
      showActivateForm: false,
      showNewAccTypeForm: false,
      showForgetPasswordForm: false,
      showForgetUsernameForm: false,
    };
  }
  componentDidMount() {
    this.setState({
      showLoginForm: true,
      showActivateForm: false,
      showNewAccTypeForm: false,
      showForgetPasswordForm: false,
      showForgetUsernameForm: false,
    });
  }
  openLoginForm = (e) => {
    this.setState({
      showLoginForm: true,
      showActivateForm: false,
      showNewAccTypeForm: false,
      showForgetUsernameForm: false,
      showForgetPasswordForm: false,
    });
  };
  openForgetPasswordForm = (e) => {
    this.setState({
      showLoginForm: false,
      showActivateForm: false,
      showNewAccTypeForm: false,
      showForgetPasswordForm: true,
      showForgetUsernameForm: false,
    });
  };
  openActivateForm = (e) => {
    this.setState({
      showLoginForm: false,
      showActivateForm: true,
      showNewAccTypeForm: false,
      showForgetPasswordForm: false,
      showForgetUsernameForm: false,
    });
  };
  openNewAccForm = (e) => {
    this.setState({
      showLoginForm: false,
      showActivateForm: false,
      showForgetPasswordForm: false,
      showNewAccTypeForm: true,
    });
  };
  GoToLogin = (e) => {
    this.props.history.replace("/Login");
  };
  render() {
    return (
      <div className="logP">
        <SmallNavbar />
        <div className="loginPage">
          {this.props.location.pathname.substring(7) === "Activate" ? (
            <ActivateForm
              GoToLogin={this.GoToLogin}
              openNewAccForm={this.openNewAccForm}
              openLoginForm={this.openLoginForm}
            />
          ) : this.props.location.pathname.substring(7) === "Register" ? (
            <CreateNewAccountTypes
              GoToLogin={this.GoToLogin}
              openLoginForm={this.openLoginForm}
              openActivateForm={this.openActivateForm}
            />
          ) : this.props.location.pathname.substring(7) === "ForgetPassword" ? (
            <ForgetPasswordForm
              GoToLogin={this.GoToLogin}
              openNewAccForm={this.openNewAccForm}
              openLoginForm={this.openLoginForm}
            />
          ) : (
            <LoginForm
              openActivateForm={this.openActivateForm}
              openNewAccForm={this.openNewAccForm}
              openForgetPasswordForm={this.openForgetPasswordForm}
            />
          )}

          <SmallFooter />
        </div>
      </div>
    );
  }
}
