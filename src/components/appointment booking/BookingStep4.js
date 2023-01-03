import React from "react";
import { Container } from "react-bootstrap";
import { Col, Row, Form, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function BookingStep4(props) {
  return (
    <Container className="bookingStep4">
      <div className="pb-5">
        <h4>الإدارة المراد زيارتها</h4>
        <h6>{props.selectedDepartment.name}</h6>
      </div>
      <div className="pb-5">
        <h4>الوقت المناسب</h4>
        <h6>
          {props.selectedDay.DayOfWeek} {props.selectedDay.Date} <br />
          {props.selectedTime} :الساعة
        </h6>
      </div>
      <div className="pb-5">
        {" "}
        <h4>البيانات الشخصية</h4>
        <Row>
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="pl-md-3"
          >
            <Form.Item label="الأسم">
              <p className="pt-1 pr-2 bookStep4P"> {props.userName}</p>
            </Form.Item>
          </Col>

          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="pl-md-3"
          >
            <Form.Item label="رقم الهوية">
              {" "}
              <p className="pt-1 pr-2 bookStep4P"> {props.userId}</p>
            </Form.Item>
          </Col>

          <Col md={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item label="رقم الجوال">
              <p className="pt-1 pr-2 bookStep4P">{props.userPhone} - 966 </p>
            </Form.Item>
          </Col>
        </Row>{" "}
        <div className="steps-action my-3">
          {" "}
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => props.prev()}
            className="prevBtn "
          >
            <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            الخطوة السابقة
          </Button>{" "}
          <Button
            className="nextBtn ml-3"
            onClick={() => props.bookingDone()}
            style={{ float: "left" }}
          >
            احجز موعدك الآن
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2'/>
          </Button>{" "}
          <div className="clearfix"></div>
        </div>
      </div>
    </Container>
  );
}
