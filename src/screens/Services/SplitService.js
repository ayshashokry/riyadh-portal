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
export default function SplitService(props) {
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
          <span className="span2">خدمات الفرز</span>
          <h1>خدمـات الفـرز</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمـات الفـرز</h2>
              <p>
                خدمة إلكترونية تتيح للمستفيدين بالتعاون مع المكاتب الهندسية
                المؤهلة من قبل الأمانة، التقدم بطلبات الفرز لتنفيذ إجراءات
                معاملات الفرز دون الحاجة لزيارة الأمانة أو البلدية التابعة وتم
                تطوير تطبيق جغرافي يتمثل في أتمتة معاملات فرز ودمج وإعادة تعديل
                خط التنظيم للأراضي الفضاء أو الأ راضي المقام عليها منشئات عقارية
                متصلة أو منفصلة وأيضا فرز صكوك الوحدات العقارية ,الشقق السكنية
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              {props.isAuth ? (
                <a
                  href={`${
                    window.hostURL +
                    "/gisv2/#/submissions/SPLITEMARGELABEL?tk=" +
                    localStorage.token
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
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/نظام الفرز الالكتروني.pdf`}
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
              <h3>خدمة فرز الأراضي الفضاء</h3>
              <p>
                إجراء يصدر عنه تقسيم أو فرز أرض داخل المخططات التقسيمية
                المعتمدة.
              </p>
            </Col>{" "}
            <Col md={{ span: 2 }}></Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <h3>خدمة فرز الدوبلكسات</h3>
              <p>إجراء يصدر عنه تقسيم أو فرز الدوبلكسات .</p>
            </Col>
          </Row>

          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              <div>
                <h5>إجراءات الخدمة</h5>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة فرز الأراضي الفضاء.
                  </li>
                  <li>يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب.</li>
                  <li>يدخل المستخدم ويحدد بيانات وموقع الأرض.</li>
                  <li> يدخل المستخدم ويرفق بيانات وثائق الملكية.</li>
                  <li>
                    يدخل المستخدم بيانات الكروكي المساحي وتحديد بيان الأرض على
                    الطبيعة.
                  </li>
                  <li>
                    يدخل المستخدم بيانات الأراضي مع إرفاق مخطط للوضع المقترح.
                  </li>
                  <li>
                    إدخال أي ملاحظات او بيانات على الطلب او الأرض مع التعهد بصحة
                    البيانات.
                  </li>
                  <li>
                    ارسال الطلب للمعالجة وإصدار استمارة الفرز واعتمادها من
                    اللجنة الفنيةمع خطاب كتابة العدل
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={{ span: 2 }}></Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              {" "}
              <div>
                <h5>إجراءات الخدمة</h5>
                <p>إجراء يصدر عنه تقسيم أو فرز الدوبلكسات .</p>
                <ul>
                  <li>
                    بعد تسجيل الدخول على النظام من خلال بوابة الأمانة يختار
                    المستخدم خدمة فرز الدوبلكسات،
                  </li>
                  <li>يدخل المستخدم بيانات المالك او المستفيد صاحب الطلب.</li>
                  <li>يدخل المستخدم ويحدد بيانات وموقع الأرض.</li>
                  <li> يدخل المستخدم ويرفق بيانات وثائق الملكية.</li>
                  <li>
                    يدخل المستخدم تفاصيل بيانات المبنى من رخصة البناء والمخطط
                    المعماري المعتمد.
                  </li>
                  <li>يدخل المستخدم بيانات أراضي الدوبلكسات للوضع المقترح.</li>
                  <li>يملأ المستخدم حقول التقرير الفني.</li>
                  <li>
                    إدخال أي ملاحظات او بيانات على الطلب او الأرض مع التعهد بصحة
                    البيانات .
                  </li>
                  <li>
                    ارسال الطلب للمعالجة وإصدار استمارة الفرز واعتمادها من
                    اللجنة الفنية مع خطاب كتابة العدل.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              {" "}
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>
                    صورة بطاقة الهوية الوطنية أو صورة السجل التجاري للشركات
                    والمؤسسات.{" "}
                  </li>
                  <li>صورة صك الملكية توضح التهميشات خلف الصك.</li>
                  <li>صورة فوتوغرافية توضح الموقع.</li>
                  <li>تقرير معاينة معتمد من المكتب الهندسي. </li>
                </ul>
              </div>
            </Col>
            <Col md={{ span: 2 }}></Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              {" "}
              <div>
                <h5>المستندات المطلوبة</h5>
                <ul>
                  <li>
                    صورة بطاقة الهوية الوطنية أو صورة السجل التجاري للشركات
                    والمؤسسات.{" "}
                  </li>
                  <li>صورة صك الملكية توضح التهميشات خلف الصك.</li>
                  <li>صورة فوتوغرافية توضح الموقع.</li>
                  <li>صورة رخصة البناء. </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
              {" "}
              <div>
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
              {" "}
              <div>
                <h5>المستفيدين من الخدمة</h5>
                <ul>
                  <li>أفراد (المواطنين – منسوبي مجلس التعاون الخليجي).</li>
                  <li>
                    قطاع أعمال (الشركات -المكاتب العقارية - المكاتب الهندسية).
                  </li>
                  <li> الجهات الحكومية والخيرية.</li>
                </ul>
              </div>{" "}
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
