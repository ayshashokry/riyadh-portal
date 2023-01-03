import React, { Component } from "react";
import { Form, Col, Input, Row, Radio, Button } from "antd";
import Loader from "../../../containers/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      phoneNumber: this.props.phoneNumber,
      mobileNumber: this.props.mobileNumber,
      codeReg: this.props.codeReg,
      status: this.props.status,
      subtype: this.props.subtype,
      email: this.props.email,
      address: this.props.address,
      fax: this.props.fax,
      website: this.props.website,
      emailError: "",
      loading: false,
      idError: "",
      errorMsg: "",
    };
    this.emailRef = React.createRef();
  }
  componentDidMount() {
    this.props.getOwnerData(this.state);
  }
  handleUserInput = (e) => {
    if (e.target.value.length > 12 && e.target.name === "phoneNumber") {
      e.target.value = e.target.value.slice(0, 12);
      this.setState({ phoneNumber: e.target.value.slice(0, 12) });
    }

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
    this.setState({ [name]: value, errorMsg: "" });
  };

  handleMobileInput = (e) => {
    if (e.target.value.length > 12) {
      e.target.value = e.target.value.slice(0, 12);
      this.setState({ [e.target.name]: e.target.value.slice(0, 12) });
    }
    if (e.target.value.length > 9) {
      e.target.value = e.target.value.slice(0, 9);
      this.setState({ [e.target.name]: e.target.value.slice(0, 9) });
    }
  };

  keyPressMobile = (e) => {
    return /[\d]/.test(String.fromCharCode(e.target.value.keyCode));
  };

  nextStep = (e) => {
    if (
      this.state.codeReg !== "" &&
      this.state.name !== null &&
      this.state.email !== "" &&
      this.state.address !== "" &&
      this.state.mobileNumber !== "" &&
      this.state.emailError.length === 0
    ) {
      this.props.next();
      this.props.getOwnerData(this.state);
      this.setState({
        emailError: "",
      });
    }
    if (this.state.email === "") {
      this.setState({
        emailError: "من فضلك أدخل البريد الإلكتروني",
      });
    }
  };

  render() {
    return (
      <Form
        onFinish={this.nextStep}
        className="mt-4 px-md-5 regForms"
        layout="vertical"
        name="validate_other"
        initialValues={{
          name: this.props.name,
          phoneNumber: this.props.phoneNumber,
          mobileNumber: this.props.mobileNumber,
          codeReg: this.props.codeReg,
          status: this.props.status,
          subtype: this.props.subtype,
          email: this.props.email,
          address: this.props.address,
          fax: this.props.fax,
          website: this.props.website,
        }}
      >
        {" "}
        {this.state.loading ? <Loader /> : null}{" "}
        <Row>
          {" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              rules={[
                {
                  message: "من فضلك ادخل اسم الجهة",
                  required: true,
                },
              ]}
              name="name"
              hasFeedback
              label="اسم الجهة"
            >
              <Input
                name="name"
                onChange={this.handleUserInput}
                value={this.state.name}
                placeholder="اسم الجهة"
              />
            </Form.Item>
          </Col>{" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              rules={[
                {
                  message: "من فضلك ادخل كود الجهة",
                  required: true,
                },
              ]}
              name="codeReg"
              hasFeedback
              label="كود الجهة"
            >
              <Input
                name="codeReg"
                onChange={this.handleUserInput}
                value={this.state.codeReg}
                placeholder="كود الجهة"
              />
            </Form.Item>
          </Col>{" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              name="status"
              label="حالة الجهة "
              style={{ textAlign: "right" }}
            >
              <Radio.Group
                // defaultValue={this.state.status}
                onChange={this.handleUserInput}
                name="status"
                value={this.state.status}
              >
                <Radio value={1}>مفعلة</Radio>
                <Radio value={2}>مجمدة</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>{" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              rules={[
                {
                  message: "من فضلك ادخل العنوان",
                  required: true,
                },
              ]}
              name="address"
              hasFeedback
              label="العنوان"
            >
              <Input
                name="address"
                onChange={this.handleUserInput}
                value={this.state.address}
                placeholder="العنوان"
              />
            </Form.Item>
          </Col>{" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              name="email"
              label="البريد الإلكتروني"
              hasFeedback={this.state.emailError !== "" ? true : false}
            >
              <Input
                defaultValue={this.props.email}
                className={this.state.emailError !== "" ? "emailErr" : ""}
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
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              name="website"
              label="الموقع الإلكتروني"
              rules={[
                {
                  pattern: new RegExp(
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                  ),
                  message: "من فضلك أدخل موقع إلكتروني صحيح",
                },
              ]}
            >
              <Input
                name="website"
                onChange={this.handleUserInput}
                value={this.state.website}
                placeholder="الموقع الإلكتروني"
              />
            </Form.Item>
          </Col>
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
            <Form.Item
              // rules={[
              //   {
              //     message: "من فضلك ادخل الفاكس",
              //     required: true
              //   }
              // ]}
              name="fax"
              hasFeedback
              label="الفاكس"
            >
              <Input
                name="fax"
                onChange={this.handleUserInput}
                value={this.state.fax}
                placeholder="الفاكس"
              />
            </Form.Item>
          </Col>{" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2 phoneNum"
          >
            <Form.Item
              hasFeedback
              name="phoneNumber"
              label="رقم الهاتف"
              rules={[
                {
                  message: "من فضلك أدخل رقم الهاتف",
                  required: true,
                },
                {
                  max: 9,
                  message: "رقم الهاتف لا يزيد عن 9 أرقام",
                },
                {
                  min: 9,
                  message: "رقم الهاتف لا يقل عن 9 أرقام",
                },
              ]}
            >
              <Input
                addonAfter="966"
                onChange={this.handleUserInput}
                type="number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                placeholder="ادخل رقم الهاتف"
              />
            </Form.Item>
          </Col>
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2 phoneNum"
          >
            <Form.Item
              name="mobileNumber"
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
                onChange={this.handleUserInput}
                type="number"
                name="mobileNumber"
                value={this.state.mobileNumber}
                placeholder="ادخل رقم الجوال"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="steps-action my-3">
          <Button
            type="primary"
            htmlType="submit"
            // onClick={this.nextStep}
            className="nextBtn ml-3"
          >
            الخطوة التالية
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          </Button>
        </div>
      </Form>
    );
  }
}
