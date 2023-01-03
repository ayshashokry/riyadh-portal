import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../containers/Loader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LogOut } from "../../redux/actions/authActions";
import { withRouter, Link } from "react-router-dom";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmNewPassword: "",
      newPassword: "",
      loading: false,
      email: this.props.user.email,
      oldPassword: "",
      errorMsg: "",
      showChange: "firstPhase",
    };
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  confirmationEditPassword = () => {
    const args = {
      description: "تم تغيير كلمة المرور بنجاح",
      duration: 5,
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
  changePassword = async (e) => {
    let userData = {
      confirmNewPassword: this.state.confirmNewPassword,
      newPassword: this.state.newPassword,
      id: this.props.user.id,
      password: this.state.oldPassword,
    };
    if (
      this.state.confirmNewPassword !== "" &&
      this.state.newPassword !== "" &&
      this.state.oldPassword !== ""
    ) {
      this.setState({ loading: true });
      // axios.defaults.headers.common["Authorization"] = localStorage.token;

      await new Promise((resolve, reject) => {
        axios
          .post(
            window.ApiUrl + "/changepassword",
            userData
            // {
            //   headers: {
            //     "content-type": "application/json",
            //     Authorization: `bearer ${localStorage.token}`,
            //   },
            // }
          )
          .then((res) => {
            resolve(res);
            if (res) {
              this.confirmationEditPassword();
              this.setState({ loading: false, errorMsg: "" });
              this.props.LogOut();
            }
          })
          .catch((error) => {
            this.setState({ loading: false });

            if (
              error.response !== undefined &&
              error.response.data.Message === "global.WEAK_PASSWORD"
            ) {
              this.setState({
                loading: false,
                errorMsg:
                  "كلمة المرور ضعيفة , الرجاء إدخال كلمة مرور معقدة لا يقل طولها عن 8 رموز تحتوي علي حرف كبير و حرف صغير و أرقام وعلامات خاصة ",
              });
            }
            if (
              error.response !== undefined &&
              error.response.data.Message === "wrong username or password"
            ) {
              this.setState({
                loading: false,
                errorMsg: "كلمة المرور القديمة خاطئة",
              });
            }
            if (error.response !== undefined && error.response.status === 500) {
              this.setState({
                loading: false,
                errorMsg: "",
              });
              this.systemProblem();
            }
          });
      });
    }
  };
  render() {
    return (
      <Container className="loginBox changePassword">
        <h5 className="py-2">تغيير كلمة المرور</h5>
        {this.state.loading ? <Loader /> : null}

        <>
          <Form
            className=" px-2"
            layout="vertical"
            name="validate_other"
            //   onFinish={onFinish}
          >
            <Container>
              {" "}
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
                    name="oldPassword"
                    hasFeedback
                    label="كلمة المرور الحالية"
                  >
                    <Input.Password
                      size="large"
                      name="oldPassword"
                      onChange={this.handleUserInput}
                      value={this.state.oldPassword}
                      placeholder="ادخل المرور الحالية"
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
                        required: true,
                      },
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
                        message: "من فضلك ادخل تأكيد كلمة المرور",
                        required: true,
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
                        },
                      }),
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
                      placeholder="ادخل تأكيد كلمة المرور"
                    />
                  </Form.Item>
                </Col>
                {this.state.errorMsg !== "" ? (
                  <p className="errMsg">{this.state.errorMsg}</p>
                ) : null}
              </Row>
              <Row className="formRoutes">
                {" "}
                <Col span={24} style={{ textAlign: "center" }}>
                  <p>
                    <span className="formQuestion pl-2">
                      هل تريد تعديل البيانات الشخصية؟
                    </span>
                    <Link to="/Profile/EditProfile">
                      <span
                        className="formAnswer"
                        onClick={this.props.openEditProfile}
                      >
                        تعديل البيانات الشخصية
                      </span>
                    </Link>
                  </p>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <p>
                    <span className="formQuestion pl-2">
                      هل تريد الذهاب إلي الصفحة الشخصية؟
                    </span>
                    <Link to="/UserProfile">
                      {" "}
                      <span className="formAnswer">الصفحة الشخصية</span>
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
                    تأكيد
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </>
      </Container>
    );
  }
}
ChangePassword.propTypes = {
  LogOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user,
});
const mapDispatchToProps = {
  LogOut,
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(ChangePassword));
