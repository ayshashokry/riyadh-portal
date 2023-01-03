import React, { Component } from "react";
import { Steps, Col, Row } from "antd";
import { Container, Modal } from "react-bootstrap";
import Media from "react-media";
import axios from "axios";

//Components
import BookingStep1 from "../components/appointment booking/BookingStep1";
import BookingStep2 from "../components/appointment booking/BookingStep2";
import BookingStep3 from "../components/appointment booking/BookingStep3";
import BookingStep4 from "../components/appointment booking/BookingStep4";
import SmallNavbar from "../containers/SmallNavbar";
import SmallFooter from "../containers/SmallFooter";
import Loader from "../containers/Loader";

//Images
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default class AppointmentBooking extends Component {
  //Packages
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      bookingDoneShow: false,
      departments: [],
      departmentSlots: [],
      loading: false,
      selectedDepartment: {},
      selectedDay: {},
      selectedTime: "",
      departmentDates: [],
      noAvaliableSlots: "",
      userName: "",
      userId: "",
      userPhone: "",
      capatcha: false,
      capatchaValue: "",
      error: false,
      errorMsg: "",
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${window.ApiUrl}/departments/canReserveAppointments`)
      .then((res) => {
        this.setState({
          departments: res.data,
          loading: false,
          // userName: "",
          // userPhone: "",
          // userId: "",
        });
      });
  }
  next = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  prev = () => {
    this.setState({ currentStep: this.state.currentStep - 1, capatcha: false });
  };
  bookingDone = (e) => {
    console.log(this.state.capatchaValue);
    this.setState({ loading: true });

    let dataUser = {
      DepartmentId: this.state.selectedDepartment.id,
      ReservedDate: this.state.selectedDay.Date,
      ReservedTime: this.state.selectedTime,
      ClientName: this.state.userName,
      NationalId: this.state.userId,
      MobileNumber: `966${this.state.userPhone}`,
      capatcha: this.state.capatchaValue,
    };
    axios
      .post(
        `${window.ApiUrl}/department/${this.state.selectedDepartment.id}/appointment/reserve?sendSms=true`,
        dataUser
      )
      .then((res) => {
        if (res) {
          this.setState({
            bookingDoneShow: true,
            loading: false,
            errorMsg: "",
            error: false,
          });
        }
      })

      .catch((err) => {
        if (err.response.data) {
          if (err.response.data.Message === "SlotAlreadyReserved") {
            this.setState({
              error: true,
              errorMsg: "هذا الموعد غير متاح",
            });
          } else {
            this.setState({
              error: true,
              errorMsg: "برجاء التأكد من البيانات لإتمام الحجز",
            });
          }
        }
      });
  };
  getSelectedDepartment = (department) => {
    this.setState({ selectedDepartment: department });
  };
  getDepartmentDates = (e) => {
    this.setState({ loading: true });
    axios
      .get(
        `${window.ApiUrl}/department/${this.state.selectedDepartment.id}/appointment/freeSlots?numberOfDays=14`
      )
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            departmentDates: res.data,
            loading: false,
            noAvaliableSlots: "",
          });
        } else {
          this.setState({
            noAvaliableSlots: " عفوا لا توجد مواعيد متاحة",
            loading: false,
          });
        }
      });
  };
  getSelectedDate = (day, time) => {
    this.setState({ selectedDay: day, selectedTime: time });
  };
  getUserData = (name, id, phone, capatcha, capatchaValue) => {
    this.setState({
      userName: name,
      userId: id,
      userPhone: phone,
      capatcha: capatcha,
      capatchaValue: capatchaValue,
    });
  };
  bookingDoneHide = (e) => {
    this.setState({
      bookingDoneShow: false,
      userName: "",
      userPhone: "",
      userId: "",
      selectedTime: "",
      selectedDepartment: {},
      selectedDay: {},
    });
    this.props.history.push("/");
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDepartment !== prevState.selectedDepartment) {
      this.setState({
        selectedDay: {},
        selectedTime: "",
      });
    }
  }
  render() {
    const { Step } = Steps;
    const steps = [
      {
        title: "الإدارة المراد زيارتها",
        content: (
          <BookingStep1
            next={this.next}
            departments={this.state.departments}
            loading={this.state.loading}
            getSelectedDepartment={this.getSelectedDepartment}
            getDepartmentDates={this.getDepartmentDates}
            selectedDepartment={this.state.selectedDepartment}
          />
        ),
      },
      {
        title: "الوقت المناسب",
        content: (
          <BookingStep2
            next={this.next}
            prev={this.prev}
            departmentDates={this.state.departmentDates}
            noAvaliableSlots={this.state.noAvaliableSlots}
            loading={this.state.loading}
            getSelectedDate={this.getSelectedDate}
            selectedDay={this.state.selectedDay}
            selectedTime={this.state.selectedTime}
            selectedDepartment={this.state.selectedDepartment}
            getDepartmentDates={this.getDepartmentDates}
          />
        ),
      },
      {
        title: "البيانات الشخصية ",
        content: (
          <BookingStep3
            getUserData={this.getUserData}
            userName={this.state.userName}
            userId={this.state.userId}
            userPhone={this.state.userPhone}
            capatchaValue={this.state.capatchaValue}
            capatcha={this.state.capatcha}
            next={this.next}
            prev={this.prev}
          />
        ),
      },
      {
        title: "الملخص",
        content: (
          <BookingStep4
            bookingDone={this.bookingDone}
            prev={this.prev}
            selectedDepartment={this.state.selectedDepartment}
            userName={this.state.userName}
            userId={this.state.userId}
            userPhone={this.state.userPhone}
            selectedDay={this.state.selectedDay}
            selectedTime={this.state.selectedTime}
          />
        ),
      },
    ];

    return (
      <div style={{ height: "100vh" }} className="RegPage">
        {this.state.loading ? <Loader /> : null}
        <SmallNavbar />
        <div className="RegistrationPage">
          <div className="steps">
            <Container>
              <Row>
                <Col xs={{ span: 24 }} md={{ span: 3 }}>
                  <img
                    alt="logo"
                    className="img-fluid "
                    src={logo}
                    style={{
                      width: "80px",
                      height: "auto",
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 16 }}
                  style={{ margin: "auto 0" }}
                >
                  <Media query="(max-width: 768px)">
                    {(matches) =>
                      matches ? (
                        <Steps
                          current={this.state.currentStep}
                          className="ant-steps-vertical mt-4"
                        >
                          {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                          ))}
                        </Steps>
                      ) : (
                        <Steps current={this.state.currentStep}>
                          {steps.map((item) => (
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
                paddingBottom: "50px",
              }}
            >
              <h3> {steps[this.state.currentStep].title}</h3>
              <div className="steps-content">
                {steps[this.state.currentStep].content}{" "}
                {this.state.errorMsg !== "" ? (
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "right",
                      color: "red",
                    }}
                  >
                    {this.state.errorMsg}
                  </p>
                ) : null}
              </div>
            </Container>

            {/* <div className="steps-action">
              <Container>
                {this.state.currentStep < steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => this.next()}
                    className="nextBtn ml-3"
                    disabled={
                      (this.state.selectedDepartment.id !== 0 &&
                        Object.keys(this.state.selectedDepartment).length ===
                          0 &&
                        this.state.currentStep === 0) ||
                      (((this.state.selectedDay !== undefined &&
                        Object.keys(this.state.selectedDay).length === 0) ||
                        this.state.selectedTime === "") &&
                        this.state.currentStep === 1) ||
                      ((this.state.userName === "" ||
                        this.state.userId === "" ||
                        this.state.userPhone === "" ||
                        this.state.capatcha === false) &&
                        this.state.currentStep === 2)
                    }
                  >
                    الخطوة التالية<i className="pr-2 fas fa-arrow-left"></i>
                  </Button>
                )}
                {this.state.currentStep === steps.length - 1 && (
                  <Button className="nextBtn" onClick={this.bookingDone}>
                    احجز موعدك الآن<i className="pr-2 fas fa-arrow-left"></i>
                  </Button>
                )}
                {this.state.currentStep > 0 && (
                  <Button
                    style={{ margin: "0 8px" }}
                    onClick={() => this.prev()}
                    className="prevBtn "
                  >
                    <i className="pl-2 fas fa-arrow-right"></i>
                    الخطوة السابقة
                  </Button>
                )}
              </Container>
            </div> */}
          </div>
        </div>
        <Modal
          keyboard={false}
          onHide={this.bookingDoneHide}
          show={this.state.bookingDoneShow}
          backdrop="static"
          className="BookingDoneModal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="m-4"
            onClick={this.bookingDoneHide}
            style={{ textAlign: "right", cursor: "pointer" }}
          />
          <h6 className="pt-2 pb-4">حجز موعد</h6>
          <h3>{this.state.userName}</h3>
          <h5 className="py-3">
            تم حجز موعد مع إدارة المساحة <br /> بتاريخ{" "}
            {this.state.selectedDay.Date} في تمام الساعة{" "}
            {this.state.selectedTime}
          </h5>
          <p className="pb-5 pt-2">شكرا لحسن تعاونكم</p>
        </Modal>
        <SmallFooter />
      </div>
    );
  }
}
