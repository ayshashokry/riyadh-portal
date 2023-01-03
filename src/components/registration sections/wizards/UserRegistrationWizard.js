import React, { Component } from "react";
//Packages
import { Steps, Col, Row } from "antd";
import { Container } from "react-bootstrap";
//Components
import UserRegistrationForm from "../userRegistration/UserRegistrationForm";
import OwnerFormsContainer from "../owner Registration/OwnerFormsContainer";
import SmallNavbar from "../../../containers/SmallNavbar";
import SmallFooter from "../../../containers/SmallFooter";
import Media from "react-media";

import Loader from "../../../containers/Loader";

//Images
import logo from "../../../assets/images/logo.png";
export default class UserRegistrationWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      userType: 1,
      personOwner: {},
      userData: {},
      buttonDisabled: false,
      name: "",
      gender: 1,
      address: "",
      email: "",
      birthDate: null,
      mobileNumber: "",
      phoneNumber: "",
      IdNumber: "",
      IdImage: null,
      IdSide: "",
      IdType: null,
      selectedNationality: null,
      nationalityObject: {},
      IdTypeObject: {},
      codeReg: "",
      fax: "",
      website: "",
      status: 1,
      type: 1,
      addedOwners: [],
      commercialRecordNumber: ""
    };
  }
  next = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  prev = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };
  selectUserType = userType => {
    this.setState({ userType: userType });
  };
  getAddOwners = owners => {
    this.setState({ addedOwners: owners });
  };
  getOwnerData = owner => {
    if (this.state.userType === 1) {
      this.setState({
        name: owner.name,
        gender: owner.gender,
        IdType: owner.IdType,
        IdTypeObject: owner.IdTypeObject,
        IdNumber: owner.IdNumber,
        IdSide: owner.IdSide,
        selectedNationality: owner.selectedNationality,
        nationalityObject: owner.nationalityObject,
        phoneNumber: owner.phoneNumber,
        mobileNumber: owner.mobileNumber,
        birthDate: owner.birthDate,
        email: owner.email,
        address: owner.address,
        IdImage: owner.IdImage
      });
    }
    if (this.state.userType === 2) {
      this.setState({
        name: owner.name,
        codeReg: owner.codeReg,
        gender: owner.gender,
        phoneNumber: owner.phoneNumber,
        mobileNumber: owner.mobileNumber,
        email: owner.email,
        address: owner.address,
        fax: owner.fax,
        website: owner.website,
        status: owner.status,
        subtype: owner.subtype
      });
    }
    if (this.state.userType === 3) {
      this.setState({
        name: owner.name,
        type: owner.type,
        commercialRecordNumber: owner.commercialRecordNumber,
        phoneNumber: owner.phoneNumber,
        mobileNumber: owner.mobileNumber,
        email: owner.email,
        address: owner.address,
        fax: owner.fax,
        website: owner.website,
        status: owner.status,
        addedOwners: owner.addedOwners
      });
    }
  };
  getUserData = user => {
    this.setState({ userData: user });
  };
  registDone = e => {
    this.props.history.replace("/Login");
  };
  render() {
    console.log(this.state.addedOwners);
    const { Step } = Steps;
    const steps = [
      {
        title: "بيانات المستفيد",
        content: (
          <OwnerFormsContainer
            type={this.state.type}
            commercialRecordNumber={this.state.commercialRecordNumber}
            next={this.next}
            website={this.state.website}
            personOwner={this.state.personOwner}
            selectUserType={this.selectUserType}
            userType={this.state.userType}
            getOwnerData={this.getOwnerData}
            name={this.state.name}
            gender={this.state.gender}
            IdTypeObject={this.state.IdTypeObject}
            IdType={this.state.IdType}
            IdNumber={this.state.IdNumber}
            IdSide={this.state.IdSide}
            nationalityObject={this.state.nationalityObject}
            selectedNationality={this.state.selectedNationality}
            phoneNumber={this.state.phoneNumber}
            mobileNumber={this.state.mobileNumber}
            birthDate={this.state.birthDate}
            email={this.state.email}
            address={this.state.address}
            IdImage={this.state.IdImage}
            userData={this.state.userData}
            codeReg={this.state.codeReg}
            fax={this.state.fax}
            status={this.state.status}
            subtype={this.state.subtype}
            addedOwners={this.state.addedOwners}
            getAddOwners={this.getAddOwners}
            registDone={this.registDone}
          />
        )
      },
      {
        title: "بيانات المستخدم",
        content: (
          <UserRegistrationForm
            prev={this.prev}
            name={this.state.name}
            gender={this.state.gender}
            IdTypeObject={this.state.IdTypeObject}
            IdType={this.state.IdType}
            IdNumber={this.state.IdNumber}
            userType={this.state.userType}
            IdSide={this.state.IdSide}
            nationalityObject={this.state.nationalityObject}
            selectedNationality={this.state.selectedNationality}
            phoneNumber={this.state.phoneNumber}
            mobileNumber={this.state.mobileNumber}
            birthDate={this.state.birthDate}
            email={this.state.email}
            address={this.state.address}
            IdImage={this.state.IdImage}
            getUserData={this.getUserData}
            userData={this.state.userData}
            codeReg={this.state.codeReg}
            fax={this.state.fax}
            website={this.state.website}
            status={this.state.status}
            type={this.state.type}
            commercialRecordNumber={this.state.commercialRecordNumber}
            addedOwners={this.state.addedOwners}
            registDone={this.registDone}
          />
        )
      }
    ];

    return (
      <div style={{ height: "100vh" }} className="RegPage">
        <SmallNavbar />
        <div className="RegistrationPage">
          {" "}
          {this.state.loading ? <Loader /> : null}
          <div className="steps">
            <Container>
              <Row>
                <Col xs={{ span: 24 }} md={{ span: 3 }}>
                  <img
                    alt="logo"
                    className="img-fluid ml-5"
                    src={logo}
                    style={{
                      width: "80px",
                      height: "auto"
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 16 }}
                  style={{ margin: "auto 0" }}
                >
                  <Media query="(max-width: 768px)">
                    {matches =>
                      matches ? (
                        <Steps
                          current={this.state.currentStep}
                          className="ant-steps-vertical mt-4"
                        >
                          {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                          ))}
                        </Steps>
                      ) : (
                        <Steps current={this.state.currentStep}>
                          {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                          ))}
                        </Steps>
                      )
                    }
                  </Media>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="stepsScroll">
            <Container
              style={{
                backgroundColor: "#fff",
                paddingTop: "0",
                paddingBottom: "15px",
                borderRadius: "20px"
              }}
            >
              <h3> {steps[this.state.currentStep].title}</h3>
              <div className="steps-content">
                {steps[this.state.currentStep].content}
              </div>
            </Container>
          </div>
        </div>
        <SmallFooter />
      </div>
    );
  }
}
