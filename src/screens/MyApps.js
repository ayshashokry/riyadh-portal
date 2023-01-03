import React, { Component } from "react";
//Components
import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";
import HomeLoggedApploications from "../components/homePage sections/HomeLoggedApploications";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class MyApps extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props.isAuth);
  }

  render() {
    return (
      <div>
        <NavBarr
          onVisibleChange={this.props.onVisibleChange}
          notiVisible={this.props.notiVisible}
        />
        <HomeLoggedApploications />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  token: state.auth.token
});

export default connect(mapStateToProps)(withRouter(MyApps));
