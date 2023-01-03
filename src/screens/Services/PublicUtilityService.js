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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function PublicUtilityService(props) {
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
          <span className="span2">خدمات المشاريع الخدمية</span>
          <h1>خدمـات المشاريع الخدمية</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمات المرافق العامة</h2>
              <p>
                خدمة إلكترونية تتيح للمستفيدين / المواطنين المؤهلة من قبل
                الأمانة، التقدم بطلبات تراخيص مرافق عامة لتنفيذ اجراءات معاملات
                مشاريع خدمية دون الحاجة لزيارة الأمانة أو البلدية التابعة وتم
                تطوير تطبيق جغرافي يتمثل في أتمتة معاملات تراخيص مشاريع خدمة
                (محطات وقود - مباني صحية - مدارس - صالات أفراح واستراحات)
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {" "}
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    "/gisv2/#/submissions/gisservices?tk=" +
                    localStorage.token
                  }`}
                  target="_self"
                  rel="noreferrer"
                >
                  {" "}
                  <Button>
                    الذهاب إلي الخدمة
                    <FontAwesomeIcon
                      className="mr-2"
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
                {" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/تراخيص المشاريع الخدمية.pdf`}
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
              <h3>خدمة تراخيص المشاريع الخدمية</h3>
              <p>إجراء يصدر عنه تقرير رخصة مشروع.</p>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة ترخيص المشاريع الخدمية.
                  </li>
                  <li>يدخل المستخدم بيانات المعاملة ويختار نوع الخدمة.</li>
                  <li> يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب.</li>
                  <li>
                    {" "}
                    يدخل المستخدم ويحدد موقع الأرض عن طريق خارطة الأساس
                    الإلكترونية.
                  </li>
                  <li>يدخل المستخدم ويرفق بيانات وثائق الملكية.</li>
                  <li>إدخال أي ملاحظات او بيانات على الطلب او الأرض.</li>
                  <li>
                    {" "}
                    ارسال الطلب إلكترونيا إلى الأمانة للمراجعة ومن ثم اعتمادها و
                    إصدار استمارة مشاريع خدمية
                  </li>
                </ul>
              </div>
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>
                    صورة بطاقة الهوية الوطنية أو صورة السجل التجاري للشركات
                    والمؤسسات.
                  </li>
                  <li>صورة صك الملكية.</li>
                </ul>
              </div>
              <div>
                <h5>المستفيدين من الخدمة</h5>
                <ul>
                  <li> أفراد (المواطنين – منسوبي مجلس التعاون الخليجي).</li>
                  <li>
                    {" "}
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
