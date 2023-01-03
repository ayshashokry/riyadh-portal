import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Button } from "antd";
import Loader from "../../containers/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
let selectedDay = {};
let selectedTime = "";
export default class BookingStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: this.props.selectedDay,
      selectedTime: this.props.selectedTime,
    };
  }
  componentDidMount() {
    this.props.getDepartmentDates();
    selectedDay = this.props.selectDay;
    selectedTime = this.props.selectTime;
    this.setState({
      selectedDay: this.props.selectDay,
      selectedTime: this.props.selectTime,
    });
  }
  selectDay = (day) => {
    selectedDay = day;
    this.setState({ selectedDay: day });
    this.props.getSelectedDate(day, selectedTime);
  };
  selectTime = (time) => {
    selectedTime = time;
    this.setState({ selectedTime: time });
    this.props.getSelectedDate(selectedDay, time);
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedDepartment === prevProps.selectedDepartment) {
      selectedDay = this.props.selectedDay;
      selectedTime = this.props.selectedTime;
      // this.setState({
      //   selectedDay: this.props.selectedDay,
      //   selectedTime: this.props.selectedTime,
      // });
    } else {
      selectedDay = {};
      selectedTime = "";
      this.setState({
        selectedDay: {},
        selectedTime: "",
      });
    }
  }
  prevStep = (e) => {
    this.props.getSelectedDate(this.props.selectedDay, this.props.selectedTime);
    this.props.prev();
  };

  nextStep = (e) => {
    this.props.getSelectedDate(this.props.selectedDay, this.props.selectedTime);
    this.props.next();
  };
  render() {
    const { departmentDates, noAvaliableSlots, loading } = this.props;
    return (
      <Container className="bookingStep2">
        {loading ? (
          <Loader />
        ) : (
          <>
            {departmentDates.length > 0 && noAvaliableSlots === "" ? (
              <>
                <div>
                  <h4 className="pr-3">اختر اليوم المناسب لك</h4>
                  <Row>
                    {departmentDates !== undefined &&
                      departmentDates.map((d) => (
                        <Col
                          onClick={() => this.selectDay(d)}
                          sm={{ span: 12 }}
                          md={{ span: 4 }}
                          className={
                            selectedDay !== undefined &&
                            d.$id === selectedDay.$id
                              ? "selectedDay p-3"
                              : "dayItem p-3"
                          }
                          key={d.id}
                        >
                          <h4 className="pt-3">{d.DayOfWeek}</h4>
                          <p>{d.Date}</p>
                        </Col>
                      ))}
                  </Row>
                </div>
                <div className="pt-5">
                  {selectedDay !== undefined &&
                  Object.keys(selectedDay).length > 0 ? (
                    departmentDates !== undefined &&
                    departmentDates.find((d) => d.$id === selectedDay.$id) !==
                      undefined ? (
                      <>
                        <h4 className="pr-3">اختر الوقت المناسب لك</h4>
                        <Row>
                          {departmentDates !== undefined &&
                            departmentDates
                              .find((d) => d.$id === selectedDay.$id)
                              .Slots.map((t, index) => (
                                <Col
                                  onClick={() => this.selectTime(t)}
                                  sm={{ span: 12 }}
                                  md={{ span: 4 }}
                                  className={
                                    t === selectedTime
                                      ? "selectedTime p-3"
                                      : "TimeItem p-3"
                                  }
                                  key={index}
                                >
                                  <h4 className="pt-3">{t}</h4>
                                </Col>
                              ))}
                        </Row>
                      </>
                    ) : null
                  ) : null}
                </div>
              </>
            ) : null}
          </>
        )}
        <div className="steps-action my-3">
          {" "}
          <Button
            style={{ margin: "0 8px" }}
            onClick={this.prevStep}
            className="prevBtn "
          >
            {" "}
            <FontAwesomeIcon className=" ml-2 " icon={faArrowRight} />
            الخطوة السابقة
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.nextStep}
            className="nextBtn ml-3"
            disabled={
              (this.props.selectedDay !== undefined &&
                Object.keys(this.props.selectedDay).length === 0) ||
              this.props.selectedTime === ""
            }
            style={{ float: "left" }}
          >
            الخطوة التالية
            <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
          </Button>
          <div className="clearfix"></div>
        </div>
      </Container>
    );
  }
}
