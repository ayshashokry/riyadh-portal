import React, { useEffect } from "react";

//Packages
import { Container, Button } from "react-bootstrap";
import { Row, Col } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
export default function OwnPropertyService(props) {
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
          <span className="span2">خدمات تملك عقار</span>
          <h1>خدمـة استمارة تملك عقار</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمـة استمارة تملك عقار</h2>
              <p>
                خدمة إلكترونية تتيح لموظفي إدارة الأراضي والممتلكات التقدم
                بطلبات رخصة تملك عقار لتنفيذ إجراءات معاملات تملك عقار دون
                الحاجة لزيارة الأمانة و تم تطوير تطبيق جغرافي يتمثل في أتمتة
                معاملات استمارة تملك عقار لإدخال بيانات الموقع و العقار
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    "/gisv2/#/submissions/tamlikakar?tk=" +
                    localStorage.token
                  }`}
                  target="_self"
                  rel="noreferrer"
                >
                  <Button>
                    الذهاب إلي الخدمة
                    <FontAwesomeIcon
                      className="mr-2"
                      style={{ fontSize: "20px" }}
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
                      className="mr-2"
                      style={{ fontSize: "20px" }}
                      icon={faLongArrowAltLeft}
                    />
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الاستخدام</h2>{" "}
              <div style={{ textAlign: "right" }}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/استمارة تملك عقار.pdf`}
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
              <h3>خدمة استمارة تملك عقار</h3>
              <p>إجراء يصدر عنه تقرير رخصة تملك عقار.</p>
            </Col>{" "}
          </Row>

          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>تسجيل الدخول على النظام من خلال بوابة الأمانة.</li>
                  <li>يختار المستخدم خدمة استمارة تملك عقار.</li>
                  <li>
                    يقوم المستخدم بتحديد موقع الأرض عن طريق خريطة الأساس
                    الإلكترونية.
                  </li>
                  <li>يدخل المستخدم بيانات الموقع وبيانات العقار.</li>
                  <li>يقوم المستخدم بإرفاق وثائق الملكية.</li>
                  <li>
                    إرسال الطلب إلكترونيا إلى إدارة الأراضي والممتلكات للمراجعة
                    وطباعة الإستمارة.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              {" "}
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>بيانات الموقع.</li>
                  <li>صورة صك الملكية.</li>
                  <li>بيانات العقار.</li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              {" "}
              <div>
                <h5>المستفيدين من الخدمة</h5>
                <ul>
                  <li>أفراد (المواطنين – منسوبي مجلس التعاون الخليجي).</li>
                  <li>
                    قطاع أعمال (الشركات - المكاتب العقارية - المكاتب الهندسية).
                  </li>
                  <li>الجهات الحكومية والخيرية.</li>
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
