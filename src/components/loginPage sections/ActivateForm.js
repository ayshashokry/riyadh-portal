import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../containers/Loader";
import { Link } from "react-router-dom";
export default class ActivateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      loading: false,
      code: "",
      activateClicked: false,
      reActivateClicked: false
    };
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  confirmationActivate = () => {
    const args = {
      description: "تم التنشيط بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5
    };
    notification.open(args);
  };
  confirmationReActivate = () => {
    const args = {
      description: "تم إرسال كود التنشيط بنجاح",
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
  Activate = async e => {
    this.setState({
      activateClicked: true,
      reActivateClicked: false
    });
    if (this.state.userName !== "" && this.state.code !== "") {
      this.setState({ loading: true });

      await new Promise((resolve, reject) => {
        axios
          .post(window.ApiUrl + "/activemobiledo", {
            activation_mobil: this.state.code,
            username: this.state.userName
          })
          .then(res => {
            resolve(res.data);
            if (res.data) {
              this.confirmationActivate();
              this.setState({ loading: false, errorMsg: "" });
              this.props.GoToLogin();
            }
          })
          .catch(error => {
            this.setState({ loading: false });
            console.log(error.response.data.msg);
            if (
              error.response !== undefined &&
              error.response.status !== 401 &&
              error.response.status !== 406
            ) {
              this.setState({
                loading: false,
                errorMsg: "برجاء التأكد من اسم المستخدم و كود التنشيط"
              });
            }

            if (
              error.response !== undefined &&
              error.response.status === 406 &&
              error.response.data.msg === "login.COMBINATION_ERROR_CODE"
            ) {
              this.setState({
                loading: false,
                errorMsg: "برجاء التأكد من اسم المستخدم و كود التنشيط"
              });
            }
            if (
              error.response !== undefined &&
              error.response.status === 406 &&
              error.response.data.msg === "login.STOPPED_USER_MSG"
            ) {
              this.setState({
                loading: false,
                errorMsg: "تم إيقاف الحساب , برجاء التواصل مع الدعم الفني"
              });
            }
            if (error.response !== undefined && error.response.status === 401) {
              this.setState({
                loading: false
              });
              this.props.openActivateForm();
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

  reActivate = async e => {
    this.setState({
      activateClicked: false,
      reActivateClicked: true
    });
    if (this.state.userName !== "") {
      this.setState({ loading: true });
      await new Promise((resolve, reject) => {
        axios
          .get(`${window.ApiUrl}/getactivation?username=${this.state.userName}`)
          .then(res => {
            resolve(res.data);
            if (res.data) {
              this.confirmationReActivate();
              this.setState({ loading: false, errorMsg: "" });
            }
          })
          .catch(error => {
            this.setState({ loading: false });

            if (
              error.response !== undefined &&
              error.response.data.msg === "login.`USER_IS_ACTIV"
            ) {
              this.setState({
                loading: false,
                errorMsg: "هذا الحساب منشط بالفعل"
              });
            }
            if (
              error.response !== undefined &&
              error.response.data.msg === "login.UNREGISTER"
            ) {
              this.setState({
                loading: false,
                errorMsg: "هذا الحساب غير مسجل"
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
        <h5>تنشيط الحساب</h5>
        {this.state.loading ? <Loader /> : null}
        <Form
          className="mt-4 px-2"
          layout="vertical"
          name="validate_other"
          //   onFinish={onFinish}
        >
          <Container>
            <Row>
              <Col md={{ span: 24 }}>
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل اسم المستخدم",
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
            <Row>
              <Col md={{ span: 24 }}>
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل كود التنشيط",
                      required: this.state.activateClicked ? true : false
                    }
                  ]}
                  name="code"
                  hasFeedback
                  label="كود التنشيط"
                >
                  <Input
                    name="code"
                    onChange={this.handleUserInput}
                    value={this.state.code}
                    placeholder="كود التنشيط"
                  />
                </Form.Item>
              </Col>
            </Row>{" "}
            {this.state.errorMsg !== "" ? (
              <p className="errMsg">{this.state.errorMsg}</p>
            ) : null}
            <Row className="formButtons ">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button
                  htmlType="submit"
                  className=" signInBtn"
                  onClick={this.Activate}
                >
                  تنشيط
                </Button>
              </Col>
              <Button
                className="reActivateBtn"
                htmlType="submit"
                onClick={this.reActivate}
              >
                إضغط هنا لإعادة إرسال الكود
              </Button>
            </Row>
            <Row className="formRoutes pb-4">
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
