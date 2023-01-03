import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Row, Col, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../containers/Loader";

export default class ForgetUsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      errorMsg: "",
      loading: false,
    };
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  confirmationUsername = () => {
    const args = {
      description: "تم الإرسال بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,    };
    notification.open(args);
  };
  Send = async (e) => {
    if (this.state.userEmail !== "") {
      this.setState({ loading: true });

      await new Promise((resolve, reject) => {
        axios
          .post(window.ApiUrl + "/forgetusername", {
            email: this.state.userEmail,
          })
          .then((res) => {
            if (res.data) {
              this.confirmationUsername();
              this.setState({ loading: false, errorMsg: "" });
              this.props.openLoginForm();
            }
          })
          .catch((error) => {            this.setState({ loading: false });

            if (error.response !== undefined && error.response.status !== 401) {
              this.setState({
                loading: false,
                errorMsg: "برجاء التأكد من البريد الإلكتروني",
              });
            }
            if (error.response !== undefined && error.response.status === 401) {
              this.setState({
                loading: false,
              });
              this.props.openActivateForm();
            }
          });
      });
      this.confirmationLogin();
    }
  };
  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <Container className="loginBox">
        <h5 className="pb-5">نسيت اسم المستخدم</h5>
        <Form
          className="mt-4 px-2"
          layout="vertical"
          name="validate_other"
          //   onFinish={onFinish}
        >
          <Container>
            <Row>
              <p className="pb-4 addEmail">
                من فضلك أدخل بريدك الإلكتروني لإستعادة الحساب
              </p>
              <Col md={{ span: 24 }}>
                <Form.Item
                  rules={[
                    {
                      message: " من فضلك ادخل البريد الإلكتروني",
                      required: true,
                    },
                  ]}
                  name="userEmail"
                  hasFeedback
                  label="البريد الإلكتروني"
                >
                  <Input
                    name="userEmail"
                    onChange={this.handleUserInput}
                    value={this.state.userEmail}
                    placeholder="البريد الإلكتروني"
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

            <Row className="formRoutes py-4">
              <Col span={24} style={{ textAlign: "center" }}>
                <p>
                  <span className="formQuestion pl-2">
                    هل تريد إنشاء حساب جديد؟
                  </span>
                  <span
                    className="formAnswer"
                    onClick={this.props.openNewAccForm}
                  >
                    إنشاء حساب جديد
                  </span>
                </p>
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <p>
                  <span className="formQuestion pl-2">هل لديك حساب؟</span>
                  <span
                    className="formAnswer"
                    onClick={this.props.openLoginForm}
                  >
                    تسجيل دخول
                  </span>
                </p>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    );
  }
}
