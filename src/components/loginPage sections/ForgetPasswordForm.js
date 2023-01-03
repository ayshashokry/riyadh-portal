import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../containers/Loader";
import { Link } from "react-router-dom";
export default class ForgetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      errorMsg: "",
      loading: false
    };
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  confirmationPassword = () => {
    const args = {
      description:
        "تم إرسال رسالة نصية بكلمة المرور إلي رقم الجوال المسجل لدينا",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5
    };
    notification.open(args);
  };
  systemProblem = () => {
    const args = {
      description: "حدث خطأ في النظام, من فضلك حاول في وقت لاحق",
      duration: 30,
      placement: "bottomLeft",
      bottom: 5
    };
    notification.open(args);
  };
  Send = async e => {
    if (this.state.userName !== "") {
      this.setState({ loading: true });

      await new Promise((resolve, reject) => {
        axios
          .post(window.ApiUrl + "/forgetpassword", {
            username: this.state.userName
          })
          .then(res => {
            resolve(res.data);
            if (res.data) {
              if (res.status === 202) {
                this.props.GoToLogin();

                this.setState({
                  loading: false,
                  errorMsg: "لم يتم إرسال الرقم السري برجاء المحاولة مرة"
                });
              } else {
                this.confirmationPassword();
                this.setState({ loading: false, errorMsg: "" });
                this.props.GoToLogin();
              }
            }
          })
          .catch(error => {
            this.setState({ loading: false });
            if (
              error.response !== undefined &&
              error.response.status === 401 &&
              error.response.data.Message === "user not found"
            ) {
              this.setState({
                errorMsg: "هذا المستخدم غير موجود"
              });
            }

            if (
              error.response !== undefined &&
              error.response.status === 401 &&
              error.response.data.Message === "mobile not found"
            ) {
              this.setState({
                errorMsg:
                  "رقم الجوال غير مسجل بحسابك الشخصي , برجاء التواصل مع الدعم الفني"
              });
            }
            if (error.response !== undefined && error.response.status === 202) {
              this.setState({
                errorMsg: "لم يتم إرسال الرقم السري برجاء المحاولة مرة"
              });
            }
            if (error.response !== undefined && error.response.status === 500) {
              this.setState({
                loading: false,
                errorMsg: ""
              });
              this.systemProblem();
            }
          });
      });
    }
  };
  render() {
    return (
      <Container className="loginBox">
        {this.state.loading ? <Loader /> : null}
        <h5 className="pb-2">نسيت كلمة المرور</h5>
        <Form
          className="mt-4 px-2"
          layout="vertical"
          name="validate_other"
          //   onFinish={onFinish}
        >
          <Container>
            <Row>
              <p className="pb-4 addEmail">
                من فضلك أدخل اسم المستخدم لإستعادة كلمة المرور
              </p>
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      message: " من فضلك ادخل اسم المستخدم",
                      required: true
                    }
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
            {this.state.errorMsg !== "" ? (
              <p className="errMsg">{this.state.errorMsg}</p>
            ) : null}
            <Row className="formButtons pt-2 ">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button
                  htmlType="submit"
                  className=" signInBtn"
                  onClick={this.Send}
                >
                  إرسال
                </Button>
              </Col>
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
                  <span className="formQuestion pl-2">هل لديك حساب؟</span>
                  <Link to="/Login">
                    <span className="formAnswer">تسجيل دخول</span>
                  </Link>
                </p>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    );
  }
}
