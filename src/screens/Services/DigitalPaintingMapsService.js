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
export default function DigitalPaintingMapsService() {
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
          <span className="span2">خدمات طلب لوحات و خرائط رقمية</span>
          <h1>خدمات طلب لوحات و خرائط رقمية</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمات طلب لوحات و خرائط رقمية</h2>
              <p>
                خدمة تتيح للمستفيدين طباعة الأجزاء المراد طباعتها من قطع الأراضي
                او المخططات المعتمدة من قبل الأمانة و الموجودة بالمستكشف
                الجغرافي و تم تطوير تطبيق يتمثل فى أتمتة استخراج لوحات و خرائط
                رقمية للأراضي التابعة للمخططات المعتمدة من قبل الأمانة
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              <a
                href={`${window.hostURL + window.baseURI + "/#/maps/print"}`}
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
                  href={`${process.env.PUBLIC_URL}/servicesManual/نظام طلب لوحات و خرائط رقمية.pdf`}
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
        </Container>
      </div>
      <Footer />
    </div>
  );
}
