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
export default function UpdateInstrumentsService(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="goalsPage">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          <span className="span1">
            {" "}
            <Link to="/"> الرئيسية </Link>
            <Link to="/Services"> . خدماتنا . دليل الخدمات . </Link>
          </span>
          <span className="span2">خدمات تحديث الصكوك</span>
          <h1>خدمـات تحديث الصكـوك</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمات تحديث الصكوك</h2>
              <p>
                خدمة إلكترونية تتيح للمستفيدين بالتعاون مع المكاتب الهندسية
                المؤهلة من قبل الأمانة، التقدم بطلبات تحديث الصكوك لتنفيذ
                إجراءات معاملات تحديث الصكوك دون الحاجة لزيارة الأمانة أو
                البلدية التابعة ، وتم تطوير تطبيق جغرافي يتمثل في أتمتة معاملات
                إصدار تقارير تحديث الصكوك للأراضي التابعة للمخططات المعتمدة من
                قبل الأمانة
              </p>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {" "}
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    window.baseURI +
                    "/#/submissions/contract-update"
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
            </Col> */}
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الاستخدام</h2>{" "}
              <div style={{ textAlign: "right" }}>
                {" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/تحديث الصكوك.pdf`}
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
              <h3>خدمة تحديث الصكوك لأراضى مخططة</h3>
              <p>
                إجراء يصدر عنه تقرير تحديث الصكوك لأرض داخل المخططات التقسيمية
                المعتمدة
              </p>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة تحديث الصكوك لأرض مخططة.
                  </li>
                  <li>يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب. </li>
                  <li> يدخل المستخدم على بيانات الكروكى يحدد الارض المخططه.</li>
                  <li>
                    {" "}
                    يدخل المستخدم ويحدد نوع المعاملة وهم ( فرز صك - دمج صكوك - تعديل بيانات الصك - تحويل صك ورقي - أخري ) وكذلك بيانات الصك ويرفق بيانات وثائق
                    الملكية.
                  </li>
                  <li>يدخل المستخدم بيانات الرفع المساحي.</li>
                  <li>
                    {" "}
                     يحدد المستخدم اذا كان يريد اى من الاغراض فى تحديث الصكوك ( تعديل بيانات المالك -  تعديل ابعاد الحدود - تعديل المساحة (زيادة أو نقصان) - تحديث البيانات المكانية كـ (اسم الحي - البلك - رقم المخطط) ).
                  </li>
                  <li>إدخال أي ملاحظات او بيانات على الطلب او الأرض.</li>
                  <li>ارسال الطلب للمعالجة وإصدار تقرير تحديث الصكوك</li>
                </ul>
              </div>
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>
                    {" "}
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
