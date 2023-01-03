import React, { useEffect } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export default function EngOfficesService(props) {
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
            <Link to="/Services"> . خدماتنا . دليل الخدمات . </Link>
          </span>
          <span className="span2">تأهيل المكاتب الهندسية</span>
          <h1>تأهيل المكاتب الهندسية</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمة تأهيل المكاتب الهندسية :- </h2>
              <p>
                خدمة إلكترونية تتيح للمكاتب الهندسية تسجيل وتوثيق لكل الإجراءات
                والعمليات المطلوبة لتأهيل المكاتب الهندسية بحيث يكون من السهل
                تسجيل المكاتب الهندسية لبياناتها دون الحاجة الى زيارة الأمانة أو
                البلدية وتم تطوير تطبيق يتمثل فى أتمته تأهيل المكاتب الهندسية من
                قبل الإدارة العامة للتخطيط العمراني
              </p>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              <a
                href={
                  !props.isAuth
                    ? `${window.hostURL + window.baseURI + "/#/register"}`
                    : `${
                        window.hostURL +
                        window.baseURI +
                        "/#/submissions/approval"
                      }`
                }
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
            </Col> */}
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الإستخدام</h2>
              <div style={{ textAlign: "right" }}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/تسجيل وتأهيل المكاتب الهندسية.pdf`}
                  download
                >
                  تحميل دليل الإستخدام
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
              <h3>خدمة تأهيل مكتب هندسي :- </h3>
              <p>
                إجراء يصدر عنه تأهيل وتسجيل واعتماد للمكاتب الهندسية وإصدار
                شهادة معتمدة بتأهيل المكاتب الهندسية
              </p>
              <div>
                <h5>إجراءات الخدمة :- </h5>
                <ul>
                  <li>
                    بعد الدخول على النظام من خلال البوابة الجغرافية للإدارة
                    العامة للتخطيط العمراني و اختيار خدمة تأهيل المكاتب الهندسية
                    .
                  </li>
                  <li>
                    يدخل المستخدم بيانات المكتب الهندسي الأساسية (اسم المكتب
                    ونوعه ورقم السجل التجاري) وكذلك بيانات الموقع ورقم الهاتف .
                  </li>
                  <li>
                    يدخل المستخدم بيانات ترخيص الهيئة السعودية و بيانات المكتب
                    من البلدية وكذلك بيانات التأمينات الإجتماعية .
                  </li>
                  <li>
                    يدخل المستخدم بيانات تخصص المكتب والكادر (كالإدارة المقدم
                    لها طلب الاعتماد و سنوات خبرة المكتب وعدد المشاريع المعتمدة
                    بالأمانة وتصنيف الهيئة السعودية للمهندسين لماكل المكتب و
                    كذلك تخصص مالك المكتب) ثم يتم ادخال بيانات الكادر الوظيفي
                    إذا كانت الإدارة المقدم لها الطلب إدارة التخطيط .
                  </li>
                  <li>
                    يدخل المستخدم بيانات تخصص المكتب والكادر (كالإدارة المقدم
                    لها طلب الاعتماد و سنوات خبرة المكتب وكمية الرفوعات المساحية
                    وعدد الأجهزة المساحية كأجهزة محطات الرصد الشاملة و أجهزة
                    الرصد العالمية GPS) ثم يتم ادخال بيانات الكادر الوظيفي إذا
                    كانت الإدارة المقدم لها الطلب إدارة المساحة .
                  </li>
                  <li>إرسال الطلب الى الإدارات المختصة .</li>
                  <li>
                    يتم مراجعة البيانات من قبل الإدارة المختصة لإبداء الرأي فى
                    الموافقة او الاعتذار عن اعتماد المكتب الهندسي .
                  </li>
                  <li>
                    فى حالة الموافقة على اعتماد الطلب المقدم من المكتب الهندسي
                    من قبل الإدارة المختصة ويتم ارسال رسالة نصية للمكتب الهندسي
                    تفيد بإتمام عملية الموافقة النهائية على تأهيل المكتب الهندسي
                    واستخراج بيان شهادة تأهيل المكتب الهندسي و فى حالة الإعتذار
                    يتم ارسال رسالة نصية تفيد الإعتذار عن الطلب وسبب الإعتذار .
                  </li>
                </ul>
              </div>
              <div>
                <h5>المستندات المطلوبة :- </h5>
                <ul>
                  <li>صورة لخطاب طلب تسجيل للمكتب الهندسي .</li>
                  <li>صورة لترخيص الهيئة السعودية .</li>
                  <li>صورة لرخصة المكتب من البلدية .</li>
                  <li>صورة لبيانات و برنت التأمينات الإجتماعية .</li>
                  <li>
                    صورة ورقم الهوية للموظف وصورة المؤهل وشهادة التسجيل بالهيئة
                    السعودية ورقم العضوية .
                  </li>
                </ul>
              </div>
              <div>
                <h5>المستفيدين من الخدمة :- </h5>
                <ul>
                  <li>
                    قطاع الأعمال ( الشركات – المؤسسات - المكاتب الهندسية ).
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              className="servicePageFooter px-5"
            >
              <h4>الشروط والأحكام :- </h4>
              <p>
                الإلتزام بشروط وأحكام أمانة منطقة الرياض وإتفاقية تأهيل المكاتب
                الهندسية
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              className="servicePageFooter px-5"
            >
              <h4>اوقات تقديم الخدمة :- </h4>
              <p>
                إستقبال الطلبات على مدار ٢٤ ساعة لكن سيتم معالجة الطلبات من
                المختصين خلال أوقات الدوام الرسمي للإدارة العامة للتخطيط
                العمراني يوميا عدا الجمعة والسبت .
              </p>
            </Col>
            {/* <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              className="servicePageFooter px-5"
            >
              <h4>الفيديو التعليمي :-</h4>
              <p>
                إذا كنت تواجه مشاكل حول التعامل مع الخدمة يمكنك من هنا مشاهدة
                بشكل عملي لطريقة تنفيذ الخدمة
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=c1DU8OJN7g4"
              >
                شاهد الفيديو التوضيحي
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              </a>
            </Col> */}
            {/* 
              <iframe
                title="video"
                width="420"
                height="345"
                src="https://www.youtube.com/embed/c1DU8OJN7g4"
              ></iframe>
       */}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
