import React, { useEffect } from "react";

//Packages
import { Container, Button } from "react-bootstrap";
import { Row, Col } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { Link } from "react-router-dom";
import {
  faLongArrowAltLeft,
  faDownload,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function SpatialDataRequestService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="goalsPage">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          {" "}
          <span className="span1">
            {" "}
            <Link to="/"> الرئيسية </Link>
            <Link to="/Services"> . خدماتنا . دليل الخدمات .</Link>{" "}
          </span>
          <span className="span2">طلب بيانات مكانية</span>
          <h1>طلب بيانات مكـانية</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام طلب بيانات مكـانية</h2>
              <p>
                خدمة تتيح للمستفيدين بالتعاون مع الموظفين المؤهلين من قبل
                الأمانة التقدم بطلبات الحصول على بيانات مكانية (حدود/طبقات)
                واستخراجها على شكل نوع بيانات محدد و تم تطوير خدمة جغرافية تتمثل
                فى أتمتة معاملات طلب بيانات مكانية للمخططات المعتمدة من قبل
                الأمانة للمخططات المعتمدة من قبل الأمانة
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              <a
                href={`${window.hostURL + "/urban/#/wizard"}`}
                target="_self"
                rel="noreferrer"
              >
                <Button>
                  الذهاب إلي الخدمة
                  <FontAwesomeIcon className="mr-2" icon={faLongArrowAltLeft} />
                </Button>
              </a>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الاستخدام</h2>
              <div style={{ textAlign: "right" }}>
                {" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/نظام طلب بيانات مكانية.pdf`}
                  download
                >
                  تحميل دليل الاستخدام
                  <FontAwesomeIcon
                    className="mx-3"
                    style={{ fontSize: "20px" }}
                    icon={faDownload}
                  />
                </a>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <div style={{ textAlign: "right" }}>
                <h2>الفيديو التعليمي</h2>
                <p>
                  إذا كنت تواجه مشاكل حول التعامل مع الخدمة يمكنك من هنا مشاهدة
                  بشكل عملي لطريقة تنفيذ الخدمة
                </p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.youtube.com/watch?v=pduYjqr-ZHE"
                >
                  شاهد الفيديو التوضيحي{" "}
                  <FontAwesomeIcon icon={faArrowLeft} className=" mr-2" />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
