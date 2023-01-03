import React, { Component } from "react";

//Packages
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import moment from "moment-hijri";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Tooltip } from "antd";

//Style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import HomePage from "./screens/HomePage";
import MyApps from "./screens/MyApps";
import GoalsPage from "./screens/GoalsPage";
import VisionPage from "./screens/VisionPage";
import LoginPage from "./screens/LoginPage";
import UserRegistrationWizard from "./components/registration sections/wizards/UserRegistrationWizard";
import AppointmentBooking from "./screens/AppointmentBooking";
import Services from "./screens/Services";
import TransactionInquriy from "./screens/TransactionInquriy";
import ServicePage from "./screens/Services/ServicePage";
import ContactUs from "./screens/Contact/ContactUs";
import CommonQuestions from "./screens/Contact/CommonQuestions";
import ProfilePage from "./screens/ProfilePage";
import PrivateRoute from "./containers/PrivateRoute";
import Profile from "./components/user profile/Profile";
import OrganizationChartPage from "./screens/OrganizationChartPage";
import {
  setCurrentUser,
  setCurrentToken,
  LogOut,
  setCurrentCounter,
} from "./redux/actions/authActions";
import setAuthToken from "./redux/helpers/setAuthToken";
import store from "./redux/store";
import LoginForm from "./components/loginPage sections/LoginForm";
import LoginChangePasswrod from "./components/user profile/LoginChangePasswrod";
import NotificationsMenu from "./containers/NotificationsMenu";
import TicketsPage from "./components/tickets/ticketsPage";
import StatisticsPage from "./screens/StatisticsPage";

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  store.dispatch(setCurrentToken(decoded));
  // if (localStorage.user !== undefined) {
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
  // }
}
if (localStorage.LoginCount) {
  store.dispatch(setCurrentCounter(JSON.parse(localStorage.LoginCount)));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notiVisible: false,
      openengNotificationMenu: true,
      1: false,
    };
  }

  openEngMenu = () => {
    this.setState({
      openengNotificationMenu: !this.state.openengNotificationMenu,
    });
  };

  componentDidMount() {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.clear();
        this.props.LogOut();
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let todayDate = moment();

    if (
      prevProps.user !== this.props.user &&
      this.props.user.engineering_companies !== undefined &&
      this.props.user.engineering_companies !== null
    ) {
      if (
        (this.props.user.engineering_companies.department_eng_comp.length > 0 &&
          this.props.user.engineering_companies.department_eng_comp.find(
            (n) => n.is_approved === 2
          )) ||
        (this.props.user.engineering_companies.insurance_license !== null &&
          todayDate.isAfter(
            moment(
              this.props.user.engineering_companies.insurance_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.insurance_license !== null &&
          moment(
            this.props.user.engineering_companies.insurance_license.end_date,
            "iDD/iMM/iYYYY"
          ).diff(todayDate, "days") <= 30 &&
          todayDate.isBefore(
            moment(
              this.props.user.engineering_companies.insurance_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.municipality_license !== null &&
          todayDate.isAfter(
            moment(
              this.props.user.engineering_companies.municipality_license
                .end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.municipality_license !== null &&
          moment(
            this.props.user.engineering_companies.municipality_license.end_date,
            "iDD/iMM/iYYYY"
          ).diff(todayDate, "days") <= 30 &&
          todayDate.isBefore(
            moment(
              this.props.user.engineering_companies.municipality_license
                .end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.saudi_license !== null &&
          todayDate.isAfter(
            moment(
              this.props.user.engineering_companies.saudi_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.saudi_license !== null &&
          moment(
            this.props.user.engineering_companies.saudi_license.end_date,
            "iDD/iMM/iYYYY"
          ).diff(todayDate, "days") <= 30 &&
          todayDate.isBefore(
            moment(
              this.props.user.engineering_companies.saudi_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          ))
      ) {
        this.setState({ notiVisible: true });
      }
    }
  }
  onVisibleChange = (e) => {
    this.setState({ notiVisible: !this.state.notiVisible });
  };
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          {/* {this.props.isAuth &&
          this.props.user.engcompany_id !== null &&
          this.props.user.engcompany_id !== undefined ? (
            <NotificationsMenu
              openEngMenu={this.openEngMenu}
              openengNotificationMenu={this.state.openengNotificationMenu}
            />
          ) : null} */}
          {this.props.isAuth &&
          this.props.user.engcompany_id !== null &&
          this.props.user.engcompany_id !== undefined &&
          !this.state.openengNotificationMenu ? (
            <Tooltip placement="topLeft" title="تنبيهات المكتب الهندسي">
              <NotificationsIcon
                onClick={this.openEngMenu}
                className="engNotificationIcon"
              />
            </Tooltip>
          ) : null}

          <Route exact path="/" component={HomePage} />
          <Route exact path="/Goals" component={GoalsPage} />
          <Route exact path="/Vision" component={VisionPage} />
          {this.props.isAuth ? null : (
            <Route exact path="/Login/:data" component={LoginPage} />
          )}
          {this.props.isAuth ? null : (
            <Route exact path="/Login" component={LoginForm} />
          )}
          <Route exact path="/Booking" component={AppointmentBooking} />
          <Route exact path="/Services" component={Services} />
          <Route exact path="/Inquiry" component={TransactionInquriy} />
          <Route exact path="/ChangePassword" component={LoginChangePasswrod} />
          <Route
            exact
            path="/Register/User"
            component={UserRegistrationWizard}
          />
          <Route exact path="/ContactUs" component={ContactUs} />
          <Route exact path="/Questions" component={CommonQuestions} />
          <Route exact path="/Organization" component={OrganizationChartPage} />
          <PrivateRoute
            authed={this.props.isAuth}
            notiVisible={this.state.notiVisible}
            onVisibleChange={this.onVisibleChange}
            path="/Apps"
            component={MyApps}
          />
          <Route exact path="/Services/:data" component={ServicePage} />
          <PrivateRoute
            authed={this.props.isAuth}
            exact
            path="/Profile/:data"
            component={ProfilePage}
          />
          <PrivateRoute
            authed={this.props.isAuth}
            exact
            path="/UserProfile"
            component={Profile}
          />
        </div>
        <Route path="/tickets" component={TicketsPage} />
        <Route exact path="/dashboard" component={StatisticsPage} />

      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  failedLoginAttempts: state.failedLoginAttempts,
  // expDate: state.auth.token.exp,
});
const mapDispatchToProps = {
  setCurrentUser,
  LogOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
