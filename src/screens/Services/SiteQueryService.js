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
export default function SiteQueryService() {
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
          <span className="span2">استعلام عن موقع بالنسبة لحد التنمية</span>
          <h1>استعلام عن موقع بالنسبة لحد التنمية</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام استعلام عن موقع بالنسبة لحد التنمية</h2>
              <p>
                خدمة تتيح للمستفيدين الاستعلام عن موقع بالنسبة للنطاق العمراني
                المعتمد و حد التنمية الواقع فيه هذا الموقع و تم تطوير خدمة تتمثل
                فى أتمتة الاستعلام عن موقع بالنسبة لحد التنمية للأراضي التابعة
                للمخططات المعتمدة من قبل الأمانة
              </p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              <a
                href={`${window.hostURL + "/urban/#/identify"}`}
                target="_self"
                rel="noreferrer"
              >
                <Button>
                  الذهاب إلي الخدمة
                  <FontAwesomeIcon className="mr-2" icon={faLongArrowAltLeft} />
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
                  href={`${process.env.PUBLIC_URL}/servicesManual/نظام استعلام عن موقع بالنسبة لحد التنمية.pdf`}
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
