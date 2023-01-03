import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Form, Input, Row, Col, Button, notification } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editProfile } from "../../redux/actions/authActions";
import { withRouter, Link } from "react-router-dom";
import Loader from "../../containers/Loader";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.user.name,
      email: this.props.user.email,
      mobile:
        this.props.user.mobile != null &&
        this.props.user.mobile.startsWith("966")
          ? this.props.user.mobile.slice(3, this.props.user.mobile.length)
          : this.props.user.mobile,
      address: this.props.user.address,
      loading: false,
      emailError: ""
    };
  }
  handleUserInput = e => {
    if (
      e.target.name === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      this.setState({ emailError: "" });
    }
    if (
      e.target.name === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      ) === false
    ) {
      this.setState({ emailError: "البريد الإلكتروني غير صحيح" });
    }

    if (e.target.name === "email" && e.target.value === "") {
      this.setState({ emailError: "من فضلك أدخل البريد الإلكتروني" });
    }

    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };
  confirmationEditProfile = () => {
    const args = {
      description: "تم تعديل الملف الشخصي بنجاح",
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
  editProfile = async e => {
    let userData = {
      ...this.props.user,
      name: this.state.userName,
      email: this.state.email,
      mobile: "966" + this.state.mobile,
      "mobile-part": this.state.mobile,
      address: this.state.address
    };
    if (
      this.state.userName !== "" &&
      this.state.email !== "" &&
      this.state.mobile !== "" &&
      this.state.address !== ""
    ) {
      this.setState({ loading: true });
      // axios.defaults.headers.common["Authorization"] = localStorage.token;

      await new Promise((resolve, reject) => {
        axios
          .post(
            window.ApiUrl + "/edit_profile/" + this.props.user.id,
            userData,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `bearer ${localStorage.token}`
              }
            }
          )
          .then(res => {
            resolve(res);
            if (res) {
              this.confirmationEditProfile();
              this.setState({ loading: false });
              this.props.editProfile(res.data);
            }
          })
          .catch(error => {
            this.setState({ loading: false });
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
    if (this.state.email === "") {
      this.setState({
        emailError: "من فضلك أدخل البريد الإلكتروني"
      });
    }
  };
  handlePhoneInput = e => {
    if (e.target.value.length > 9) {
      e.target.value = e.target.value.slice(0, 9);
      this.setState({ mobile: e.target.value.slice(0, 9) });
    }
  };
  keyPress = e => {
    return /[\d]/.test(String.fromCharCode(e.target.value.keyCode));
  };
  render() {
    return (
      <Container className="loginBox">
        <h5>تعديل بيانات الملف الشخصي</h5>
        {this.state.loading ? <Loader /> : null}
        <Form
          onFinish={this.editProfile}
          initialValues={{
            userName: this.state.userName,
            email: this.state.email,
            mobile: this.state.mobile,
            address: this.state.address
          }}
          className="mt-4 px-2"
          layout="vertical"
          name="nest-messages"
        >
          <Container>
            <Row>
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل الاسم بالكامل",
                      required: true
                    }
                  ]}
                  name="userName"
                  hasFeedback
                  label="الاسم بالكامل"
                >
                  <Input
                    name="userName"
                    onChange={this.handleUserInput}
                    value={this.state.userName}
                    placeholder="ادخل الاسم بالكامل"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="email"
                  hasFeedback={this.state.emailError !== "" ? true : false}
                  label="البريد الإلكتروني"
                >
                  <Input
                    type="email"
                    name="email"
                    className={this.state.emailError !== "" ? "emailErr" : ""}
                    onChange={this.handleUserInput}
                    value={this.state.email}
                    placeholder="ادخل البريد الإلكتروني"
                  />{" "}
                  {this.state.emailError !== "" ? (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {this.state.emailError}</div>
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>{" "}
            <Row>
              <Col span={24} className="phoneNum">
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك أدخل رقم الجوال",
                      required: true,
                      max: "9999"
                    },
                    {
                      max: 9,
                      message: "رقم الجوال لا يزيد عن 9 أرقام"
                    },
                    {
                      min: 9,
                      message: "رقم الجوال لا يقل عن 9 أرقام"
                    },
                    {
                      pattern: new RegExp(/^5/),
                      message: "يجب أن يبدأ رقم الجوال بالرقم 5"
                    }
                  ]}
                  name="mobile"
                  hasFeedback
                  label="الجوال"
                >
                  <Input
                    addonAfter="966"
                    type="number"
                    name="mobile"
                    onChange={this.handleUserInput}
                    value={this.state.mobile}
                    placeholder="ادخل رقم الجوال"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل العنوان",
                      required: true
                    }
                  ]}
                  name="address"
                  hasFeedback
                  label="العنوان"
                >
                  <Input
                    name="address"
                    onChange={this.handleUserInput}
                    value={this.state.address}
                    placeholder="ادخل العنوان"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="formButtons my-2 ">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button htmlType="submit" className=" signInBtn">
                  حفظ التعديلات
                </Button>
              </Col>
            </Row>{" "}
            <Row className="formRoutes">
              {" "}
              <Col span={24} style={{ textAlign: "center" }}>
                <p>
                  <span className="formQuestion pl-2">
                    هل تريد تغيير كلمة المرور؟
                  </span>
                  <Link to="/Profile/ChangePassword">
                    <span
                      className="formAnswer"
                      // onClick={this.props.openChangePassword}
                    >
                      تغيير كلمة المرور
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
                    <span
                      className="formAnswer"
                      onClick={this.props.openProfile}
                    >
                      الصفحة الشخصية
                    </span>
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
EditProfile.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user
});
const mapDispatchToProps = {
  editProfile
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(EditProfile));
