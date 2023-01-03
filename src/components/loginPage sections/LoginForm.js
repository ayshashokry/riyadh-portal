import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Checkbox, Button, notification } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Login,
  UpdateFailedCounter,
  ResetFailedCounter,
} from "../../redux/actions/authActions";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Loader from "../../containers/Loader";
import SmallNavbar from "../../containers/SmallNavbar";
import SmallFooter from "../../containers/SmallFooter";

let idleError = "";
let interval = 60000 * 15;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      remember: false,
      employee: false,
      errorMsg: "",
      loading: false,
      failedCounterError: "",
      buttonDisable: false,
      idleTime: 1000 * 60 * 1,
      idleError: "",
      capatcha: false,
      valueCap: "",
      capatchError: "",
    };
  }
  ideleLogin = (e) => {
    this.setState({
      errorMsg: "",
      buttonDisable: true,
    });
  };
  onRecapchaChange(valueCap) {
    const { setCaptha } = this.props;
    this.setState({ valueCap: valueCap, capatcha: true, capatchError: "" });
    // localStorage.setItem("captha");
    setCaptha(valueCap);
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  checkRemember = (e) => {
    this.setState({ remember: e.target.checked });
  };
  checkEmployee = (e) => {
    this.setState({ employee: e.target.checked });
  };
  confirmationLogin = () => {
    const args = {
      description: "تم تسجيل الدخول بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  errorHappend = () => {
    const args = {
      description: "برجاء مراجعة الدعم الفني",
      duration: 15,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  systemProblem = () => {
    const args = {
      description: "حدث خطأ في النظام, من فضلك حاول في وقت لاحق",
      duration: 30,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  Signin = async (e) => {
    if (this.props.failedCounter < 3 || idleError === "") {
      this.setState({ loading: true });
      let userData = {
        password: this.state.password,
        remember_me: this.state.remember,
        username: this.state.userName,
        emp_amana: this.state.employee,
        capatcha: this.state.valueCap,
      };
      if (this.state.userName !== "" && this.state.password !== "") {
        console.log(window.ApiUrl);
        await new Promise((resolve, reject) => {
          axios
            .post(window.ApiUrl + "/auth", userData)
            .then((res) => {
              resolve(res.data);
              if (res.data) {
                this.setState({ loading: false });
                this.props.Login(res.data, this.props.history);
              }
            })
            .catch((error) => {
              this.setState({ loading: false });

              if (
                (error.response !== undefined &&
                  error.response.status === 403) ||
                (error.response !== undefined && error.response.status === 500)
              ) {
                this.props.UpdateFailedCounter(this.props.failedCounter + 1);
                this.setState({
                  loading: false,
                  errorMsg: "برجاء التأكد من اسم المستخدم أو كلمة المرور",
                });
              }

              if (
                (error.response !== undefined &&
                  error.response.status === 401 &&
                  error.response.data.Message === "User not authorized") ||
                (error.response !== undefined &&
                  error.response.status === 401 &&
                  error.response.data === "")
              ) {
                this.props.UpdateFailedCounter(this.props.failedCounter + 1);
                this.setState({
                  loading: false,
                  errorMsg: "برجاء التأكد من اسم المستخدم أو كلمة المرور",
                });
              }
              if (
                error.response !== undefined &&
                error.response.status === 401 &&
                error.response.data.Message === "Change Password"
              ) {
                this.setState({
                  loading: false,
                  errorMsg: "",
                });
                this.props.history.push("/ChangePassword");
              }
              if (
                error.response !== undefined &&
                error.response.status === 401 &&
                error.response.data.user_stopped
              ) {
                this.setState({
                  loading: false,
                });
                this.errorHappend();
              }
              if (
                error.response !== undefined &&
                error.response.status === 401 &&
                error.response.data.user_active === false
              ) {
                this.setState({
                  loading: false,
                });
                this.props.history.push("/Login/Activate");
              }
              if (
                error.response !== undefined &&
                error.response.status === 500
              ) {
                this.setState({
                  loading: false,
                  errorMsg: "",
                });
                this.systemProblem();
              }
            });
        });
        this.confirmationLogin();
      }
    }
  };
  reset = () => {
    localStorage.setItem("endTime", +new Date() + interval);
  };

  render() {
    if (this.props.failedCounter >= 3) {
      if (!localStorage.endTime) {
        this.reset();
      }

      setInterval(() => {
        var remaining = localStorage.endTime - new Date();
        if (remaining <= 0 && this.props.failedCounter >= 3) {
          localStorage.removeItem("endTime");
          this.props.UpdateFailedCounter(0);
        } else {
          this.setState({ errorMsg: "" });
        }
      }, 100);
    }
    return (
      <div className="logP">
        <SmallNavbar />
        <div className="loginPage">
          <Container className="loginBox">
            <h5>تسجيل الدخول</h5>
            {this.state.loading ? <Loader /> : null}
            <Form
              className="mt-2 px-2"
              layout="vertical"
              name="validate_other"
              onFinish={this.Signin}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        message: "من فضلك ادخل اسم المستخدم",
                        required: true,
                      },
                    ]}
                    name="userName"
                    hasFeedback
                    label="اسم المستخدم"
                  >
                    <Input
                      name="userName"
                      onChange={this.handleUserInput}
                      value={this.state.userName}
                      placeholder="اسم المستخدم"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    className="passwordInputt"
                    rules={[
                      {
                        message: "من فضلك ادخل كلمة المرور",
                        required: true,
                      },
                    ]}
                    name="password"
                    hasFeedback
                    label="كلمة المرور"
                  >
                    <Input.Password
                      size="large"
                      name="password"
                      onChange={this.handleUserInput}
                      value={this.state.password}
                      placeholder="كلمة المرور"
                    />
                  </Form.Item>
                  {/* <ReCAPTCHA
                    onExpired={() =>
                      this.setState({
                        capatcha: false,
                        valueCap: "",
                        capatchError: "capatchError",
                      })
                    }
                    onChange={this.onRecapchaChange.bind(this)}
                    sitekey="6LdL_JIbAAAAANEnukVEATtXKQ_InEvsT5NWJdsQ"
                  />
                  {this.state.capatchError !== "" ? (
                    <p className="errMsg">هذا الحقل مطلوب</p>
                  ) : (
                    ""
                  )} */}
                  <div className="checkDiv mb-4 mt-2">
                    <Checkbox
                      className="ml-3"
                      onChange={this.checkRemember}
                      style={{
                        lineHeight: "32px",
                      }}
                    />
                    تذكرني
                  </div>
                  {/* <div className="checkDiv mb-4">
                    <Checkbox
                      className="ml-3"
                      onChange={this.checkEmployee}
                      style={{
                        lineHeight: "32px",
                      }}
                    />
                    موظف أمانة
                  </div> */}
                </Col>
                {this.state.errorMsg !== "" ? (
                  <p className="errMsg">{this.state.errorMsg}</p>
                ) : null}
                {localStorage.getItem("endTime") === undefined ||
                localStorage.getItem("endTime") === null ||
                localStorage.getItem("endTime") === 0 ? null : (
                  <p className="errMsg">
                    لقد وصلت لثلاث محاولات خطاْ في الدخول أعد المحاوله بعد 15
                    دقيقة
                  </p>
                )}
              </Row>
              <Row className="formButtons ">
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button
                    htmlType="submit"
                    className=" signInBtn"
                    disabled={
                      localStorage.getItem("endTime") === undefined ||
                      localStorage.getItem("endTime") === null ||
                      localStorage.getItem("endTime") === 0
                        ? false
                        : true
                    }
                  >
                    تسجيل الدخول
                  </Button>
                </Col>
                {/* <Link to="/Login/ForgetPassword">
                  <p style={{ cursor: "pointer" }}>نسيت كلمة المرور؟</p>
                </Link> */}
              </Row>

              {/* <Row className="formRoutes">
                <Col span={24} style={{ textAlign: "center" }}>
                  <p>
                    <span className="formQuestion pl-2">
                      هل تريد إنشاء حساب جديد؟
                    </span>
                    <Link to="/Login/Register">
                      <span
                        className="formAnswer"
                        onClick={this.props.openNewAccForm}
                      >
                        إنشاء حساب جديد
                      </span>
                    </Link>
                  </p>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <p>
                    <span className="formQuestion pl-2">
                      هل تريد تنشيط حسابك؟
                    </span>
                    <Link to="/Login/Activate">
                      <span
                        className="formAnswer"
                        onClick={this.props.openActivateForm}
                      >
                        تنشيط الحساب
                      </span>
                    </Link>
                  </p>
                </Col>
              </Row> */}
            </Form>
          </Container>
          {/* <Container>
            <Row className="loginFormFooter">
              <Col md={{ span: 12 }} sm={{ span: 24 }}>
                <h6>
                  عزيزى المستخدم يمكنك الدخول عن طريق اسم المستخدم وكلمة المرور
                  المستخدمة فى منصة النفاذ الوطنى الموحد لكى تستفيد من الخدمات
                  الإلكترونية المقدمة
                </h6>
                <Button htmlType="submit">تسجيل الدخول</Button>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                style={{ textAlign: "left" }}
              >
                <img
                  src={nicLogo}
                  alt="nicLogo"
                  width="450 px"
                  height="200 px"
                />
              </Col>
            </Row>
          </Container> */}
          <SmallFooter />
        </div>
      </div>
    );
  }
}
LoginForm.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user,
  failedCounter: state.auth.failedCounter,
});
const mapDispatchToProps = {
  Login,
  UpdateFailedCounter,
  ResetFailedCounter,
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(LoginForm));
