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
export default function MergeStreetsService(props) {
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
          <span className="span2">خدمة ضم الشوارع والنوافذ</span>
          <h1>خدمـة ضم الشوارع والنوافذ</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمـة ضم الشوارع والنوافذ</h2>
              <p>
                خدمة إلكترونية تتيح للمستفيدين / المواطنين المؤهلين من قبل
                الأمانة، التقدم بطلبات رخصة ضم الشوارع والنوافذ لتنفيذ إجراءات
                معاملات ضم الشوارع والنوافذ دون الحاجة لزيارة الأمانة أو البلدية
                التابعة وتم تطوير تطبيق جغرافي يتمثل في أتمتة معاملات ضم الشوارع
                والنوافذ كـ(شارع - ساحة - ممر مشاة - ساحة وشارع - ساحة وممر
                مشاة)
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    window.baseURI +
                    "/#/submissions/mergestreets"
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
                  href={`${process.env.PUBLIC_URL}/servicesManual/ضم الشوارع والنوافذ.pdf`}
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
              <h3>خدمة ضم الشوارع والنوافذ</h3>
              <p>
                إجراء يصدر عنه تقرير لرخصة ضم شارع او نافذ إلى قطع الأراضي .
              </p>
            </Col>{" "}
          </Row>

          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة ضم الشوارع و النوافذ.
                  </li>
                  <li>يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب.</li>
                  <li>
                    يحدد المستخدم موقع الأرض عن طريق خارطة الأساس الإلكترونية
                    وكذلك يقوم بإرفاق صورة للأرض و يقوم ايضا بوصف موقع النافذ أو
                    الشارع المراد ضمه.
                  </li>
                  <li>يرفق المستخدم بيانات وثائق الملكية.</li>
                  <li>يختار المستخدم التعهدات المطلوبة.</li>
                  <li>
                    يقوم المستخدم بإدخال أي ملاحظات او بيانات على الطلب او
                    الأرض.
                  </li>
                  <li>
                    إرسال الطلب إلكترونيا إلى الأمانة للمراجعة ومن ثم اعتمادها.
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
                  <li>
                    صورة بطاقة الهوية الوطنية أو صورة السجل التجاري للشركات
                    والمؤسسات.
                  </li>
                  <li>صورة صك الملكية.</li>
                  <li>موافقة شركة الكهرباء.</li>
                  <li>موافقة وزارة البيئة والمياة والزراعة.</li>
                  <li>موافقة شركة الاتصالات السعودية (STC).</li>
                  <li>موافقة شركة موبيلي.</li>
                  <li>موافقة المجلس البلدي.</li>
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
                    قطاع أعمال (الشركات -المكاتب العقارية - المكاتب الهندسية).
                  </li>
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
