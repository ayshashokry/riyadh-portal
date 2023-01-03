import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../../containers/Loader";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
let ownerData = {};
export default class UserRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userData.userName,
      password: this.props.userData.password,
      confirmNewPassword: this.props.userData.confirmNewPassword,
      loading: false,
      usernameUnique: "",
      capatcha: false,
      valueCap: "",
      errorMsg: "",
      capatchError: "",
    };
  }
  onRecapchaChange(valueCap) {
    this.setState({
      valueCap: valueCap,
      capatcha: true,
      capatchError: "",
    });
  }
  handleUserInput = (e) => {
    if (e.target.name === "userName") {
      axios
        .get(
          `${window.ApiUrl}/api/user/CheckUnique/?key=username&q=${e.target.value}`
        )
        .then((res) => {
          this.setState({
            loading: false,
            usernameUnique: "",
          });
        })
        .catch((error) => {
          if (error.response.status === 302) {
            this.setState({
              loading: false,
              usernameUnique: "هذ الاسم مستخدم من قبل , من فضلك استخدم اسم اخر",
            });
          }
        });
    }
    //if(e.target.name==='password'){
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value)

    // }
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
    this.props.getUserData({
      userName: this.state.userName,
      password: this.state.password,
      confirmNewPassword: this.state.confirmNewPassword,
      capatcha: this.state.capatcha,
      valueCap: this.state.valueCap,
    });
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
  confirmationRegist = () => {
    const args = {
      description: "تم إنشاء الحساب بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  CreateAccount = async (e) => {
    if (this.state.capatcha === false) {
      this.setState({
        capatchError: "capatchError",
      });
    }
    if (this.state.capatcha === true) {
      this.setState({ capatchError: "" });
    }
    let userData = {
      confirmPass: this.state.confirmNewPassword,
      email: this.props.email,
      name: this.props.name,
      password: this.state.password,
      username: this.state.userName,
    };
    if (this.props.userType === 1) {
      ownerData = {
        address: this.props.address,
        date_of_birth: this.props.birthDate,
        email: this.props.email,
        image: this.props.IdImage,
        mobile: "966" + this.props.mobileNumber,
        "mobile-part": this.props.mobileNumber,
        name: this.props.name,
        nationalid_issuer_name: this.props.IdSide,
        nationalidtype_id: this.props.IdTypeObject.id,
        nationalidtypes: this.props.IdTypeObject,
        nationalities: this.props.nationalityObject,
        nationality_id: this.props.nationalityObject.id,
        owner_type: this.props.userType,
        phone: this.props.phoneNumber,
        seperated_owner: this.props.userType === 1 ? true : false,
        ssn: this.props.IdNumber,
        subtype: this.props.gender,
      };
    }
    if (this.props.userType === 2) {
      ownerData = {
        address: this.props.address,
        code_regesteration: this.props.codeReg,
        email: this.props.email,
        fax: this.props.fax,
        website: this.props.website,
        image: null,
        mobile: "966" + this.props.mobileNumber,
        "mobile-part": this.props.mobileNumber,
        name: this.props.name,
        owner_type: this.props.userType,
        phone: this.props.phoneNumber,
        seperated_owner: true,
        status: this.state.status,
        subtype: 1,
      };
    }
    if (this.props.userType === 3 && this.props.type === 1) {
      ownerData = {
        commercial_registeration: this.props.commercialRecordNumber,
        address: this.props.address,
        email: this.props.email,
        fax: this.props.fax,
        website: this.props.website,
        image: null,
        mobile: "966" + this.props.mobileNumber,
        "mobile-part": this.props.mobileNumber,
        name: this.props.name,
        owner_type: this.props.userType,
        phone: this.props.phoneNumber,
        seperated_owner: true,
        status: this.state.status,
        subtype: this.props.type,
      };
    }
    if (this.props.userType === 3 && this.props.type === 2) {
      ownerData = {
        seperated_owner: true,
        owner_type: this.props.userType,
        subtype: this.props.type,
        image: null,
        status: this.props.status,
        mobile: "966" + this.props.mobileNumber,
        "mobile-part": this.props.mobileNumber,
        name: this.props.name,
        commercial_registeration: this.props.commercialRecordNumber,
        address: this.props.address,
        email: this.props.email,
        fax: this.props.fax,
        website: this.props.website,
        phone: this.props.phoneNumber,
        owner: "",
        corporate_owner_ssn: this.props.addedOwners[0].ssn,
        owners: this.props.addedOwners,
        owners_model: this.props.addedOwners,
      };
    }
    if (
      this.state.userName !== "" &&
      this.state.password !== "" &&
      this.state.confirmNewPassword !== "" &&
      this.state.capatcha &&
      this.state.usernameUnique === ""
    ) {
      await new Promise((resolve, reject) => {
        this.setState({ loading: true });
        axios
          .post(window.ApiUrl + "/PublicOwner/Create", {
            // .post(window.ApiUrl + "/PublicOwner/Create", {
            owner: ownerData,
            user: userData,
            capatcha: this.state.valueCap,
          })
          .then((res) => {
            console.log(res);
            resolve(res.data);
            if (res.data) {
              this.setState({ loading: false, errorMsg: "" });
              this.confirmationRegist();
              this.props.registDone();
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
            if (
              error.response &&
              error.response.data === "global.INVALID_MOBILE"
            ) {
              this.setState({
                loading: false,
                errorMsg: "رقم الجوال غير صالح",
              });
            }
            if (
              error.response &&
              error.response.data === "global.USER_DUPLICATION"
            ) {
              this.setState({
                loading: false,
                errorMsg: "هذا الحساب مسجل من قبل",
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
  componentDidMount() {
    this.props.getUserData({
      userName: this.state.userName,
      password: this.state.password,
      confirmNewPassword: this.state.confirmNewPassword,
      capatcha: this.state.capatcha,
      valueCap: this.state.valueCap,
    });
  }
  prevStep = () => {
    this.props.getUserData({
      userName: this.state.userName,
      password: this.state.password,
      confirmNewPassword: this.state.confirmNewPassword,
      capatcha: this.state.capatcha,
      valueCap: this.state.valueCap,
    });
    this.props.prev();
  };
  render() {
    return (
      <Form
        className="mt-4 px-md-5"
        layout="vertical"
        name="validate_other"
        onFinish={this.CreateAccount}
        initialValues={{
          userName: this.props.userData.userName,
          password: this.props.userData.password,
          confirmNewPassword: this.props.userData.confirmNewPassword,
        }}
      >
        {" "}
        {this.state.loading ? <Loader /> : null}{" "}
        <Container>
          <Row>
            <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
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
              </Form.Item>{" "}
              {this.state.usernameUnique !== "" ? (
                <p className="errMsg">{this.state.usernameUnique}</p>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                className="passwordInputt"
                rules={[
                  {
                    pattern: new RegExp(
                      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
                    ),
                    message:
                      "  الرجاءإدخال كلمة مرور معقدة لا يقل طولها عن 8 رموز تحتوي علي حرف كبير و حرف صغير و أرقام وعلامات خاصة ",
                  },
                  {
                    required: true,
                    message: "من فضلك أدخل كلمة المرور",
                  },
                ]}
                name="password"
                hasFeedback
                label="كلمة المرور "
              >
                <Input.Password
                  size="large"
                  name="password"
                  onChange={this.handleUserInput}
                  value={this.state.password}
                  placeholder="ادخل كلمة المرور"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                className="passwordInputt"
                rules={[
                  {
                    message: "من فضلك ادخل تأكيد كلمة المرور",
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("كلمة المرور غير متطابقة ")
                      );
                    },
                  }),
                ]}
                dependencies={["password"]}
                name="confirmNewPassword"
                hasFeedback
                label="تأكيد كلمة المرور "
              >
                <Input.Password
                  size="large"
                  name="confirmNewPassword"
                  onChange={this.handleUserInput}
                  value={this.state.confirmNewPassword}
                  placeholder="ادخل تأكيد كلمة المرور"
                />
              </Form.Item>
              <div
                className={
                  this.state.capatchError === "" ? "mt-4" : "capatchError mt-4"
                }
              >
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
              </div>{" "}
              {this.state.capatchError !== "" ? (
                <p className="errMsg">هذا الحقل مطلوب</p>
              ) : (
                ""
              )}
            </Col>{" "}
          </Row>{" "}
          {this.state.errorMsg !== "" ? (
            <p className="errMsg">{this.state.errorMsg}</p>
          ) : null}
        </Container>{" "}
        <div className="steps-action my-3">
          {" "}
          <Button
            style={{ margin: "0 8px" }}
            onClick={this.prevStep}
            className="prevBtn "
          >
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            الخطوة السابقة
          </Button>
          <Button
            className="nextBtn ml-3"
            htmlType="submit"
            // onClick={this.CreateAccount}
          >
            إنشاء حساب جديد
          </Button>{" "}
          <div className="clearfix"></div>
        </div>
      </Form>
    );
  }
}
