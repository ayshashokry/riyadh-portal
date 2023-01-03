import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button } from "antd";
//Packages
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default class BookingStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      idNumber: this.props.userId,
      phone: this.props.userPhone,
      capatcha: this.props.capatcha,
      valueCap: this.props.capatchaValue,
      capatchError: "",
    };
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, () =>
      this.props.getUserData(
        this.state.userName,
        this.state.idNumber,
        this.state.phone,
        this.state.capatcha,
        this.state.valueCap
      )
    );
  };
  onRecapchaChange(valueCap) {
    this.setState(
      { valueCap: valueCap, capatcha: true, capatchError: "" },
      () =>
        this.props.getUserData(
          this.state.userName,
          this.state.idNumber,
          this.state.phone,
          this.state.capatcha,
          valueCap
        )
    );
  }
  handlePhoneInput = (e) => {
    // if (e.target.value.length > 9) {
    e.target.value = e.target.value.slice(0, 9);
    this.setState({ phone: e.target.value.slice(0, 9) }, () =>
      this.props.getUserData(
        this.state.userName,
        this.state.idNumber,
        e.target.value.slice(0, 9),
        this.state.capatcha,
        this.state.valueCap
      )
    );
  };
  // };
  keyPress = (e) => {
    return /[\d]/.test(String.fromCharCode(e.target.value.keyCode));
  };
  nextStep = (e) => {
    if (!this.state.capatcha) {
      this.setState({
        capatchError: "capatchError",
      });
    }
    if (this.state.capatcha) {
      this.setState({ capatchError: "" });
    }
    if (
      this.state.userName !== "" &&
      this.state.idNumber !== "" &&
      this.state.phone !== "" &&
      this.state.valueCap !== "" &&
      this.state.capatcha !== false
    ) {
      this.props.next();
      this.props.getUserData(
        this.state.userName,
        this.state.idNumber,
        this.state.phone,
        this.state.capatcha,
        this.state.valueCap
      );
    }
  };
  prevStep = () => {
    this.props.getUserData(
      this.state.userName,
      this.state.idNumber,
      this.state.phone,
      this.state.capatcha,
      this.state.valueCap
    );
    this.props.prev();
  };
  render() {
    return (
      <Form
        className="mt-4 px-md-5"
        layout="vertical"
        onFinish={this.nextStep}
        name="validate_other"
        initialValues={{
          userName: this.props.userName,
          idNumber: this.props.userId,
          phone: this.props.userPhone,
        }}
      >
        <Container>
          <Row>
            <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                name="userName"
                label="الأسم"
                hasFeedback
                rules={[
                  {
                    message: "من فضلك أدخل الأسم",
                    required: true,
                  },
                ]}
              >
                <Input
                  name="userName"
                  onChange={this.handleUserInput}
                  value={this.state.userName}
                  placeholder="ادخل الإسم بالكامل"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                name="idNumber"
                label="رقم الهوية"
                hasFeedback
                rules={[
                  {
                    message: "من فضلك أدخل رقم الهوية",
                    required: true,
                  },
                  {
                    max: 10,
                    message: "رقم الهوية لا يزيد عن 10 أرقام",
                  },
                  {
                    min: 10,
                    message: "رقم الهوية لا يقل عن 10 أرقام",
                  },
                  {
                    pattern: new RegExp(/^1/),
                    message: "يجب أن يبدأ رقم الهوية بالرقم 1",
                  },
                ]}
              >
                <Input
                  maxLength={10}
                  type="number"
                  name="idNumber"
                  onChange={this.handleUserInput}
                  value={this.state.idNumber}
                  placeholder="ادخل رقم الهوية"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="phoneNum"
            >
              <Form.Item
                name="phone"
                hasFeedback
                label="رقم الجوال"
                rules={[
                  {
                    message: "من فضلك أدخل رقم الجوال",
                    required: true,
                    max: "9999",
                  },
                  {
                    max: 9,
                    message: "رقم الجوال لا يزيد عن 9 أرقام",
                  },
                  {
                    min: 9,
                    message: "رقم الجوال لا يقل عن 9 أرقام",
                  },
                  {
                    pattern: new RegExp(/^5/),
                    message: "يجب أن يبدأ رقم الجوال بالرقم 5",
                  },
                ]}
              >
                <Input
                  addonAfter="966"
                  type="number"
                  onInput={this.handleUserInput}
                  name="phone"
                  // onChange={this.handleUserInput}
                  value={this.state.phone}
                  placeholder="ادخل رقم الجوال"
                />
              </Form.Item>
              <div
                className={
                  this.state.capatchError === "" ? "mt-4" : "capatchError mt-4"
                }
              >
                {" "}
                <ReCAPTCHA
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
                )}
              </div>
            </Col>
          </Row>{" "}
          <div className="steps-action my-3">
            {" "}
            <Button
              style={{ margin: "0 8px" }}
              onClick={this.prevStep}
              className="prevBtn "
            >
              <FontAwesomeIcon className=" ml-2" icon={faArrowRight} />
              الخطوة السابقة
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={this.nextStep}
              className="nextBtn ml-3"
              style={{ float: "left" }}
            >
              الخطوة التالية
              <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            </Button>{" "}
            <div className="clearfix"></div>
          </div>
        </Container>
      </Form>
    );
  }
}
