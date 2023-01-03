import React, { Component } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { toArabic } from "arabic-digits";
import axios from "axios";
import Loader from "../../containers/Loader";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faPhoneAlt,
  faFax,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
// const validateMessages = {
//   required: "من فضلك قم بإدخال البريد الإلكتروني",
//   types: {
//     email: "البريد الإلكتروني غير صحيح",
//   },
// };
export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      userMsg: "",
      errorMsg: "",
      loading: false,
      msgCounter: 10,
      emailError: "",
      current: 0,
    };
    this.formRef = React.createRef();
    this.emailRef = React.createRef();
  }
  handleUserInput = (e) => {
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
    this.setState({
      [name]: value,
      errorMsg: "",
      msgCounter: this.state.msgCounter - 1,
    });
  };

  confirmationSend = () => {
    const args = {
      description: "تم الإرسال بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  sendMsg = async (e) => {
    if (this.state.email === "") {
      this.setState({ emailError: "من فضلك أدخل البريد الإلكتروني" });
    }
    if (
      this.state.email !== "" &&
      this.state.userName !== "" &&
      this.state.userMsg !== "" &&
      this.state.emailError === ""
    ) {
      this.setState({ loading: true, emailError: "" });

      await new Promise((resolve, reject) => {
        axios
          .post(window.ApiUrl + "/feedback", {
            email: this.state.email,
            name: this.state.userName,
            suggest: this.state.userMsg,
            requestType: "suggest",
          })
          .then((res) => {
            resolve(res.data);
            if (res.data === "Success") {
              this.confirmationSend();
              this.formRef.current.resetFields();
              this.setState({
                loading: false,
                errorMsg: "",
                email: "",
                userName: "",
                userMsg: "",
                current: 0,
              });
            }
          });
      });
    }
  };
  handleMsgInput = (e) => {
    var characterCount = e.target.value.length;
    this.setState({ current: characterCount, userMsg: e.target.value });
  };
  render() {
    return (
      <div className="goalsPage">
        <NavBarr />
        <div className="goalsHeader">
          <div className=" pt-5 pb-3 px-lg-5 mr-lg-5">
            {" "}
            <span className="span1">
              {" "}
              <Link to="/"> الرئيسية </Link>
              <Link to="/ContactUs"> . تواصل معنا </Link>.
            </span>
            <span className="span2">معلومات الإتصال </span>
            <h1 id="msgUs"> معلومات الإتصال</h1>
          </div>
        </div>
        <Container className="inquiryForm mt-5  px-lg-5 mr-lg-5">
          <div className="goals mb-5 pb-5">
            <h4>شاركنا اقتراحاتك</h4>
            <p style={{ fontWeight: "500" }}>
              يمكنك إرسال إقتراحك إلينا , نحن نهتم برأيك
            </p>
            {this.state.loading ? <Loader /> : null}
            <Form
              ref={this.formRef}
              // validateMessages={validateMessages}
              className="mt-5  "
              layout="vertical"
              name="nest-messages"
            >
              <Row>
                <Col sm={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 10 }}>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="userName"
                        label="الإسم بالكامل"
                        rules={[
                          {
                            message: " من فضلك ادخل الإسم",
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          name="userName"
                          onChange={this.handleUserInput}
                          value={this.state.userName}
                          placeholder=" ادخل الإسم بالكامل"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        label="البريد الإلكتروني"
                        hasFeedback={
                          this.state.emailError !== "" ? true : false
                        }
                      >
                        <Input
                          className={
                            this.state.emailError !== "" ? "emailErr" : ""
                          }
                          ref={this.emailRef}
                          type="email"
                          name="email"
                          onChange={this.handleUserInput}
                          value={this.state.email}
                          placeholder=" ادخل البريد الإلكتروني"
                        />
                        {this.state.emailError !== "" ? (
                          <div className="ant-form-item-explain ant-form-item-explain-error">
                            <div role="alert"> {this.state.emailError}</div>
                          </div>
                        ) : null}
                      </Form.Item>
                    </Col>{" "}
                    <Button
                      id="contactsData"
                      htmlType="submit"
                      onClick={this.sendMsg}
                      className="contactUcButton mt-2"
                    >
                      إرسال
                    </Button>
                  </Row>
                </Col>
                <Col lg={{ span: 2 }}></Col>
                <Col
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  lg={{ span: 12 }}
                  className="contactUsMsg pr-lg-5"
                >
                  <Form.Item
                    name="userMsg"
                    label="اكتب رسالتك أو اقتراحك"
                    rules={[
                      {
                        message: " من فضلك ادخل مقترحك",
                        required: true,
                      },
                    ]}
                  >
                    <textArea
                      maxLength={300}
                      name="userMsg"
                      showCount
                      onChange={this.handleMsgInput}
                      value={this.state.userMsg}
                    />
                  </Form.Item>
                  {/* <div id="the-count">
                    <span id="current">{this.state.current}</span>
                    <span id="maximum">/ 300</span>
                  </div> */}
                  <p className="msgCounter pt-2">
                    {this.state.current === 0
                      ? "أقصي عدد حروف هو: 300"
                      : `متبقي:  ${300 - this.state.current} حرف`}
                  </p>
                </Col>
              </Row>
            </Form>

            <h4 className="mt-5">معلومات الإتصال</h4>
            <p style={{ fontWeight: "500" }}>
              يمكنك التواصل معنا من خلال التالي
            </p>
            <div className="contactInfo">
              <p>
                <a
                  href="tel:33404112222"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {toArabic("3340/4112222")}
                  <FontAwesomeIcon
                    className="contactIcon "
                    icon={faPhoneAlt}
                  />{" "}
                </a>
              </p>
              <p>
                {" "}
                <a
                  href="tel:33404112222"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {toArabic("3340/4112222")}
                  <FontAwesomeIcon className="contactIcon " icon={faFax} />
                </a>
              </p>{" "}
              <p>
                <a
                  href="mailto:ESupport@alriyadh.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ESupport@alriyadh.gov.sa{" "}
                  <FontAwesomeIcon className="contactIcon " icon={faEnvelope} />
                </a>
              </p>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}
