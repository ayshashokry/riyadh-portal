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
export default function GeoExplorerService() {
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
          <span className="span2">المستكشف الجغرافي</span>
          <h1>المستكشـف الجغـرافي</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام المستكشف الجغرافي</h2>
              <p>
                هو مستكشف جغرافي لمدن حاضرة الدمام يتيح للمواطنين والمستخدمين
                الاستعراض والاستعلام عن المعلومات الإلكترونية التي توفرها أمانة
                المنطقة الشرقية، كما يقدم مجموعة من الخدمات الإلكترونية والبلدية
                التي تقوم بالمساهمة في إنجاز الأعمال اليومية لموظفي الأمانة
                والبلديات والجهات الحكومية والمكاتب الهندسية بجودة أعلى وفي وقت
                أقل بصورة سهلة وميسره تساعد المسئولين في إدارة الأعمال ودعم
                اتخاذ القرار. كما يحتوي المستكشف الجغرافي أيضا على مجموعة من
                الادوات الإلكترونية التي يمكن تطويعها في إجراء وتنفيذ استفسارات
                وتحليلات متنوعة اعتمادا على المعلومات المتاحة في قاعدة البيانات
                الإلكترونية ، ومن ثم إتاحة تقديم نتائج الاستفسارات والتحليلات
                كخرائط ورسومات بيانية وأشكال تخطيطية وتقارير كما يتيح للمستخدم
                إمكانية طباعة الخرائط حسب القوالب المنتقاة وقياساتها المختلفة.
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              <a
                href={`${window.hostURL + window.baseURI + "/#/maps"}`}
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
            </Col>
          </Row>
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h5>أهداف المستكشف الجغرافي</h5>
              <ul>
                <li>
                  إتاحة توفير البيانات والمعلومات الإلكترونية بصورة سهلة وميسرة
                  للمستخدم الغير متخصص
                </li>
                <li>
                  إيجاد أرضية مشتركة لتفعيل التنسيق بين مختلف القطاعات الخدمية
                  والمرافق لغرض تبادل ومشاركة المعلومات وتسهيل الإجراءات وتمكين
                  تطبيق نظم المعلومات الإلكترونية بشكل فاعل على مستوى مدن
                  المنطقة الشرقية.
                </li>
                <li> تشجيع الاستثمار في مجال التطوير العقاري</li>
                <li>
                  {" "}
                  نشر الوعي بأهمية نظم المعلومات الإلكترونية على شبكة الأنترنت
                  لخدمة المواطن والجهات الحكومية والخاصة
                </li>
              </ul>
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
                  href={`${process.env.PUBLIC_URL}/servicesManual/تطبيق المستكشف الجغرافي.pdf`}
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
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              className="servicePageFooter pl-5"
            >
              <h4>الشروط والأحكام</h4>
              <p>
                الالتزام بشروط وأحكام أمانة المنطقة الشرقية واتفاقية تأهيل
                المكاتب الهندسية
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
