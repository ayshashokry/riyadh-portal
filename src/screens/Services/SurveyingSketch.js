import React, { useEffect } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
export default function SurveyingSketch(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="goalsPage">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          <span className="span1">
            <Link to="/"> الرئيسية </Link>
            <Link to="/Services"> . خدماتنا . دليل الخدمات .</Link>
          </span>
          <span className="span2">خدمات إصدار القرار المساحي</span>
          <h1>خدمـات إصـدار القرار المسـاحي</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمات إصدار القرار المساحي</h2>
              <p>
                خدمة إلكترونية تتيح للمستفيدين بالتعاون مع المكاتب الهندسية
                المؤهلة من قبل الأمانة، التقدم بطلبات إصدار القرار المساحي
                لتنفيذ إجراءات معاملات القرار دون الحاجة لزيارة الأمانة أو
                البلدية التابعة ، وتم تطوير تطبيق جغرافي يتمثل في أتمتة معاملات
                إصدار تقارير القرار المساحي للأراضي التابعة للمخططات المعتمدة من
                قبل الأمانة
              </p>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    window.baseURI +
                    "/#/submissions/survey-report"
                  }`}
                  target="_self"
                  rel="noreferrer"
                >
                  
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
                  
                  <Button>
                    الذهاب إلي الخدمة
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faLongArrowAltLeft}
                    />
                  </Button>
                </Link>
              )}
            </Col> */}
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الاستخدام</h2>
              <div style={{ textAlign: "right" }}>
                
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/إصدار القرار المساحى.pdf`}
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h3>خدمة إصدار القرار مساحي لأرض مخططة</h3>
                <p>
                  إجراء يصدر عنه تقرير القرار المساحي لأرض داخل المخططات
                  التقسيمية المعتمدة
                </p>
              </div>
            </Col>
            <Col md={{ span: 2 }}></Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h3>خدمة إصدار القرار مساحي لأرض غير مخططة</h3>
                <p>
                  إجراء يصدر عنه تقرير القرار المساحي لأرض خارج المخططات
                  التقسيمية المعتمدة
                </p>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة إصدار القرار مساحي لأرض مخططة.
                  </li>
                  <li>يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب.</li>
                  <li>يدخل المستخدم ويحدد بيانات القرار.</li>
                  <li> يدخل المستخدم ويرفق بيانات وثائق الملكية.</li>
                  <li>يدخل المستخدم بيانات الرفع المساحي.</li>
                  <li>إدخال أي ملاحظات او بيانات على الطلب او الأرض. </li>
                  <li>ارسال الطلب للمعالجة وإصدار تقرير القرار المساحي</li>
                </ul>
              </div>
            </Col>
            <Col md={{ span: 2 }}></Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة إصدار القرار مساحي لأرض غير مخططة.
                  </li>
                  <li> يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب.</li>
                  <li> يدخل المستخدم ويحدد بيانات القرار.</li>
                  <li> يدخل المستخدم ويرفق بيانات وثائق الملكية.</li>
                  <li>يدخل المستخدم بيانات الرفع المساحي.</li>
                  <li> إدخال أي ملاحظات او بيانات على الطلب او الأرض.</li>

                  <li>
                    ارسال الطلب للمعالجة وإصدار تقرير القرار المساحي واعتماده من
                    اللجنة الفنية
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>
                    صورة بطاقة الهوية الوطنية أو صورة السجل التجاري للشركات
                    والمؤسسات.
                  </li>
                  <li>صورة صك الملكية.</li>
                </ul>
              </div>
            </Col>
            <Col md={{ span: 2 }}></Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>
                    صورة بطاقة الهوية الوطنية أو صورة السجل التجاري للشركات
                    والمؤسسات.
                  </li>
                  <li>صورة صك الملكية.</li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h5>المستفيدين من الخدمة</h5>
                <ul>
                  <li>أفراد (المواطنين – منسوبي مجلس التعاون الخليجي).</li>
                  <li>
                    قطاع أعمال (الشركات -المكاتب العقارية - المكاتب الهندسية).
                  </li>
                  <li> الجهات الحكومية والخيرية.</li>
                </ul>
              </div>
            </Col>
            <Col md={{ span: 2 }}></Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="serviceColHover">
                <h5>المستفيدين من الخدمة</h5>
                <ul>
                  <li>أفراد (المواطنين – منسوبي مجلس التعاون الخليجي).</li>
                  <li>
                    قطاع أعمال (الشركات -المكاتب العقارية - المكاتب الهندسية).
                  </li>
                  <li> الجهات الحكومية والخيرية.</li>
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
              <div className="serviceColHover">
                <h4>الشروط والأحكام</h4>
                <p>
                  الالتزام بشروط وأحكام أمانة المنطقة الشرقية واتفاقية تأهيل
                  المكاتب الهندسية
                </p>
              </div>
            </Col>
            <Col md={{ span: 4 }}></Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 10 }}
              className="servicePageFooter "
            >
              <div className="serviceColHover">
                <h4>اوقات تقدييم الخدمة</h4>
                <p>
                  يعمل النظام باستقبال الطلبات على مدار ٢٤ ساعة لكن سيتم معالجة
                  الطلبات من المختصين خلال الدوام الرسمي للأمانة يومياً عدا
                  الجمعة والسبت
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
