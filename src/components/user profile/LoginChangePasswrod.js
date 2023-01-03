import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../containers/Loader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LogOut } from "../../redux/actions/authActions";
import { withRouter, Link } from "react-router-dom";
import SmallNavbar from "../../containers/SmallNavbar";
import SmallFooter from "../../containers/SmallFooter";
class LoginChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmNewPassword: "",
      newPassword: "",
      username: this.props.user.username,
      oldPassword: "",
      loading: false,
      errorMsg: "",
      usernameError: ""
    };
  }
  handleUserInput = e => {
    if (e.target.name === "username" && e.target.value === "") {
      this.setState({ usernameError: "من فضلك أدخل اسم المستخدم" });
    }

    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  confirmationEditPassword = () => {
    const args = {
      description: "تم تغيير كلمة المرور بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5
    };
    notification.open(args);
  };
  changePassword = async e => {
    let userData = {
      confirmNewPassword: this.state.confirmNewPassword,
      newPassword: this.state.newPassword,
      username: this.state.username,
      password: this.state.oldPassword
    };
    if (this.state.username === "") {
      this.setState({
        usernameError: "من فضلك أدخل اسم المستخدم"
      });
    }
    if (
      this.state.confirmNewPassword !== "" &&
      this.state.newPassword !== "" &&
      this.state.oldPassword !== "" &&
      this.state.username !== ""
    ) {
      this.setState({ loading: true });
      // axios.defaults.headers.common["Authorization"] = localStorage.token;

      await new Promise((resolve, reject) => {
        axios
          .post(
            window.ApiUrl + "/changepassword",
            userData
            // {
            // headers: {
            //   "content-type": "application/json",
            //   Authorization: `bearer ${localStorage.token}`,
            // },
            // }
          )
          .then(res => {
            resolve(res);
            if (res) {
              this.confirmationEditPassword();
              this.setState({ loading: false, errorMsg: "" });
              this.props.history.push("/Login");
            }
          })
          .catch(error => {
            this.setState({ loading: false });

            if (
              error.response !== undefined &&
              error.response.data.Message === "global.WEAK_PASSWORD"
            ) {
              this.setState({
                loading: false,
                errorMsg:
                  "كلمة المرور ضعيفة , الرجاء إدخال كلمة مرور معقدة لا يقل طولها عن 8 رموز تحتوي علي حرف كبير و حرف صغير و أرقام وعلامات خاصة "
              });
            }
            if (
              error.response !== undefined &&
              error.response.data.Message === "wrong username or password"
            ) {
              this.setState({
                loading: false,
                errorMsg:
                  "يوجد خطأ في اسم المستخدم أو كلمة المرور الحالية "
              });
            }
          });
      });
    }
  };
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <SmallNavbar />
        <div className="loginPage">
          <div className="layer">
            <Container className="loginBox changePassword">
              <h5 className="py-2">تغيير كلمة المرور</h5>
              {this.state.loading ? <Loader /> : null}

              <>
                <Form className=" px-2" layout="vertical" name="validate_other">
                  <Container>
                    <h6>كلمة المرور الخاصة بك غير مطابقة</h6>
                    <p className="pb-2">
                      كلمة مرور يجب أن لا يقل طولها عن 8 رموز وتحتوي علي حرف
                      كبير .و حرف صغير و أرقام وعلامات خاصة
                    </p>
                    <Row>
                      <Col md={{ span: 24 }}>
                        <Form.Item
                          name="username"
                          hasFeedback={
                            this.state.usernameError !== "" ? true : false
                          }
                          label="اسم المستخدم"
                        >
                          <Input
                            className={
                              this.state.usernameError !== ""
                                ? "usernameErr"
                                : ""
                            }
                            name="username"
                            onChange={this.handleUserInput}
                            value={this.state.username}
                            placeholder="اسم المستخدم"
                          />
                          {this.state.usernameError !== "" ? (
                            <div className="ant-form-item-explain ant-form-item-explain-error">
                              <div role="alert">
                                {" "}
                                {this.state.usernameError}
                              </div>
                            </div>
                          ) : null}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          className="passwordInputt"
                          rules={[
                            {
                              message: "من فضلك ادخل كلمة المرور الحالية",
                              required: true
                            }
                          ]}
                          name="oldPassword"
                          hasFeedback
                          label="كلمة المرور الحالية"
                        >
                          <Input.Password
                            size="large"
                            name="oldPassword"
                            onChange={this.handleUserInput}
                            value={this.state.oldPassword}
                            placeholder="ادخل كلمة المرور الحالية"
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
                              message: "من فضلك ادخل كلمة المرور الجديدة",
                              required: true
                            }
                          ]}
                          name="newPassword"
                          hasFeedback
                          label="كلمة المرور الجديدة"
                        >
                          <Input.Password
                            size="large"
                            name="newPassword"
                            onChange={this.handleUserInput}
                            value={this.state.newPassword}
                            placeholder="ادخل كلمة المرور الجديدة"
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
                              message: "من فضلك ادخل تأكيد كلمة المرور الجديدة",
                              required: true
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("newPassword") === value
                                ) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(
                                  new Error("كلمة المرور غير متطابقة ")
                                );
                              }
                            })
                          ]}
                          dependencies={["newPassword"]}
                          name="confirmNewPassword"
                          hasFeedback
                          label="تأكيد كلمة المرور الجديدة"
                        >
                          <Input.Password
                            size="large"
                            name="confirmNewPassword"
                            onChange={this.handleUserInput}
                            value={this.state.confirmNewPassword}
                            placeholder="ادخل تأكيد كلمة المرور الجديدة"
                          />
                        </Form.Item>
                      </Col>
                      {this.state.errorMsg !== "" ? (
                        <p className="errMsg">{this.state.errorMsg}</p>
                      ) : null}
                    </Row>

                    <Row className="formRoutes py-2">
                      <Col span={24} style={{ textAlign: "center" }}>
                        <p>
                          <span className="formQuestion pl-2">
                            هل تريد إنشاء حساب جديد؟
                          </span>
                          <Link to="/Login/Register">
                            <span className="formAnswer">إنشاء حساب جديد</span>
                          </Link>
                        </p>
                      </Col>
                      <Col span={24} style={{ textAlign: "center" }}>
                        <p>
                          <span className="formQuestion pl-2">
                            هل لديك حساب؟
                          </span>
                          <Link to="/Login">
                            <span className="formAnswer">تسجيل دخول</span>
                          </Link>
                        </p>
                      </Col>
                    </Row>
                    <Row className="formButtons my-2 ">
                      <Col span={24} style={{ textAlign: "center" }}>
                        <Button
                          htmlType="submit"
                          className=" signInBtn"
                          onClick={this.changePassword}
                        >
                          تغيير{" "}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </>
            </Container>{" "}
            <SmallFooter />
          </div>
        </div>
      </div>
    );
  }
}
LoginChangePassword.propTypes = {
  LogOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});
const mapDispatchToProps = {
  LogOut
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(LoginChangePassword));
