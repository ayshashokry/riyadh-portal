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
export default function PlansService(props) {
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
            <Link to="/Services"> . خدماتنا . دليل الخدمات . </Link>
          </span>
          <span className="span2">خدمات اعتماد المخططات</span>
          <h1>خدمـات اعتمـاد المخططـات</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمات اعتماد المخططات</h2>
              <p>
                خدمة إلكترونية تتيح للمستفيدين بالتعاون مع المكاتب الهندسية
                المؤهلة من قبل الأمانة، التقدم بطلبات اعتماد المخططات لتنفيذ
                إجراءات معاملات اعتماد المخططات دون الحاجة لزيارة الأمانة ، وتم
                تطوير تطبيق جغرافي يتمثل في أتمتة معاملات إصدار المخططات وتحديث
                قاعدة البيانات الإلكترونية بالأمانة
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {" "}
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    "/gisv2/#/submissions/planapproval?tk=" +
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
                {" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/اعتماد المخططات.pdf`}
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
              <h3>خدمة إعتمادالمخططات</h3>
              <p>إجراء يصدر عنه اعتماد مخطط داخل أمانة المنطقة الشرقية</p>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة اعتماد المخططات.
                  </li>
                  <li>يدخل المستخدم بيانات كروكى المخطط.</li>
                  <li>يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب. </li>
                  <li>يدخل المستخدم على بيانات الموقع ووثائق الملكية.</li>
                  <li>يدخل المستخدم ملف الكاد للمخطط.</li>
                  <li>
                    يدخل المستخدم النطاق العمرانى للمخطط و اختيار مسار التنفيذي
                    للمخطط.
                  </li>
                  <li>يدخل المستخدم المخططات المقترحة.</li>
                  <li>
                    {" "}
                    يدخل المستخدم المتطلبات النظامية المطلوبة كحد أدني لاستلام
                    الطلب.
                  </li>
                  <li>
                    {" "}
                    ارسال الطلب للمعالجة والموافقة على طلب التخطيط من قبل
                    الأمانة
                  </li>
                </ul>
              </div>
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>هوية المالك.</li>
                  <li>وثيقة الملكية</li>
                  <li>طلب المالك / الوكيل للتخطيط موقع ومصدق من المكتب.</li>
                  <li>تعهد من المالك بصحة البيانات مصدق من المكتب الهندسي.</li>
                  <li>
                    خطاب التأكد من سريان مفعول الصك: يجب الترابط مع كتابة العدل
                    للاستعلام عن سريان مفعول الصك.{" "}
                  </li>{" "}
                  <li>
                    نسخة من ملف الكروكي المساحي ونسخة من الرفع المساحي لموقع
                    الأرض.
                  </li>{" "}
                  <li>تقرير دراسة فحص التربة للموقع.</li>
                  <li>
                    تقرير الدراسة الهيدرولوجية للموقع- معتمد من الوزارة.
                  </li>{" "}
                  <li>خطاب موافقة فر ع وزارة البترول والثروة المعدنية.</li>
                  <li>تقرير دراسة مرورية.</li>{" "}
                  <li>موافقة هيئة المدن الصناعية.</li>
                  <li>موافقة وزارة الزراعة.</li>
                  <li>دراسة تقييم الأثر البيئي.</li>
                  <li>فكرة تصميمية لمخطط مبدئي للعرض على الوحدة التخطيطية.</li>
                </ul>
              </div>
              <div>
                <h5>المستفيدين من الخدمة</h5>
                <ul>
                  <li> أفراد (المواطنين – منسوبي مجلس التعاون الخليجي).</li>
                  <li> قطاع أعمال (الشركات -المكاتب العقارية - المؤسسات).</li>
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
