import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//Packages
import { Container, Button } from "react-bootstrap";
import { Row, Col } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
export default function BasemapManagementService(props) {
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
          <span className="span2"> إدارة خارطة الاساس</span>
          <h1> إدارة خـارطة الاسـاس</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام إدارة خارطة الاساس</h2>
              <p>
                خدمة إلكترونية تتيح لموظفي الامانة أضافة وتعديل عناصر وكائنات
                خارطة الأساس
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL + window.baseURI + "/#/submissions/UpdateMap"
                  }`}
                  target="_self"
                  rel="noreferrer"
                >
                  {" "}
                  <Button>
                    الذهاب إلي الخدمة
                    <FontAwesomeIcon
                      className="mr-2" style={{fontSize:'20px'}}
                      icon={faLongArrowAltLeft}
                    />
                  </Button>
                </a>
              ) : (
                <Link to="/Login">
                  {" "}
                  <Button>
                    الذهاب إلي الخدمة
                    <FontAwesomeIcon
                      className="mr-2" style={{fontSize:'20px'}}
                      icon={faLongArrowAltLeft}
                    />
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الاستخدام</h2>
              <div style={{ textAlign: "right" }}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/تحديث خارطة الاساس.pdf`}
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
              <h3>خدمة إدارة خارطة الاساس</h3>
              <p>إجراء يتمثل في إدارة خارطة الاساس</p>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة تحديث خارطة الأساس.
                  </li>
                  <li> أضافة وتعديل عناصر وكائنات خارطة الأساس.</li>
                  <li> يدخل المستخدم بيانات المعاملة. </li>
                  <li>
                    {" "}
                    ارسال الطلب للمعالجة والموافقة على طلب تحديث خارطة الأساس
                  </li>
                </ul>
              </div>
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>خطاب تحديث المعاملة.</li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 10 }}
              className="servicePageFooter"
            >
              <h4>الشروط والأحكام</h4>
              <p>
                الالتزام بشروط وأحكام أمانة المنطقة الشرقية واتفاقية تأهيل
                المكاتب الهندسية
              </p>
            </Col>
            <Col md={{ span: 4 }}></Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 10 }}
              className="servicePageFooter "
            >
              <h4>اوقات تقدييم الخدمة</h4>
              <p>
                يعمل النظام باستقبال الطلبات على مدار ٢٤ ساعة لكن سيتم معالجة
                الطلبات من المختصين خلال الدوام الرسمي للأمانة يومياً عدا الجمعة
                والسبت
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
